
export function crearControladorEstado(token) {

  async function cambiarEstadoJuego(juegoId, activar) {
    try {
      const url = activar 
        ? `/api/juegos/${juegoId}/activar` 
        : `/api/juegos/${juegoId}`;
      const method = activar ? 'PUT' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert('Error: ' + (errorData.message || 'Error al cambiar estado del juego'));
        return;
      }

      alert(`Juego ${activar ? 'reactivado' : 'desactivado'} correctamente`);
      location.reload();

    } catch (error) {
      console.error(error);
      alert('Error de red o servidor');
    }
  }

  async function cambiarEstadoGiftCard(giftcardId, activar) {
    try {
      const url = activar 
        ? `/api/giftcards/${giftcardId}/activar` 
        : `/api/giftcards/${giftcardId}`;
      const method = activar ? 'PUT' : 'DELETE';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert('Error: ' + (errorData.message || 'Error al cambiar estado de la giftcard'));
        return;
      }

      alert(`GiftCard ${activar ? 'reactivada' : 'desactivada'} correctamente`);
      location.reload();

    } catch (error) {
      console.error(error);
      alert('Error de red o servidor');
    }
  }

  return { cambiarEstadoJuego, cambiarEstadoGiftCard };
}