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
                <head>
                <style>
                h1 { color: #e7bf50 }
                p { color: #0e1428; font-size: 15px}
                li { color: #0e1428; font-size: 15px}
                </style>
                </head>
                <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
                <h1> ${name} ${lastName} ha modificado su información </h1>
                <p>Sus datos han sido modificado con la siguiente información:</p>
                <li>Nombre: ${name}</li>
                <li>Apellido: ${lastName}</li>
                <li>Fecha de nacimiento: ${born}</li>
                <li>DNI: ${dni}</li>
                <li>Dirección: ${address}</li>
                <li>Provincia: ${province}</li>
                <li>Código postal: ${postal}</li>
                <li>Teléfono: ${phone}</li>
                <p>Si usted no ha realizado dicha acción, por favor contáctenos inmediatamente.</p>;
                `;
                
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
