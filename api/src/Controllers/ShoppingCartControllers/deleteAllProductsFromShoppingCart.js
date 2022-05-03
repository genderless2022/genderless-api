const {User} = require('../../db');

const deleteAllProductsShoppingCart = async (req, res, next) => {
    const {email} = req.params;
    try {
        const user = await User.findOne({where: {email}});
        if(!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getProducts();
            if(products.length){
                const ids = products.map(prod => prod.id);
                for(index in ids) {
                    await user.removeProducts(ids[index]);
                }
                res.status(200).json({msg: 'Productos eliminados del carrito'});
            } else {
                res.status(404).json({msg: 'Carrito vacío'});
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = deleteAllProductsShoppingCart;