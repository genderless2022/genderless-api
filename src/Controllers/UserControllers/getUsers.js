const {User} = require('../../db');

const getUsers = async (req, res, next) => {
    try {
        const allUsers = await User.findAll();
        if(allUsers.length) {
            res.status(200).json(allUsers);
        } else {
            res.status(400).json({msg: 'No hay usuarios almacenados'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = getUsers;