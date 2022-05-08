const { Payment } = require("../../db");

const usuarioHistorial = async (req, res) => {
  const {email} = req.params;
  console.log(email);
  const historial = await Payment.findAll({
    where: {
      email: email,
    },
  });
  res.status(202).send(historial);
};

module.exports = usuarioHistorial;
