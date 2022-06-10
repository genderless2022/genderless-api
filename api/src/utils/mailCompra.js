const nodemailer = require('nodemailer');

const comprasEmail = async (email) => {
 const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  
        let mensaje = `
        <head>
        <style>
        h1 { color: #e7bf50; }
        h2 { color: #9381ff; }
        p { color: #0e1428; font-size: 15px}
        </style>
        </head>
        <img src='https://i.imgur.com/IfdXZqt.jpg' alt='logo' width='20%' height='20%'/>
        <h1> Gracias por su compra </h1>
        <p>Le estaremos informando cuando su compra esté preparada</p>
        
        `;
        const mailOptions = {
            from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
            to: email,
            subject: "Confirmación de compra",
            html: mensaje,
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    
}


module.exports = comprasEmail;