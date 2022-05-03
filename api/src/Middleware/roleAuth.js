const {verifyToken} = require('./generateToken');
const {User} = require('../db');

const checkRoles = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        if(token) {
            const tokenData = await verifyToken(token);
            //console.log(tokenData, 'tokenData');
            const userData = await User.findOne({where:{id: tokenData.id}});
            if([].concat(roles).includes(userData.permission)){
                next();
            } else {
                res.status(401).json({msg: `No miciela, no tienes el permiso de ${roles} `})
            }
            
        } else {
            res.status(401).json({msg: 'no autorizado'})
        }
    } catch (error) {
        next(error);
    }
}

module.exports = checkRoles;