const { Product, Category } = require("../../db.js");

const productById = async (req, res) => {
  let { id } = req.params;
  try {
    const productGetId = await Product.findByPk(
      id,
      {include: [{ model: Category }]},
    );
    res.status(200).send(productGetId);
  } catch (error) {
    res.send(error);
  }
};

module.exports = productById;
