const mailCompra = require ('../../utils/mailCompra');
const { Order, User, Product } = require('../../db');


const postOrder = async (req, res, next) => {
    try {
        const { payment_id, email, productList, status, status_detail, total, sendAddress } = req.body;
        let orderExisting = await Order.findOne({where: {payment_id: String(payment_id)} })
        let userFound = await User.findOne({where: {email: email}})
        
        if (!orderExisting && userFound){
            // let userFound = await User.findOne({where: { email: email }})
            // let productList = await userFound.getProducts()
            productList.map(async (pro) => {
            const product = await Product.findOne({
                where: { name: pro.name },
                });
                const salesNum = Number(product.sales) + Number(pro.UserProduct.quantity);
                const stockChange = product.dataValues.stock_by_size.map((elem) => {
                if (elem.size === pro.UserProduct.size) {
                    let stock = {
                    size: pro.UserProduct.size,
                    stock: elem.stock - pro.UserProduct.quantity,
                    };
                    return stock;
                } else return elem;
                });
                await Product.update(
                {
                    sales: salesNum,
                    stock_by_size: stockChange,
                },
                { where: { name: product.dataValues.name } }
                );
            });

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
                mailCompra(email)
            }
        }
            /* else{
                res.send('No hay productos en el shopping car o no existe el usuario')
            }
            
        }
        else{
            res.send({msg: 'Payment id already exists or email not found'})
        } */

                    
    } catch (error) {
        next(error);
    }
}

module.exports = postOrder;