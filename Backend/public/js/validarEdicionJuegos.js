document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formEditarJuego");
  const stock = document.getElementById("stock");
  const precio = document.getElementById("precio");
  const puntuacion = document.getElementById("puntuacion_general");

  if (!form || !stock || !precio || !puntuacion) return;

  form.addEventListener("submit", (e) => {
    if (Number(stock.value) < 0) {
      e.preventDefault();
      alert("El stock no puede ser menor a 0.");
      stock.focus();
      return;
    }

    if (Number(precio.value) <= 0) {
      e.preventDefault();
      alert("El precio debe ser mayor a 0.");
      precio.focus();
      return;
    }

    const puntuacionNum = Number(puntuacion.value);
    if (puntuacionNum < 1 || puntuacionNum > 10) {
      e.preventDefault();
      alert("La puntuación debe estar entre 1 y 10.");
      puntuacion.focus();
      return;
    }
  });
});