
const {User} = require('../../db.js');

const Mailchimp = require('mailchimp-api-v3');
var md5 = require('md5');

const API_KEY_MAILCHIMP = process.env.API_KEY_MAILCHIMP;
const ID_LIST_MAILCHIMP = process.env.ID_LIST_MAILCHIMP;

let mailchimp;

if(API_KEY_MAILCHIMP){
  mailchimp = new Mailchimp(API_KEY_MAILCHIMP);
}
const isEmptyMailchimp = typeof mailchimp === Object && mailchimp.keys(mailchimp).length === 0 && mailchimp.constructor === Object;

const newsProductFavorite = (req, res, data) => {
    const {email} = req.body;
    try {
        // if (!mailchimp || !email || isEmptyMailchimp || !ID_LIST_MAILCHIMP) {
        //     return res.status(404).json({msg: `No puede suscribirse, perdida del parametro ${!email ? 'email': 'API Key or List ID'}`});
        // }
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
            return Promise.resolve({ m });
            
        })
        res.status(200).json({msg: 'Suscrito correctamente para recibir noticias de su producto favorito'});
    } catch (error) {
        console.log(error);
    }

    

   
}

const addTag = async (email) => {

    const user = await User.findOne({where: {email: email}});
    if(!user) {
        res.status(404).json({msg: 'Usuario no encontrado'});
    }
    const products = await user.getFavorites();
    // console.log(products, '<--')
    const name = products.map(product => product.name); 
    console.log(name, '<--')
    let emailHash = md5(email.toLowerCase());
    return mailchimp.post(`lists/${ID_LIST_MAILCHIMP}/members/${emailHash}/tags`, {
       
        tags: [{"name": `${name}`, "status": "active"}]
    }).then(m => {
        if (m && m.errors && Object.keys(m.errors).length > 0) {
            console.log('Error adding tag to subscriber ', m.errors);
        }
        return m;
    }).catch(err => {
        console.warn('Failed to tag subscriber', email, err);
    });
}

module.exports = newsProductFavorite;
