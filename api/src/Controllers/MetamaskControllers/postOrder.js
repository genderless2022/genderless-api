const { Order, User } = require('../../db');


const postOrder = async (req, res, next) => {
    try {
        const { payment_id, email, productList, status, status_detail, total, sendAddress } = req.body;
        let orderExisting = await Order.findOne({where: {payment_id: String(payment_id)} })
        let userFound = await User.findOne({where: {email: email}})
        if (!orderExisting && userFound){
            // let userFound = await User.findOne({where: { email: email }})
            // let productList = await userFound.getProducts()
            
            if (productList){
                await Order.create({
                    payment_id,
                    email,
                    productList,
                    status,
                    status_detail: status_detail || null,
                    total,
                    sendAddress: sendAddress || null
                }).then( createdOrder => {
                    res.send(createdOrder)
                } ) 

            }
            else{
                res.send('No hay productos en el shopping car o no existe el usuario')
            }
            
        }
        else{
            res.send({msg: 'Payment id already exists or email not found'})
        }

                    
    } catch (error) {
        next(error);
    }
}

module.exports = postOrder;