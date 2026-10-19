# AGENTS.md · Semillitas 🌱

Guía para agentes que trabajen en este repositorio. Léela completa antes de hacer cambios.

## 1. Qué es el proyecto

**Semillitas** es una guía web de alimentación infantil (0 a 18 años) para familias del Caribe colombiano, especialmente Cartagena. Promueve el uso de alimentos locales, nutritivos, seguros y accesibles.

- Público: mamás, papás y cuidadores, muchos con bajo presupuesto y acceso desde el celular.
- Idioma: **español de Colombia**, trato de **tú**, tono cálido, cercano y sencillo.
- Es un sitio estático sin frameworks ni build: `index.html`, `styles.css` y `script.js`.

## 2. Estructura de archivos

```
index.html        # Todo el contenido y la estructura
styles.css        # Estilos (tokens en :root)
script.js         # Interacciones y datos de precios
imgs/
  Ejes/           # 1.jpeg … 5.jpeg (slider de ejes)
  lactancia/      # imagen_1.png … imagen_8.png
  Higiene/        # 1.jpeg … 7.jpeg (lavado de manos)
  tiendas/        # bz.jpg, d1.jpg, ara.jpg, mt.jpg (pasar a WebP cuando sea posible)
  recetas/        # (pendiente) portadas del menú de ejemplo
  manipulacion/   # (pendiente) serie de manipulación
```

## 3. Mapa de secciones (`index.html`)

| id | Contenido |
|---|---|
| `#inicio` | Hero con título, chips y tarjeta de mensaje |
| `#ejes` | Slider de los 5 ejes de seguridad alimentaria |
| `#etapas` | Encabezado y stepper: Primera infancia / Niñez / Adolescencia |
| `#p-infancia` | Sección propia (panel). Subpestañas: Lactancia (0–6 m) y Complementaria (6 m–2 años) |
| ↳ `#p-complementaria` | Pestañas por edad: `#p-6-8`, `#p-9-11`, `#p-12-23`, con menú de ejemplo, recomendaciones y bloque de hierro |
| `#p-ninez` | Sección propia (panel). Introducción, recomendaciones y menú de un día |
| `#p-adolescencia` | Sección propia (panel). Introducción, recomendaciones por sexo y menú de un día |
| `#tips` | Subpestañas: `#p-higiene` (lavado de manos con imágenes), `#p-manipulacion` y `#p-coccion` (**en construcción**) |
| `#precios` | Tarjetas de tiendas con imagen + comparativo Bazurto / D1 / Ara / Megatiendas (tabla generada por JS) |

Las tres etapas son `<section>` independientes con las clases `.section-full .etapa .panel` y `data-nav="etapas"`. El stepper de `#etapas` muestra una a la vez. Su fondo se cambia en `styles.css` con `#p-infancia`, `#p-ninez` o `#p-adolescencia`.

Cada sección nueva debe agregarse también al `<nav id="nav">` del header. El resaltado del enlace activo se calcula solo, a partir de `main section[id]`; si una sección pertenece a otro enlace del menú, usa `data-nav="id-del-enlace"`.

## 4. Sistema de diseño

### Tokens (`:root` en `styles.css`)
- Colores: `--sea #0E7C86`, `--sea-d #09565d`, `--coral #FF6F59`, `--mango #FFB627`, `--leaf #43AA8B`, `--berry #B5487A`, `--sand #FFF8EC`, `--sand-2 #FDEFD6`, `--ink #1F2D3D`, `--muted #5B6B7B`.
- Lila de acento (hero, texture-bar, agetab activo, fondo de precios): `#DBBBF2`, `#e7d5f3`. Celeste de acento (botones, tags): `#9DDFF5`.
- Fondos de etapas: `#etapas` y `#p-infancia` `#e2f2ff`, `#p-ninez` `#eaf7f1`, `#p-adolescencia` `#f3ecfa`.
- `#tips` tiene sus propias variables locales: `--tips-c` (color principal) y `--tips-bg` (fondo de la pestaña activa).
- `--radius: 20px`, `--shadow: 0 10px 30px rgba(14,124,134,.12)`.
- Tipografías: `--font-h` (Fredoka) para títulos y `--font-b` (Nunito) para el texto.

**Usa siempre las variables.** Solo agrega colores nuevos si no existe uno equivalente.

### Componentes reutilizables
| Necesidad | Usa |
|---|---|
| Sección nueva | `<section class="section" id="...">` con `.section-head` (`.tag` + `h2` + `p`) |
| Sección de ancho completo | `.section.section-full` (el fondo ocupa toda la página; el contenido se centra a 1150px) |
| Tarjetas en grilla | `.grid-2` / `.grid-3` + `.card` (`.card.wide` para ancho completo) |
| Lista con viñeta 🌱 | `ul.check` |
| Mensaje destacado | `.callout` con `.callout-icon` |
| Pasos con imagen numerada | `ol.breast-steps` > `li.bstep` > `figure` > `.bstep-img` (con `data-emoji` de respaldo) + `figcaption` |
| Galería con visor ampliable | agrega la clase `.galeria` al `ol.breast-steps`; quita los números, pone marco y abre las imágenes en el `#lightbox` |
| Pestañas | contenedor con `data-tabs` y botones con `data-panel="id-del-panel"` y `aria-controls`; los paneles usan `.panel` / `.panel.active` y pueden estar en cualquier parte de la página |
| Plato con receta | `button.dish` con `span` (emoji), `small.dish-time` opcional (tiempo de comida), `.dish-name`, `.dish-cta` y `<template class="receta">` |
| Tarjeta de tienda con imagen | `.store` con `role="img"`, `aria-label` y `style="--c: …; --img: url('imgs/tiendas/…')"` |
| Nota o fuente | `p.note` |
| Título de bloque | `h3.block-title` (con `<small>` para la fuente) |
| Animación de entrada | clase `.reveal` |
| Imagen suelta ampliable | `img.imagen-marco.ampliable` (centrada, con marco y abre en el `#lightbox`) |

### Tarjetas de tiendas (`.store`)
- La imagen va como fondo CSS en la variable `--img`; el color de la tienda en `--c` es el respaldo si la imagen no carga.
- Las tarjetas no tienen texto visible: el nombre y el tipo de tienda van en el `aria-label`. Si se agrega texto encima de la foto, revisa el contraste.
- Imágenes de **600 × 400 px (3:2)**, idealmente en WebP de 40–80 KB, con el motivo principal centrado (`cover` recorta los bordes).
- Preferir fotos propias, no imágenes de los sitios web de las tiendas.
- Las tarjetas usan `min-height` (150px; 130px en móvil), no `aspect-ratio` fijo.

### Responsive
- `@media (max-width:860px)`: hero en una columna, menú hamburguesa.
- `@media (max-width:720px)`: la tabla de precios pasa a tarjetas (cada `<td>` necesita `data-label`), el slider se apila, las tiendas quedan en 2 columnas y la galería de lactancia en 1 columna.
- Se respeta `prefers-reduced-motion`.

## 5. JavaScript (`script.js`)

Orden del archivo: datos de precios → tabla → pestañas genéricas → slider (con el visor de imágenes adentro) → menú móvil → scroll/progreso → `.reveal` → modal de recetas → respaldo de imágenes con emoji.

### Pestañas genéricas
Cualquier contenedor con `[data-tabs]` funciona automáticamente: sus botones hijos directos (`:scope > button`) activan el panel indicado en `data-panel`, buscándolo por `id` en toda la página. **No escribas lógica nueva de pestañas.**

### Enlace activo del menú
- Se ignoran las secciones ocultas (`offsetParent === null`), como las etapas no activas.
- Si una sección tiene `data-nav`, se resalta ese enlace en lugar de su propio `id`.

### Modal de recetas
- Al hacer clic en `.dish` se clona su `template.receta` dentro de `#recipeModalBody`.
- El título se arma con `plato.querySelector('span').textContent` (emoji) + `.dish-name`. **El `span` del emoji debe ser el primer `span` dentro de `.dish`.** Si cambias la estructura (por ejemplo, al agregar una imagen), actualiza este selector.
- Solo una receta abierta a la vez; al cerrar, el foco vuelve al plato.

### Visor de imágenes (`#lightbox`)
- Funciona solo para las imágenes dentro de `.galeria .bstep-img img`.
- Navega con flechas (botones y teclado) entre las imágenes de la misma galería; ignora las que no cargaron (`.sin-img`).
- El texto debajo de la imagen sale del `figcaption`; si no hay, usa el `alt`.

### Tarjetas de tiendas
Son HTML estático; `script.js` no las toca. No necesitan respaldo en JS: si la imagen falla, el CSS muestra el color.

### Datos de precios (`alimentos`)
Cada alimento sigue esta forma:
```js
{ n: 'Nombre', e: '🥭', cat: 'Frutas', u: 'kg',
  p: { baz: 456, d1: 2900, ara: 2700, mega: 3200 }, // null = no disponible
  ok: ['mega'],      // tiendas con precio consultado (✓); el resto es estimado (≈)
  bazEst: true,      // opcional: el precio de Bazurto es estimado, no SIPSA
  etapa: 'Desde 6 meses (puré)' }
```
- Categorías válidas: `Frutas`, `Verduras`, `Tubérculos`, `Granos`, `Proteínas`, `Lácteos`. Los filtros se generan a partir de ellas.
- Campos calculados (no los escribas a mano): `min`, `mejor`, `ahorro`, `mejorSuper`, `minSuper`.
- **Todo alimento debe tener al menos un precio en D1, Ara o Megatiendas**; si no, `minSuper` queda en `Infinity`.
- `etapa` debe ser coherente con las recomendaciones por edad de la guía.
- **No inventes precios.** Solo agrega alimentos con precios consultados o estimados de forma documentada.
- Si cambias los precios, actualiza la fecha de referencia en `.section-head` de `#precios`.

## 6. Reglas de contenido (obligatorias)

### Rigor y fuentes
- Todo dato nutricional o de salud debe tener una fuente citada: OMS, UNICEF, ICBF (Guías Alimentarias, 2020, 2015-2025), ESPGHAN, DANE-SIPSA, Ministerio de Salud.
- Cita en el formato existente: `(ICBF, 2020)` dentro de `<small>`, `<em>` o `p.note`.
- Agrega cada fuente nueva a `.refs` en el footer y en `#tips`.
- **No inventes cifras, dosis, tiempos ni porcentajes.** Si falta un dato, deja `<!-- TODO: validar con nutricionista -->`.
- Fuentes por validar: Álvarez (2024) y Rechy (2024), usadas en Adolescencia. Si no son confiables, reemplázalas por una fuente oficial.

### Rangos de edad
- Primera infancia: 0 a 5 años · Niñez: 6 a 12 años · Adolescencia: **12 a 18 años**. Usa estos rangos en todo el sitio.

### Coherencia con las recomendaciones de la guía
**Primera infancia**
- 0–6 meses: solo leche materna, **ni siquiera agua**.
- Desde 6 meses: sin sal, azúcar, grasas trans, especias ni cubitos de caldo. Sin leche de vaca como bebida antes de los 12 meses.
- Texturas: 6–8 m puré suave · 9–11 m machacado y picado fino · 12–23 m trozos pequeños, desmechado o molido.
- Huevo: empezar por la yema; siempre bien cocido.
- Riesgo de atoramiento: nada de uvas enteras, nueces ni trozos grandes y duros.
- Sin embutidos, productos de paquete ni bebidas azucaradas en la primera infancia.
- Hierro en cada comida, acompañado de vitamina C.
- Queso costeño: muy salado, no apto para bebés.

**Niñez y adolescencia**
- Sal en poca cantidad; queso costeño solo bajo en sal y con moderación.
- Limitar el azúcar añadido, las bebidas azucaradas y los ultraprocesados.
- Agua potable como bebida principal.
- No usar la comida como premio o castigo.

### Recetas
- Estructura del template: `h5 Ingredientes` → `ul` → `h5 Preparación` → `ol` → `p.note` opcional.
- Pasos en imperativo con tú ("Lava…", "Cocina…"). Nunca en infinitivo ni con usted.
- Siempre incluye los pasos de seguridad: lavar, cocción completa, retirar espinas, huesos o semillas, y dejar enfriar.
- Prioriza los ingredientes locales que aparecen en la tabla de precios, con el mismo nombre que usa la tabla.
- Los menús de Niñez y Adolescencia son de un día con 5 tiempos (desayuno, media mañana, almuerzo, merienda, cena), marcados con `small.dish-time`.

### Contexto local
- Usa nombres locales: ahuyama, patilla (no sandía), ñame, guineo, bocachico, mojarra, níspero, zapote, Bazurto.
- Los ejemplos deben ser de la vida cotidiana en Cartagena y el Caribe.
- Evita alimentos poco comunes o costosos en la región (por ejemplo, pavo).
- Considera el clima cálido (conservación y cadena de frío) y el presupuesto limitado.

## 7. Accesibilidad
- Todas las imágenes `<img>` llevan `alt` descriptivo en español y `loading="lazy"`.
- Las imágenes de pasos llevan `data-emoji` como respaldo.
- Las imágenes de fondo CSS con información (tiendas) llevan `role="img"` y `aria-label`; las del slider son decorativas porque el texto ya está en la diapositiva.
- Mantén los `role`, `aria-selected`, `aria-label`, `aria-controls` y `aria-expanded` existentes.
- Los botones interactivos son `<button>`, no `<div>`.
- Revisa el contraste del texto sobre los fondos lila, celeste y de las etapas.

## 8. Imágenes
- Formato WebP (o PNG/JPEG comprimido), idealmente menos de 200 KB.
- Nombres en minúsculas con guiones: `crema-ahuyama-pollo.webp`.
- Las fotos de comida para bebés deben mostrar la textura correcta para la edad.
- En grillas, usa `aspect-ratio` y `object-fit: cover` para que las tarjetas queden parejas.
- Tamaños de referencia: tiendas 600 × 400 px.

## 9. Problemas conocidos (corregir si tocas esa zona)
- **Fuentes no cargadas:** hay `preconnect` a Google Fonts, pero falta el `<link>` de Fredoka y Nunito, así que se usa `system-ui`.
- **Lactancia:** el `figcaption` del paso 5 repite el del paso 4, y los textos de los pasos 5–7 están desfasados respecto a su `alt` (el paso 7 tiene el `alt` del meñique, pero ese texto corresponde al paso 8).
- **Higiene:** los pasos de lavado de manos no tienen `figcaption`, y algunos `data-emoji` no corresponden al paso.
- **CSS:** `.slide-visual` y `.slide-num` están duplicados; `font-size:1 rem` (con espacio) en `.slide-content h4`; `.hero p` tiene `max-width:60` sin unidad; `.bstep-img` tiene `aspect-ratio: none` (valor inválido); `#tips .momentos h4` tiene `margin-bottom:3rem 0` (valor inválido).
- **CSS:** las reglas de `.lb-figure`, `.lb-figure img` y el media query del visor están duplicadas.
- **`.btn:hover`** usa una sombra mango (`#d9930c`) que no coincide con la sombra base (`#3d5861`).
- **Teclado en el slider:** las flechas cambian de diapositiva pero no reinician el autoplay.
- **JS:** `initLightbox` está escrito dentro de `initSlider`. Funciona, pero debería ser una función independiente después del modal de recetas.
- **`#precios`:** falta la fecha de referencia de los precios en `.section-head`, y la clase `.sources` existe en el CSS pero no en el HTML.

## 10. Trabajo pendiente (issues)
1. Sección `#tips`: manipulación de alimentos (imágenes, `imgs/manipulacion/`) y tiempos de cocción (solo texto, validar con nutricionista). Lavado e higiene ya está.
2. Sección "Comer con poco es posible": va antes de `#precios`.
3. Sección "Para tener en cuenta" (consejos para elegir alimentos): va después de `#precios`.
4. Imagen de portada en cada tarjeta `.dish` del menú de ejemplo (y opcionalmente dentro de la receta).
5. Resolver los `TODO` de Niñez y Adolescencia: temperatura del enyucado, fuentes de Álvarez (2024) y Rechy (2024), y fuente de las tarjetas de mujeres y hombres adolescentes.
6. Opcional: agregar a la tabla de precios guineo verde, hígado de res, coco, ají dulce y repollo, solo con precios consultados.

## 11. Checklist antes de terminar
- [ ] El contenido está en español, con tú, y es coherente con las reglas de la sección 6
- [ ] Las fuentes están citadas y agregadas al footer y a `#tips`
- [ ] Se reutilizaron componentes y variables existentes
- [ ] Las secciones nuevas tienen `id`, `.reveal` y su enlace en el `<nav>` (o `data-nav`)
- [ ] Se probó en móvil (≤720px) y en escritorio
- [ ] Las pestañas, el modal, el visor de imágenes y la tabla siguen funcionando
- [ ] Las imágenes tienen `alt`, `loading="lazy"` y peso optimizado
- [ ] No quedan errores en la consola del navegador