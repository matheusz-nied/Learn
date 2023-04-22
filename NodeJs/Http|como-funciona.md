# Http na web

Neste conteúdo iremos entender um pouco mais de como funciona o protocola http. O que acontece quando vc digita algo no google aperta `Enter`?

## DNS

Primeiro teremos o DNS Lookup, pois o endereço web que utilizamos é apenas um apelido para facilitar para nós meros humanos a se lembrar do sites e acessa-lós. Mas na verdade todos esses endereços são uma sequência númerica dizendo onde estão estes computadores como por exemplo 101.102.103.1(IPv4). O DNS irá utilizar o texto digitado para encontrar o endereço da máquina que você deseja acessar.

## Conexão

Uma vez encontrado o enedereço da máquina, o browser irá se conectar a esta para enviar requisições.

A requisição é um documento de texto com as informações deste onde teremos o cabeçalho da requisição com algumas informações e um corpo da requisição com as informações que queremos acessar ou enviar.

### Resposta

Após a requisição ser enviado teremos uma resposta quanto ao status de requisião, se ocorreu tudo ok ou teve algum erro e qual foi, etc.

Após a resposta ter sido recebido pelo navegador ele irá processar e nos mostrar no famoso Html.

### Construindo um server HTTP com node

Vamos fazer o famoso "Hellow World".

```javascript
const http = require('http')
const PORT = 3000
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hellow World')
})
server.listen(PORT, () => {
  console.log(`Servidor iniciou em http://localhost:${PORT}/`)
})
```

### Get request

Agora irei fazer o exemplo de uma requisição Get:

```javascript
const https = require('https')
const options = {
  hostname: 'www.google.com.br',
  port: 443,
  path: '/about/',
  method: 'GET'
}
const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', (d) => {
    process.stdout.write(d)
  })
})
req.on('error', (error) => {
  console.error(error)
})
req.end()
```

Também podemos fazer outras requisições como POST, PUT, DELETE, PATCH, etc

POST: para enviar dados para um servidor;
PUT: para atualizar um documento;
DELETE: para excluir um documento;
PATCH: para atualizar parte de um documento;