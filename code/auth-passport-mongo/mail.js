module.exports = async function (to, subject, text) {
    const sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            from: process.env.MAIL_USERNAME,
            to,
            subject,
            text,
            html: "<strong>Email enviado para fins de estudo de autenticação apenas!</strong>",
        };
    

        try {
            const result = await sgMail.send(msg);
            console.log("Email sent", result);
        } catch (error) {
            console.error(error);
        }
    
};
