const { Juego } = require('../../models');

// Crear Juego
exports.crearJuego = async (req, res) => {
    const { nombre, precio, descripcion, stock, empresa, consola, fecha_lanzamiento, requerimientos_minimos,genero, puntuacion_general,  plataformas_disponibles } = req.body;
    const imagen = req.file ? `/imagenes/juegos/${req.file.filename}` : null;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
    }

    try {
        const juego = await Juego.create({
            nombre,
            precio,
            descripcion,
            stock,
            empresa,
            consola,
            fecha_lanzamiento,
            requerimientos_minimos,
            plataformas_disponibles,
            genero,
            puntuacion_general,
            imagen,
            activo: true
        });
        res.status(201).json(juego);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el juego' });
    }
};

// Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.findAll();
        res.json(juegos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los juegos' });
    }
};

// Obtener solo juegos activos
exports.obtenerJuegosActivos = async (req, res) => {
    try {
        const juegos = await Juego.findAll({ where: { activo: true } });
        res.json(juegos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los juegos activos' });
    }
};

// Actualizar Juego
exports.actualizarJuego = async (req, res) => {
    const { id } = req.params;
    const imagen = req.file ? `/imagenes/juegos/${req.file.filename}` : null;

    try {
        const juego = await Juego.findByPk(id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

        // Actualización dinámica de campos
        const campos = ['nombre', 'precio', 'descripcion', 'stock', 'empresa', 'consola', 'fecha_lanzamiento', 'requerimientos_minimos', 'plataformas_disponibles'];
        campos.forEach(campo => {
            if (req.body[campo] !== undefined) {
                juego[campo] = req.body[campo];
            }
        });

        if (imagen) juego.imagen = imagen;

        await juego.save();
        res.json(juego);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el juego' });
    }
};

// Baja lógica
exports.desactivarJuego = async (req, res) => {
    const { id } = req.params;

    try {
        const juego = await Juego.findByPk(id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

        if (!juego.activo) {
            return res.status(409).json({ mensaje: 'El juego ya está inactivo.', juego });
        }

        await juego.update({ activo: false });
        res.status(200).json({ mensaje: 'Juego desactivado exitosamente.', juego });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al desactivar el juego' });
    }
};

// Reactivar Juego
exports.activarJuego = async (req, res) => {
    const { id } = req.params;

    try {
        const juego = await Juego.findByPk(id);
        if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

        if (juego.activo) {
            return res.status(409).json({ mensaje: 'El juego ya está activo.', juego });
        }

        await juego.update({ activo: true });
        res.status(200).json({ mensaje: 'Juego activado exitosamente.', juego });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al activar el juego' });
    }
};

exports.obtenerJuegosPaginados = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 5;  
    const offset = (page - 1) * limit;

    const { count, rows } = await Juego.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      juegos: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los juegos paginados' });
  }
};
