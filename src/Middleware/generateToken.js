const jwt = require('jsonwebtoken');

const tokenSign = async (user) => {
    try {
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                permission: user.permission,
            },
            process.env.KEY_TOKEN,
            {
                expiresIn: '1h',
            },
        )
        return token;
    } catch (error) {
        console.log(error);
    }
}


const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.KEY_TOKEN);
    } catch (error) {
        console.log(error);
    }
}


const tokenSignOut = async (user) => {
    try {
        return jwt.sign (
            {
                id: user.id,
                email: user.email,
                permission: user.permission,
            },
            process.env.KEY_TOKEN,
            {
                expiresIn: '1',
            }
        )
    } catch (error) {
        console.log(error);
    }
}
module.exports = {tokenSign, verifyToken, tokenSignOut};