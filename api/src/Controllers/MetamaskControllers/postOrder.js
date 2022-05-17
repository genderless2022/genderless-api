const { Order, User } = require('../../db');


const postOrder = async (req, res, next) => {
    try {
        const { payment_id, email, productList, status, status_detail, total } = req.body;
        let orderExisting = await Order.findOne({where: {payment_id: String(payment_id)} })
        if (!orderExisting){
            // let userFound = await User.findOne({where: { email: email }})
            // let productList = await userFound.getProducts()
            
            if (productList){
                await Order.create({
                    payment_id,
                    email,
                    productList,
                    status,
                    status_detail: status_detail || null,
                    total
                }).then( createdOrder => {
                    res.send(createdOrder)
                } ) 

            }
            else{
                res.send('No hay productos en el shopping car o no existe el usuario')
            }
            
        }
        else{
            res.send({msg: 'Payment id already exists'})
        }

                    
    } catch (error) {
        next(error);
    }
}

module.exports = postOrder;