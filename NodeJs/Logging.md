# Logging

## O que é logging?

Logging é o ato de criar logs, que são registros de mensagens e eventos da sua aplicação. Esses registros podem ou não ser persistentes, ou seja, você pode registrar na saída do console e quem viu, viu, como no caso do console.log. Mas não costuma ser o bastante para ambientes em produção

A alternativa ao console.log efêmero é registrar as mensagens em um arquivo ou banco de logs para visualização posterior, quando houver necessidade. Independente da abordagem, como logging é algo que vai rodar 24×7, é interessante que você saiba dosar o quê, como, quando e onde logar o que acontece na sua aplicação, caso contrário terá problemas.

## Log Local x Log na Nuvem

Log Local tem a vantagem do custo baixo.

Log na Nuvem tem as vantagens da praticidade e velocidade com a qual você irá utilizar os logs.

## Log Local com Winston

É possível fazer isso de maneira relativamente fácil com o `fs` no Node.Js, mas isso traria uma série de problemas como tamanho dos logs, criação de arquivos, log level, etc.

Sendo assim, para instalarmos:

`npm i winston`

Depois criamos um arquivo `logger.js` na raiz da aplicação para configurarmos nossas regras de logging.

```js
//logger.js
const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

module.exports = logger;
```

Executando agora o index.js modificado, tanto o info.log quanto o error.log criados na raiz da aplicação irão incluir o JSON de erro. Além disso, se olhar o console, verá que foi impressa lá a informação do erro também, por estarmos em ambiente de desenvolvimento.
