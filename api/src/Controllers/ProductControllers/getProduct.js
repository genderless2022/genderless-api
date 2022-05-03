const { Product, Category } = require("../../db.js");

const getProduct = async (req, res) => {
  try {
    let allProducts = await Product.findAll({ 
        order: [
            ['id', 'ASC']
        ],
        include: [{ model: Category }] });

    res.send(allProducts);
  } catch (error) {
    console.log(error);
  }
};
module.exports = getProduct;
