const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    stock_by_size: {
      type: DataTypes.JSONB,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    discount: {
      type: DataTypes.INTEGER,
    },

    image: {
      // pienso que deberíamos colocar una imagen por defecto por si acaso...
      type: DataTypes.TEXT,
      defaultValue:
        "https://pixabay.com/es/vectors/camiseta-de-manga-corta-camisa-cima-34481",
    },
  });
};
