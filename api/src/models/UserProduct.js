const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('UserProduct', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        size: {
            type: DataTypes.STRING,
        },

        quantity: {
            type: DataTypes.INTEGER,
        },

        // UserId: {
        //     type: DataTypes.INTEGER,
        // },

        // ProductId: {
        //     type: DataTypes.INTEGER,
        // },

    });
};
