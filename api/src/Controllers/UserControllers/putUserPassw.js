const {User} = require('../../db');
const bcrypt = require('bcryptjs');
const sendEmail = require ('../../utils/sendEmail');

const putUserPassword = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({where:{email}});
        if (user) {
            const updatePassword = await user.update({password: await bcrypt.hash(password, 10)},
                
            );
            
            let mensaje = `
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
            <b><h3>${user.name} ${user.lastName} usted ha modificado su contraseña, si usted no ha realizado dicha actividad, por favor contacte inmediatamente con nosotros.</h3></br>`;
             
            await sendEmail({
              email: email,
              subject: 'cambio de contraseña',
              mensaje,
            });
            res.status(200).json({msg: 'Contraseña actualizada', name: updatePassword.name, lastName: updatePassword.lastName, email: updatePassword.email});
        } else {
            res.status(400).json({msg: 'No hay usuarios almacenados'});
        }
    } catch (error) {
        next(error);
    }
}

module.exports = putUserPassword;