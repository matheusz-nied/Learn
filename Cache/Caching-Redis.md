# Cache
-   [O que é caching?](#O-que-é-caching?)
-   [O que é Redis?](#O-que-é-Redis?)

## O que é caching?

Caching consiste em armazenar em memória (rápida) conteúdos acessados com frequência que estejam originalmente no disco (lento). Assim, ao invés de ficar indo o tempo todo no disco para pegar a mesma informação, primeiro verificamos se ela não está em cache e, se estiver, pega de lá mesmo. Se não estiver, vamos no disco e, antes de devolver o dado solicitado, deixamos uma cópia na cache, para que na chamada posterior, ela seja pega de lá.

## O que é Redis?

Redis é um “banco de dados” (não confundir com SGBD) in-memory e open-source, usado geralmente como cache ou como message broker (tipo RabbitMQ e AWS SQS). Ele fornece estruturas de dados como strings, hashes, listas, conjuntos, conjuntos ordenados, bitmaps, índices geoespaciais, streams, entre outros.

Apesar de ser muito associado como “banco em memória”, Redis tem diferentes níveis de persistência, transações, replicação e permite fazer clusterização. E apesar também de ser muito associado a estruturas chave-valor, ele permite uma grande gama de operações diferentes do que apenas consultar e armazenar baseado em chaves.

Assim, sempre que você precisar de um dado que seja acessado com frequência (por exemplo o menu dinâmico de um site que precisa ser carregado em todas páginas ou as permissões de um usuário autenticado), você primeiro pede ao Redis, se ele não tiver em cache, você vai no banco e deixa uma cópia nele, para que na próxima requisição, já esteja por lá.

`$ sudo docker pull redis:[version]`

`$ sudo docker run -d -p 6379:6379 -i -t redis[version]`

`$ redis-cli`

Abaixo, um exemplo simples que se conecta em um Redis padrão (localhost sem usuário e senha), salva um valor “value” com a chave “key” e depois busca este valor pela sua chave.

## Começando o projeto

Após inicializar o projeto e instalar o Redis:
`$ npm i redis`

```js
//index.js
(async () => {

    const redis = require('redis');
    const client = redis.createClient();
    client.connect();

    client.on("error", (error) => {
        console.error(error);
    });

    const result = await client.set("key", "value");
    console.log(`result: ${result}`);

    const result2 = await client.get("key");
    console.log(`result2: ${result2}`);

})();
```


Aquele objeto client expõe todos os comandos existentes no Redis, amplamente documentados e que recomendo que você dê uma olhada caso queira ir além do SET e GET que usei ali, que são o básico do básico do Redis. Por exemplo, falando de cache, você não vai querer que ele fique armazenado para sempre, certo?

Se você quiser que ele expire sozinho, você pode passar mais alguns parâmetros na função set ou então chamar a função expire.

```js
//define o valor com expiração em 60s
const result = await client.set("key", "value", "EX", 60);
console.log(`result: ${result}`);
 
//define somente a expiração sobre uma chave já existente
await client.expire('key', 60);
```