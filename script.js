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

window.onload = applyStars;