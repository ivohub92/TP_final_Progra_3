module.exports = (sequelize, DataTypes) => {
    const Juego = sequelize.define('Juego', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0.01, // no puede ser cero
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
        requerimientos_minimos: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0 // no puede ser menor a 0
            }
        },
        genero: {
            type: DataTypes.STRING,
            allowNull: true
        },
        puntuacion_general: {
            type: DataTypes.FLOAT,
            allowNull: true,
            validate: {
                min: 1,
                max: 10
            }
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    // Desactivar juego si stock es 0 o menos (hook)
    Juego.beforeSave((juego, options) => {
        if (juego.stock <= 0) {
            juego.activo = false;
        }
    });

    return Juego;
};
