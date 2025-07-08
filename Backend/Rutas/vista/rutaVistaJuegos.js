const express = require('express');
const router = express.Router();

const { soloAdmins } = require('../../middlewares/protegerVistas');
const { crearJuego, editarJuego } = require('../../controladores/vistas/controladorVistaJuegos');


// Formulario crear juego
router.get('/crearJuego', soloAdmins, crearJuego);

// Formulario editar juego
router.get('/editarJuego/:id', soloAdmins, editarJuego);


module.exports = router;
