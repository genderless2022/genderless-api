const {verifyToken} = require('./generateToken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if(tokenData === undefined){
            res.status(401).json({msg: 'No esta autorizado'});
        } else {
            if(tokenData.id) {
                next()
            } else {
                res.status(401).json({msg: 'no autorizado'})
            }
            
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = checkAuth;