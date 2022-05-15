const {User} = require('../../db');
const bcrypt = require('bcryptjs');
const generatePassword = require('../../Middleware/generatePassword');
const sendEmail = require ('../../utils/sendEmail');

const userForgotPassword = async (req, res, next) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ where : {email}});
        if (!user) {
            res.status(400).json({msg: 'usuario no registrado'});
        } else {
            const newPass = generatePassword(15);
            const changePass = await User.update(
                {password: await bcrypt.hash(newPass, 10)}, 
                {
                    where: {
                        email: email,
                    },
                }
            );
                 
            let mensaje = `
            <head>
            <style>
            h1 { color: #e7bf50; }
            h2 { color: #9381ff; }
            p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
            <h1> Usted ha solicitado una nueva contraseña </h1>
            <p>Ingrese a su cuenta con la siguiente contraseña: </p>
            <h2>${newPass}</h2>
            <p>Una vez que ingrese a su cuenta recuerde de cambiar la contraseña</p>`;
             
            await sendEmail({
              email: email,
              subject: 'Olvido de contraseña',
              mensaje,
            });
            
            res.status(200).json({msg: 'contraseña enviada a su email', newPass});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = userForgotPassword;
