const { Order } = require('../../db');


const getOrders = async (req, res, next) => {
    const { email } = req.query
    console.log(email);

        try {
            let ordersExisting = !email ? await Order.findAll() : await Order.findAll({where: {email: email}}) 
            if (ordersExisting){
                res.send(ordersExisting)
    
            }
            else{
                res.send({msg: 'There are no orders'})
            }
    
                        
        } catch (error) {
            next(error);
        }
    
}

module.exports = getOrders;