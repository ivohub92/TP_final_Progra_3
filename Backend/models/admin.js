module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                msg: 'Debe ser un correo válido con @'
                }
            }
        },
        password: { 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                isLongEnough(value) {
                    if (this.rol === 'admin' && (!value || value.length < 6)) {
                        throw new Error('La contraseña de administrador debe tener al menos 6 caracteres');
                    }
                }
            }
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'admin',
            validate: {
                isIn: {
                    args: [['admin']],
                    msg: 'El rol debe ser admin'
                }
            }
        }
    });

    return Admin;
}