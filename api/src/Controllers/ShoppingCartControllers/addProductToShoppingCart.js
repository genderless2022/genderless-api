const {User, Product} = require('../../db');

const addProductToShpppingCart = async(req,res, next)=>{
    const {email, productId, productSize, productQuantity} = req.body;
    try {
        const product = await Product.findOne({where: {id: productId}});
        if (!product) {
            res.status(404).json({msg: 'No producto'});
        } else {
            const stock = product.stock_by_size.find(e => e.size === productSize);
            if (stock.stock <= 0) {
                res.status(404).json({msg: 'No hay stock suficiente'});
            } else {
                const user = await User.findOne({where: {email}});
                if (!user) {
                    res.status(404).json({msg: 'No usuario'});
                } else {
                    const addUser = await user.addProduct(product, {
                        through: {
                            size: productSize,
                            quantity: productQuantity
                        }
                    });
                    res.status(200).json({email: user.email, userId: user.id, product, msg: 'Producto agregado al carrito'});
                }

            }
        }
    } catch (error) {
        next(error);
    }
}
module.exports = addProductToShpppingCart;