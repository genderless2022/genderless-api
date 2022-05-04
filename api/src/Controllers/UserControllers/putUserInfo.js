const { User } = require("../../db");
const sendEmail = require ('../../utils/sendEmail');

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
                let mensaje = `
                <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
                <b><h3>${name} ${lastName} usted ha modificado alguno de sus datos, si no ha sido usted, por favor contáctenos inmediatamente.</h3></br>`;
                
                await sendEmail({
                email: email,
                subject: 'Modificación de datos',
                mensaje,
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
