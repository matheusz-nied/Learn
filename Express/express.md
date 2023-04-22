# Express

## Estrutura

Estrutura básica de um app com Express:

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

```js
//index.js
const app = require('./app');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`App Express is running!`);
})
```