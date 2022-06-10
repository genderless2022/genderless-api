const { Payment } = require("../../db");

const viewPayment = async (req, res) => {
  const {id} = req.params;
  console.log(id);
  const view = await Payment.findAll({
    where: {
      order_id: id,
    },
  });
  res.status(202).send(view);
};

module.exports = viewPayment;