const {User} = require('../../db');
const {encrypt} = require('../../Middleware/handleBCript');
const {tokenSign} = require('../../Middleware/generateToken');
const sendEmail = require ('../../utils/sendEmail');

const postUser = async (req, res, next) => {
    try {
        const {name,lastName, picture, born, dni, email, address, province, postal, phone, password, permission} = req.body;

        let passwordHash = null;
        if(password){
            passwordHash = await encrypt(password);
        }

        let user = await User.findOne({where:{email}});

        if(!user){
            user = await User.create({
                name,
                lastName,
                picture,
                born,
                dni,
                email,
                address,
                province,
                postal,
                phone,
                password: passwordHash,
                permission,
            });

            const token = await tokenSign(user);
            
            let mensaje = `
            <head>
            <style>
                h1 { color: #e7bf50 }
                p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='23%' height='23%'/>
            <h1>Bienvenido ${name} ${lastName}</h1>
            <b><p>Gracias por crear una cuenta con nosotros</p></br>`;
            
            await sendEmail({
                email: email,
                subject: 'Registro de cuenta',
                mensaje,
            });

            
            res.status(200).json({msg: 'usuario creado con exito', token, name, lastName, email});
            
        } else {
            res.status(400).json({msg: `el email: ${email} ya existe`});
        }
                    
    } catch (error) {
        next(error);
    }
}

module.exports = postUser;