const { Product, Category } = require("../../db.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const productByName = async (req, res) => {
  let { name } = req.params;
  console.log(name);
  const nombre = name.charAt(0).toUpperCase() + name.slice(1);
  try {
    if (name.length > 2) {
      const allProducts = await Product.findAll({
        where: {
          name: { [Op.like]: "%" + nombre + "%" },
        },
        include: [{ model: Category }],
        raw: true,
      });

      res.status(200).send(allProducts);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = productByName;
