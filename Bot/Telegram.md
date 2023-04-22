# Bot Telegram

## Começando

A primeira coisa que você tem de fazer é criar o bot de Telegram que fará o envio de mensagens para você. Para fazer isso, primeiro fale com o BotFather. O BotFather é o bot que lhe ajuda na criação de bots.

Vai se abrir uma série de comandos que você pode digitar, e você precisa usar primeiro o /newbot, dando um nome ao seu bot logo em seguida, sendo que ele deve terminar sempre com ‘bot’.

Uma vez que termine a criação, você receberá a URL para conversar com seu bot e um token, que você deve salvar para usarmos a seguir no nosso código de interação com o bot. Cuidado, pois quem tiver esse token pode tomar o controle do seu bot!

Antes de avançar, certifique-se de acessar a URL do seu bot e ao menos mande um oi pra ele, já que bots só podem puxar assunto com quem já tiveram uma conversa antes!

```js
{"ok":true,"result":[{"update_id":788653147,
"message":{"message_id":6,"from":{"id":1733364144,"is_bot":false,"first_name":"Luiz","last_name":"Duarte","username":"luiztools","language_code":"en"},"chat":{"id":<ESTE É O ID DO CHAT>,"first_name":"Luiz","last_name":"Duarte","username":"luiztools","type":"private"},"date":1631821216,"text":"teste"}}]}
```

### Instalando as depedências:

`npm i telegraf dotenv-safe`

No arquivo `.env`:

```js
BOT_TOKEN=<SEU BOT TOKEN>
CHAT_ID=<SEU CHAT ID>
```

Após isso basta criar o código que irá enviar sua mensagem:

```js
require('dotenv-safe').config();
const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.sendMessage(process.env.CHAT_ID, 'Hello Telegram!');
```
Pronto!!!

Agora o resto depende apenas da sua criatividade.



**Um rápido aviso final**: não envie mais de uma mensagem por segundo e não mais de 20 mensagens por minuto, caso não queira que seu bot seja bloqueado (erro 429).