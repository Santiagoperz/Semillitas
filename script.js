/* ===========================================================
    Semillitas · Interacciones
   =========================================================== */

// ---------- Tiendas ----------
const tiendas = [
  { k: 'baz', label: 'Bazurto' },
  { k: 'd1', label: 'D1' },
  { k: 'ara', label: 'Ara' },
  { k: 'mega', label: 'Megatiendas' }
];
const supers = ['d1', 'ara', 'mega'];

// ---------- Datos de precios (COP) ----------
// p: precio por unidad en cada tienda (null = no disponible habitualmente)
// ok: tiendas con precio consultado. Bazurto es dato SIPSA, salvo si bazEst: true (estimado).
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
  { n: 'Kiwi', e: '🥝', cat: 'Frutas', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 19500 }, ok: ['mega'], etapa: 'Pelado y en trozos · vitamina C' },
  { n: 'Arándanos', e: '🫐', cat: 'Frutas', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 61800 }, ok: ['mega'], etapa: 'Partidos o aplastados para niños pequeños' },

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
  { n: 'Cebolla cabezona roja', e: '🧅', cat: 'Verduras', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 5900 }, ok: ['mega'], etapa: 'Para dar sabor sin sal' },
  { n: 'Habichuela', e: '🫛', cat: 'Verduras', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 6900 }, ok: ['mega'], etapa: 'Cocida hasta que esté blanda y picada' },
  { n: 'Brócoli', e: '🥦', cat: 'Verduras', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 9800 }, ok: ['mega'], etapa: 'Al vapor y en trozos pequeños' },

  // ===== Tubérculos y plátanos =====
  { n: 'Papa', e: '🥔', cat: 'Tubérculos', u: 'kg', p: { baz: 2324, d1: 4000, ara: 3800, mega: 4300 }, ok: [], etapa: 'Desde 6 meses (puré)' },
  { n: 'Yuca', e: '🌿', cat: 'Tubérculos', u: 'kg', p: { baz: 2875, d1: 4400, ara: 4200, mega: 4300 }, ok: [], etapa: 'Bien cocida y machacada' },
  { n: 'Plátano hartón verde', e: '🍌', cat: 'Tubérculos', u: 'kg', p: { baz: 3375, d1: 5000, ara: 4800, mega: 5200 }, ok: [], etapa: 'Sopas y purés' },
  { n: 'Ñame criollo', e: '🍠', cat: 'Tubérculos', u: 'kg', p: { baz: 3248, d1: 5400, ara: 5200, mega: 5300 }, ok: [], etapa: 'Típico del Caribe, ideal en sopas' },
  { n: 'Batata', e: '🍠', cat: 'Tubérculos', u: 'kg', p: { baz: 2500, d1: null, ara: 4500, mega: 4900 }, ok: [], bazEst: true, etapa: 'Desde 6 meses, puré naturalmente dulce' },
  { n: 'Plátano maduro', e: '🍌', cat: 'Tubérculos', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 6400 }, ok: ['mega'], etapa: 'Cocido y machacado · dulzor natural' },

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
  { n: 'Garbanzo',        e: '🫘', cat: 'Granos', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 5580 }, ok: ['mega'], etapa: 'Remojado y bien cocido · proteína vegetal' },
  
  // ===== Proteínas =====
  { n: 'Huevo rojo A', e: '🥚', cat: 'Proteínas', u: 'cubeta x30', p: { baz: 14820, d1: 11990, ara: 11500, mega: 15900 }, ok: ['d1'], etapa: 'Empieza por la yema' },
  { n: 'Muslo / contramuslo de pollo', e: '🍗', cat: 'Proteínas', u: 'kg', p: { baz: 6650, d1: 11900, ara: 7600, mega: 8390 }, ok: ['ara', 'mega'], etapa: 'Hierro hemínico' },
  { n: 'Pollo entero', e: '🐔', cat: 'Proteínas', u: 'kg', p: { baz: 8850, d1: 10500, ara: 9900, mega: 8444 }, ok: ['mega'], etapa: 'Hierro hemínico' },
  { n: 'Pechuga de pollo', e: '🍗', cat: 'Proteínas', u: 'kg', p: { baz: 13000, d1: 14500, ara: 12900, mega: 13572 }, ok: ['mega'], etapa: 'Desmechada desde 12 meses' },
  { n: 'Pata de pollo', e: '🐾', cat: 'Proteínas', u: 'kg', p: { baz: 4000, d1: null, ara: 5500, mega: 5900 }, ok: [], bazEst: true, etapa: 'Da sabor al caldo; no reemplaza la carne' },
  { n: 'Carne de cerdo (pernil)', e: '🐖', cat: 'Proteínas', u: 'kg', p: { baz: 16750, d1: 19900, ara: 18900, mega: 21900 }, ok: [], etapa: 'Magra, bien cocida y molida' },
  { n: 'Carne de res (bola)', e: '🥩', cat: 'Proteínas', u: 'kg', p: { baz: 32097, d1: 36000, ara: 35500, mega: 37900 }, ok: [], etapa: 'Molida desde 6–8 meses' },
  { n: 'Pescado basa', e: '🐟', cat: 'Proteínas', u: 'kg', p: { baz: 9100, d1: 12900, ara: 12500, mega: 13900 }, ok: [], etapa: 'Sin espinas, fácil para niños' },
  { n: 'Mojarra lora', e: '🐠', cat: 'Proteínas', u: 'kg', p: { baz: 11000, d1: null, ara: 15500, mega: 15900 }, ok: [], etapa: 'Retira bien las espinas' },
  { n: 'Bocachico', e: '🐟', cat: 'Proteínas', u: 'kg', p: { baz: 13500, d1: null, ara: null, mega: 16900 }, ok: [], etapa: 'Pescado de río típico · muchas espinas' },
  { n: 'Hígado de res', e: '🥩', cat: 'Proteínas', u: 'kg', p: { baz: null, d1: null, ara: null, mega: 10600 }, ok: ['mega'], etapa: 'Muy rico en hierro · siempre bien cocido' },
  // ===== Lácteos =====
  { n: 'Leche entera', e: '🥛', cat: 'Lácteos', u: 'litro', p: { baz: null, d1: 3900, ara: 3800, mega: 4500 }, ok: [], etapa: 'Leche de vaca como bebida desde 12 meses' },
  { n: 'Yogurt natural', e: '🥣', cat: 'Lácteos', u: 'litro', p: { baz: null, d1: 7900, ara: 7500, mega: 9500 }, ok: [], etapa: 'Sin azúcar · útil desde el primer año' },
  { n: 'Mantequilla', e: '🧈', cat: 'Lácteos', u: '250 g', p: { baz: null, d1: 6500, ara: 6300, mega: 7900 }, ok: [], etapa: 'En pequeñas cantidades' },
  { n: 'Queso costeño', e: '🧀', cat: 'Lácteos', u: 'kg', p: { baz: 22000, d1: 26000, ara: 25500, mega: 27900 }, ok: [], etapa: 'Muy salado: no apto para bebés' }
];

const cop = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const etiqueta = k => tiendas.find(t => t.k === k).label;

// Cálculos: más barato general, súper más barato y ahorro
alimentos.forEach(a => {
  const disponibles = tiendas.map(t => t.k).filter(k => a.p[k] != null);
  const valores = disponibles.map(k => a.p[k]);
  a.min = Math.min(...valores);
  const max = Math.max(...valores);
  a.mejor = disponibles.find(k => a.p[k] === a.min);
  a.ahorro = Math.round(((max - a.min) / max) * 100);

  const sups = supers.filter(k => a.p[k] != null);
  const minSup = Math.min(...sups.map(k => a.p[k]));
  a.mejorSuper = sups.find(k => a.p[k] === minSup);
  a.minSuper = minSup;
});

// ---------- Tabla ----------
const tbody = document.getElementById('tbody');
const search = document.getElementById('search');
const sortSel = document.getElementById('sort');
const filtersBox = document.getElementById('filters');
const emptyMsg = document.getElementById('emptyMsg');
let categoria = 'Todos';

['Todos', ...new Set(alimentos.map(a => a.cat))].forEach(c => {
  const b = document.createElement('button');
  b.className = 'filter' + (c === 'Todos' ? ' active' : '');
  b.textContent = c;
  b.addEventListener('click', () => {
    categoria = c;
    filtersBox.querySelectorAll('.filter').forEach(f => f.classList.toggle('active', f === b));
    renderTabla();
  });
  filtersBox.appendChild(b);
});

const normalizar = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function celdaPrecio(a, k) {
  const label = etiqueta(k);
  const v = a.p[k];
  if (v == null) return `<td class="price na" data-label="${label}">—</td>`;
  const verificado = (k === 'baz' && !a.bazEst) || a.ok.includes(k);
  const marca = verificado ? '<b class="mk ok" title="Precio consultado">✓</b>' : '<b class="mk est" title="Precio estimado">≈</b>';
  const best = a.mejor === k ? ' best' : '';
  return `<td class="price${best}" data-label="${label}">${cop.format(v)}${marca}</td>`;
}

function renderTabla() {
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
      <td data-label="Súper más barato">
        <span class="badge super">${etiqueta(a.mejorSuper)}</span>
        <span class="save-small">${cop.format(a.minSuper)}</span>
      </td>
    </tr>`).join('');

  emptyMsg.hidden = lista.length > 0;
}

search.addEventListener('input', renderTabla);
sortSel.addEventListener('change', renderTabla);
renderTabla();

// ---------- Pestañas genéricas (stepper, subpestañas, edades) ----------
document.querySelectorAll('[data-tabs]').forEach(grupo => {
  const botones = grupo.querySelectorAll(':scope > button');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => {
        const activo = b === btn;
        b.classList.toggle('active', activo);
        b.setAttribute('aria-selected', activo);
        document.getElementById(b.dataset.panel).classList.toggle('active', activo);
      });
    });
  });
});

// ---------- Slider de ejes ----------
(function initSlider() {
  const slider = document.getElementById('slider');
  if (!slider) return;

  const track = document.getElementById('sliderTrack');
  const slides = [...track.children];
  const dotsBox = document.getElementById('sliderDots');
  const bar = document.getElementById('sliderBar');
  const DURACION = 7000;
  let index = 0, timer = null, inicioBarra = 0, rafId = null;

  // Puntos
  const dots = slides.map((_, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Ir al eje ${i + 1}`);
    d.addEventListener('click', () => { irA(i); reiniciar(); });
    dotsBox.appendChild(d);
    return d;
  });

  // ---------- Visor de imágenes (galerías) ----------
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

    document.querySelectorAll('.galeria').forEach(galeria => {
      const imgs = [...galeria.querySelectorAll('.bstep-img img, .tstep-img img')];
      imgs.forEach(img => {
        const caja = img.parentElement;
        caja.tabIndex = 0;
        caja.setAttribute('role', 'button');
        caja.setAttribute('aria-label', 'Ampliar imagen: ' + img.alt);

        const abrir = () => {
          if (caja.classList.contains('sin-img')) return; // la imagen no cargó
          grupo = imgs.filter(i => !i.parentElement.classList.contains('sin-img'));
          origen = caja;
          mostrar(grupo.indexOf(img));
          lb.showModal();
          document.body.classList.add('modal-open');
        };
        caja.addEventListener('click', abrir);
        caja.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
        });
      });
    });
    // Imágenes sueltas (fuera de una galería): se abren solas, sin flechas
    document.querySelectorAll('img.ampliable').forEach(img => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Ampliar imagen: ' + img.alt);

      const abrir = () => {
        grupo = [img];
        origen = img;
        mostrar(0);
        lb.showModal();
        document.body.classList.add('modal-open');
      };
      img.addEventListener('click', abrir);
      img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
      });
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
      if (origen) origen.focus();
    });
  })();

  function irA(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === index);
      s.setAttribute('aria-hidden', n !== index);
    });
    dots.forEach((d, n) => {
      d.classList.toggle('active', n === index);
      d.setAttribute('aria-selected', n === index);
    });
  }

  // Autoplay con barra de progreso
  function animarBarra(t) {
    const p = Math.min((t - inicioBarra) / DURACION, 1);
    bar.style.width = p * 100 + '%';
    if (p < 1) rafId = requestAnimationFrame(animarBarra);
  }
  function iniciar() {
    detener();
    inicioBarra = performance.now();
    rafId = requestAnimationFrame(animarBarra);
    timer = setTimeout(() => { irA(index + 1); iniciar(); }, DURACION);
  }
  function detener() {
    clearTimeout(timer);
    cancelAnimationFrame(rafId);
    bar.style.width = '0';
  }
  function reiniciar() { iniciar(); }

  document.getElementById('prevSlide').addEventListener('click', () => { irA(index - 1); reiniciar(); });
  document.getElementById('nextSlide').addEventListener('click', () => { irA(index + 1); reiniciar(); });

  // Pausa al pasar el mouse o enfocar
  slider.addEventListener('mouseenter', detener);
  slider.addEventListener('mouseleave', iniciar);
  slider.addEventListener('focusin', detener);
  slider.addEventListener('focusout', iniciar);

  // Teclado
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { irA(index - 1); }
    if (e.key === 'ArrowRight') { irA(index + 1); }
  });

  // Deslizar con el dedo o arrastrar con el mouse
  let xInicio = 0, arrastrando = false, ancho = 0;
  const viewport = slider.querySelector('.slider-viewport');

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
    if (Math.abs(dx) > ancho * 0.18) irA(index + (dx < 0 ? 1 : -1));
    else irA(index);
    iniciar();
  });

  // Respeta a quienes prefieren menos movimiento
  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  irA(0);
  if (!sinMovimiento) iniciar();
})();

// ---------- Menú móvil ----------
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const abierto = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', abierto);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ---------- Barra de progreso, botón arriba y enlace activo ----------
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');
const secciones = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];

window.addEventListener('scroll', () => {
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
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Aparición al hacer scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Panel de recetas (una a la vez) ----------
(function initRecetas() {
  const modal = document.getElementById('recipeModal');
  if (!modal) return;
  const titulo = document.getElementById('recipeModalTitle');
  const cuerpo = document.getElementById('recipeModalBody');
  let origen = null;

  document.querySelectorAll('.dish').forEach(plato => {
    const receta = plato.querySelector('template.receta');
    if (!receta) return;
    plato.addEventListener('click', () => {
      if (modal.open) return;           // solo una receta a la vez
      origen = plato;
      const emoji = plato.querySelector('span').textContent;
      const nombre = plato.querySelector('.dish-name').textContent;
      titulo.textContent = `${emoji} ${nombre}`;
      cuerpo.innerHTML = '';
      cuerpo.appendChild(receta.content.cloneNode(true));
      modal.showModal();
      document.body.classList.add('modal-open');
      cuerpo.scrollTop = 0;
    });
  });

  const cerrar = () => modal.close();
  document.getElementById('recipeClose').addEventListener('click', cerrar);
  document.getElementById('recipeOk').addEventListener('click', cerrar);
  modal.addEventListener('click', e => { if (e.target === modal) cerrar(); });
  modal.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (origen) origen.focus();
  });
})();

// ---------- Respaldo con emoji si una imagen de pasos no carga ----------
document.querySelectorAll('.bstep-img img').forEach(img => {
  const usarEmoji = () => img.parentElement.classList.add('sin-img');
  if (img.complete && img.naturalWidth === 0) usarEmoji();
  else img.addEventListener('error', usarEmoji);
});