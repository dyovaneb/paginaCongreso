document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.snap-container');
  const sections = Array.from(container.querySelectorAll('section'));
  let isScrolling = false;

  container.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    e.preventDefault();

    const current = Math.round(container.scrollTop / window.innerHeight);
    let target = current;

    if (e.deltaY > 0 && current < sections.length - 1) {
      target = current + 1;
    } else if (e.deltaY < 0 && current > 0) {
      target = current - 1;
    }

    if (target !== current) {
      isScrolling = true;
      container.scrollTo({
        top: target * window.innerHeight,
        behavior: 'smooth'
      });
      setTimeout(() => { isScrolling = false; }, 700); // Ajusta el tiempo si es necesario
    }
  }, { passive: false });

  const navToggle = document.querySelector('.nav-toggle');
  const navUl = document.querySelector('nav ul');
  navToggle.addEventListener('click', () => {
    navUl.classList.toggle('open');
  });

  navUl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900) {
        navUl.classList.remove('open');
      }
    });
  });
  const sections2 = Array.from(document.querySelectorAll('section'));
  const navLinks = document.querySelectorAll('nav ul li a');

  function onScroll() {
    let currentSection = sections2[0];
    const scrollPos = container.scrollTop;
    console.log(`Scroll position: ${scrollPos}`);

    sections2.forEach(section => {
      const sectionTop = section.offsetTop - 250; // Ajusta el offset según tu nav
      console.log(`Section: ${section.id}, Top: ${sectionTop}`);
      if (scrollPos >= sectionTop) {
        currentSection = section;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').replace('#', '') === currentSection.id) {
        link.classList.add('active');
      }
    });
  }

  container.addEventListener('scroll', onScroll);
  onScroll();

});



function generateStarShadows(count) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #FFF`);
  }
  return shadows.join(", ");
}

function applyStars() {
  const stars = document.getElementById("stars");
  const stars2 = document.getElementById("stars2");
  const stars3 = document.getElementById("stars3");

  const shadowsSmall = generateStarShadows(700);
  const shadowsMedium = generateStarShadows(200);
  const shadowsBig = generateStarShadows(100);

  stars.style.boxShadow = shadowsSmall;
  stars2.style.boxShadow = shadowsMedium;
  stars3.style.boxShadow = shadowsBig;

  // duplicar efecto con ::after (simulado aquí)
  const offsetY = 2000;

  const cloneShadow = (shadows, offset) => {
    return shadows
      .split(", ")
      .map(sh => {
        const [x, y, color] = sh.split(" ");
        const newY = parseInt(y) + offset;
        return `${x} ${newY}px ${color}`;
      })
      .join(", ");
  };

  const afterSmall = document.createElement("div");
  afterSmall.style.position = "absolute";
  afterSmall.style.width = "1px";
  afterSmall.style.height = "1px";
  afterSmall.style.boxShadow = cloneShadow(shadowsSmall, offsetY);
  stars.appendChild(afterSmall);

  const afterMedium = document.createElement("div");
  afterMedium.style.position = "absolute";
  afterMedium.style.width = "2px";
  afterMedium.style.height = "2px";
  afterMedium.style.boxShadow = cloneShadow(shadowsMedium, offsetY);
  stars2.appendChild(afterMedium);

  const afterBig = document.createElement("div");
  afterBig.style.position = "absolute";
  afterBig.style.width = "3px";
  afterBig.style.height = "3px";
  afterBig.style.boxShadow = cloneShadow(shadowsBig, offsetY);
  stars3.appendChild(afterBig);
}

  const buttons = document.querySelectorAll('.tab-button');
  const tabs = document.querySelectorAll('.tab-content');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Quitar clase activa de todo
      buttons.forEach(b => b.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      // Agregar clase activa al seleccionado
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
});

window.onload = applyStars;