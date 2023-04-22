# Errors

## Try/Catch

Quando queremos tratar um erro usamos o try/catch né?

```js
try{
   //seu código aqui
}
catch(error){
   //seu tratamento de erro aqui
}
```

Se um erro acontecer dentro do bloco try, o fluxo será redirecionado para o bloco catch onde você terá acesso a um objeto error com os dados do erro, permitindo que você trate, registre e devolva ao usuário uma resposta mais amigável.

O problema do try/catch é que você tem de escrevê-lo em todos os pontos da sua aplicação onde não quer que um erro possa estourar.

Além disso, se você estiver com uma web API em Node.js feita com Express, se você tiver o estouro de um erro sem o devido tratamento, o seu webserver pode cair, porque erros não tratados no Event Loop simplesmente podem derrubar o Event Loop! 

Exemplo de webapi Express onde temos três rotas, uma funciona, uma dá erro mas o mesmo é tratado e outra que dá erro e o mesmo não é tratado.

```js
const express = require('express');
const app = express();

app.get('/teste1', (req, res, next) => {
    res.send('teste1');
})

app.get('/teste2', (req, res, next) => {
    try {
        throw new Error('teste2 deu erro');
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
})

app.get('/teste3', (req, res, next) => {
    throw new Error('teste3 deu erro');
})

app.listen(3000, () => {
    console.log('Server running at 3000');
}) 
```

## Error Middleware

Uma forma de fazer o gerenciamento de erros de forma mais profissional é centralizando-o através de um error middleware.

O Express é todo organizado através de middlewares de processamento e existe um middleware especial que chamamos de Error Middleware que serve como destino default para todos os erros gerados e não tratados no event loop.

```js
app.get('/teste3', (req, res, next) => {
    throw new Error('teste3 deu erro');
})

app.use((error, req, res, next) => {
    console.log('error middleware');
    res.sendStatus(500);
})
```
No exemplo acima criamos o error middleware logo após a última rota. Assim , mesmo que uma rota não possua tratamento de erros o seu fluxo será redirecionado para o error middleware automaticamento quando o error estourar, simplificando o tratamento de erros.

Mesmo assim, nas rotas que você desejar ainda ter um try/catch personalizado, você pode mantê-lo e redirecionar para o error middleware opcionalmente, com a função next, passando o erro como único argumento.

```js
app.get('/teste2', (req, res, next) => {
    try {
        throw new Error('teste2 deu erro');
    } catch (error) {
        console.log(error);
        next(error);
    }
})
```

## Async Errors

Mas e os erros que não estourarem no Event Loop? O que acontece com eles?

```js
app.get('/teste3', async (req, res, next) => {
    throw new Error('teste3 deu erro');
})
```
Temos cenários em que isso se aplica, como por exemplo quando trabalhamos com banco de dados, APIs externas, etc.

Agora, ao rodar sua web API e testar essa rota, ela vai ficar pendurada. Ela não vai cair no Error Middleware e nem sequer vai responder a request. Depois de 2 minutos, vai cair a requisição por timeout, que é a configuração padrão da lib http do Node.js que o Express usa.

Ou seja, ocorreu um erro dentro de uma função async. Funções async não rodam no Event Loop, mas sim no Thread Pool em background, apenas retornando ao Event Loop depois que terminou seu processamento assíncrono.

Neste caso, ou você usa try/catch nos seus middlewares async, chamando o Error Middleware com next (como mostrei anteriormente), ou adiciona mais uma dependência que vai avisar o Error Middleware de erros async, que é o melhor.

`npm i express-async-errors`

O Express Async Errors é um pacote minúsculo e muito prático para consertar essa falha de arquitetura do Express que ainda não se adaptou ao mundo async/await do ES6.

```js
require('express-async-errors');
const express = require('express');
const app = express();
```
Com isso, cobrimos tanto os erros sync quanto async, garantindo que nosso Error Middleware dará conta de qualquer erro não tratado em nossa aplicação.

Podemos utilizar Custom Errors na aplicação para que o Error Middleware consiga identificar os tipos de erro e dar retornos apropriados.