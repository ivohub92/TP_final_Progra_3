const express = require('express');
const router = express.Router();
const { loginVista } = require('../../controladores/api/controladorAuth');
const { redirigirSiAutenticado } = require('../../middlewares/protegerVistas');



// GET login
router.get('/login', redirigirSiAutenticado, (req, res) => {
   res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('admin/login', { error: null });
});
router.get('/', (req, res) => {
  console.log("Entrando al formulario de login");
  res.redirect('/login');
});

// POST login EJS
router.post('/login',  loginVista);

module.exports = router;