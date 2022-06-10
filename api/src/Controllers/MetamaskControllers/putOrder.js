const { Order } = require("../../db");
const User = require("../../models/User");
const sendEmail = require ('../../utils/sendEmail');


const putOrder = async (req, res) => {
  const {payment_id, email, newStatus, statusDetail, sendAddress} = req.body;
  console.log(payment_id, email, newStatus, statusDetail, sendAddress);
  try{
       /*  let userFound = User.findOne({where: {email: email}})  */
      await Order.update(
        {
          status: newStatus || 'No status provided' ,
          status_detail: statusDetail || 'No detail provided',
          sendAddress: sendAddress
        },
        { where: { payment_id: payment_id } }
      ).then( async currentOrder => {
            console.log({msg: currentOrder})
            await Order.findAll({where: {payment_id: String(payment_id)}}).then( orderModified => {
                res.send({msg: orderModified})
            })

      });
  }
  catch (error ){
      res.send({msg: error})
  }
//   res.status(202).send();
  

  }


module.exports = putOrder;

