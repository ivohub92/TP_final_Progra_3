const express = require('express');
const router = express.Router();
const { soloAdmins } = require('../../middlewares/protegerVistas');
const {panelProductos}= require('../../controladores/vistas/controladorPanel');

// Panel principal (juegos y giftcards)
router.get('/panelProductos', soloAdmins, panelProductos);

module.exports = router;