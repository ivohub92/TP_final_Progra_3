module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define('Venta', {
        fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        total: { type: DataTypes.FLOAT, allowNull: false }
    });

    Venta.associate = (models) => {
    Venta.belongsTo(models.Cliente, { foreignKey: 'ClienteId' }); 
    models.Cliente.hasMany(Venta, { foreignKey: 'ClienteId' });  
    
    Venta.hasMany(models.VentaProducto, { foreignKey: 'VentaId' }); 
};

    return Venta;
};