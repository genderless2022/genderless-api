const { Payment } = require("../../db");

const pagos = async (req, res) => {
  const pagos = await Payment.findAll({
    order: [["id", "ASC"]],
  });
  res.status(202).send(pagos);
};

module.exports = pagos;
