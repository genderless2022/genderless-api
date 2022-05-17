const { Order } = require("../../db");
const sendEmail = require ('../../utils/sendEmail');


const putOrder = async (req, res) => {
  const {payment_id, email, newStatus, statusDetail} = req.body;
  try{

      await Order.update(
        {
          status: newStatus || 'No status provided' ,
          status_detail: statusDetail || 'No detail provided'
        },
        { where: 
            { payment_id: String(payment_id) 
            } 
        }
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

