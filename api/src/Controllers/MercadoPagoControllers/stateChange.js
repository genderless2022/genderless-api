const { Payment } = require("../../db");

const stateModifiqued = async (req, res) => {
  const data = req.body;
  await Payment.update(
    {
      status_delivery: data.state,
    },
    { where: { id: data.id } }
  );
  res.status(202).send("cambiado");
  const infoPayment = await Payment.findOne({ where: { id: data.id } });
  console.log(infoPayment)
  // if (status_delivery === 'enviado') {
  // }
};

module.exports = stateModifiqued;

