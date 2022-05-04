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
        let searchDNI = await User.findOne({where:{dni}});

        if(!user && !searchDNI){
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
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
            <b><h3>${name} ${lastName} gracias por crear una cuenta con nosotros</h3></br>`;
             
            await sendEmail({
              email: email,
              subject: 'Registro de cuenta',
              mensaje,
            });

            
            res.status(200).json({msg: 'usuario creado con exito', token, name, lastName, email});
            
        } else {
            user? res.status(400).json({msg: `el email: ${email} ya existe`}) : res.status(400).json({msg: `el dni: ${dni} ya existe`});
        }
                    
    } catch (error) {
        next(error);
    }
}

module.exports = postUser;