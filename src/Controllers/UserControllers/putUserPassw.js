const {User} = require('../../db');
const bcrypt = require('bcryptjs');

const putUserPassword = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const allUsers = await User.findAll();
        if (allUsers.length) {
            const updatePassword = await User.update({password: await bcrypt.hash(password, 10)},
                {where: {
                    email: email,
                }}
            );
            res.status(200).json({msg: 'Contraseña actualizada'})
        } else {
            res.status(400).json({msg: 'No hay usuarios almacenados'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = putUserPassword;