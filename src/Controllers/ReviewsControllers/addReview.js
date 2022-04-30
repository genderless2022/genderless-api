const {User, Product} = require('../../db');

const addReview = async (req, res, next) => {
    const {email, productTitle} = req.body;
    try {
        const product = await Product.findOne({where: {name: productTitle}});
        
        if(!product) {
            res.status(404).json({msg: 'Producto no encontrado'});
        } else {
            const review = await product.createReview({
                    
                comment: req.body.comment,
                rating: req.body.rating,
                
            });
            const user = await User.findOne({where: {email}});
            if(!user) {
                res.status(404).json({msg: 'Usuario no encontrado'});
            } else {
                const addUser = await user.addReview(review)
                res.status(201).json({
                    msg: 'Review creada',
                    review,
                    
                });
            }
        }
    } catch (error) {
        next(error);
    }
}

module.exports = addReview;