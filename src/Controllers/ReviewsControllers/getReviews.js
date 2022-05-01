const {User, Review} = require('../../db.js');

const getReviews = async (req, res, next) => {
    
    try {
       
        const review = await Review.findAll({
            include: [{
                model: User,
                attributes: ['name', 'lastName', 'email'],
            }],
            
        });
        if(review) {
            res.status(200).json({review, msg: 'Reviews encontradas'}); 
        } else {
            res.status(404).json({msg: 'El usuario no ha relizado comentarios'});
        }
        
    } catch (error) {
        next(error);
    }
 
}

module.exports = getReviews;