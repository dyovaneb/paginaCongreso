document.getElementById("formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  document.getElementById("mensaje").textContent = `¡Gracias por inscribirte, ${nombre}! Te hemos enviado un correo a ${correo}.`;
  this.reset();
});
