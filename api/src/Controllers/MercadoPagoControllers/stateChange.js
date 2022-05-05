const { Payment } = require("../../db");

const stateModifiqued = async (req, res) => {
  const data = req.body;
  await Payment.update(
    {
      status: data.state,
    },
    { where: { id: data.id } }
  );
  res.status(202).send("cambiado");
};

module.exports = stateModifiqued;
