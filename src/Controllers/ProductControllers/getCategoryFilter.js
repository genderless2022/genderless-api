const { Product, Category } = require("../../db.js");

const productByCategory = async (req, res) => {
  let { categoria } = req.params;
  try {
    const productsCategory = await Product.findAll({
      where: {
          CategoryName: categoria,
      },
    include: [{ model: Category }]
    });
    res.status(200).send(productsCategory);
  } catch (error) {
    res.send(error);
  }
};

module.exports = productByCategory;
