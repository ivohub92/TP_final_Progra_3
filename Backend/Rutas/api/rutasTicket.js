const express = require('express');
const router = express.Router();
const { descargarTicket } = require('../../controladores/api/controladorTicket');


router.post('/descargarTicket', descargarTicket);

module.exports = router;