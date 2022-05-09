const {User, Review} = require('../../db');


const deleteReview = async (req, res, next) => {
    try {
        const {email, productId} = req.params;
        
        const user = await User.findOne({where: {email}});
        //console.log(user);
       
        if(!user) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            const products = await user.getReviews();
            //console.log(products, '<--')
            if(!products) {
                res.status(404).json({msg: 'Producto no posee comentarios'});
            } else {
                const idproducts = products.map(prod => prod.ProductId);
                               
                if(idproducts.includes(parseInt(productId))) {
                    console.log('entro???')
                    const review = await Review.destroy({where: {ProductId: productId, UserId: user.id}});
                    console.log(review)
                    res.status(200).json({review, msg: 'Review eliminado'});
                } else {
                    res.status(404).json({msg: 'Review no encontrado'});
                }
                     
            } 
                
        } 
        
    } catch (error) {
        next(error);
    }
}

module.exports = deleteReview;