const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
     
    },
    description: {

      type: DataTypes.TEXT,

    },
   stock_by_size: {
      type: DataTypes.JSON
    },
    price: {
      type: DataTypes.FLOAT,
      
    },

    discount: {
      type: DataTypes.INTEGER,
    },
    
    image: { 
      type: DataTypes.TEXT,
      defaultValue:'https://www.cristobalcolon.com/fullaccess/item21334foto95108.jpg',
    },
    brand: {
      type: DataTypes.STRING,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false

    }
    
  });
};
