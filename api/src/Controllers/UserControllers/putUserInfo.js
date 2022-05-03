const { User } = require("../../db");

const putUserInfo = async (req, res, next) => {
    const {
        name, lastName, email, picture, born, dni, address, province, postal, phone} = req.body;
    try {
        if (email) {
            console.log(email);
            const allUsers = await User.findAll();
            if (allUsers.length) {
                const result = await User.update({name, lastName, picture, born, address, dni, province, postal, phone},
                    {
                        where: {
                        email: email,
                        },
                    }
                    
                );
                const user = await User.findOne({
                    where: {
                        email: email,
                    },
                });
                res.status(200).json({ msg: "Usuario actualizado", user });
            } else {
                res.status(400).json({ msg: "No hay usuarios almacenados" });
            }
        } else {
        res.status(400).json({ msg: "El email no registrado" });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = putUserInfo;
