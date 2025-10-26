function centrarHotel() {
  const slideShow = document.querySelector('.sobre-slideShow');
  const primerHotel = slideShow?.querySelector('.sobre-carrusel');
  if (!slideShow || !primerHotel) return;

  const hotelWidth = primerHotel.offsetWidth;
  const padding = Math.max(0, (window.innerWidth - hotelWidth) / 2);
  slideShow.style.scrollPaddingLeft = `${padding}px`; // Para snap
  slideShow.scrollLeft = 0; // Opcional: vuelve al inicio al redimensionar
  // Si quieres usar padding-left en vez de scroll-padding-left:
  // slideShow.style.paddingLeft = `${padding}px`;
}

window.addEventListener('DOMContentLoaded', centrarHotel);
window.addEventListener('resize', centrarHotel);

function scrollToHotel(direction) {
  const slideShow = document.querySelector('.sobre-slideShow');
  const expositores = Array.from(slideShow.querySelectorAll('.sobre-carrusel'));
  if (!slideShow || expositores.length === 0) return;

  // Usa el ancho del primer expositor como referencia
  const hotelWidth = expositores[0].offsetWidth;
  // Desplaza el scroll horizontalmente
  slideShow.scrollBy({ left: hotelWidth * direction, behavior: 'smooth' });
}

function updateHotelNavButtons() {
  const slideShow = document.querySelector('.sobre-slideShow');
  if (!slideShow) return;
  const items = Array.from(slideShow.querySelectorAll('.sobre-carrusel'));
  const prevBtn = document.querySelector('.hotelprev');
  const nextBtn = document.querySelector('.hotelnext');
  if (!items.length || !prevBtn || !nextBtn) return;

  const scrollLeft = slideShow.scrollLeft;
  let closestIndex = 0;
  let minDist = Infinity;

  items.forEach((el, i) => {
    const dist = Math.abs(el.offsetLeft - scrollLeft);
    if (dist < minDist) {
      minDist = dist;
      closestIndex = i;
    }
  });

  prevBtn.style.display = (closestIndex <= 0) ? 'none' : '';
  nextBtn.style.display = (closestIndex >= items.length - 1) ? 'none' : '';
}

document.addEventListener('DOMContentLoaded', () => {
  updateHotelNavButtons();

  const slideShow = document.querySelector('.sobre-slideShow');
  if (!slideShow) return;

  let rafId = null;
  slideShow.addEventListener('scroll', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      updateHotelNavButtons();
      rafId = null;
    });
  });

  window.addEventListener('resize', () => {
    centrarHotel();
    updateHotelNavButtons();
  });

  const prevHBtn = document.querySelector('.hotelprev');
  const nextHBtn = document.querySelector('.hotelnext');
  if (prevHBtn) prevHBtn.addEventListener('click', () => scrollToHotel(-1));
  if (nextHBtn) nextHBtn.addEventListener('click', () => scrollToHotel(1));
  
});
