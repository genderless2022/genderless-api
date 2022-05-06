const {User} = require ('../../db');
const { compare } = require('../../Middleware/handleBCript');
const {tokenSign} = require('../../Middleware/generateToken');

const login = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where: {email}});
        if(user){
            const match = await compare(password, user.password);
            if(match){
                const tokenSession = await tokenSign(user);
                res.status(200).json({msg: 'usuario logueado con éxito',email: user.email, user: user, id: user.id, name: user.name, permission:user.permission, tokenSession});
            } else {
                res.status(400).json({msg: 'contraseña incorrecta'});
            }
        } else {
            res.status(400).json({msg: 'email no registrado'});
        }    
    } catch (error) {
        next(error);
           
    }
}

module.exports = login;