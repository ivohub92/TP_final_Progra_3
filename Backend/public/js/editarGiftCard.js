document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formEditarGiftCard');
  const token = form.dataset.token;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const stock = form.querySelector('#stock');
    const precio = form.querySelector('#precio');    


    if (Number(stock.value) < 0) {
      alert('El stock no puede ser menor a 0');
      stock.focus();
      return;
    }

    if (Number(precio.value) <= 0) {
      alert('El precio debe ser mayor a 0');
      precio.focus();
      return;
    }

    const formData = new FormData(form);
    const giftcardId = formData.get('giftcardId');

    try {
      const response = await fetch(`/api/giftcards/${giftcardId}/actualizar`, {
        method: 'PUT',
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

      alert('GiftCard actualizada correctamente');
      window.location.href = '/admin/panelProductos';
    } catch (err) {
      console.error(err);
      alert('Error de red o servidor: ' + err.message);
    }
  });
});
