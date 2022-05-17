const { Payment } = require("../../db");

const pagos = async (req, res) => {
  try {
    const pagos = await Payment.findAll({
      
      attributes: ["order_id", "email", "total_paid_amount", "status_delivery"],
      group: ["order_id", "email", "total_paid_amount", "status_delivery"],
      order: [["order_id", "ASC"]],
    });
    res.status(202).send(pagos);
  } catch (error) {
    console.log(error);
  }
};

module.exports = pagos;
