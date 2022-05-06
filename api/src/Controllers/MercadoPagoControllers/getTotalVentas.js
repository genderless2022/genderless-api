const { literal, Op } = require("sequelize");
const { Payment } = require("../../db");

const productsPriceTotal = async (req, res) => {
  try {
    const priceTotal = await Payment.findAll({
      attributes: [[literal("price * quantity"), "test_field"]],
    });
    /* console.log(priceTotal); */
    if (priceTotal) {
      const order = priceTotal.reduce((a, b) => {
        return a + b.dataValues.test_field;
      }, 0);
      res.send({ order });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = productsPriceTotal;
