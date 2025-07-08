module.exports = (sequelize, DataTypes) => {
    const VentaProducto = sequelize.define('VentaProducto', {
        productoTipo: { type: DataTypes.STRING, allowNull: false },
        productoId: { type: DataTypes.INTEGER, allowNull: false },
        productoNombre: { type: DataTypes.STRING, allowNull: false },
        cantidad: { type: DataTypes.INTEGER, allowNull: false },
        subtotal: { type: DataTypes.FLOAT, allowNull: false }
    });

    VentaProducto.associate = (models) => {
    VentaProducto.belongsTo(models.Venta, { foreignKey: 'VentaId' });
    
  };


    return VentaProducto;
};
