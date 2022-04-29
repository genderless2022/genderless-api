const {User} = require ('../../db.js');

const deleteProductFromFavorites = async (req, res, next) => {
    try {
        const {email, productId} = req.params;
        const user = await User.findOne({where: {email}});
        if(!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getFavorites();
            const ids = products.map(prod => prod.id);
            
            if(ids.includes(parseInt(productId))) {
                const favorite = await user.removeFavorite(parseInt(productId));
                const actualFavorite = await user.getFavorites();
                res.status(200).json({actualFavorite, msg: 'Producto eliminado de favoritos'});
            } else {
                res.status(404).json({msg: 'Producto no encontrado'});
            }   
        }
    } catch (error) {
        next(error);
    }
}

module.exports = deleteProductFromFavorites;