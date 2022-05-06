const { Payment } = require("../../db");
const { Op } = require("sequelize");

const productsQuantity = async (req, res) => {
  try {
    const amount = await Payment.sum("quantity", {
      where: {
        quantity: {
          [Op.gt]: 0,
        },
      },
    });
    res.send({amount});
  } catch (error) {
    console.log(error);
  }
};

module.exports = productsQuantity;
