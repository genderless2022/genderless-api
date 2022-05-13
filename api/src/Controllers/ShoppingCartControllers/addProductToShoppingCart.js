const {User, Product} = require('../../db');

const addProductToShpppingCart = async(req,res, next)=>{
    const {email, productId, productZise} = req.body;
    try {
        const product = await Product.findOne({where: {id: productId}});
        if (!product) {
            res.status(404).json({msg: 'Producto no encontrado'});
        } else {
            const user = await User.findOne({where: {email}});
            if(!user) {
                res.status(404).json({msg: 'Usuario no encontrado'});
            } else {
                const addUser = await user.addProduct(product, {
                    through: {
                        stock_by_size: productZise,
                    }

                });
                res.status(200).json({email: user.email, userId: user.id, product, msg: 'Producto agregado al carrito'});
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = addProductToShpppingCart;