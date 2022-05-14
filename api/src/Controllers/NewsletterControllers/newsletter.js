const {User} = require('../../db');
const ID_LIST_MAILCHIMP = process.env.ID_LIST_MAILCHIMP;
const mailchimp = require('@mailchimp/mailchimp_marketing');
const sendEmail = require('../../utils/sendEmail');

const newsletter = async (req, res, next) => {
  const {email} = req.body;
  try {
    
    const user = await User.findOne({where: {email}})
      
      if (user) {
    
        const addEmail = await mailchimp.lists.addListMember(ID_LIST_MAILCHIMP, {
          email_address: email,
          status: "subscribed",
          'update_existing': true,
          merge_fields: {
            FNAME: user.name,
            LNAME: user.lastName,
                   
          }
          
        });
        console.log(
          `Successfully added contact as an audience member. The contact's id is ${
            addEmail.id
          }.`
          );

        res.status(200).json({msg:"Te has suscrito a nuestro newsletter"});
          
      } else {
        const addEmail = await mailchimp.lists.addListMember(ID_LIST_MAILCHIMP, {
          email_address: email,
          status: "subscribed",
          'update_existing': true,
        });
        console.log(
          `Successfully added contact as an audience member. The contact's id is ${
            addEmail.id
          }.`
          );

          let mensaje = `
            <head>
            <style>
             
            h1 { color: #e7bf50; }
            p { color: #0e1428; font-size: 15px}
            </style>
            </head>
            <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
            <h1> Usted se ha susbscrito a nuestros newsletter </h1>
            <p>Gracias por suscribirse a nuestro canal de noticias con el email: ${email}, en dicho canal usted recibirá información sobre nuestros productos y promociones. </p>
            `;
             
            await sendEmail({
              email: email,
              subject: 'Subscripción a canal de noticias',
              mensaje,
            });
          res.status(200).json({msg:"Te has suscrito a nuestro newsletter"});
      }
    
  } catch (error) {
    next(error)  
  }
  
  
}

module.exports = newsletter;
