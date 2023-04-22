const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        service: 'gmail', 

        auth: {
            user: 'theufernandes@discente.ufg.br',
            pass: 'Uhtred10!'
        }
    })
    
    const mail = {
        from: "Prof. Matheus <contato@matheusznied.dev>",
        to: email,
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    }
    
    if(anexo){
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer
        })
    }
    
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}