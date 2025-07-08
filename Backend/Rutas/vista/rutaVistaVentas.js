const express = require('express');
const router = express.Router();
const { soloAdmins } = require('../../middlewares/protegerVistas');
const {panelVentas, detalleVenta}= require('../../controladores/vistas/controladorPanelVentas');

// Listar todas las ventas (solo admin)
router.get('/panelVentas', soloAdmins, panelVentas);

// Mostrar detalle de una venta (solo admin)
router.get('/panelVentas/:id', soloAdmins, detalleVenta);

module.exports = router;

