# 🌱 Semillitas

**Guía de alimentación infantil con alimentos locales para familias del Caribe colombiano.**

Semillitas es un sitio web que orienta a mamás, papás y cuidadores de Cartagena y el Caribe sobre cómo ofrecer a niños, niñas y adolescentes (0 a 18 años) una alimentación variada, nutritiva, segura y accesible, aprovechando los alimentos propios de la región.

## ✨ Contenido

| Sección | Qué incluye |
|---|---|
| **Ejes de la seguridad alimentaria** | Slider con los 5 ejes (disponibilidad, acceso, consumo, aprovechamiento biológico, calidad e inocuidad) y ejemplos locales |
| **Etapas de vida** | Lactancia materna exclusiva (0–6 meses), alimentación complementaria (6 meses–2 años) con menús y recetas por edad, niñez (6–12 años) y adolescencia (12–18 años, en construcción) |
| **Tips** | Lavado e higiene (galería con visor), manipulación de alimentos y tiempos de cocción |
| **¿Dónde comprar?** | Comparativo de precios entre Bazurto, D1, Ara y Megatiendas, con buscador, filtros y orden |

### Funcionalidades
- Pestañas por etapa, subetapa y edad
- Recetas en ventana emergente
- Galerías de imágenes con visor ampliado (flechas, teclado y cierre con Esc)
- Tabla de precios interactiva que se adapta a tarjetas en celular
- Diseño responsive y accesible (navegación con teclado, `aria-*`, respeto a `prefers-reduced-motion`)

## 🛠️ Tecnologías

Sitio estático, sin frameworks ni dependencias:

- HTML5
- CSS3 (variables, grid, flexbox, `color-mix`, `dialog`)
- JavaScript

## 📁 Estructura

```
Semillitas/
├── index.html      # Contenido y estructura
├── styles.css      # Estilos (variables de diseño en :root)
├── script.js       # Interacciones y datos de precios
├── AGENTS.md       # Guía para agentes de código y colaboradores
└── imgs/
    ├── Ejes/       # Imágenes del slider de ejes
    ├── lactancia/  # Pasos para amamantar
    ├── Higiene/    # Lavado de manos
    └── recetas/    # Portadas del menú de ejemplo (pendiente)
```

## 🚀 Cómo verlo en tu computador

1. Clona el repositorio:
```bash
   git clone https://github.com/Santiagoperz/Semillitas.git
   cd Semillitas
```
2. Abre `index.html` en el navegador.

También puedes usar la extensión **Live Server** de VS Code, que recarga la página automáticamente cada vez que guardas un cambio.

## 🤝 Cómo contribuir

1. Revisa los [issues](https://github.com/Santiagoperz/Semillitas/issues) y elige uno.
2. Crea una rama desde `main` actualizado:
```bash
   git checkout main
   git pull
   git checkout -b nombre-de-la-rama
```
   Usa nombres cortos y sin `#`, por ejemplo `ninez-contenido` o `tips-manipulacion`.
3. Haz tus cambios, guarda y verifica:
```bash
   git status
   git add <archivos>
   git commit -m "feat: descripción corta del cambio"
   git push -u origin nombre-de-la-rama
```
4. Abre un Pull Request hacia `main`. En la descripción escribe `Closes #N` para cerrar el issue al hacer el merge.

### Antes de abrir el PR
- [ ] Probé en escritorio y en celular (≤720px)
- [ ] Las pestañas, recetas, galerías y tabla siguen funcionando
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Las imágenes tienen `alt` descriptivo y están optimizadas
- [ ] Reutilicé componentes y variables existentes

Para el detalle de componentes, convenciones y estructura del código, consulta [`AGENTS.md`](AGENTS.md).

## 📝 Reglas de contenido

- **Idioma:** español de Colombia, con trato de **tú** y un tono cálido y sencillo.
- **Rigor:** todo dato nutricional o de salud debe tener una fuente citada. No se inventan cifras, tiempos ni cantidades; el contenido nuevo debe validarlo un profesional de nutrición.
- **Coherencia:** las recetas y recomendaciones deben respetar lo que dice la guía para cada edad (sin sal ni azúcar en bebés, textura según la edad, huevo bien cocido, nada que cause atoramiento).
- **Contexto local:** se usan nombres y alimentos de la región (ahuyama, patilla, ñame, bocachico, Bazurto…).

## 🗺️ Pendientes

- [ ] Tips: manipulación de alimentos (imágenes) y tiempos de cocción
- [ ] Niñez: contenido completo y menú de un día
- [ ] Adolescencia (12–18 años)
- [ ] Sección "Comer con poco es posible"
- [ ] Sección "Para tener en cuenta" (consejos para elegir alimentos)
- [ ] Imágenes de portada en el menú de ejemplo

## 📚 Fuentes

- Organización Mundial de la Salud (OMS): lactancia materna, *Cinco claves para la inocuidad de los alimentos* (2006), *¿Cómo lavarse las manos?* (2009)
- UNICEF (2023)
- Instituto Colombiano de Bienestar Familiar (ICBF, 2020) y Guías Alimentarias Basadas en Alimentos para la población colombiana (2015-2025)
- ESPGHAN (2017)
- DANE – SIPSA (2026): precios mayoristas de Bazurto

Los precios de D1, Ara y Megatiendas se tomaron de las páginas web y los folletos de cada cadena. Las ofertas cambian cada semana, así que deben verificarse en el punto de compra.

## ⚠️ Aviso

Semillitas es una guía educativa y no reemplaza la consulta con profesionales de salud o nutrición. Ante cualquier duda sobre la alimentación o la salud de tu hijo/a, consulta a su pediatra o nutricionista.
