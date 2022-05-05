const {User} = require('../../db');
const ID_LIST_MAILCHIMP = process.env.ID_LIST_MAILCHIMP;
const mailchimp = require('@mailchimp/mailchimp_marketing');
var md5 = require('md5');

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
          res.status(200).json({msg:"Te has suscrito a nuestro newsletter"});
      }
    
  } catch (error) {
    next(error)  
  }
  
  
}

module.exports = newsletter;
