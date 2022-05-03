const {User} = require('../../db');

const deleteProductFromShoppingCart = async (req, res, next) => {
    const {email, productId} = req.params;
    try {
        const user = await User.findOne({where: {email}})
        if (!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getProducts();
            const ids = products.map(prod => prod.id);
            if (ids.includes(parseInt(productId))) {
                const cart = await user.removeProduct(parseInt(productId));
                const actualProd = await user.getProducts();
                res.status(200).json({actualProd, msg: 'Producto eliminado del carrito'});
            } else {
                res.status(404).json({msg: 'Producto no encontrado'});
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports = deleteProductFromShoppingCart;