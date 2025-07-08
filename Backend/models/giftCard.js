module.exports = (sequelize, DataTypes) => {
  const GiftCard = sequelize.define('GiftCard', {
    nombre: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    precio: { 
      type: DataTypes.FLOAT, 
      allowNull: false,
      validate: {
        min: 0.01 // evitar precios negativos o cero
      }
    },
    empresa: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    consola: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    stock: { 
      type: DataTypes.INTEGER, 
      allowNull: false,
      validate: {
        min: 0 
      }
    },
    fecha_caducidad: { 
      type: DataTypes.DATE, 
      allowNull: false,
      validate: {
        isAfterTenDays(value) {
          const hoy = new Date();
          const diezDiasDespues = new Date(hoy.setDate(hoy.getDate() + 10));
          if (new Date(value) < diezDiasDespues) {
            throw new Error('La fecha de caducidad debe ser al menos 10 días después de hoy.');
          }
        }
      }
    },
    plataformas_disponibles: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },        
    imagen: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    activo: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    }
  });

  // Hook: desactivar giftcard si el stock es 0
  GiftCard.beforeSave((giftCard, options) => {
    if (giftCard.stock <= 0) {
      giftCard.activo = false;
    }
  });

  return GiftCard;
};
