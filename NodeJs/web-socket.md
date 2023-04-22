# Web Socket com WS

## Setup do Projeto

Inicializando o projeto:

`npm i express ws dotenv cors helmet morgan`

No arquivo .env coloque:

```js
#.env
PORT=3000
CORS_ORIGIN=*
```

Crie um script para startar a aplicação:

```json
//package.json
"scripts": {
  "start": "node -r dotenv/config index"
},
```

```js
//app.js
const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.post('/login', (req, res, next) => {
    res.json({ token: '123456' });
});

module.exports = app;
```
Crie o index.js:

```js
//index.js
const app = require('./app');
const appWs = require('./app-ws');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})

appWs(server);
```


Crie o seu arquivo app-ws.js para criarmos a primeira versão do nosso servidor.


```js
const WebSocket = require('ws');

function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}

function onMessage(ws, data) {
    console.log(`onMessage: ${data}`);
    ws.send(`recebido!`);
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);

    console.log(`App Web Socket Server is running!`);
    return wss;
}
```

Para testar podemos usar a extensão para o chrome Smart WebSocket Client.


## Enviando mensagens assíncronas

Abaixo, uma implementação simples de função broadcast, que avisa todos os clientes conectados de alguma novidade. insira no app-ws.js

```js
function broadcast(jsonObject) {
    if (!this.clients) return;
    this.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server
    });

    wss.on('connection', onConnection);
    wss.broadcast = broadcast;

    console.log(`App Web Socket Server is running!`);
    return wss;
}
```
Nesta função, se tiver clientes conectados vamos enviar uma mensagem para cada cliente com conexão aberta (OPEN)

No arquivo index.js atualize para:

```js
//index.js
const app = require('./app');
const appWs = require('./app-ws');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})

const wss = appWs(server);

setInterval(() => {
    wss.broadcast({ n: Math.random() });
}, 1000)
```

Agora, se você se conectar usando o Smart WebSocket Client se conectar no servidor, passará a receber um número aleatório a cada segundo, independente se tiver mandando uma mensagem para o servidor ou não (quando mandar mensagens receberá o “recebido” como resposta).

Repare que o broadcast envia para todos os clientes conectados e com conexão OPEN. Assim, um cliente que esteja desconectado, só passará a receber as mensagens depois de se conectar e somente as próximas mensagens, não existe gestão de histórico, algo que você pode implementar caso deseje usando filas com [RabbitMQ](https://www.luiztools.com.br/post/processamento-assincrono-de-tarefas-com-filas-no-rabbitmq-e-node-js/) ou [AWS SQS](https://www.luiztools.com.br/post/tutorial-de-node-js-com-filas-na-aws-sqs/) por exemplo

## Segurança em Servidor WS

Não queremos deixar nosso servidor aberto pra todo mundo, certo?
Por mais que o protocolo websockets seja bem leve, geralmente ficar enviando dados da sua aplicação para anônimas não costuma ser uma boa ideia.

Um servidor de websockets que deseja verificar a autenticidade de um cliente deve fazê-lo antes da conexão, no momento que chamamos de handshake em redes de computadores. Na biblioteca WS isso é implementado através de uma função verifyClient que deve ser passada logo na configuração do servidor e que será disparada ANTES de qualquer conexão ser estabelecida, em uma fase de autenticação mesmo.


```js
//app-ws.js
function verifyClient(info, callback) {
    const chave = info.req;//alguma lógica aqui

    if (token) {
        //valida a chave
        return callback(true);
    }
    return callback(false);
}

module.exports = (server) => {
    const wss = new WebSocket.Server({
        server,
        verifyClient
    });

    wss.on('connection', onConnection);
    wss.broadcast = broadcast;

    console.log(`App Web Socket Server is running!`);
    return wss;
}

```
O céu é o limite no que tange o que você pode implementar nesta função verifyClient, mas aqui vai um exemplo simples que implementa uma lógica de CORS e de token para garantir que somente clientes da nossa origem válida (lembra que definimos ela no .env, na parte 1 do tutorial?) e que possuam um token válido é que podem prosseguir (você poderia usar validação de JWT aqui).
E colocaremos:

```js
function corsValidation(origin) {
    return process.env.CORS_ORIGIN === '*' || process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
    if (!corsValidation(info.origin)) return callback(false);

    const token = info.req.url.split('token=')[1];

    if (token) {
        if (token === '123456')
            return callback(true);
    }

    return callback(false);
}
```

Repare que agora já temos alguma segurança embora mínima. Se você reiniciar o seu servidor e testar novamente com o Smart WebSocket Client verá que o botão de conexão parece não funcionar mais. Isso porque para poder se conectar, agora você tem de informar um token válido na querystring, como abaixo.