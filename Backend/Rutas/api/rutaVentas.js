const express = require('express');
const router = express.Router();
const venta = require('../../controladores/api/controladorVenta');
const {obtenerVentas, obtenerDetalleVenta, crearVenta}= require('../../controladores/api/controladorVenta');
const { verificarToken , esAdmin} = require('../../middlewares/auth');

// Registrar venta
router.post('/', crearVenta);

// Listar ventas 
router.get('/', verificarToken, esAdmin, obtenerVentas);

// Solo admin ve detalle
router.get('/:id', verificarToken, esAdmin, obtenerDetalleVenta);


module.exports = router;