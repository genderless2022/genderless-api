const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('Review', {
        
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        

    });
};