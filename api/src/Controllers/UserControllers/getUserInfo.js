const {User} = require('../../db');

const userInfo = async (req, res, next) => {
    try {
        const {email} = req.params;
        const userFound = await User.findOne({where: {email}, attributes: ['name', 'lastName', 'born', 'dni', 'email', 'address', 'province', 'postal', 'phone']});
        if(userFound) {
            res.status(200).json({msg:'Usuario Encontrado', user: userFound});
        } else {
            res.status(404).json({msg: 'Usuario no registrado'});
        };
    } catch (error) {
        next(error);
    };
}

module.exports = userInfo;