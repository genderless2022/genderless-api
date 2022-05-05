const {User} = require ('../../db.js');

const deleteProductFromFavorites = async (req, res, next) => {
    try {
        const {email, productId} = req.body;
        //console.log(productId);
        const user = await User.findOne({where: {email}});
        //console.log(user)
        if(!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getFavorites();
            const ids = products.map(prod => prod.id);
            
            if(ids.includes(parseInt(productId))) {
                const favorite = await user.removeFavorite(parseInt(productId));
                res.status(200).json({favorite, msg: 'Producto eliminado de favoritos'});
            } else {
                res.status(404).json({msg: 'Producto no encontrado'});
            }   
        }
    } catch (error) {
        next(error);
    }
}

module.exports = deleteProductFromFavorites;