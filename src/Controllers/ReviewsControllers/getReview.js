const {Product} = require('../../db.js');

const getReview = async (req, res, next) => {
    const {productId} = req.body;
    try {
        const product = await Product.findOne({where: {id: productId}});
        if(!product) {
            res.status(404).json({msg: 'Usuario no encontrado'});
        } else {
            
            const review = await product.getReviews(productId);
            if(review) {
                res.status(200).json({
                    review, 
                    product_Name: product.name,
                    product_Image: product.image,
                    msg: 'Reviews encontrados'}); 
            } else {
                res.status(404).json({msg: 'Review no encontrado'});
            }
        }
        
        
    } catch (error) {
        next(error);
    }
}

module.exports = getReview;