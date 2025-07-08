module.exports = {
  soloAdmins: (req, res, next) => {
   
    if (!req.session.admin || req.session.admin.rol !== 'admin') {
      console.log('Redirigiendo a /login porque no hay admin válido en sesión');
      return res.redirect('/login');
    }
    next();
  },

  redirigirSiAutenticado: (req, res, next) => {
    
    if (req.session.admin) {
      console.log('Ya logueado, redirigiendo a /admin/panelProductos');
      return res.redirect('/admin/panelProductos');
    }
    next();
  }
};