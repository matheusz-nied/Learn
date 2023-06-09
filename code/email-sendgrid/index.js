(async () => {
    require('dotenv-safe').config();
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
        to: "theufernandes@discente.ufg.br",
        from: "matheustae@hotmail.com",
        subject: "Sending with SendGrid is Fun",
        text: " and easy to do anywhere, even with nodejs",
        html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    try {
        const result = await sgMail.send(msg);
        console.log("Email sent", result);
    } catch (error) {
        console.log(error);
    }
})();
