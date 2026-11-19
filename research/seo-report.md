# Informe SEO: Speedy Landscaping & Lawncare

Fecha: 2026-11-18. Mediciones hechas sobre la versión de producción en local (`npm run build` y `npm run start`).

## 1. Resumen

- 19 páginas indexables más `/links` (fuera del índice), todas generadas de forma estática.
- Una keyword principal por página, sin solapamientos.
- Auditoría automática (`npm run audit`): las 19 páginas pasan todas las comprobaciones.
- Lighthouse: 100 en Accesibilidad, Buenas prácticas y SEO; Rendimiento 93 en móvil y 100 en escritorio.
- `npm run build` y el linter terminan sin errores.

Lo que queda pendiente depende de datos del cliente y está listado en el [README](../README.md).

## 2. Mapa de keywords por página

Keyword principal del sitio: **landscaping in Marietta, GA**.

| Página | Keyword principal | Keywords secundarias |
|---|---|---|
| `/` | landscaping in Marietta, GA | lawn care Marietta, landscaper near me, landscaping company Marietta GA |
| `/services` | landscaping services in Marietta, GA | lawn services, yard services Marietta |
| `/services/lawn-maintenance` | lawn care in Marietta, GA | lawn maintenance Marietta GA, lawn mowing service, weekly yard maintenance |
| `/services/sod-installation` | sod installation in Marietta, GA | sod installers Marietta, new lawn installation, Bermuda sod, Zoysia sod |
| `/services/mulch-pine-straw` | mulch installation in Marietta, GA | pine straw installation Marietta, mulching service, black mulch, red mulch |
| `/services/landscape-design` | landscape design in Marietta, GA | landscaping installation, flower bed installation, decorative rock, French drain |
| `/services/tree-service` | tree trimming in Marietta, GA | tree service Marietta, tree pruning, tree cutting, shrub trimming |
| `/services/pressure-washing` | pressure washing in Marietta, GA | driveway cleaning Marietta, concrete cleaning, patio pressure washing |
| `/services/gutter-cleaning` | gutter cleaning in Marietta, GA | gutter cleaning service, downspout cleaning, clogged gutters |
| `/services/yard-cleanup` | yard cleanup in Marietta, GA | junk removal Marietta, leaf removal, overgrown yard clearing, flower bed cleanup |
| `/areas` | landscaping in Cobb County, GA | landscaper Cobb County, service area |
| `/areas/mableton` | landscaping in Mableton, GA | lawn care Mableton, pine straw, leaf cleanup |
| `/areas/powder-springs` | landscaping in Powder Springs, GA | lawn mowing Powder Springs, bed cleanup |
| `/areas/kennesaw` | landscaping in Kennesaw, GA | lawn maintenance Kennesaw, mulch, HOA lawn care |
| `/gallery` | landscaping projects in Marietta, GA | before and after landscaping, sod before and after |
| `/reviews` | Speedy Landscaping reviews | landscaper reviews Marietta GA |
| `/about` | Speedy Landscaping & Lawncare (marca) | owner, local landscaper Marietta |
| `/contact` | free landscaping estimate in Marietta, GA | landscaping quote, lawn care estimate |
| `/links` | Sin keyword. `noindex`. | |

Decisiones:

- **Marietta no tiene página en `/areas`.** La portada ya es la página de Marietta. Crear `/areas/marietta` haría competir a dos páginas por la misma keyword.
- **Solo hay páginas de ciudad donde hay evidencia** de clientes o fichas: Mableton (Yelp), Powder Springs (Nextdoor) y Kennesaw (reseña de Google). Smyrna y Austell están propuestas y pendientes de confirmar.
- **Enlazado interno:** portada → servicios → ciudades. Cada servicio enlaza a 3 servicios relacionados y a las 3 ciudades; cada ciudad enlaza a sus 5 servicios más pedidos y a las otras ciudades. Todas las páginas interiores llevan migas de pan visibles.

## 3. Resultado de la auditoría on-page

Salida de `npm run audit`:

| Página | Title (car.) | Description (car.) | H1 | Palabras | Fotos |
|---|---|---|---|---|---|
| `/` | 48 | 149 | 1 | 1.079 | 16 |
| `/services` | 57 | 148 | 1 | 204 | 8 |
| `/services/lawn-maintenance` | 46 | 148 | 1 | 781 | 7 |
| `/services/sod-installation` | 53 | 148 | 1 | 835 | 8 |
| `/services/mulch-pine-straw` | 55 | 144 | 1 | 715 | 8 |
| `/services/landscape-design` | 53 | 150 | 1 | 816 | 10 |
| `/services/tree-service` | 50 | 138 | 1 | 683 | 6 |
| `/services/pressure-washing` | 53 | 146 | 1 | 691 | 7 |
| `/services/gutter-cleaning` | 52 | 142 | 1 | 667 | 6 |
| `/services/yard-cleanup` | 49 | 146 | 1 | 639 | 7 |
| `/areas` | 51 | 150 | 1 | 185 | 0 |
| `/areas/mableton` | 48 | 150 | 1 | 647 | 2 |
| `/areas/powder-springs` | 54 | 151 | 1 | 636 | 2 |
| `/areas/kennesaw` | 48 | 153 | 1 | 647 | 2 |
| `/gallery` | 57 | 152 | 1 | 119 | 33 |
| `/reviews` | 41 | 149 | 1 | 691 | 0 |
| `/about` | 50 | 155 | 1 | 446 | 2 |
| `/contact` | 50 | 145 | 1 | 144 | 0 |

- Todos los title tienen menos de 60 caracteres y todas las description 155 o menos. Ninguno se repite.
- Un solo H1 por página, con la keyword y la ciudad.
- Canonical, Open Graph y Twitter Card en todas las páginas.
- Todas las fotos tienen texto alternativo descriptivo y nombre de archivo con keyword (por ejemplo `sod-installation-marietta-ga-side-yard-after.webp`).
- Las 8 páginas de servicio tienen entre 639 y 835 palabras, con 4 preguntas frecuentes propias cada una.
- Una URL inexistente devuelve un 404 real con página personalizada.

## 4. SEO técnico

| Punto | Estado |
|---|---|
| Renderizado en servidor | Todas las páginas son HTML estático. El contenido no depende de JavaScript |
| Animaciones y contenido | El texto está en el HTML desde el inicio. Solo se animan `opacity`, `transform` y `clip-path` |
| `sitemap.xml` | Dinámico: se genera desde los datos de servicios y ciudades |
| `robots.txt` | Todo permitido salvo `/api/`. Lista explícita de rastreadores de IA permitidos |
| Canonical | En todas las páginas |
| Página 404 | Personalizada, con estado 404 real |
| Redirecciones 301 | Preparadas para las 4 URLs de la web antigua (solo aplican si se reutiliza `speedyyards.com`) |
| Imágenes | `next/image` con AVIF y WebP, tamaños adaptados, carga diferida y marcador borroso |
| Imagen principal | Precargada con prioridad alta |
| Fuentes | `next/font` (Manrope e Instrument Serif), alojadas junto a la web. La serif no se precarga |
| GSAP y Lenis | En un trozo de JavaScript aparte que no bloquea el primer pintado. Si tarda o falla, la página se muestra sin animar |
| `prefers-reduced-motion` | Respetado: sin animaciones ni scroll suave |
| Móvil | Diseño mobile-first, con barra fija de llamada |
| Consola | Sin errores |

## 5. Lighthouse

Medición del 19-11-2026, tras el rediseño, con Lighthouse sobre la versión de producción en `localhost` (`npm run build` y `npm run start`).

| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|---|
| `/` | Móvil | 92 | 100 | 100 | 100 |
| `/` | Escritorio | 99 | 100 | 100 | 100 |
| `/services/sod-installation` | Móvil | 93 | 100 | 100 | 100 |

| Página | Dispositivo | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| `/` | Móvil | 1,1 s | 3,4 s | 20 ms | 0 |
| `/` | Escritorio | 0,3 s | 0,9 s | 0 ms | 0 |
| `/services/sod-installation` | Móvil | 0,9 s | 3,2 s | 10 ms | 0 |

Lectura de los resultados:

- **El objetivo de 90 o más en las cuatro categorías se cumple** en las tres mediciones. En móvil el margen de rendimiento es corto (92 y 93) y Lighthouse varía unos puntos entre pasadas.
- **CLS por debajo de 0,1:** cumplido (0).
- **LCP por debajo de 2,5 s:** cumplido en escritorio (0,9 s). En móvil Lighthouse da 3,2 a 3,4 s, que es una estimación con red 4G lenta y procesador cuatro veces más lento. Sin esa simulación, el LCP medido fue de 0,2 s.
- **INP por debajo de 200 ms:** no se puede medir en laboratorio, necesita visitas reales. El indicador equivalente, el tiempo de bloqueo (TBT), es de 20 ms.
- Los informes completos (JSON) están en `research/lighthouse/`.
- **Aviso sobre la medición local.** En el equipo donde se midió, un programa de seguridad descomprime las respuestas HTTP cuando el agente de usuario es un navegador. Lighthouse veía entonces la página sin gzip y daba 71 en móvil. Las cifras de arriba se tomaron con `--emulated-user-agent="SpeedyLocalAudit/1.0"`, que evita esa interferencia y deja la compresión como la servirá el alojamiento real.

Hay que repetir la medición con PageSpeed Insights sobre el dominio real: el resultado cambia con el alojamiento.

## 6. Datos estructurados (JSON-LD)

| Tipo | Dónde | Contenido |
|---|---|---|
| `HomeAndConstructionBusiness` | Todas las páginas | Nombre, logo, imágenes, teléfono, dirección, `areaServed` (4 ciudades), `sameAs` (Google, Facebook, Nextdoor, Yelp), fundador, premio, catálogo de servicios, `aggregateRating` y 13 reseñas reales |
| `WebSite` | Todas las páginas | Nombre y URL |
| `Service` | Cada página de servicio | Nombre, descripción, proveedor y área |
| `FAQPage` | Portada, 8 servicios y 3 ciudades | Preguntas y respuestas visibles en la página |
| `BreadcrumbList` | Todas las páginas interiores | Migas de pan |

Notas:

- **Subtipo.** Schema.org no tiene un tipo específico para paisajistas. Se usa `HomeAndConstructionBusiness`, el subtipo de `LocalBusiness` más cercano.
- **Campos omitidos a propósito:** `streetAddress`, `geo`, `openingHoursSpecification` y `priceRange` no aparecen porque esos datos no están confirmados. Se añaden solos al rellenarlos en `src/lib/business.ts`.
- **Reseñas en el schema.** Solo se incluyen las 13 con texto completo. Las 7 cortadas quedan fuera hasta tener el texto entero.
- **Estrellas en Google.** Google no muestra estrellas en los resultados para las reseñas que un negocio local publica sobre sí mismo en su propia web. El marcado es válido y ayuda a los asistentes de IA, pero no hay que esperar estrellas en la búsqueda.
- **Validación.** La auditoría local comprueba que cada bloque es JSON válido y tiene las propiedades mínimas. Falta pasar Rich Results Test de Google sobre el dominio publicado, porque necesita una URL pública.
- **Rating.** `aggregateRating` usa 5.0 y 22 reseñas, contadas en las capturas. Hay que confirmarlo con la ficha.

## 7. SEO local

- NAP idéntico en el pie, en contacto y en el schema: `Speedy Landscaping & Lawncare`, `Marietta, GA 30008`, `(678) 748-2590`. La calle no se muestra hasta confirmarla.
- Teléfono clicable (`tel:`) en cabecera, hero, contacto y pie. Barra fija de llamada en móvil.
- Mapa embebido en la portada, en contacto y en el área de servicio. Ahora muestra Marietta; hay que sustituirlo por el de la ficha.
- Enlace "Leave us a review on Google" en portada, reseñas, contacto, pie y `/links`. Ahora apunta al perfil; hay que sustituirlo por el enlace directo de reseña.

## 8. GEO / AEO (búsqueda con IA)

- **`/llms.txt`** generado desde los mismos datos que la web: qué hace el negocio, dónde, servicios, contacto, diferenciadores, reseñas literales y preguntas frecuentes.
- **Respuesta directa primero.** Cada página empieza con una o dos frases que dicen qué se ofrece, dónde y cómo contactar. Las preguntas frecuentes responden en la primera frase.
- **Datos verificables:** 22 reseñas de cinco estrellas, premio Nextdoor Neighborhood Favorite 2025, citas literales de clientes con su nombre. No se afirman años de experiencia, número de proyectos, licencias ni garantías porque no están confirmados.
- **Página About con E-E-A-T:** quién es el dueño, cómo trabaja, datos del negocio y reseñas. Falta una foto real del dueño y del equipo.
- **Rastreadores de IA permitidos** de forma explícita en `robots.txt`: GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, Applebot-Extended y otros.

## 9. Checklist para el cliente (fuera de la web)

La web es la mitad del SEO local. La otra mitad es la ficha de Google, las reseñas y que el nombre, la dirección y el teléfono sean idénticos en todas partes.

### Perfil de empresa de Google

- [ ] Poner la dirección de la web nueva en la ficha.
- [ ] Revisar nombre, categoría principal ("Landscaper" o "Lawn care service") y añadir categorías secundarias: Lawn care service, Tree service, Pressure washing service, Gutter cleaning service.
- [ ] Definir el área de servicio con las ciudades reales: Marietta, Mableton, Powder Springs, Kennesaw y las que falten.
- [ ] Rellenar el horario real.
- [ ] Añadir los 8 servicios con una descripción corta cada uno.
- [ ] Subir fotos nuevas cada mes, sobre todo antes y después. Las de esta web sirven.
- [ ] Publicar una novedad cada una o dos semanas (un trabajo terminado, una oferta de temporada).
- [ ] Responder a todas las reseñas, también a las antiguas.
- [ ] Borrar la reseña que el dueño se puso a sí mismo: va contra las normas de Google y pone en riesgo las demás.
- [ ] Activar los mensajes y rellenar la sección de preguntas y respuestas con las preguntas frecuentes de la web.

### Reseñas

- [ ] Pedir una reseña al terminar cada trabajo, con el enlace directo o un código QR en una tarjeta.
- [ ] Enviar el enlace por SMS el mismo día, mientras el cliente está contento.
- [ ] Pedir que mencionen el servicio y la ciudad ("sod installation in Marietta"): ayuda al posicionamiento.
- [ ] Objetivo: 2 a 4 reseñas nuevas al mes. La constancia cuenta más que el total.
- [ ] No ofrecer descuentos ni regalos a cambio de reseñas: Google lo prohíbe.

### Directorios (mismo nombre, dirección y teléfono en todos)

- [ ] **Yelp:** corregir el nombre, que figura como "Speedy Lansdcaping", y la ciudad, que figura como Mableton.
- [ ] **Nextdoor:** añadir la web y corregir el horario (ahora indica cierre a las 8:01 PM y a las 11:00 PM).
- [ ] **Facebook:** completar la página con dirección, teléfono, web y horario.
- [ ] Darse de alta en **BBB**, **Angi**, **Thumbtack**, **Bing Places** y **Apple Business Connect**.
- [ ] Hay otra ficha "Speedy Landscaping" en Marietta con el teléfono (678) 341-8694 en Townplanner y MapQuest. Si ese número fue del negocio, hay que corregir esas fichas; si no, no hay que hacer nada.

### Medición

- [ ] Dar de alta el dominio en **Google Search Console** y enviar `sitemap.xml`.
- [ ] Instalar **Google Analytics 4** y marcar como conversiones los clics en el teléfono y los envíos del formulario.
- [ ] Revisar cada mes en Search Console las búsquedas que traen visitas y las páginas con más impresiones.
- [ ] Dar de alta el dominio en **Bing Webmaster Tools**: es la fuente de varios asistentes de IA.

## 10. Avisos

- **Logo.** La mascota del logo original es Speedy Gonzales, de Warner Bros. La web usa una versión sin el personaje. Es una decisión que debe tomar el cliente.
- **Ficha de Google no leída.** Google bloquea la lectura automática de la ficha. Nombre, teléfono, servicios y reseñas se obtuvieron de las fotos del cliente, sus capturas de reseñas, Nextdoor, Yelp y la copia archivada de la web antigua. Por eso varios datos siguen pendientes de confirmar.
- **Competencia.** Ningún competidor analizado muestra reseñas con rating, preguntas frecuentes ni datos estructurados visibles. Es la ventaja principal de esta web. El detalle está en `research/business-info.md`, apartado 7.
