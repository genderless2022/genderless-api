const { Product, Category } = require("../../db.js");

const productByName = async (req, res) => {
  let { name } = req.body;
  try {
    const nameFromDb = await Product.findOne({
      where: { name: `${name}` },
      include: [{ model: Category }],
    });
    res.status(200).send(nameFromDb)
  } catch (error) {
    res.send(error);
  }
};

module.exports = productByName;
