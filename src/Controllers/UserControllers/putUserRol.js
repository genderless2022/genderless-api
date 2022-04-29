const {User} = require('../../db');

const putUserRole = async (req, res, next) => {
    const {email, permission} = req.body;
    try {
        const userFound = await User.findOne({where: {email}});
        if (userFound) {
            await User.update({permission},
                {where: {
                    email: email,
                }},
            );
            res.status(200).json({msg: 'Rol actualizado'});
        } else {
            res.status(400).json({msg: 'No hay usuarios almacenados'});
        }
    } catch (error) {
        next(error);
          
    }
}

module.exports = putUserRole;