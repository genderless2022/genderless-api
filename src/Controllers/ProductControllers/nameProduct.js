const { Product, Category } = require("../../db.js");

const productByName = async (req, res) => {
  let { name } = req.body;

  try {
    const allProducts = await Product.findAll({
      include: [{ model: Category }],
    });
    const productsFilter = allProducts.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
    if (productsFilter.length) {
        res.status(200).send(productsFilter)
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = productByName;
