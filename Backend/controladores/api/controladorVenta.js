const { Venta, VentaProducto, Juego, GiftCard, Cliente } = require('../../models');



exports.crearVenta = async (req, res) => {
  try {
    const { nombre, productos } = req.body;

    // Crea cliente 
    let cliente = await Cliente.create({ nombre });
    const clienteId = cliente.id;

    let total = 0;

    // Validar stock y calcular total
    for (const prod of productos) {
      let producto = await Juego.findOne({ where: { nombre: prod.nombre } });
      let tipoProducto = 'Juego';

      if (!producto) {
        producto = await GiftCard.findOne({ where: { nombre: prod.nombre } });
        tipoProducto = 'GiftCard';
      }

      if (!producto) {
        return res.status(404).json({ message: `Producto con nombre ${prod.nombre} no encontrado` });
      }

      if (producto.stock < prod.cantidad) {
        return res.status(400).json({ message: `Stock insuficiente para el producto ${prod.nombre}` });
      }

      total += producto.precio * prod.cantidad;
    }

    // Crear venta
    const venta = await Venta.create({ total, ClienteId: clienteId });

    // Crear detalles y actualizar stock
    for (const prod of productos) {
      let producto = await Juego.findOne({ where: { nombre: prod.nombre } });
      let tipoProducto = 'Juego';

      if (!producto) {
        producto = await GiftCard.findOne({ where: { nombre: prod.nombre } });
        tipoProducto = 'GiftCard';
      }

      const subtotal = producto.precio * prod.cantidad;

      await VentaProducto.create({
        productoId: producto.id,
        productoTipo: tipoProducto,
        productoNombre: producto.nombre,
        cantidad: prod.cantidad,
        subtotal,
        VentaId: venta.id
      });


      producto.stock -= prod.cantidad;
      await producto.save();
    }

    res.status(201).json({ message: 'Venta registrada correctamente' });

  } catch (error) {
    console.error('Error al registrar la venta:', error);
    res.status(500).json({ message: 'Error al registrar la venta' });
  }
};

exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [
        { model: Cliente, attributes: ['id', 'nombre'] },
        { model: VentaProducto }
      ]
    });
    res.json(ventas);
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    res.status(500).json({ mensaje: 'Error al obtener las ventas.' });
  }
};

exports.obtenerDetalleVenta = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.findByPk(id, {
      include: [
        { model: Cliente, attributes: ['id', 'nombre'] },
        { model: VentaProducto }
      ]
    });
    if (!venta) return res.status(404).json({ mensaje: 'Venta no encontrada.' });
    res.json(venta);
  } catch (error) {
    console.error('Error al obtener el detalle de la venta:', error);
    res.status(500).json({ mensaje: 'Error al obtener el detalle de la venta.' });
  }
};
