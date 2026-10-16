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
  recetas/        # (pendiente) portadas del menú de ejemplo
  higiene/        # (pendiente) serie de lavado e higiene
  manipulacion/   # (pendiente) serie de manipulación
```

## 3. Mapa de secciones (`index.html`)

| id | Contenido |
|---|---|
| `#inicio` | Hero con título, chips y tarjeta de mensaje |
| `#ejes` | Slider de los 5 ejes de seguridad alimentaria |
| `#etapas` | Stepper: Primera infancia / Niñez / Adolescencia |
| ↳ `#p-infancia` | Subpestañas: Lactancia (0–6 m) y Complementaria (6 m–2 años) |
| ↳ `#p-complementaria` | Pestañas por edad: `#p-6-8`, `#p-9-11`, `#p-12-23`, con menú de ejemplo, recomendaciones y bloque de hierro |
| ↳ `#p-ninez` | Grupos del Plato Saludable de la Familia Colombiana |
| ↳ `#p-adolescencia` | **En construcción** |
| `#precios` | Comparativo Bazurto / D1 / Ara / Megatiendas (tabla generada por JS) |

Cada sección nueva debe agregarse también al `<nav id="nav">` del header. El resaltado del enlace activo se calcula solo, a partir de `main section[id]`.

## 4. Sistema de diseño

### Tokens (`:root` en `styles.css`)
- Colores: `--sea #0E7C86`, `--sea-d #09565d`, `--coral #FF6F59`, `--mango #FFB627`, `--leaf #43AA8B`, `--berry #B5487A`, `--sand #FFF8EC`, `--sand-2 #FDEFD6`, `--ink #1F2D3D`, `--muted #5B6B7B`.
- Lila de acento (hero, texture-bar, agetab activo, fondo de precios): `#DBBBF2`, `#e7d5f3`. Celeste de acento (botones, tags): `#9DDFF5`.
- `--radius: 20px`, `--shadow: 0 10px 30px rgba(14,124,134,.12)`.
- Tipografías: `--font-h` (Fredoka) para títulos y `--font-b` (Nunito) para el texto.

**Usa siempre las variables.** Solo agrega colores nuevos si no existe uno equivalente.

### Componentes reutilizables
| Necesidad | Usa |
|---|---|
| Sección nueva | `<section class="section" id="...">` con `.section-head` (`.tag` + `h2` + `p`) |
| Sección con fondo alterno | `.section.alt` |
| Tarjetas en grilla | `.grid-2` / `.grid-3` + `.card` (`.card.wide` para ancho completo) |
| Lista con viñeta 🌱 | `ul.check` |
| Mensaje destacado | `.callout` con `.callout-icon` |
| Pasos con imagen numerada | `ol.breast-steps` > `li.bstep` > `figure` > `.bstep-img` (con `data-emoji` de respaldo) + `figcaption` |
| Pestañas | contenedor con `data-tabs` y botones con `data-panel="id-del-panel"`; los paneles usan `.panel` / `.panel.active` |
| Plato con receta | `button.dish` con `span` (emoji), `.dish-name`, `.dish-cta` y `<template class="receta">` |
| Nota o fuente | `p.note` |
| Título de bloque | `h3.block-title` (con `<small>` para la fuente) |
| Animación de entrada | clase `.reveal` |

### Responsive
- `@media (max-width:860px)`: hero en una columna, menú hamburguesa.
- `@media (max-width:720px)`: la tabla de precios pasa a tarjetas (cada `<td>` necesita `data-label`), el slider se apila.
- Se respeta `prefers-reduced-motion`.

## 5. JavaScript (`script.js`)

Orden del archivo: datos de precios → tabla → pestañas genéricas → slider → menú móvil → scroll/progreso → `.reveal` → modal de recetas.

### Pestañas genéricas
Cualquier contenedor con `[data-tabs]` funciona automáticamente: sus botones hijos directos (`:scope > button`) activan el panel indicado en `data-panel`. **No escribas lógica nueva de pestañas.**

### Modal de recetas
- Al hacer clic en `.dish` se clona su `template.receta` dentro de `#recipeModalBody`.
- El título se arma con `plato.querySelector('span').textContent` (emoji) + `.dish-name`. **Si cambias la estructura de `.dish` (por ejemplo, al agregar una imagen), actualiza este selector.**
- Solo una receta abierta a la vez; al cerrar, el foco vuelve al plato.

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
- Si cambias los precios, actualiza la fecha de referencia en `.section-head` de `#precios` y en `.sources`.

## 6. Reglas de contenido (obligatorias)

### Rigor y fuentes
- Todo dato nutricional o de salud debe tener una fuente citada: OMS, UNICEF, ICBF (Guías Alimentarias, 2020, 2015-2025), ESPGHAN, DANE-SIPSA, Ministerio de Salud.
- Cita en el formato existente: `(ICBF, 2020)` dentro de `<small>` o de `p.note`.
- Agrega cada fuente nueva a `.refs` en el footer.
- **No inventes cifras, dosis, tiempos ni porcentajes.** Si falta un dato, deja `<!-- TODO: validar con nutricionista -->`.

### Coherencia con las recomendaciones de la guía
- 0–6 meses: solo leche materna, **ni siquiera agua**.
- Desde 6 meses: sin sal, azúcar, grasas trans, especias ni cubitos de caldo. Sin leche de vaca como bebida antes de los 12 meses.
- Texturas: 6–8 m puré suave · 9–11 m machacado y picado fino · 12–23 m trozos pequeños, desmechado o molido.
- Huevo: empezar por la yema; siempre bien cocido.
- Riesgo de atoramiento: nada de uvas enteras, nueces ni trozos grandes y duros.
- Sin embutidos, productos de paquete ni bebidas azucaradas en la primera infancia.
- Hierro en cada comida, acompañado de vitamina C.
- Queso costeño: muy salado, no apto para bebés.

### Recetas
- Estructura del template: `h5 Ingredientes` → `ul` → `h5 Preparación` → `ol` → `p.note` opcional.
- Pasos en imperativo con tú ("Lava…", "Cocina…").
- Siempre incluye los pasos de seguridad: lavar, cocción completa, retirar espinas, huesos o semillas, y dejar enfriar.
- Prioriza los ingredientes locales que aparecen en la tabla de precios.

### Contexto local
- Usa nombres locales: ahuyama, patilla, ñame, bocachico, mojarra, níspero, zapote, Bazurto.
- Los ejemplos deben ser de la vida cotidiana en Cartagena y el Caribe.
- Considera el clima cálido (conservación y cadena de frío) y el presupuesto limitado.

## 7. Accesibilidad
- Todas las imágenes llevan `alt` descriptivo en español y `loading="lazy"`.
- Las imágenes de pasos llevan `data-emoji` como respaldo.
- Mantén los `role`, `aria-selected`, `aria-label` y `aria-expanded` existentes.
- Los botones interactivos son `<button>`, no `<div>`.
- Revisa el contraste del texto sobre los fondos lila y celeste.

## 8. Imágenes
- Formato WebP (o PNG/JPEG comprimido), idealmente menos de 200 KB.
- Nombres en minúsculas con guiones: `crema-ahuyama-pollo.webp`.
- Las fotos de comida para bebés deben mostrar la textura correcta para la edad.
- En grillas, usa `aspect-ratio` y `object-fit: cover` para que las tarjetas queden parejas.

## 9. Problemas conocidos (corregir si tocas esa zona)
- **Fuentes no cargadas:** hay `preconnect` a Google Fonts, pero falta el `<link>` de Fredoka y Nunito, así que se usa `system-ui`.
- **Slider, slide 4 (`Aprovechamiento biológico`):** falta el `</div>` de cierre de `.slide-content`.
- **Lactancia:** el `figcaption` del paso 5 repite el del paso 4, y los textos de los pasos 5–7 están desfasados respecto a su `alt` (el paso 7 tiene el `alt` del meñique, pero ese texto corresponde al paso 8).
- **CSS:** `.section, section_pre` tiene un selector inválido; `.slide-visual` y `.slide-num` están duplicados; hay un `;;` en `.section.alt`; `font-size:1 rem` (con espacio) en `.slide-content h4`; `.hero p` tiene `max-width:60` sin unidad.
- **CSS:** `.stores{grid-template-columns:repeat(2,1fr)}` está fuera de un media query y anula el `auto-fit` en escritorio.
- **`.btn:hover`** usa una sombra mango (`#d9930c`) que no coincide con la sombra base (`#3d5861`).
- **Teclado en el slider:** las flechas cambian de diapositiva pero no reinician el autoplay.

## 10. Trabajo pendiente (issues)
1. Sección `#tips`: lavado e higiene (imágenes), manipulación de alimentos (imágenes) y tiempos de cocción (solo texto). Va entre `#etapas` y `#precios`.
2. Sección "Comer con poco es posible": va antes de `#precios`.
3. Sección "Para tener en cuenta" (consejos para elegir alimentos): va después de `#precios`.
4. Imagen de portada en cada tarjeta `.dish` del menú de ejemplo (y opcionalmente dentro de la receta).
5. Contenido de `#p-adolescencia` (en construcción).

## 11. Checklist antes de terminar
- [ ] El contenido está en español, con tú, y es coherente con las reglas de la sección 6
- [ ] Las fuentes están citadas y agregadas al footer
- [ ] Se reutilizaron componentes y variables existentes
- [ ] Las secciones nuevas tienen `id`, `.reveal` y su enlace en el `<nav>`
- [ ] Se probó en móvil (≤720px) y en escritorio
- [ ] Las pestañas, el modal y la tabla siguen funcionando
- [ ] Las imágenes tienen `alt`, `loading="lazy"` y peso optimizado
- [ ] No quedan errores en la consola del navegador