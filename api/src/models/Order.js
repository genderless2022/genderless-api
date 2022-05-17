const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Order', {
        

        payment_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        productList: {
            type: DataTypes.JSON,
        },
        status: {
            type: DataTypes.STRING
        },
        status_detail: {
            type: DataTypes.STRING
        },
        total: {
            type: DataTypes.INTEGER
        },
        sendAddress: {
            type: DataTypes.JSON
        }
        

    });
};