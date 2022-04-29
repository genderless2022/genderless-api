const {User} = require('../../db');

const deleteUser = async (req, res, next) => {
    const {email} = req.params;
    try {
        const user = await User.findOne({where: {email}});
        if (user) {
            await User.destroy({
                where: { email: email },
            })
            res.status(200).json({msg:'El usuario fue eliminado con éxito'});
        } else {
            res.status(400).json({msg:'El usuario no existe'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = deleteUser;