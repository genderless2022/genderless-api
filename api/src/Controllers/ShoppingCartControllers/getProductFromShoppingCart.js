const {User} = require('../../db.js');

const getProductFromShoppingCart = async (req, res, next) => {
    const {email} = req.params;
    try {
        const user = await User.findOne({where: {email}});
        if (!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getProducts();
            if (products.length) {
                res.status(200).json({products, msg: 'Productos encontrados'});

            } else {
                res.status(404).json({msg: 'Carrito vacío'});
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = getProductFromShoppingCart;