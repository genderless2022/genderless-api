const {User, Product} = require('../../db');

const putProductToShoppingCart = async(req,res, next)=>{
    const {email, productId, productQuantity} = req.body;
    try {
        const product = await Product.findOne({where: {id: productId}});
        if (!product) {
            res.status(404).json({msg: 'No producto'});
        } else {
            const user = await User.findOne({where: {email}});
            if (!user) {
                res.status(404).json({msg: 'No usuario'});
            } else {
                const addUser = await user.addProduct(product, {
                    through: {
                        quantity: productQuantity,
                    }
                });
                res.status(200).json({email: user.email, userId: user.id, product, msg: 'Producto agregado al carrito'});
            }
        }
    }
    catch(err) {
        next(err);
    }
}

module.exports = putProductToShoppingCart;