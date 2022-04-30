const {User} = require('../../db');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const generatePassword = require('../../Middleware/generatePassword');

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
            var transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "genderless2022@gmail.com",
                  pass: "gjzpgjexgkgcbiru",
                },
              });
        
              var mensaje = `
              
              <b><h3>Ingrese a su cuenta con la siguiente contraseña: </h3></br>
              <h2>${newPass}</h2></br>
              <h3>Una vez que ingrese a su cuenta recuerde de cambiar la contraseña</h3></b>`;
              var mailOptions = {
                from: '"Envio de email"<malcolm.kihn33@ethereal.email>',
                to: email,
                subject: "Restablecer contraseña",
                //text: mensaje
                html: mensaje,
              };
              transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email enviado: " + info.response);
                }
              });
            }
            res.status(200).json({msg: 'contraseña enviada a su email'});
    } catch (error) {
        next(error);
    }
}

module.exports = userForgotPassword;
