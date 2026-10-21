/* ===========================================================
   Semillitas · Interacciones
   -----------------------------------------------------------
   1. Configuración
   2. Datos de precios
   3. Utilidades
   4. Tabla de precios
       4b. Costo de los platos
   5. Pestañas
   6. Slider de ejes
   7. Visor de imágenes
   8. Recetas
   9. Portada
   10. Menú móvil
   11. Scroll: progreso, botón arriba y enlace activo
   12. Aparición al hacer scroll
   13. Respaldo de imágenes
   =========================================================== */


/* ===========================================================
   1. Configuración
   =========================================================== */
const MENOS_MOVIMIENTO = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const tiendas = [
  { k: 'baz', label: 'Bazurto' },
  { k: 'd1', label: 'D1' },
  { k: 'ara', label: 'Ara' },
  { k: 'mega', label: 'Megatiendas' }
];
const supers = ['d1', 'ara', 'mega'];


/* ===========================================================
   2. Datos de precios (COP)
   -----------------------------------------------------------
   p:      precio por unidad en cada tienda (null = no disponible habitualmente)
   ok:     tiendas con precio consultado
   bazEst: true si el precio de Bazurto es estimado (si no, es dato SIPSA)
   =========================================================== */
const alimentos = [
  // ===== Frutas =====
  { n: 'Mango común', e: '🥭', cat: 'Frutas', u: 'kg', p: { baz: 456, d1: 2900, ara: 2700, mega: 3200 }, ok: [], etapa: 'Desde 6 meses (puré o compota)' },
  { n: 'Banano', e: '🍌', cat: 'Frutas', u: 'kg', p: { baz: 600, d1: 3000, ara: 3300, mega: 3400 }, ok: [], etapa: 'Desde 6 meses (machacado)' },
  { n: 'Papaya maradol', e: '🧡', cat: 'Frutas', u: 'kg', p: { baz: 1844, d1: 3800, ara: 3600, mega: 3900 }, ok: [], etapa: 'Desde 6 meses · aporta vitamina C' },
  { n: 'Naranja común', e: '🍊', cat: 'Frutas', u: 'kg', p: { baz: 1776, d1: 3400, ara: 3200, mega: 3500 }, ok: [], etapa: 'Ayuda a absorber el hierro' },
  { n: 'Guayaba común', e: '🍈', cat: 'Frutas', u: 'kg', p: { baz: 3133, d1: 5800, ara: 5500, mega: 5900 }, ok: [], etapa: 'Rica en vitamina C' },
  { n: 'Patilla', e: '🍉', cat: 'Frutas', u: 'kg', p: { baz: 2408, d1: 3800, ara: 3600, mega: 3900 }, ok: [], etapa: 'Hidratante para toda la familia' },
  { n: 'Melón', e: '🍈', cat: 'Frutas', u: 'kg', p: { baz: 1988, d1: 3900, ara: 3700, mega: 4200 }, ok: [], etapa: 'Desde 6 meses, raspado o en puré' },
  { n: 'Mandarina', e: '🍊', cat: 'Frutas', u: 'kg', p: { baz: 5631, d1: 6900, ara: 6500, mega: 7500 }, ok: [], etapa: 'En gajos sin semilla desde 12 meses' },
  { n: 'Aguacate', e: '🥑', cat: 'Frutas', u: 'kg', p: { baz: 8000, d1: 9900, ara: 9500, mega: 10900 }, ok: [], etapa: 'Desde 6 meses, machacado · grasa saludable' },
  { n: 'Níspero', e: '🟤', cat: 'Frutas', u: 'kg', p: { baz: 4500, d1: null, ara: null, mega: 6900 }, ok: [], bazEst: true, etapa: 'Fruta local, sin semillas y machacada' },
  { n: 'Zapote', e: '🧡', cat: 'Frutas', u: 'kg', p: { baz: 3500, d1: null, ara: null, mega: 5900 }, ok: [], bazEst: true, etapa: 'Fruta local, en puré o jugo sin azúcar' },
  { n: 'Tomate de árbol', e: '🍅', cat: 'Frutas', u: 'kg', p: { baz: 5278, d1: 7500, ara: 7200, mega: 8200 }, ok: [], etapa: 'Jugo sin azúcar · vitamina C' },
  { n: 'Mora', e: '🫐', cat: 'Frutas', u: 'kg', p: { baz: 6367, d1: 9900, ara: 9500, mega: 10900 }, ok: [], etapa: 'Jugo colado sin azúcar' },
  { n: 'Fresa', e: '🍓', cat: 'Frutas', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 15000 }, ok: ['mega'], etapa: 'Lavada y en trozos pequeños · vitamina C' },
  { n: 'Kiwi', e: '🥝', cat: 'Frutas', u: 'kg', p: { baz: null, d1: 20000, ara: null, mega: 19500 }, ok: ['d1', 'mega'], etapa: 'Pelado y en trozos · vitamina C' },
  { n: 'Arándanos', e: '🫐', cat: 'Frutas', u: 'kg', p: { baz: null, d1: 52000, ara: null, mega: 61800 }, ok: ['d1', 'mega'], etapa: 'Partidos o aplastados para niños pequeños' },

  // ===== Verduras =====
  { n: 'Zanahoria', e: '🥕', cat: 'Verduras', u: 'kg', p: { baz: 744, d1: 2500, ara: 2300, mega: 2800 }, ok: [], etapa: 'Desde 6 meses (puré)' },
  { n: 'Ahuyama', e: '🎃', cat: 'Verduras', u: 'kg', p: { baz: 1667, d1: 3400, ara: 3200, mega: 3600 }, ok: [], etapa: 'Desde 6 meses (crema)' },
  { n: 'Tomate chonto', e: '🍅', cat: 'Verduras', u: 'kg', p: { baz: 4817, d1: 6500, ara: 6200, mega: 7900 }, ok: ['mega'], etapa: 'Vitamina C para el hierro' },
  { n: 'Espinaca', e: '🥬', cat: 'Verduras', u: 'kg', p: { baz: 6889, d1: 10500, ara: 9900, mega: 11500 }, ok: [], etapa: 'Hierro no hemínico' },
  { n: 'Cebolla cabezona blanca', e: '🧅', cat: 'Verduras', u: 'kg', p: { baz: 2408, d1: 6500, ara: 6200, mega: 7900 }, ok: ['mega'], etapa: 'Para dar sabor sin sal' },
  { n: 'Cebolla larga (junca)', e: '🌱', cat: 'Verduras', u: 'kg', p: { baz: 2500, d1: 8000, ara: 4200, mega: 10900 }, ok: ['mega'], etapa: 'Guisos y caldos caseros' },
  { n: 'Cebollín', e: '🌿', cat: 'Verduras', u: 'kg', p: { baz: 6333, d1: null, ara: 9500, mega: 10900 }, ok: [], etapa: 'Aromático, picado fino' },
  { n: 'Pimentón', e: '🫑', cat: 'Verduras', u: 'kg', p: { baz: 4896, d1: 8900, ara: 8500, mega: 9500 }, ok: [], etapa: 'Rico en vitamina C' },
  { n: 'Apio', e: '🥬', cat: 'Verduras', u: 'kg', p: { baz: 1967, d1: null, ara: 4500, mega: 4900 }, ok: [], etapa: 'Para caldos y sopas' },
  { n: 'Ajo', e: '🧄', cat: 'Verduras', u: 'kg', p: { baz: 5858, d1: 14000, ara: 13500, mega: 15900 }, ok: [], etapa: 'Sazón natural en lugar de cubitos' },
  { n: 'Cilantro', e: '🌿', cat: 'Verduras', u: 'kg', p: { baz: 11500, d1: 15800, ara: 16000, mega: 18000 }, ok: [], etapa: 'Aromático, picado fino' },
  { n: 'Cebolla cabezona roja', e: '🧅', cat: 'Verduras', u: 'kg', p: { baz: 2000, d1: 4400, ara: 3200, mega: 5900 }, ok: ['d1', 'ara', 'mega'], etapa: 'Para dar sabor sin sal' },
  { n: 'Habichuela', e: '🫛', cat: 'Verduras', u: 'kg', p: { baz: 6000, d1: null, ara: null, mega: 6900 }, ok: ['mega'], etapa: 'Cocida hasta que esté blanda y picada' },
  { n: 'Brócoli', e: '🥦', cat: 'Verduras', u: 'kg', p: { baz: null, d1: 14000, ara: 16000, mega: 9800 }, ok: ['d1', 'ara', 'mega'], etapa: 'Al vapor y en trozos pequeños' },

  // ===== Tubérculos y plátanos =====
  { n: 'Papa', e: '🥔', cat: 'Tubérculos', u: 'kg', p: { baz: 2324, d1: 4000, ara: 3800, mega: 4300 }, ok: [], etapa: 'Desde 6 meses (puré)' },
  { n: 'Yuca', e: '🌿', cat: 'Tubérculos', u: 'kg', p: { baz: 2875, d1: 4400, ara: 4200, mega: 4300 }, ok: [], etapa: 'Bien cocida y machacada' },
  { n: 'Plátano hartón verde', e: '🍌', cat: 'Tubérculos', u: 'kg', p: { baz: 3375, d1: 5000, ara: 4800, mega: 5200 }, ok: [], etapa: 'Sopas y purés' },
  { n: 'Ñame criollo', e: '🍠', cat: 'Tubérculos', u: 'kg', p: { baz: 3248, d1: 5400, ara: 5200, mega: 5300 }, ok: [], etapa: 'Típico del Caribe, ideal en sopas' },
  { n: 'Batata', e: '🍠', cat: 'Tubérculos', u: 'kg', p: { baz: 2500, d1: null, ara: 4500, mega: 4900 }, ok: [], bazEst: true, etapa: 'Desde 6 meses, puré naturalmente dulce' },
  { n: 'Plátano maduro', e: '🍌', cat: 'Tubérculos', u: 'kg', p: { baz: 6100, d1: null, ara: null, mega: 6400 }, ok: ['mega'], etapa: 'Cocido y machacado · dulzor natural' },

  // ===== Granos y cereales =====
  { n: 'Arroz', e: '🍚', cat: 'Granos', u: 'kg', p: { baz: 3378, d1: 3900, ara: 3800, mega: 3300 }, ok: ['d1', 'mega'], etapa: 'Desde 6 meses (machacado)' },
  { n: 'Lenteja', e: '🟤', cat: 'Granos', u: 'kg', p: { baz: 4875, d1: 3180, ara: 5700, mega: 6100 }, ok: ['d1', 'ara', 'mega'], etapa: 'Hierro no hemínico' },
  { n: 'Fríjol cabeza negra', e: '🫘', cat: 'Granos', u: 'kg', p: { baz: 4750, d1: 7200, ara: 7000, mega: 7900 }, ok: [], etapa: 'Hierro no hemínico' },
  { n: 'Fríjol rojo (Zaragoza)', e: '🫘', cat: 'Granos', u: 'kg', p: { baz: 7525, d1: 8900, ara: 8600, mega: 9900 }, ok: [], etapa: 'Machacado desde 6 meses · hierro' },
  { n: 'Arveja seca', e: '🟢', cat: 'Granos', u: 'kg', p: { baz: 4450, d1: 5800, ara: 5600, mega: 6500 }, ok: [], etapa: 'En crema o sopa · proteína vegetal' },
  { n: 'Mazorca (chócolo)', e: '🌽', cat: 'Granos', u: 'kg', p: { baz: 1708, d1: 3900, ara: 3600, mega: 4200 }, ok: [], etapa: 'Desgranada y molida o en sopa' },
  { n: 'Maíz blanco trillado', e: '🌽', cat: 'Granos', u: 'kg', p: { baz: 2781, d1: 4000, ara: 4200, mega: 4900 }, ok: [], etapa: 'Mazamorra y peto' },
  { n: 'Harina de maíz precocida', e: '🌽', cat: 'Granos', u: 'kg', p: { baz: 3479, d1: 4200, ara: 4100, mega: 4500 }, ok: [], etapa: 'Arepas para niños y escolares' },
  { n: 'Pasta', e: '🍝', cat: 'Granos', u: 'kg', p: { baz: 6500, d1: 5800, ara: 5600, mega: 7200 }, ok: [], etapa: 'Bien cocida y picada desde 9 meses' },
  { n: 'Avena en hojuelas', e: '🥣', cat: 'Granos', u: 'kg', p: { baz: 10104, d1: 9800, ara: 9900, mega: 11200 }, ok: [], etapa: 'Coladas sin azúcar añadida' },
  { n: 'Garbanzo', e: '🫘', cat: 'Granos', u: 'kg', p: { baz: 2800, d1: 5400, ara: 6000, mega: 5580 }, ok: ['d1', 'ara', 'mega'], etapa: 'Remojado y bien cocido · proteína vegetal' },

  // ===== Proteínas =====
  { n: 'Huevo rojo A', e: '🥚', cat: 'Proteínas', u: 'cubeta x30', p: { baz: 14820, d1: 11990, ara: 11500, mega: 15900 }, ok: ['d1'], etapa: 'Empieza por la yema' },
  { n: 'Muslo / contramuslo de pollo', e: '🍗', cat: 'Proteínas', u: 'kg', p: { baz: 6650, d1: 11900, ara: 7600, mega: 8390 }, ok: ['ara', 'mega'], etapa: 'Hierro hemínico' },
  { n: 'Pollo entero', e: '🐔', cat: 'Proteínas', u: 'kg', p: { baz: 8850, d1: 10500, ara: 9900, mega: 8444 }, ok: ['mega'], etapa: 'Hierro hemínico' },
  { n: 'Pechuga de pollo', e: '🍗', cat: 'Proteínas', u: 'kg', p: { baz: 13000, d1: 14500, ara: 12900, mega: 13572 }, ok: ['mega'], etapa: 'Triturada o desmechada según la edad' },
  { n: 'Pata de pollo', e: '🐾', cat: 'Proteínas', u: 'kg', p: { baz: 4000, d1: null, ara: 5500, mega: 5900 }, ok: [], bazEst: true, etapa: 'Da sabor al caldo; no reemplaza la carne' },
  { n: 'Carne de cerdo (pernil)', e: '🐖', cat: 'Proteínas', u: 'kg', p: { baz: 16750, d1: 19900, ara: 18900, mega: 21900 }, ok: [], etapa: 'Magra, bien cocida y molida' },
  { n: 'Carne de res (bola)', e: '🥩', cat: 'Proteínas', u: 'kg', p: { baz: 32097, d1: 36000, ara: 35500, mega: 37900 }, ok: [], etapa: 'Molida desde 6–8 meses' },
  { n: 'Pescado basa', e: '🐟', cat: 'Proteínas', u: 'kg', p: { baz: 9100, d1: 12900, ara: 12500, mega: 13900 }, ok: [], etapa: 'Sin espinas, fácil para niños' },
  { n: 'Mojarra lora', e: '🐠', cat: 'Proteínas', u: 'kg', p: { baz: 11000, d1: null, ara: 15500, mega: 15900 }, ok: [], etapa: 'Retira bien las espinas' },
  { n: 'Bocachico', e: '🐟', cat: 'Proteínas', u: 'kg', p: { baz: 13500, d1: null, ara: null, mega: 16900 }, ok: [], etapa: 'Pescado de río típico · muchas espinas' },
  { n: 'Hígado de res', e: '🥩', cat: 'Proteínas', u: 'kg', p: { baz: 8000, d1: null, ara: null, mega: 10600 }, ok: ['mega'], etapa: 'Muy rico en hierro · siempre bien cocido' },

  // ===== Lácteos =====
  { n: 'Leche entera', e: '🥛', cat: 'Lácteos', u: 'litro', p: { baz: null, d1: 3900, ara: 3800, mega: 4500 }, ok: [], etapa: 'Leche de vaca como bebida desde 12 meses' },
  { n: 'Yogurt natural', e: '🥣', cat: 'Lácteos', u: 'litro', p: { baz: null, d1: 7900, ara: 7500, mega: 9500 }, ok: [], etapa: 'Sin azúcar · útil desde el primer año' },
  { n: 'Mantequilla', e: '🧈', cat: 'Lácteos', u: '250 g', p: { baz: null, d1: 6500, ara: 6300, mega: 7900 }, ok: [], etapa: 'En pequeñas cantidades' },
  { n: 'Queso costeño', e: '🧀', cat: 'Lácteos', u: 'kg', p: { baz: 22000, d1: 26000, ara: 25500, mega: 27900 }, ok: [], etapa: 'Muy salado: no apto para bebés' }
];


/* ===========================================================
   3. Utilidades
   =========================================================== */
const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const etiqueta = k => tiendas.find(t => t.k === k)?.label ?? '—';
const normalizar = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/** Reinicia una animación CSS quitando y volviendo a poner la clase. */
function reanimar(el, clase) {
  el.classList.remove(clase);
  void el.offsetWidth;
  el.classList.add(clase);
}

/** Calcula, para cada alimento, la tienda más barata, el súper más barato y el ahorro. */
alimentos.forEach(a => {
  const disponibles = tiendas.map(t => t.k).filter(k => a.p[k] != null);
  const valores = disponibles.map(k => a.p[k]);
  a.min = Math.min(...valores);
  a.mejor = disponibles.find(k => a.p[k] === a.min);
  a.ahorro = Math.round(((Math.max(...valores) - a.min) / Math.max(...valores)) * 100);

  const sups = supers.filter(k => a.p[k] != null);
  if (sups.length) {
    a.minSuper = Math.min(...sups.map(k => a.p[k]));
    a.mejorSuper = sups.find(k => a.p[k] === a.minSuper);
  } else {
    a.minSuper = null;
    a.mejorSuper = null;
  }
});


/* ===========================================================
   4. Tabla de precios
   =========================================================== */
(function initTablaPrecios() {
  const tbody = document.getElementById('tbody');
  const search = document.getElementById('search');
  const sortSel = document.getElementById('sort');
  const filtersBox = document.getElementById('filters');
  const emptyMsg = document.getElementById('emptyMsg');
  if (!tbody || !search) return;

  let categoria = 'Todos';

  // Botones de filtro por categoría
  ['Todos', ...new Set(alimentos.map(a => a.cat))].forEach(c => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'filter' + (c === 'Todos' ? ' active' : '');
    b.textContent = c;
    b.addEventListener('click', () => {
      categoria = c;
      filtersBox.querySelectorAll('.filter').forEach(f => f.classList.toggle('active', f === b));
      render();
    });
    filtersBox.appendChild(b);
  });

  function celdaPrecio(a, k) {
    const label = etiqueta(k);
    const v = a.p[k];
    if (v == null) return `<td class="price na" data-label="${label}">—</td>`;
    const verificado = (k === 'baz' && !a.bazEst) || a.ok.includes(k);
    const marca = verificado
      ? '<b class="mk ok" title="Precio consultado">✓</b>'
      : '<b class="mk est" title="Precio estimado">≈</b>';
    const best = a.mejor === k ? ' best' : '';
    return `<td class="price${best}" data-label="${label}">${cop.format(v)}${marca}</td>`;
  }

  function celdaSuper(a) {
    if (!a.mejorSuper) return '<td data-label="Súper más barato">—</td>';
    return `
      <td data-label="Súper más barato">
        <span class="badge super">${etiqueta(a.mejorSuper)}</span>
        <span class="save-small">${cop.format(a.minSuper)}</span>
      </td>`;
  }

  function render() {
    const q = normalizar(search.value.trim());
    const lista = alimentos.filter(a =>
      (categoria === 'Todos' || a.cat === categoria) && normalizar(a.n).includes(q)
    );

    const orden = sortSel.value;
    lista.sort((x, y) => {
      if (orden === 'precio') return x.min - y.min;
      if (orden === 'ahorro') return y.ahorro - x.ahorro;
      return x.n.localeCompare(y.n, 'es');
    });

    tbody.innerHTML = lista.map(a => `
      <tr>
        <td><div class="food"><span class="food-emoji">${a.e}</span><div>${a.n}<em>${a.etapa}</em></div></div></td>
        <td data-label="Unidad">${a.u}</td>
        ${tiendas.map(t => celdaPrecio(a, t.k)).join('')}
        <td data-label="Más barato en">
          <span class="badge">${etiqueta(a.mejor)}</span>
          <span class="save-small">ahorra hasta ${a.ahorro}%</span>
        </td>
        ${celdaSuper(a)}
      </tr>`).join('');

    emptyMsg.hidden = lista.length > 0;
  }

  search.addEventListener('input', render);
  sortSel.addEventListener('change', render);
  render();
})();

/* ===========================================================
   4b. Costo de los platos (Comer con poco)
   -----------------------------------------------------------
   Cada ingrediente puede ser:
   - { ref, cant, txt }: se calcula con el precio más bajo de la tabla.
     ref = nombre exacto en `alimentos`; cant = cantidad en la unidad
     de la tabla (kg, litro o cubeta x30).
   - { precio, txt }: precio fijo de referencia (se compra por unidad).
   Las tarjetas se ordenan solas de menor a mayor costo.
   =========================================================== */
const platosCosto = [
  {
    etapa: '6 a 8 meses', nombre: 'Crema de ahuyama con pollo', items: [
      { ref: 'Ahuyama', cant: 0.5, txt: 'Ahuyama · 1 libra' },
      { ref: 'Pechuga de pollo', cant: 0.25, txt: 'Pechuga de pollo · 250 g' }
    ]
  },
  {
    etapa: '9 a 11 meses', nombre: 'Huevo revuelto suave con papa y espinaca', items: [
      { ref: 'Huevo rojo A', cant: 1 / 30, txt: 'Huevo · 1 unidad' },
      { ref: 'Papa', cant: 0.5, txt: 'Papa · 1 libra' },
      { ref: 'Espinaca', cant: 0.5, txt: 'Espinaca · 1 libra' }
    ]
  },
  {
    etapa: '12 a 23 meses', nombre: 'Arroz con pollo, habichuela y zanahoria', items: [
      { ref: 'Arroz', cant: 0.5, txt: 'Arroz · 1 libra' },
      { ref: 'Pollo entero', cant: 0.5, txt: 'Pollo · 1 libra' },
      { precio: 1000, txt: 'Zanahoria · 1 unidad' },
      { precio: 1500, txt: 'Habichuela' },
      { precio: 1000, txt: 'Cebolla · 1 unidad' },
      { precio: 1000, txt: 'Tomate · 1 unidad' }
    ]
  },
  {
    etapa: '12 a 23 meses', nombre: 'Pescado guisado con arroz y brócoli', items: [
      { ref: 'Pescado basa', cant: 0.5, txt: 'Pescado blanco · 1 libra' },
      { ref: 'Arroz', cant: 0.5, txt: 'Arroz · 1 libra' },
      { ref: 'Brócoli', cant: 0.5, txt: 'Brócoli · 1 libra' },
      { precio: 1000, txt: 'Tomate · 1 unidad' },
      { precio: 1000, txt: 'Cebolla · 1 unidad' }
    ]
  },
  {
    etapa: 'Niñez', nombre: 'Cayeye con queso costeño bajo en sal y huevo cocido', items: [
      { precio: 800, txt: 'Guineo verde · 1 unidad' },
      { ref: 'Queso costeño', cant: 0.25, txt: 'Queso costeño · 250 g' },
      { ref: 'Huevo rojo A', cant: 1 / 30, txt: 'Huevo · 1 unidad' }
    ]
  },
  {
    etapa: 'Niñez', nombre: 'Carne guisada con arroz, fríjol cabeza negra y ensalada', items: [
      { ref: 'Carne de res (bola)', cant: 0.25, txt: 'Carne de res magra · 250 g' },
      { ref: 'Arroz', cant: 0.5, txt: 'Arroz · 1 libra' },
      { ref: 'Fríjol cabeza negra', cant: 0.5, txt: 'Fríjol cabeza negra · 1 libra' },
      { precio: 1000, txt: 'Tomate · 1 unidad' },
      { precio: 1000, txt: 'Cebolla · 1 unidad' },
      { precio: 1000, txt: 'Ajo · 1 unidad' },
      { precio: 1000, txt: 'Zanahoria · 1 unidad' },
      { precio: 1000, txt: 'Ají dulce · 1 unidad' },
      { precio: 1000, txt: 'Repollo · 1 unidad' },
      { precio: 7000, txt: 'Aguacate · 1 unidad' }
    ]
  },
  {
    etapa: 'Adolescencia', nombre: 'Avena con banano', items: [
      { ref: 'Avena en hojuelas', cant: 0.2, txt: 'Avena en hojuelas · 200 g' },
      { ref: 'Leche entera', cant: 0.9, txt: 'Leche entera · 900 ml' },
      { precio: 600, txt: 'Banano · 1 unidad' },
      { precio: 1400, txt: 'Canela en polvo · 1 bolsita' }
    ]
  },
  {
    etapa: 'Adolescencia', nombre: 'Hígado encebollado con yuca', items: [
      { ref: 'Hígado de res', cant: 0.5, txt: 'Hígado de res · 1 libra' },
      { ref: 'Yuca', cant: 0.5, txt: 'Yuca · 1 libra' },
      { precio: 1000, txt: 'Cebolla · 1 unidad' },
      { precio: 1000, txt: 'Tomate · 1 unidad' },
      { precio: 1000, txt: 'Ajo · 1 unidad' }
    ]
  }
];

(function initCostos() {
  const caja = document.getElementById('costos');
  if (!caja) return;

  function precioDe(it) {
    if (it.precio != null) return it.precio;
    const a = alimentos.find(x => x.n === it.ref);
    if (!a) {
      console.warn('Costos: este ingrediente no está en la tabla →', it.ref);
      return 0;
    }
    return a.min * it.cant;
  }

  const platos = platosCosto
    .map(p => {
      const items = p.items.map(it => ({ ...it, valor: Math.round(precioDe(it)) }));
      return { ...p, items, total: items.reduce((s, it) => s + it.valor, 0) };
    })
    .sort((x, y) => x.total - y.total);

  caja.innerHTML = platos.map(p => `
    <article class="card costo">
      <small class="dish-time">${p.etapa}</small>
      <p class="big">≈ ${cop.format(Math.round(p.total / 1000) * 1000)}</p>
      <h4>${p.nombre}</h4>
      <ul class="costo-lista">
        ${p.items.map(it => `
          <li>
            <span>${it.txt}${it.ref ? '' : ' <b class="mk est" title="Precio de referencia por unidad">≈</b>'}</span>
            <span>${cop.format(it.valor)}</span>
          </li>`).join('')}
      </ul>
    </article>`).join('');
})();


/* ===========================================================
   5. Pestañas (stepper, subpestañas y edades)
   =========================================================== */
document.querySelectorAll('[data-tabs]').forEach(grupo => {
  const botones = grupo.querySelectorAll(':scope > button');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => {
        const activo = b === btn;
        b.classList.toggle('active', activo);
        b.setAttribute('aria-selected', String(activo));
        document.getElementById(b.dataset.panel)?.classList.toggle('active', activo);
      });
    });
  });
});


/* ===========================================================
   6. Slider de ejes
   =========================================================== */
(function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider) return;

  const track = document.getElementById('sliderTrack');
  const viewport = slider.querySelector('.slider-viewport');
  const slides = [...track.children];
  const dotsBox = document.getElementById('sliderDots');
  const bar = document.getElementById('sliderBar');
  const DURACION = 7000;
  let index = 0, timer = null, inicioBarra = 0, rafId = null;

  // Puntos de navegación
  const dots = slides.map((_, i) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.className = 'slider-dot';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Ir al eje ${i + 1}`);
    d.addEventListener('click', () => { irA(i); iniciar(); });
    dotsBox.appendChild(d);
    return d;
  });

  function irA(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === index);
      s.setAttribute('aria-hidden', String(n !== index));
    });
    dots.forEach((d, n) => {
      d.classList.toggle('active', n === index);
      d.setAttribute('aria-selected', String(n === index));
    });
  }

  // Avance automático con barra de progreso
  function animarBarra(t) {
    const p = Math.min((t - inicioBarra) / DURACION, 1);
    bar.style.width = p * 100 + '%';
    if (p < 1) rafId = requestAnimationFrame(animarBarra);
  }
  function iniciar() {
    detener();
    if (MENOS_MOVIMIENTO) return;
    inicioBarra = performance.now();
    rafId = requestAnimationFrame(animarBarra);
    timer = setTimeout(() => { irA(index + 1); iniciar(); }, DURACION);
  }
  function detener() {
    clearTimeout(timer);
    cancelAnimationFrame(rafId);
    bar.style.width = '0';
  }

  // Flechas
  document.getElementById('prevSlide').addEventListener('click', () => { irA(index - 1); iniciar(); });
  document.getElementById('nextSlide').addEventListener('click', () => { irA(index + 1); iniciar(); });

  // Pausa al pasar el mouse o enfocar
  slider.addEventListener('mouseenter', detener);
  slider.addEventListener('mouseleave', iniciar);
  slider.addEventListener('focusin', detener);
  slider.addEventListener('focusout', iniciar);

  // Teclado
  slider.tabIndex = 0;
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') irA(index - 1);
    if (e.key === 'ArrowRight') irA(index + 1);
  });

  // Deslizar con el dedo o arrastrar con el mouse
  let xInicio = 0, arrastrando = false, ancho = 0;

  viewport.addEventListener('pointerdown', e => {
    arrastrando = true;
    xInicio = e.clientX;
    ancho = viewport.offsetWidth;
    track.classList.add('dragging');
    detener();
  });
  window.addEventListener('pointermove', e => {
    if (!arrastrando) return;
    const dx = e.clientX - xInicio;
    track.style.transform = `translateX(calc(-${index * 100}% + ${dx}px))`;
  });
  window.addEventListener('pointerup', e => {
    if (!arrastrando) return;
    arrastrando = false;
    track.classList.remove('dragging');
    const dx = e.clientX - xInicio;
    irA(Math.abs(dx) > ancho * 0.18 ? index + (dx < 0 ? 1 : -1) : index);
    iniciar();
  });

  irA(0);
  iniciar();
})();


/* ===========================================================
   7. Visor de imágenes
   =========================================================== */
(function initLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCount = document.getElementById('lbCount');
  const btnPrev = document.getElementById('lbPrev');
  const btnNext = document.getElementById('lbNext');
  let grupo = [], actual = 0, origen = null;

  function mostrar(n) {
    actual = (n + grupo.length) % grupo.length;
    const img = grupo[actual];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    const texto = img.closest('figure')?.querySelector('figcaption');
    lbCaption.textContent = texto ? texto.textContent.trim() : img.alt;
    lbCount.textContent = `${actual + 1} de ${grupo.length}`;
    const varias = grupo.length > 1;
    btnPrev.hidden = btnNext.hidden = lbCount.hidden = !varias;
  }

  function abrir(imagenes, img, elementoOrigen) {
    grupo = imagenes;
    origen = elementoOrigen;
    mostrar(grupo.indexOf(img));
    lb.showModal();
    document.body.classList.add('modal-open');
  }

  /** Hace que un elemento se pueda activar con clic, Enter o espacio. */
  function hacerAmpliable(el, alt, alAbrir) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', 'Ampliar imagen: ' + alt);
    el.addEventListener('click', alAbrir);
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alAbrir(); }
    });
  }

  // Galerías: se navega entre las imágenes del mismo grupo
  document.querySelectorAll('.galeria').forEach(galeria => {
    const imgs = [...galeria.querySelectorAll('.bstep-img img, .tstep-img img')];
    imgs.forEach(img => {
      const caja = img.parentElement;
      hacerAmpliable(caja, img.alt, () => {
        if (caja.classList.contains('sin-img')) return;   // la imagen no cargó
        const visibles = imgs.filter(i => !i.parentElement.classList.contains('sin-img'));
        abrir(visibles, img, caja);
      });
    });
  });

  // Imágenes sueltas: se abren solas, sin flechas
  document.querySelectorAll('img.ampliable').forEach(img => {
    hacerAmpliable(img, img.alt, () => abrir([img], img, img));
  });

  btnPrev.addEventListener('click', () => mostrar(actual - 1));
  btnNext.addEventListener('click', () => mostrar(actual + 1));
  document.getElementById('lbClose').addEventListener('click', () => lb.close());

  // Cerrar al tocar fuera de la imagen
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target.classList.contains('lb-figure')) lb.close();
  });

  // Flechas del teclado (Esc ya lo maneja <dialog>)
  lb.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') mostrar(actual - 1);
    if (e.key === 'ArrowRight') mostrar(actual + 1);
  });

  lb.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lbImg.removeAttribute('src');
    origen?.focus();
  });
})();


/* ===========================================================
   8. Recetas (una a la vez)
   -----------------------------------------------------------
   Devuelve abrirReceta(plato, focoAlCerrar) para usarla desde
   otras partes de la página, como la portada.
   =========================================================== */
const abrirReceta = (function initRecetas() {
  const modal = document.getElementById('recipeModal');
  if (!modal) return () => { };

  const titulo = document.getElementById('recipeModalTitle');
  const cuerpo = document.getElementById('recipeModalBody');
  let origen = null;

  function abrir(plato, focoAlCerrar = plato) {
    const receta = plato.querySelector('template.receta');
    if (!receta || modal.open) return;

    origen = focoAlCerrar;
    const emoji = plato.querySelector('span').textContent;
    const nombre = plato.querySelector('.dish-name').textContent;
    titulo.textContent = `${emoji} ${nombre}`;
    cuerpo.replaceChildren(receta.content.cloneNode(true));
    modal.showModal();
    document.body.classList.add('modal-open');
    cuerpo.scrollTop = 0;
  }

  document.querySelectorAll('.dish').forEach(plato => {
    if (plato.querySelector('template.receta')) {
      plato.addEventListener('click', () => abrir(plato));
    }
  });

  const cerrar = () => modal.close();
  document.getElementById('recipeClose').addEventListener('click', cerrar);
  document.getElementById('recipeOk').addEventListener('click', cerrar);
  modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    origen?.focus();
  });

  return abrir;
})();


/* ===========================================================
   9. Portada
   =========================================================== */
(function initPortada() {
  // Buscador: llena la búsqueda de la tabla de precios y baja hasta ella
  const form = document.getElementById('portadaBuscar');
  const search = document.getElementById('search');
  if (form && search) {
    const campo = document.getElementById('portadaBuscarInput');
    form.addEventListener('submit', e => {
      e.preventDefault();
      search.value = campo.value.trim();
      search.dispatchEvent(new Event('input'));
      document.getElementById('precios').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Atajos a las etapas: abren la pestaña correspondiente del stepper
  document.querySelectorAll('.etapas-botones [data-abre]').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelector(`.stepper > button[data-panel="${b.dataset.abre}"]`)?.click();
      document.getElementById('etapas').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Receta del día: cambia cada día; "Otra" elige una al azar
  const caja = document.querySelector('.b-receta');
  const platos = [...document.querySelectorAll('.dish')].filter(d => d.querySelector('template.receta'));
  if (!caja || !platos.length) return;

  const edades = {
    'p-6-8': '6 a 8 meses',
    'p-9-11': '9 a 11 meses',
    'p-12-23': '12 a 23 meses',
    'p-ninez': 'Niñez',
    'p-adolescencia': 'Adolescencia'
  };
  const elEmoji = document.getElementById('rdEmoji');
  const elNombre = document.getElementById('rdNombre');
  const elEdad = document.getElementById('rdEdad');
  const btnVer = document.getElementById('rdVer');
  const btnOtra = document.getElementById('rdOtra');
  let actual = 0;

  function mostrar(i) {
    actual = (i + platos.length) % platos.length;
    const p = platos[actual];
    elEmoji.textContent = p.querySelector('span').textContent;
    elNombre.textContent = p.querySelector('.dish-name').textContent;
    const panel = p.closest('.panel[id]');
    const momento = p.querySelector('.dish-time')?.textContent;
    elEdad.textContent = [edades[panel?.id], momento].filter(Boolean).join(' · ');
    reanimar(caja, 'cambia');
  }

  const hoy = new Date();
  const diaDelAnio = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 0)) / 864e5);
  mostrar(diaDelAnio);

  // Al cerrar la receta, el foco vuelve al botón de la portada
  btnVer.addEventListener('click', () => abrirReceta(platos[actual], btnVer));
  btnOtra.addEventListener('click', () => {
    let n;
    do { n = Math.floor(Math.random() * platos.length); } while (platos.length > 1 && n === actual);
    mostrar(n);
  });
})();


/* ===========================================================
   10. Menú móvil
   =========================================================== */
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

function cerrarMenu() {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

menuBtn.addEventListener('click', () => {
  const abierto = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(abierto));
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenu));


/* ===========================================================
   11. Scroll: progreso, botón arriba y enlace activo
   =========================================================== */
(function initScroll() {
  const progress = document.getElementById('progress');
  const toTop = document.getElementById('toTop');
  const secciones = [...document.querySelectorAll('main section[id]')];
  const links = [...nav.querySelectorAll('a')];

  function actualizar() {
    const h = document.documentElement;
    progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
    toTop.classList.toggle('show', h.scrollTop > 600);

    // Ignora las secciones ocultas (etapas no activas) y usa data-nav si la sección
    // pertenece a otro enlace del menú (las tres etapas resaltan "Etapas de vida")
    const actual = secciones
      .filter(s => s.offsetParent !== null && s.getBoundingClientRect().top < 140)
      .pop();
    const id = actual && (actual.dataset.nav || actual.id);
    links.forEach(l => l.classList.toggle('current', l.getAttribute('href') === '#' + id));
  }

  window.addEventListener('scroll', actualizar, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  actualizar();
})();


/* ===========================================================
   12. Aparición al hacer scroll
   =========================================================== */
(function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();


/* ===========================================================
   13. Respaldo de imágenes
   -----------------------------------------------------------
   - Pasos y tablas: muestran un emoji si la imagen no carga.
   - Logos del pie: se ocultan si la imagen no carga.
   =========================================================== */
document.querySelectorAll('.bstep-img img, .tstep-img img').forEach(img => {
  const usarEmoji = () => img.parentElement.classList.add('sin-img');
  if (img.complete && img.naturalWidth === 0) usarEmoji();
  else img.addEventListener('error', usarEmoji);
});

document.querySelectorAll('.footer-logos img, .b-aval img').forEach(img => {
  const ocultar = () => {
    img.hidden = true;
    const caja = img.parentElement;
    if ([...caja.querySelectorAll('img')].every(i => i.hidden)) caja.hidden = true;
  };
  if (img.complete && img.naturalWidth === 0) ocultar();
  else img.addEventListener('error', ocultar);
});