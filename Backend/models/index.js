const { Sequelize, DataTypes  } = require('sequelize');

const sequelize = require('../config/db'); 


const Cliente = require('./cliente')(sequelize, require('sequelize').DataTypes);
const Admin = require('./admin')(sequelize, require('sequelize').DataTypes);

const Juego = require('./juego')(sequelize, require('sequelize').DataTypes);
const GiftCard = require('./giftCard')(sequelize, require('sequelize').DataTypes);


const Venta = require('./venta')(sequelize, DataTypes);
const VentaProducto = require('./ventaProducto')(sequelize, DataTypes);


Cliente.hasMany(Venta, { foreignKey: 'ClienteId' });
Venta.belongsTo(Cliente, { foreignKey: 'ClienteId' });


Venta.hasMany(VentaProducto, { foreignKey: 'VentaId' });
VentaProducto.belongsTo(Venta, { foreignKey: 'VentaId' });


// Sincronización
sequelize.sync({ alter: true })
  .then(() => console.log('Tablas sincronizadas'))
  .catch(err => console.error('Error sincronizando tablas:', err));

// Exportar conexión y modelos
module.exports = { sequelize, Cliente, Juego, GiftCard, Venta, VentaProducto, Admin };