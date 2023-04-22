# Express.js

- [Basic](#Basic)
  - [Inicializando o projeto](#Inicializando-o-projeto)
  - [Instalando dependências](#Instalando-dependências)
- [Express project](#Express-project)
  - [Express Generator](#Express-Generator)
  - [Conectando no MongoDB com Node](#Conectando-no-MongoDB-com-Node)

# Basic
## Inicializando o projeto
`$ npm init -y`

Entçao será criado um `package.json`:
```json
{
  "name": "api_express",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## Instalando dependências

Iremos instalar algumas dependências.

Express.js: O framework mais utilizado e conhecido dentro do ecossistema Node.js.

Body-Parser: Pacote responsável por realizar o parser (serialização) das informações que o cliente nos envia e alocar dentro de um objeto Javascript.

Morgan: Log de todas as requisições de nosso servidor.

Cors: Administra o Cross Domain Origin no servidor.

`$ npm install express body-parser morgan cors --save`

## Criando servidor

Agora iremos criar nosso servidor:

```js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// DB local (tempo de execução)
const data = [];

// criação de rota que será acessada utilizando o método HTTP GET/
app.get('/', (req, res) => {
  return res.json({ data });
});

// criação de rota que será acessada utilizando o método HTTP POST/
app.post('/add', (req, res) => {
  const result = req.body;

  if (!result) {
    return res.status(400).end();
  }

  data.push(result);
  return res.json({ result });
});

app.listen(PORT, () => console.log('Express running at http://localhost:3000'));
```





# Express project

## Express Generator

`npm install -g express-generator`

`express -e --git node-mongo-crud`

O “-e” é para usar a view-engine (motor de renderização) EJS, ao invés do tradicional Jade/Pug. Já o “–git” deixa seu projeto preparado para versionamento com Git. Aperte Enter e o projeto será criado (talvez ele peça uma confirmação, apenas digite ‘y’ e confirme).

## Conectando no MongoDB com Node

`npm install mongodb dotenv`

 As variáveis de ambiente precisam ser a primeira coisa a serem carregadas quando a aplicação subir. Então vá no arquivo bin/www e adicione essa linha bem no topo.

`require("dotenv").config();`

Essa instrução irá procurar um arquivo de variáveis de ambiente na raiz do seu projeto, que você deve criar com o nome .env e o seguinte conteúdo.

```js
MONGO_HOST=mongodb://127.0.0.1:27017
MONGO_DATABASE=mongonativo
```
Vamos criar um novo arquivo chamado db.js na raiz :

```js
const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();

    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}
```


