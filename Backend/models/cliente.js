module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define('Cliente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Cliente.associate = (models) => {
    Cliente.hasMany(models.Venta, { foreignKey: 'ClienteId' });
  };

  return Cliente;
};
