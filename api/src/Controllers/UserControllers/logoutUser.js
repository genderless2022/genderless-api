const {User} = require('../../db');
const jwt = require('jsonwebtoken');
const {tokenSignOut} = require('../../Middleware/generateToken');

const logoutUser = async (req, res, next) => {
    try {
        const emailUser = req.body.email;
        const token = req.headers.authorization.split(' ').pop();
        const deco  = jwt.decode(token);
        const user = await User.findOne({where : {email: emailUser}});
        const tokenLogout = await tokenSignOut(user);
        res.status(200).json({msg: 'usuario deslogueado con éxito', user, tokenLogout});
    } catch (error) {
        next(error);
    }
        
}

module.exports = logoutUser;