document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formEditarJuego');
  const token = form.dataset.token; // Obtenido del atributo data-token

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const juegoId = formData.get('juegoId');

    try {
      const response = await fetch(`/api/juegos/${juegoId}/actualizar`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || 'Error al actualizar el juego'));
        return;
      }

      alert('Juego actualizado correctamente');
      window.location.href = '/admin/panelProductos';
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor');
    }
  });
});
