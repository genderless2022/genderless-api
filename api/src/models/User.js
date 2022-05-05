const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('User', {
        
        name: {
            type: DataTypes.STRING,
        },

        lastName: {
            type: DataTypes.STRING,
        },

        picture: {
            type: DataTypes.STRING
        },

        born: {
            type: DataTypes.DATE,
        },

        dni: {
            type: DataTypes.STRING,
            unique: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        address: {
            type: DataTypes.STRING,
        },

        province: {
            type: DataTypes.STRING,
        },

        postal: {
            type: DataTypes.STRING,

        },

        phone: {
            type: DataTypes.STRING,
        },

        password: {
            type: DataTypes.STRING,
        },

        permission: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        }
    });
};
