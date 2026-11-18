# Speedy Landscaping & Lawncare: web

Web del negocio Speedy Landscaping & Lawncare (Marietta, Georgia). Next.js 16 (App Router), TypeScript, Tailwind CSS 4, GSAP + ScrollTrigger y Lenis. Todo el contenido se genera de forma estática y está pensado para SEO local y para que los asistentes de IA puedan citar el negocio.

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
| Colores y tipografías | `src/app/globals.css` |

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
- Para usar el original en la cabecera, cambia el `src` en `src/components/Logo.tsx`. Hazlo solo si el cliente asume el riesgo descrito arriba.
- Favicons e imagen Open Graph se regeneran con `npm run brand`.

## Fuentes

- **Archivo** (titulares), en su corte expandido de peso 800. Licencia SIL Open Font License. Está alojada en `src/fonts` como subconjunto latino en WOFF2 (11 KB por archivo).
- **Figtree** (texto y subtítulos), cargada con `next/font/google`.

Para regenerar los archivos de Archivo a partir de los TTF de `research/assets/fonts`:

```bash
pip install fonttools brotli
python -m fontTools.subset research/assets/fonts/Archivo-Expanded-ExtraBold.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+2013,U+2014,U+2018,U+2019,U+201C,U+201D,U+2026,U+2122,U+20AC" --layout-features="kern,liga,tnum,lnum" --flavor=woff2 --output-file=src/fonts/Archivo-Expanded-ExtraBold.woff2
```

## Estructura

```
src/app/(site)/        Páginas con cabecera y pie: portada, services, areas, about, gallery, reviews, contact
src/app/(bare)/links/  Página de enlaces para redes sociales, sin cabecera ni pie
src/app/               layout, 404, sitemap, robots, manifest, llms.txt, api/contact, iconos
src/components/        Componentes de interfaz
src/animations/        Animaciones de scroll (GSAP), aisladas y reutilizables
src/lib/               Datos del negocio, servicios, ciudades, reseñas, SEO y datos estructurados
scripts/               Optimización de fotos, assets de marca, auditoría SEO
research/              Investigación, assets de marca e informe SEO
Img/                   Fotos y vídeos originales del cliente (no se suben al repositorio)
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
- **Animaciones.** El texto siempre está en el HTML. Las animaciones solo cambian `opacity`, `transform` y `clip-path`. GSAP y Lenis se cargan con la primera interacción del visitante o poco después de terminar la carga, y no se cargan si el visitante prefiere movimiento reducido.
- **Esta versión de Next.js tiene cambios respecto a las anteriores.** Antes de tocar el código conviene leer `AGENTS.md` y la documentación incluida en `node_modules/next/dist/docs`.
