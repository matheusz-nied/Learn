# Enviando emails

-   [Nodemailer](#nodemailer)
-   [SendGrid](#SendGrid)

## Nodemailer

Instalando as dependências:

`npm install express cors nodemailer multer`

A construção abaixo é de um arquivo api.js usa ExpressJS como web framework criando apenas uma rota GET simples e um POST que ecoa o request recebido. Note que usei o CORS aqui, para permitir que essa web API seja chamada pelo frontend mais tarde.

```js
const express = require("express");
const app = express();
const upload = require("multer")();

app.use(require("cors")());
app.use(express.json());

app.get("/", (req, res, next) => {
    res.json({ message: "Tudo ok por aqui!" });
});

app.post('/send', upload.single('anexo'), (req, res, next) => { 
    const nome = req.body.nome;
    const email = req.body.email;
    const mensagem = req.body.mensagem;
    const anexo = req.file;
    require("./nodemail")(email, nome, mensagem, anexo)
        .then(response => res.json(response))
        .catch(error => res.json(error));
})

app.listen(3030, () => console.log("Servidor escutando na porta 3030..."));
```
Note que adicionei um middleware ‘upload’ baseado em Multer. Este middleware servirá para receber o anexo que for enviado para a API, quando houver, pois ele é transferido como uma stream de bytes, ao invés de JSON tradicional, que será carregado em req.file ao invés de req.body.

Este ponto é muito importante: para que sua Web API consiga receber tanto o JSON quanto arquivos anexos, o Content-Type do HTTP Request deve ser multipart/form-data.


Criando um módulo de envio de e-mails que iremos chamar de nodemail.js:

```js
const mailer = require("nodemailer");

module.exports = (email, nome, mensagem, anexo) => {
    const smtpTransport = mailer.createTransport({
        //host: "smtp.umbler.com",
        host: "gmail",
       // port: 587,
        //secure: false, //SSL/TLS
        auth: {
            user: "contato@matheusznied.com.br",
            pass: "XXXXX",
        },
    });

    const mail = {
        from: "Prof. Matheus <contato@matheusznied.com.br>",
        to: email,
        subject: `${nome} te enviou uma mensagem`,
        text: mensagem,
        //html: "<b>Opcionalmente, pode enviar como HTML</b>"
    };

    if (anexo) {
        console.log(anexo);
        mail.attachments = [];
        mail.attachments.push({
            filename: anexo.originalname,
            content: anexo.buffer,
        });
    }

    return new Promise((resolve, reject) => {
        smtpTransport
            .sendMail(mail)
            .then((response) => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch((error) => {
                smtpTransport.close();
                return reject(error);
            });
    });
};
```

No meu utilizei o host do gmail. Devo estudar como utilizar outros.
Usando o gmail devemos permitir nas configurações da conta acesso de outros apps.
Só usar!



## SendGrid

Para começar configure sua conta na SendGrid. Após ter em mãos a sua KEY APi vamos começar o projeto:

`npm init -y`
`npm i @sendgrid/mail dotenv-safe`

Cria seu arquivo `.env` com sua Key.
Agora só falta criar o código para começar a enviar seus e-mails.

```js
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
```

E pronto!