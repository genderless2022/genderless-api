const { Product, Category } = require("../../db.js");

const productByMarca = async (req, res) => {
  let { marca } = req.params;
  try {
    const productsMarca = await Product.findAll({
      where: {
        brand: marca,
      },
      include: [{ model: Category }],
    });
    res.status(200).send(productsMarca);
  } catch (error) {
    res.send(error);
  }
};

module.exports = productByMarca;
