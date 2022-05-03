const {Review} = require('../../db');

const deleteReviewById = async (req, res, next) => {
    const {id} = req.params;
    try {
        const review = await Review.destroy({where: {id}});
        if(!review) {
            res.status(404).json({msg: 'Review no encontrado'});
        } else {
            res.status(200).json({msg: 'Review eliminado'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = deleteReviewById;