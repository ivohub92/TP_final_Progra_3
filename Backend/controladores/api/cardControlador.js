const { GiftCard } = require('../../models');

// Crear GiftCard
exports.crearGiftCard = async (req, res) => {
    const { nombre, precio, empresa, consola, requerimientos_minimos, stock, fecha_caducidad, plataformas_disponibles } = req.body;
    const imagen = req.file ? `/imagenes/giftcards/${req.file.filename}` : null;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'El nombre y el precio son obligatorios.' });
    }

    try {
        const giftcard = await GiftCard.create({
            nombre,
            precio,
            empresa,
            consola,
            requerimientos_minimos,
            stock,
            fecha_caducidad,
            plataformas_disponibles,
            imagen,
            activo: true
        });
        res.status(201).json(giftcard);
    } catch (error) {
        console.error('Error completo:', error);

        // Devolver el tipo de error y el detalle
        return res.status(500).json({
            mensaje: 'Error al crear la giftcard',
            nombre: error.name,          
            errores: error.errors || [], // Detalle de los campos si existen
        });
    }
};

// Obtener todas las GiftCards
exports.obtenerGiftCards = async (req, res) => {
    try {
        const giftcards = await GiftCard.findAll();
        res.json(giftcards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las giftcards' });
    }
};

// Obtener GiftCards activas
exports.obtenerGiftCardsActivas = async (req, res) => {
    try {
        const giftcards = await GiftCard.findAll({ where: { activo: true } });
        res.json(giftcards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las giftcards activas' });
    }
};

// Actualizar GiftCard
exports.actualizarGiftCard = async (req, res) => {
    const { id } = req.params;
    const imagen = req.file ? `/imagenes/giftcards/${req.file.filename}` : null;

    try {
        const giftcard = await GiftCard.findByPk(id);
        if (!giftcard) return res.status(404).json({ error: 'GiftCard no encontrada' });

        // Actualización dinámica de campos
        const campos = ['nombre', 'precio', 'empresa', 'consola', 'requerimientos_minimos', 'stock', 'fecha_caducidad', 'plataformas_disponibles'];
        campos.forEach(campo => {
            if (req.body[campo] !== undefined) {
                giftcard[campo] = req.body[campo];
            }
        });

        if (imagen) giftcard.imagen = imagen;

        await giftcard.save();
        res.json(giftcard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la giftcard' });
    }
};

// Baja lógica
exports.desactivarGiftCard = async (req, res) => {
    const { id } = req.params;

    try {
        const giftcard = await GiftCard.findByPk(id);
        if (!giftcard) return res.status(404).json({ error: 'GiftCard no encontrada' });

        if (!giftcard.activo) {
            return res.status(409).json({ mensaje: 'La GiftCard ya está inactiva.', giftcard });
        }

        await giftcard.update({ activo: false });
        res.status(200).json({ mensaje: 'GiftCard desactivada exitosamente.', giftcard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al desactivar la giftcard' });
    }
};

// Reactivar GiftCard
exports.activarGiftCard = async (req, res) => {
    const { id } = req.params;

    try {
        const giftcard = await GiftCard.findByPk(id);
        if (!giftcard) return res.status(404).json({ error: 'GiftCard no encontrada' });

        if (giftcard.activo) {
            return res.status(409).json({ mensaje: 'La GiftCard ya está activa.', giftcard });
        }

        await giftcard.update({ activo: true });
        res.status(200).json({ mensaje: 'GiftCard activada exitosamente.', giftcard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al activar la giftcard' });
    }
};

//Para paginacion

exports.obtenerGiftCardsPaginadas = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;     
    const limit = parseInt(req.query.limit) || 5;  
    const offset = (page - 1) * limit;

    const { count, rows } = await GiftCard.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.json({
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      giftcards: rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las gift cards paginadas' });
  }
};
