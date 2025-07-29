function centrarPrimerExpositor() {
  const slideShow = document.querySelector('.slideShow');
  const primerExpositor = slideShow?.querySelector('.expositorcarrusel');
  if (!slideShow || !primerExpositor) return;

  const expositorWidth = primerExpositor.offsetWidth;
  const padding = Math.max(0, (window.innerWidth - expositorWidth) / 2);
  slideShow.style.scrollPaddingLeft = `${padding}px`; // Para snap
  slideShow.scrollLeft = 0; // Opcional: vuelve al inicio al redimensionar
  // Si quieres usar padding-left en vez de scroll-padding-left:
  // slideShow.style.paddingLeft = `${padding}px`;
}

window.addEventListener('DOMContentLoaded', centrarPrimerExpositor);
window.addEventListener('resize', centrarPrimerExpositor);

function scrollToExpositor(direction) {
  const slideShow = document.querySelector('.slideShow');
  const expositores = Array.from(slideShow.querySelectorAll('.expositorcarrusel'));
  if (!slideShow || expositores.length === 0) return;

  // Usa el ancho del primer expositor como referencia
  const expositorWidth = expositores[0].offsetWidth;
  // Desplaza el scroll horizontalmente
  slideShow.scrollBy({ left: expositorWidth * direction, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (prevBtn) prevBtn.addEventListener('click', () => scrollToExpositor(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollToExpositor(1));
});