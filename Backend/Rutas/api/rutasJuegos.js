const express = require('express');
const router = express.Router();
const { crearJuego, obtenerJuegos, obtenerJuegosActivos, actualizarJuego, desactivarJuego, activarJuego, obtenerJuegosPaginados } = require('../../controladores/api/juegoControlador');
const { verificarToken, esAdmin } = require('../../middlewares/auth');
const { imagenJuegos } = require('../../middlewares/cargarImagenes');

// CRUD protegido por admin
router.post('/subirJuego', verificarToken, esAdmin, imagenJuegos.single('imagen'), crearJuego); // Protegido por rol

router.get('/paginado', verificarToken, esAdmin, obtenerJuegosPaginados);
router.get('/', obtenerJuegos); // Disponible para todos
router.get('/activos', obtenerJuegosActivos); // Disponible para todos
router.put('/:id/actualizar', verificarToken, esAdmin, imagenJuegos.single('imagen'), actualizarJuego); // Protegido por rol
router.delete('/:id', verificarToken, esAdmin, desactivarJuego); // Protegido por rol
router.put('/:id/activar', verificarToken, esAdmin, activarJuego); // Protegido por rol

module.exports = router;