
const ID_LIST_MAILCHIMP = process.env.ID_LIST_MAILCHIMP;
var md5 = require('md5');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const API_KEY_MAILCHIMP = process.env.API_KEY_MAILCHIMP;
const SERVER_PREFIX_MAILCHIMP = process.env.SERVER_PREFIX_MAILCHIMP;
mailchimp.setConfig({
    apiKey: API_KEY_MAILCHIMP,
    server: SERVER_PREFIX_MAILCHIMP
  });
const unsubscribeNewsletter = async (req, res, next) => {
    const {email} = req.params;
    try {
        const subscriberHash = md5(email.toLowerCase());
        const response = await mailchimp.lists.updateListMember(
        ID_LIST_MAILCHIMP,
        subscriberHash,
        {
          status: "unsubscribed"
        }
      );
      console.log(`This user is now ${response.status}.`);
        res.status(200).json({msg: 'Usuario desuscrito correctamente'});
    } catch (error) {
        next(error);
    }
}

module.exports = unsubscribeNewsletter;