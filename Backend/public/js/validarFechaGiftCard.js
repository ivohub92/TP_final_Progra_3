document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formCrearGiftCard");
  const inputFecha = document.getElementById("fechaCaducidadInput");

  if (!form || !inputFecha) return;

  // Calcular hoy + 10 días
  const hoy = new Date();
  hoy.setDate(hoy.getDate() + 10);
  const fechaMinima = hoy.toISOString().split("T")[0];

  // Establecer como fecha mínima en el input
  inputFecha.min = fechaMinima;

  // Validar antes de enviar el formulario
  form.addEventListener("submit", function (e) {
    const valorFecha = inputFecha.value;

    if (!valorFecha || valorFecha < fechaMinima) {
      e.preventDefault();
      alert(`La fecha de caducidad debe ser al menos ${fechaMinima}`);
      inputFecha.focus();
    }
  });
});
