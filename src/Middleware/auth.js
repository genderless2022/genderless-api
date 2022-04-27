const {verifyToken} = require('./generateToken');

const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        if(token === undefined) {
            res.status(401).json({msg: 'no autorizado'})
        } else {
            const tokenData = await verifyToken(token);
            //console.log(tokenData, 'auth')
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