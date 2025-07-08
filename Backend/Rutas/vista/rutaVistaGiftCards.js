const express = require('express');
const router = express.Router();

const { soloAdmins } = require('../../middlewares/protegerVistas');
const { crearGiftCard, editarGiftCard } = require('../../controladores/vistas/controladorVistaGiftCards');

router.get('/crearGiftCard', soloAdmins, crearGiftCard);

// Formulario editar giftcard
router.get('/editarGiftCard/:id', soloAdmins, editarGiftCard );

module.exports = router;


