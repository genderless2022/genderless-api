const { Payment } = require("../../db");

const stateModifiqued = async (req, res) => {
  const data = req.body.data;
  console.log(data.state);
  await Payment.update(
    {
      status_delivery: data.state,
    },
    { where: { order_id: data.id } }
  );
  /*creada, procesando, cancelada, completa, enviado
  modificar tambien la columna status la cual tiene: aprobado, cancelado y pendiente
  */
  res.status(202).send("cambiado");
};

module.exports = stateModifiqued;
