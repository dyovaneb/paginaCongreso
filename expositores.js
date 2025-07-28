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

  // Encuentra el expositor más visible actualmente
  const scrollLeft = slideShow.scrollLeft;
  const slideShowRect = slideShow.getBoundingClientRect();
  let currentIndex = 0;
  for (let i = 0; i < expositores.length; i++) {
    const expositorRectp = expositores[i].getBoundingClientRect();
    console.log(`Expositor ${i}: Left: ${expositorRectp.left}`);
  }
  for (let i = 0; i < expositores.length; i++) {
    const expositorRect = expositores[i].getBoundingClientRect();
    if (expositorRect.left >= slideShowRect.left - 1) {
      currentIndex = i;
      break;
    }
  }
  let nextIndex = currentIndex + direction;
  if (nextIndex < 0) {nextIndex = 0;}
  if (nextIndex >= expositores.length) {nextIndex = expositores.length - 1;}

    const expositor = expositores[nextIndex];
    const expositorRect = expositor.getBoundingClientRect();
    const offset = expositorRect.left - slideShowRect.left + slideShow.scrollLeft - 160;
    console.log(`Scrolling to expositor ${nextIndex}: Offset: ${expositorRect.left} - ${slideShowRect.left} + ${slideShow.scrollLeft} = ${offset}`);
    slideShow.scrollTo({ left: offset, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  if (prevBtn) prevBtn.addEventListener('click', () => scrollToExpositor(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => scrollToExpositor(1));
});