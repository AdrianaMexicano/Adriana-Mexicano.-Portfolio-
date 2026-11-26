// 1) Botones "Ver datos": abren y cierran el panel de cada proyecto
document.querySelectorAll('.data-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const abierto = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!abierto));
    btn.firstChild.textContent = abierto ? 'Ver datos' : 'Ocultar datos';
  });
});

// 2) Menú para celular
const menuBtn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const abierto = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(abierto));
  });
}

// 3) Copiar correo al portapapeles
const copyBtn = document.querySelector('.copy-mail');
const copyMsg = document.querySelector('.copy-msg');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.dataset.email);
      copyMsg.textContent = 'Correo copiado';
    } catch {
      copyMsg.textContent = 'No se pudo copiar. Escríbelo a mano: ' + copyBtn.dataset.email;
    }
    setTimeout(() => (copyMsg.textContent = ''), 3000);
  });
}

// 4) Avisos para proyectos que aún no tienen página (quita data-soon cuando exista)
const toast = document.querySelector('.toast');
let toastTimer;
document.querySelectorAll('[data-soon]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (!toast) return;
    toast.textContent = 'Este proyecto estará disponible pronto.';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  });
});

// 5) Barra de progreso de lectura (páginas de proyecto)
const bar = document.querySelector('.progress');
if (bar) {
  const actualizar = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
  };
  window.addEventListener('scroll', actualizar, { passive: true });
  actualizar();
}

// 6) Constelación que se enciende
const night = document.querySelector('.night');
const nightBtn = document.querySelector('.night-btn');
if (night && nightBtn) {
  night.querySelectorAll('.star').forEach((s, i) => s.style.setProperty('--i', i));
  nightBtn.addEventListener('click', () => {
    const encendida = night.classList.toggle('on');
    nightBtn.setAttribute('aria-pressed', String(encendida));
    nightBtn.textContent = encendida ? 'Apagar fibra' : 'Encender fibra';
  });
}

// 7) Galería con visor grande
const visor = document.querySelector('.lightbox');
if (visor) {
  const visorImg = visor.querySelector('img');
  document.querySelectorAll('.gallery img').forEach((img) => {
    img.tabIndex = 0;
    const abrir = () => {
      visorImg.src = img.src;
      visorImg.alt = img.alt;
      visor.showModal();
    };
    img.addEventListener('click', abrir);
    img.addEventListener('keydown', (e) => { if (e.key === 'Enter') abrir(); });
  });
  visor.querySelector('.lightbox-close').addEventListener('click', () => visor.close());
  visor.addEventListener('click', (e) => { if (e.target === visor) visor.close(); });
}

// 8) Los proyectos aparecen al bajar
if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      observador.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.project-item').forEach((p) => {
    p.classList.add('reveal');
    observador.observe(p);
  });
}

// 9) Ficha de datos: se abre al entrar a la página
const ficha = document.querySelector('.ficha');
if (ficha) {
  ficha.showModal();
  ficha.querySelector('.ficha-close').addEventListener('click', () => ficha.close());
  document.querySelector('.data-open')?.addEventListener('click', () => ficha.showModal());
}