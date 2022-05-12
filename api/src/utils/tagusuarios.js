const {User} = require('../db');
const md5 = require("md5");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = process.env.ID_LIST_MAILCHIMP;
const sendEmail = require('./sendEmail');
mailchimp.setConfig({
  apiKey: process.env.API_KEY_MAILCHIMP,
  server: process.env.SERVER_PREFIX_MAILCHIMP
});

async function runTags(name, image, description, price, discount) {

  let users = await User.findAll();
  let emails = await users.map(user => user.email);
  
  for (let i = 0; i < emails.length; i++) {
    try {
      const subscriberHash = md5(emails[i].toLowerCase());
      const response = await mailchimp.lists.getListMember(
        listId,
        subscriberHash
      );
      
      
      
      const tagsNames = response.tags.map(tag => tag.name);
      // console.log(tagsNames)
      if(discount === 0) {
        if (tagsNames.toString().split(',').includes(name)) {
          
          let mensaje = `
            <head>
            <style>
             h1 { color: #e7bf50 }
             h2 { color: #0e1428}
             p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <h2>Novedades</h2>
            <h1>${name}</h1>
            <img src="${image}" alt='producto' width='250px'/>
            <p>${description}</p>
            <p>Precio: $ ${price}</p>
            <p>Para más información ingrese a nuestra web</p>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='23%' height='23%'/>
            `
           
             await sendEmail({
              email: emails[i],
              subject: 'Información sobre su producto favorito',
              mensaje,
            });
        } 
      } else {
        if (tagsNames.toString().split(',').includes(name)) {
          
          let mensaje = `
            <head>
            <style>
            h1 { color: #e7bf50 }
            h2 { color: #0e1428}
             p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <h2>Novedades</h2>
            <h1>${name}</h1>
            <img src="${image}" alt='producto' width='250px'/>            
            <p>${description}</p>
            <p>Precio: $ ${price}</p>
            <p>Descuento: ${discount}%</p>
            <p>Para más información ingrese a nuestra web</p>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='23%' height='23%'/>
            `
           
             await sendEmail({
              email: emails[i],
              subject: 'Nuevo Producto',
              mensaje,
            });
        } 
      }
        
      console.log(`This user's subscription status is ${response.status} ${response.tags_count} ${response.email_address} ${response.tags.map(tag => tag.name)}`);
    } catch (e) {
      if (e.status === 404) {
        console.error(`This email is not subscribed to this list`);
      }
    }
  }
  
}

module.exports = runTags;