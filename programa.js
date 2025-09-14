function ajustarHorasTabla() {
  const isSmall = window.innerWidth <= 600;
  document.querySelectorAll('table.programaTabla td.time').forEach(td => {
    const textoCompleto = td.getAttribute('data-full') || td.textContent;
    if (!td.getAttribute('data-full')) {
      td.setAttribute('data-full', textoCompleto);
    }
    if (true) {
      // Solo la parte antes del " -"
      td.textContent = textoCompleto.split('-')[0].trim();
    } else {
      td.textContent = textoCompleto;
    }
  });
}

window.addEventListener('DOMContentLoaded', ajustarHorasTabla);
window.addEventListener('resize', ajustarHorasTabla);
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('.wrap');
  let isDown = false;
  let startX, startY;
  let scrollLeft, scrollTop;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    wrap.classList.add('dragging');
    startX = e.pageX - wrap.offsetLeft;
    startY = e.pageY - wrap.offsetTop;
    scrollLeft = wrap.scrollLeft;
    scrollTop = wrap.scrollTop;
  });

  wrap.addEventListener('mouseleave', () => {
    isDown = false;
    wrap.classList.remove('dragging');
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.classList.remove('dragging');
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const y = e.pageY - wrap.offsetTop;
    const walkX = (x - startX) * 1.2;
    const walkY = (y - startY) * 1.2;
    wrap.scrollLeft = scrollLeft - walkX;
    wrap.scrollTop = scrollTop - walkY;
  });
});