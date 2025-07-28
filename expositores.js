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