function centrarTaller() {
  const slideShow = document.querySelector('.taller-slideShow');
  const primerTaller = slideShow?.querySelector('.taller-carrusel');
  if (!slideShow || !primerTaller) return;

  const tallerWidth = primerTaller.offsetWidth;
  const padding = Math.max(0, (window.innerWidth - tallerWidth) / 2);
  if (window.innerWidth > 900) {
    slideShow.style.scrollPaddingLeft = `${padding}px`; 
  }
  else{
    slideShow.style.scrollPaddingLeft = `0px`; 
  }// Para snap
  slideShow.scrollLeft = 0; // Opcional: vuelve al inicio al redimensionar
  // Si quieres usar padding-left en vez de scroll-padding-left:
  // slideShow.style.paddingLeft = `${padding}px`;
}

window.addEventListener('DOMContentLoaded', centrarTaller);
window.addEventListener('resize', centrarTaller);

function scrollToTaller(direction) {
  const slideShow = document.querySelector('.taller-slideShow');
  const talleres = Array.from(slideShow.querySelectorAll('.taller-carrusel'));
  if (!slideShow || talleres.length === 0) return;

  // Usa el ancho del primer expositor como referencia
  const tallerWidth = talleres[0].offsetWidth;
  // Desplaza el scroll horizontalmente
  slideShow.scrollBy({ left: tallerWidth * direction, behavior: 'smooth' });
}

function updateTallerNavButtons() {
  const slideShow = document.querySelector('.taller-slideShow');
  if (!slideShow) return;
  const talleres = Array.from(slideShow.querySelectorAll('.taller-carrusel'));
  const prevBtn = document.querySelector('.taller-prev');
  const nextBtn = document.querySelector('.taller-next');
  if (!talleres.length || !prevBtn || !nextBtn) return;

  // calcula el índice del elemento más cercano al borde izquierdo del contenedor
  const scrollLeft = slideShow.scrollLeft;
  let closestIndex = 0;
  let minDist = Infinity;
  talleres.forEach((t, i) => {
    const dist = Math.abs(t.offsetLeft - scrollLeft);
    if (dist < minDist) {
      minDist = dist;
      closestIndex = i;
    }
  });

  const lastIndex = talleres.length - 1;

  // ocultar/mostrar botones
  if (closestIndex <= 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = '';
  }

  if (closestIndex >= lastIndex) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTallerNavButtons();
    const slideShow = document.querySelector('.taller-slideShow');
  if (!slideShow) return;

  // Debounce/raf pattern para no saturar en scroll
  let rafId = null;
  slideShow.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      updateTallerNavButtons();
      rafId = null;
    });
  });
  const prevTBtn = document.querySelector('.taller-prev');
  const nextTBtn = document.querySelector('.taller-next');
  if (prevTBtn) prevTBtn.addEventListener('click', () => scrollToTaller(-1));
  if (nextTBtn) nextTBtn.addEventListener('click', () => scrollToTaller(1));
  
});