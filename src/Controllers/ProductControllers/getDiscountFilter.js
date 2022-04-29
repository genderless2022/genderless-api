const { Product, Category } = require("../../db.js");
const { Op } = require("sequelize");

const discountFilter = async (req, res) => {
  try {
    const productsDiscount = await Product.findAll({
      where: {
        discount: { [Op.ne]: 0 },
      },
      include: [{ model: Category }],
    });
    res.status(200).send(productsDiscount);
  } catch (error) {
    res.send(error);
  }
};

module.exports = discountFilter;
