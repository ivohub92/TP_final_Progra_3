const express = require('express');
const router = express.Router();
const { crearGiftCard, obtenerGiftCards, obtenerGiftCardsActivas, actualizarGiftCard, desactivarGiftCard, activarGiftCard, obtenerGiftCardsPaginadas } = require('../../controladores/api/cardControlador');
const { verificarToken, esAdmin } = require('../../middlewares/auth');
const { imagenGiftCards } = require('../../middlewares/cargarImagenes');

// CRUD protegido por rol admin
router.post('/subirGiftCard', verificarToken, esAdmin, imagenGiftCards.single('imagen'), crearGiftCard);//Protegido por rol
router.get('/paginado', verificarToken, esAdmin, obtenerGiftCardsPaginadas);
router.get('/', obtenerGiftCards); // Disponible para todos
router.get('/activos', obtenerGiftCardsActivas);
router.put('/:id/actualizar', verificarToken, esAdmin, imagenGiftCards.single('imagen'), actualizarGiftCard);//Protegido por rol
router.delete('/:id', verificarToken, esAdmin, desactivarGiftCard);//Protegido por rol
router.put('/:id/activar', verificarToken, esAdmin, activarGiftCard);//Protegido por rol

module.exports = router;