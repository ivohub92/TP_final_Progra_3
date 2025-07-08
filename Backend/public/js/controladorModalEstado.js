
export function inicializarControladorEstado(token, opciones = {}) {
  const controlador = opciones.controladorEstado; // Pasás aquí el controlador con las funciones cambiarEstadoJuego y cambiarEstadoGiftCard

  let idSeleccionado = null;
  let tipoSeleccionado = null;
  let activarSeleccionado = null;

  const modalElement = document.getElementById('confirmacionModal');
  if (!modalElement) {
    console.error('No se encontró el modal con id "confirmacionModal"');
    return;
  }
  const modal = new bootstrap.Modal(modalElement);

  const btnConfirmar = document.getElementById('btnConfirmar');
  const modalMensaje = document.getElementById('modalMensaje');

  // Delegación para todos los botones con clase .btn-cambiar-estado
  function agregarEventListeners() {
    document.querySelectorAll('.btn-cambiar-estado').forEach(button => {
      button.addEventListener('click', () => {
        idSeleccionado = button.getAttribute('data-id');
        tipoSeleccionado = button.getAttribute('data-tipo');
        activarSeleccionado = button.getAttribute('data-activar') === 'true';

        modalMensaje.textContent = `¿Estás seguro de ${activarSeleccionado ? 'reactivar' : 'desactivar'} este ${tipoSeleccionado}?`;
        modal.show();
      });
    });
  }

  btnConfirmar.addEventListener('click', async () => {
    modal.hide();
    if (!controlador) {
      console.error('No se ha pasado el controlador para cambiar estado');
      return;
    }
    try {
      if (tipoSeleccionado === 'juego') {
        await controlador.cambiarEstadoJuego(parseInt(idSeleccionado), activarSeleccionado);
      } else if (tipoSeleccionado === 'giftcard') {
        await controlador.cambiarEstadoGiftCard(parseInt(idSeleccionado), activarSeleccionado);
      }
    } catch (err) {
      console.error(err);
      alert('Error al cambiar el estado');
    }
  });

  agregarEventListeners();
}
