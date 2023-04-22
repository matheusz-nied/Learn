const express = require('express');
const app = express();

app.use(require("cors")()); 
app.use(express.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

const upload = require("multer")();
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