const {User} = require('../../db.js');

const getProductFromFavorites = async (req, res, next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getFavorites();
            res.status(200).json({products, msg: 'Productos encontrados'}); 
        }
        
    } catch (error) {
        next(error);
    }

}

module.exports = getProductFromFavorites;