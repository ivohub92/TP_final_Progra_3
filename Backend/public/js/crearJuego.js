document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formCrearJuego');
  const token = form.dataset.token;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch('/api/juegos/subirJuego', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        body: formData
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'No se pudo interpretar el error del servidor' };
        }
        alert('Error: ' + (errorData.message || JSON.stringify(errorData)));
        return;
      }

      alert('Juego creado correctamente');
      window.location.href = '/admin/panelProductos';
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor: ' + err.message);
    }
  });
});
