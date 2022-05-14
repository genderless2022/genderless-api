const { Payment } = require("../../db");
const sendEmail = require ('../../utils/sendEmail');


const stateModifiqued = async (req, res) => {
  const {data, email} = req.body;
  await Payment.update(
    {
      status_delivery: data.state,
    },
    { where: { id: data.id } }
  );
  res.status(202).send("cambiado");
  const infoPayment = await Payment.findOne({ where: { id: data.id } });
  console.log(infoPayment)
  if (status_delivery === 'enviado') {
    let mensaje = `
            <head>
            <style>
                h1 { color: #e7bf50 }
                p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='23%' height='23%'/>
            <h1> ${name} ${lastName}</h1>
            <b><p>El pedido ha sido enviado al domicilio con los siguientes datos:</p></br>`;
            
            await sendEmail({
                email: email,
                subject: 'Envio de pedido',
                mensaje,
            });

  }
};

module.exports = stateModifiqued;

