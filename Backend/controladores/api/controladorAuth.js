const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin, Cliente } = require('../../models');

// Generar token JWT
const generarToken = (admin) => {
    return jwt.sign(
        { id: admin.id, correo: admin.correo, rol: admin.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};


// Registrar administrador (nombre y contraseña)
exports.registrarAdmin = async (req, res) => {
    const { correo } = req.body;
    const password = '123456'; // Contraseña fija para testers

    if (!correo || !password) return res.status(400).json({ error: 'correo y contraseña son obligatorios.' });

    try {
        // Validar que no exista otro admin con ese nombre
        const usuarioExistente = await Admin.findOne({ where: { correo } });
        if (usuarioExistente) return res.status(400).json({ error: 'El correo ya está en uso.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoAdmin = await Admin.create({ correo, password: hashedPassword, rol: 'admin' });
        const token = generarToken(nuevoAdmin);
            // Guardar token en sesión para usarlo en vistas
        req.session.token = token;
        req.session.admin = { id: nuevoAdmin.id, correo: nuevoAdmin.correo, rol: nuevoAdmin.rol };
        res.status(201).json({ mensaje: 'Administrador registrado', token, rol: nuevoAdmin.rol });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar administrador.' });
    }
};



exports.login = async (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) return res.status(400).json({ error: 'Nombre y contraseña son obligatorios.' });

  try {
    const admin = await Admin.findOne({ where: { correo, rol: 'admin' } });

    if (!admin) {
      return res.status(404).json({ error: 'admin no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, admin.password);

    if (!passwordValida) return res.status(401).json({ error: 'Contraseña incorrecta.' });

    const token = generarToken(admin);

    // No usar res.redirect acá, sino responder el token
    return res.json({ mensaje: 'Login exitoso', token, rol: admin.rol });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión.');
        }
        res.redirect('/login');
    });
};


//Pasar a vistas--- NO FORMA PARTE DE LA API
exports.loginVista = async (req, res) => {
  console.log('Entrando a loginVista...');
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.render('admin/login', { error: 'correo y contraseña son obligatorios.' });
    }

    try {
        const admin = await Admin.findOne({ where: { correo, rol: 'admin' } });

        if (!admin) return res.render('admin/login', { error: 'admin no encontrado' });

        const passwordValida = await bcrypt.compare(password, admin.password);

        if (!passwordValida) return res.render('admin/login', { error: 'Contraseña incorrecta' });

        
        const token = generarToken(admin);
        req.session.token = token;
        req.session.admin = { id: admin.id, nombre: admin.correo, rol: admin.rol };

       
        return res.redirect('/admin/panelProductos');

    } catch (error) {
        console.error(error);
        res.render('admin/login', { error: 'Error en el servidor' });
    }
}

exports.registrarCliente = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'Nombre es obligatorio' });
  }
  try {
    // Siempre creamos uno nuevo, aun con nombre repetido
    const cliente = await Cliente.create({ nombre: nombre.trim() });
    return res.status(201).json({
      mensaje: 'Cliente creado',
      cliente
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al crear cliente' });
  }
};



exports.usuarioDemo = async (req, res) => {
  try {
    const primerAdmin = await Admin.findOne({
      attributes: ['correo'], // traer solo el correo
      order: [['id', 'ASC']]
    });

    if (!primerAdmin) {
      return res.status(404).json({ error: 'No se encontró ningún admin' });
    }

    res.json({ correo: primerAdmin.correo, password: '123456' }); // devuelvo el correo y una password fija para demo
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  }
};