
const {User} = require('../../db.js');
const sendEmail = require('../../utils/sendEmail');

const Mailchimp = require('mailchimp-api-v3');
var md5 = require('md5');

const API_KEY_MAILCHIMP = process.env.API_KEY_MAILCHIMP;
const ID_LIST_MAILCHIMP = process.env.ID_LIST_MAILCHIMP;

let mailchimp;

if(API_KEY_MAILCHIMP){
  mailchimp = new Mailchimp(API_KEY_MAILCHIMP);
}
const isEmptyMailchimp = typeof mailchimp === Object && mailchimp.keys(mailchimp).length === 0 && mailchimp.constructor === Object;

const newsProductFavorite = async (req, res, data) => {
    const {email} = req.body;
    try {
        // if (!mailchimp || !email || isEmptyMailchimp || !ID_LIST_MAILCHIMP) {
        //     return res.status(404).json({msg: `No puede suscribirse, perdida del parametro ${!email ? 'email': 'API Key or List ID'}`});
        // }
        const user = await User.findOne({where: {email}})
        if (user) {
            mailchimp.post(`lists/${ID_LIST_MAILCHIMP}`, {
                "update_existing":true,
                members: [{
                    email_address: email.toLowerCase(),
                    status : data.status || 'subscribed',
                    merge_fields: {
                        FNAME: user.name,
                        LNAME: user.lastName,
                    },
                }],
        
            }).then(m => {
                if (m && Object.keys(m.errors).length > 0) {
                    console.log('Error adding new subscriber to MC', m.errors);
                    return Promise.reject({ m });
                }
                addTag(email)
    
                let mensaje = `
                <head>
                <style>
                
                h1 { color: #e7bf50; }
                p { color: #0e1428; font-size: 15px}
                </style>
                </head>
                <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
                <h1> Usted se ha susbscrito a nuestros newsletter </h1>
                <b><p>Gracias por suscribirse a nuestro canal de noticias con el email: ${email}, en dicho canal usted recibirá información sobre sus productos favoritos. </p></br>
                `;
                
                sendEmail({
                    email: email,
                    subject: 'Subscripción a canal de noticias',
                    mensaje,
                });
                
                return Promise.resolve({ m });
            })
                   
            res.status(200).json({msg: 'Suscrito correctamente para recibir noticias de su producto favorito'});
        } else {
            mailchimp.post(`lists/${ID_LIST_MAILCHIMP}`, {
                "update_existing":true,
                members: [{
                    email_address: email.toLowerCase(),
                    status : data.status || 'subscribed',
                    merge_fields: {},
                }],
        
            }).then(m => {
                if (m && Object.keys(m.errors).length > 0) {
                    console.log('Error adding new subscriber to MC', m.errors);
                    return Promise.reject({ m });
                }
                addTag(email)
    
                let mensaje = `
                <head>
                <style>
                
                h1 { color: #e7bf50; }
                p { color: #0e1428; font-size: 15px}
                </style>
                </head>
                <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
                <h1> Usted se ha susbscrito a nuestros newsletter </h1>
                <b><p>Gracias por suscribirse a nuestro canal de noticias con el email: ${email}, en dicho canal usted recibirá información sobre sus productos favoritos. </p></br>
                `;
                
                sendEmail({
                    email: email,
                    subject: 'Subscripción a canal de noticias',
                    mensaje,
                });
                
                return Promise.resolve({ m });
            })
                   
            res.status(200).json({msg: 'Suscrito correctamente para recibir noticias de su producto favorito'});
        }
        
    } catch (error) {
        console.log(error);
    }

    

   
}

const addTag = async (email) => {

    const user = await User.findOne({where: {email: email}});
    if(!user) {
       console.log('no encontrado');
    }
    const products = await user.getFavorites();
   
    const name = products.map(product => product.name); 
   

       let emailHash = md5(email.toLowerCase());
     return mailchimp.post(`lists/${ID_LIST_MAILCHIMP}/members/${emailHash}/tags`, {
          
           tags: [{"name": `${name}`, "status": "active"}]
       })
       .then(m => {
           if (m && m.errors && Object.keys(m.errors).length > 0) {
               console.log('Error adding tag to subscriber ', m.errors);
           }
           return m;
       }).catch(err => {
           console.warn('Failed to tag subscriber', email, err);
       });
   
}
        



    


module.exports = newsProductFavorite;
