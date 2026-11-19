# Speedy Landscaping & Lawncare: web

Web del negocio Speedy Landscaping & Lawncare (Marietta, Georgia). Next.js 16 (App Router), TypeScript, Tailwind CSS 4, GSAP (ScrollTrigger y SplitText, con `@gsap/react`) y Lenis. Todo el contenido se genera de forma estática y está pensado para SEO local y para que los asistentes de IA puedan citar el negocio.

El contenido de la web está en inglés (negocio de EE. UU.). Esta guía está en español.

## Verla en tu ordenador

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Los cambios se ven al guardar.

Para probar la versión final, tal como se publicará:

```bash
npm run build
npm run start
```

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila la versión de producción |
| `npm run start` | Sirve la versión compilada |
| `npm run audit` | Revisa el SEO de todas las páginas (con la web arrancada en el puerto 3000) |
| `npm run images` | Regenera las fotos optimizadas a partir de la carpeta `Img` |
| `npm run brand` | Regenera logos, favicons e imagen Open Graph |
| `npm run lint` | Revisa el código |

## Publicar en Vercel

1. Sube el proyecto a un repositorio de GitHub. La carpeta `Img` (fotos originales, 256 MB) está excluida en `.gitignore`: las fotos que usa la web ya están optimizadas en `public/images`.
2. En [vercel.com](https://vercel.com), pulsa "Add New" → "Project" e importa el repositorio. Vercel detecta Next.js y no hay que tocar la configuración de compilación.
3. En "Environment Variables" añade:

   | Variable | Valor |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | La dirección final, sin barra al final. Ejemplo: `https://www.midominio.com` |
   | `CONTACT_WEBHOOK_URL` | La dirección que recibe el formulario (ver "Formulario de contacto") |

4. Pulsa "Deploy".
5. En "Settings" → "Domains" añade el dominio del cliente y sigue las instrucciones de DNS.
6. Cuando el dominio funcione, comprueba `/sitemap.xml`, `/robots.txt` y `/llms.txt`, y pasa la portada por [Rich Results Test](https://search.google.com/test/rich-results) y [PageSpeed Insights](https://pagespeed.web.dev/).

Si `NEXT_PUBLIC_SITE_URL` no está definida, la web usa la dirección de producción que asigna Vercel. Conviene definirla siempre: de ella salen los enlaces canónicos, el sitemap y los datos estructurados.

## Formulario de contacto

El formulario envía los datos a `/api/contact`, que los reenvía a la dirección de `CONTACT_WEBHOOK_URL`. Sirve cualquier servicio que acepte un POST con JSON y lo convierta en un email:

- [Formspree](https://formspree.io): crea un formulario con el email del dueño y pega su URL (`https://formspree.io/f/...`).
- Un webhook de Zapier o Make que envíe un email o un SMS.

Mientras la variable no esté definida, el formulario muestra un aviso para que el visitante llame o escriba al (678) 748-2590. No se pierde ningún contacto en silencio.

## Dónde se cambia cada cosa

| Qué | Archivo |
|---|---|
| Teléfono, dirección, horario, redes, rating, datos pendientes | `src/lib/business.ts` |
| Servicios y sus textos | `src/lib/services.ts` |
| Ciudades del área de servicio | `src/lib/areas.ts` |
| Reseñas | `src/lib/reviews.ts` |
| Preguntas frecuentes de la portada | `src/lib/faqs.ts` |
| Fotos, nombres de archivo y textos alternativos | `scripts/optimize-images.mjs` |
| Colores, tamaños de letra, espaciados y radios (design tokens) | `src/app/globals.css`, bloque `@theme` |
| Tipografías | `src/app/layout.tsx` |
| Orden de las secciones de la portada | `src/app/(site)/page.tsx` |
| Pasos de "From first call to finished yard" | `src/components/sections/Process.tsx` |
| Fotos de la galería horizontal de la portada | `src/components/sections/WorkRail.tsx` |

Las páginas, el sitemap, los datos estructurados y `/llms.txt` se generan a partir de esos archivos. Añadir un servicio o una ciudad es añadir un elemento a la lista correspondiente.

## Pendientes antes de publicar

Ningún dato de la web es inventado. Lo que no se pudo confirmar está en `src/lib/business.ts` como `null` con un comentario `TODO`, y la web simplemente no lo muestra hasta que se rellene.

### Datos del negocio

- [ ] **Nombre exacto de la ficha de Google.** El enlace dice "Speedy Landscaping"; el logo, "Speedy Landscaping & Lawncare". El nombre de la web debe coincidir letra por letra con la ficha (`name`, `googleListingName`).
- [ ] **Dirección.** La web antigua indicaba una calle (está en `research/business-info.md`, apartado 1). Confirmar que coincide con la ficha y que el dueño quiere publicarla (`address.street`). Ahora solo se muestra "Marietta, GA 30008".
- [ ] **Coordenadas** (`geo`), una vez confirmada la dirección.
- [ ] **Horario** (`hours`). El que figura en Nextdoor tiene errores y no se ha usado.
- [ ] **Rating y número de reseñas** (`google.rating`, `google.reviewCount`). Ahora: 5.0 con 22 reseñas, contadas en las capturas del 18-11-2026. Confirmar con la cabecera de la ficha.
- [ ] **Texto completo de 7 reseñas** que Google cortaba en las capturas (marcadas con `excerpt: true` en `src/lib/reviews.ts`).
- [ ] **Enlace directo para dejar una reseña** (`google.reviewUrl`). Se obtiene en el perfil de empresa de Google, "Pedir reseñas".
- [ ] **Mapa del negocio** (`google.mapEmbedUrl`). Ahora muestra la ciudad de Marietta. Sustituir por el código de inserción de la ficha (Google Maps → Compartir → Insertar un mapa).
- [ ] **Email público** (`email`). En Nextdoor figura uno (está en `research/business-info.md`, apartado 1).
- [ ] **Año de inicio** (`foundedYear`). La web antigua decía 2005.
- [ ] **Licencia y seguro** (`licensedAndInsured`). No se afirma nada hasta confirmarlo.
- [ ] **Atención en español** (`spanishSpoken`). Hay reseñas en español; confirmar si se quiere anunciar.
- [ ] **Rango de precios** para los datos estructurados (`priceRange`, por ejemplo `"$$"`).
- [ ] **Cómo quiere aparecer el dueño** (`owner.fullName`). Ahora: Obdulio Vail Velásquez.
- [ ] **Redes sociales.** El enlace de Facebook es un enlace de compartir; sustituirlo por la dirección definitiva. Instagram no se ha encontrado.

### Contenido

- [ ] **Área de servicio.** Hay página para Mableton, Powder Springs y Kennesaw porque hay evidencia de clientes allí. Smyrna y Austell están propuestas y sin confirmar: se añaden en `src/lib/areas.ts`.
- [ ] **Servicios por confirmar:** retirada de trastos (junk removal) está incluida porque figuraba en la web antigua. Terrazas (decks) y muros de contención no están incluidos. Los drenajes franceses se mencionan dentro de "Landscape design"; si el dueño lo confirma como servicio habitual, merece página propia.
- [ ] **Fotos del dueño y del equipo** para la página About. Ahora usa fotos de trabajos.
- [ ] **Fotos de limpieza de canalones y de poda de árboles.** No había ninguna en el material recibido.
- [ ] **Vídeos.** Los 4 vídeos de la carpeta `Img` no se han usado.

### Decisiones

- [ ] **Logo.** El logo original incluye a Speedy Gonzales, personaje de Warner Bros., lo que supone un riesgo legal de derechos de autor y de marca. La web usa una versión redibujada sin el personaje. Ver "Logo" más abajo.
- [ ] **Dominio.** `speedyyards.com`, el de la web antigua, ya no está registrado. Si se recupera, las redirecciones 301 de las URLs antiguas ya están en `next.config.ts`.
- [ ] **La reseña que el dueño se puso a sí mismo** en Google debería borrarla: va contra las normas de Google.

### Después de publicar

- [ ] Configurar `CONTACT_WEBHOOK_URL` y enviar un formulario de prueba.
- [ ] Dar de alta el dominio en Google Search Console y enviar `/sitemap.xml`.
- [ ] Añadir Google Analytics si el cliente lo quiere (no está instalado).
- [ ] Pasar Rich Results Test y PageSpeed Insights sobre el dominio real.
- [ ] Seguir el checklist para el cliente de `research/seo-report.md`.

## Logo

- La web usa `public/brand/logo-horizontal.svg` (cabecera), `logo-horizontal-light.svg` (pie) y `logo-badge.svg` (página `/links`).
- El logo original del cliente, con el fondo quitado, está en `public/brand/logo-original.webp`.
- Para usar el original en la cabecera, cambia el `src` en `src/components/ui/Logo.tsx`. Hazlo solo si el cliente asume el riesgo descrito arriba.
- Los favicons se regeneran con `npm run brand`.
- **Imagen para redes** (`src/app/opengraph-image.jpg` y `twitter-image.jpg`). La actual sigue el diseño nuevo: fondo claro, Manrope y botón verde con el teléfono. Se compuso aparte, a 1200 × 630 px, con las fuentes y los colores de la propia web. Ojo: `npm run brand` la sustituiría por la tarjeta del diseño anterior (verde oscuro, tipografía Archivo), que es la que genera `research/scripts/build-brand-assets.cjs`.

## Diseño

Estética clara y pausada, con mucho espacio en blanco y titulares grandes. Todo sale de los tokens del bloque `@theme` de `src/app/globals.css`:

- **Color.** Los tonos se derivan del logo. Fondos cálidos (`bone`, `cream`, `sand`), verdes suavizados (`mint`, `sage`, `moss`), texto en verde muy oscuro (`forest`, `charcoal`, `stone`) y el verde intenso de la marca (`brand`) solo en botones, enlaces y detalles. El amarillo del logo queda para las estrellas. Todos los pares de texto y fondo que se usan pasan WCAG AA.
- **Fondos de sección.** Cada sección declara su color con `data-bg="mint"` (o `bone`, `cream`, `sand`, `sage`). Con las animaciones activas el color se funde de una sección a la siguiente.
- **Un solo bloque oscuro:** el pie, con una fila de césped que crece en su borde superior.

## Fuentes

Las dos se cargan con `next/font/google`, que las aloja junto a la web (el navegador no pide nada a Google):

- **Manrope** (peso variable): titulares y texto.
- **Instrument Serif** en cursiva: solo para las palabras de los clientes (citas y reseñas). No se precarga porque nunca aparece en la primera pantalla.

## Estructura

```
src/app/(site)/           Páginas con cabecera y pie: portada, services, areas, about, gallery, reviews, contact
src/app/(bare)/links/     Página de enlaces para redes sociales, sin cabecera ni pie
src/app/                  layout, 404, sitemap, robots, manifest, llms.txt, api/contact, iconos
src/components/sections/  Secciones completas de página (Hero, Process, WorkRail, PageHero, CtaBand...)
src/components/ui/        Piezas reutilizables (Photo, BeforeAfter, ServiceIndex, ReviewCard, ContactForm, iconos...)
src/components/layout/    Cabecera, pie y barra de llamada del móvil
src/components/motion/    Arranque de las animaciones: script inicial y componente que carga GSAP y Lenis
src/lib/animations/       Las animaciones, una por archivo (hero, reveals, story, rail, background...)
src/lib/                  Datos del negocio, servicios, ciudades, reseñas, SEO y datos estructurados
scripts/                  Optimización de fotos, assets de marca, auditoría SEO
research/                 Investigación, assets de marca e informe SEO
Img/                      Fotos y vídeos originales del cliente (no se suben al repositorio)
```

### Qué no se sube al repositorio

El repositorio de GitHub es público. Estos archivos se quedan solo en la copia local (están en `.gitignore`):

| Archivo o carpeta | Motivo |
|---|---|
| `Img/` | Fotos y vídeos originales, 256 MB |
| `research/business-info.md` | Contiene la dirección y el email del dueño sin confirmar y los nombres completos de quienes dejaron reseña |
| `research/sources/` | Copia de la web antigua, con la dirección |
| `research/photo-sheets/` | Hojas de contacto de todas las fotos originales |
| `Prompt Claude Code — Web moderna + SEO local + GEO.md` | Documento de instrucciones, con un nombre propio |
| `.env*` | Variables de entorno |

Conviene guardar una copia de esos archivos en otro sitio. Para subir alguno, quita su línea de `.gitignore`.

## Notas técnicas

- **Generación estática clásica.** `cacheComponents` está desactivado a propósito: así las rutas dinámicas declaran `dynamicParams = false` y una URL de servicio o ciudad inexistente devuelve un 404 real.
- **Animaciones.** El texto siempre está en el HTML del servidor; las páginas son Server Components y activan cada animación con un atributo (`data-reveal`, `data-split`, `data-counter`, `data-story`, `data-rail`, `data-bg`...). La lista completa está en los comentarios de `src/lib/animations`. Solo se animan `opacity` y `transform`; la excepción es `clip-path`, en el barrido de las fotos y en el comparador antes/después.
- **Carga de las animaciones.** GSAP, ScrollTrigger, SplitText y Lenis van en un trozo de JavaScript aparte que se descarga en paralelo con la página (`src/components/motion`). `useGSAP` se encarga de limpiar todo al cambiar de página.
- **Si el JavaScript tarda o falla.** Un script mínimo marca `<html class="anim">` antes del primer pintado para que nada parpadee. Si las animaciones no han llegado a los 1,8 s se muestra la cabecera sin esperar, y a los 6 s se muestra toda la página sin animar. Sin JavaScript la página es HTML estático completo.
- **Secciones fijas.** "From first call to finished yard" y la galería horizontal se quedan fijas con `position: sticky` (CSS), no con el pin de ScrollTrigger, así que el alto de la página es estable desde el primer pintado. Solo se activan en pantallas de al menos 1024 × 680 px; en móvil los pasos se apilan y la galería se desliza con el dedo.
- **Movimiento reducido.** Quien tiene activada esa preferencia no recibe la clase `anim`: ve la página estática, sin Lenis ni animaciones de scroll.
- **Esta versión de Next.js tiene cambios respecto a las anteriores.** Antes de tocar el código conviene leer `AGENTS.md` y la documentación incluida en `node_modules/next/dist/docs`.
