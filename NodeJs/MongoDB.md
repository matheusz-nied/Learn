# MongoDB

MongoDB é um banco de dados NoSQL orientado a documentos.

Neste artigo falarei sobre o básico do MongoDB para quem está começando.

## Definições

### Coleções ("Collections")

As coleções (ou 'Collections', em inglês) no MongoDB são equivalentes às tabelas dos bancos de dados relacionais, podendo guardar múltiplos documentos JSON.

### Documentos ("Documents")

Os documentos (ou 'Documents', em inglês) equivalem aos registros ou às linhas de dados no SQL. Enquanto uma linha em um banco SQL pode referenciar dados em outras tabelas, os documentos do MongoDB normalmente combinam isso dentro de um único documento.

### Campos ("Fields")

Os campos (ou 'Fields', em inglês) ou atributos são similares a colunas em uma tabela SQL.

### Esquema ("Schema")

Embora o MongoDB não possua esquemas, o SQL define esquemas por meio da definição de uma tabela. Um "esquema" no Mongoose é uma estrutura de dados de documento (ou a forma de um documento), que é aplicada por meio da camada da aplicação.

### Modelos ("Models")

Os modelos (ou 'Models', em inglês) são construtores de ordem superior, que utilizam um esquema e instanciam um documento, equivalente aos registros de um banco de dados relacional.

## Configuração

Para trabalhar com o MongoDB você irá precisar instalá-lo no seu computador atráves do [Site oficial](https://www.mongodb.com/download-center/community).

Mas neste artigo eu irei utilizar uma imagem Docker, assim não precisamos instalar o mongo deixando no sso ambiente mais limpo.

### Docker

Primeiro iremos baixar a nossa imagem atráves do Docker. Basta rodar o seguinte comando:

`$ docker pull mongo`

Agora irei executá-lo. Para rodar o MongoDb na última versão usando o Docker executamos o seguinte comando:

`$ docker run -d -p 27017:27017 --name test-mongo mongo:latest`

onde o argumento `-d` roda o container Docker em background, isto é, separado do Shell.O `-p` diz em qual porta o container irá rodar, no caso na 27017. E o `--name` é para escolhermos o nome do container.

Caso queira parar o container basta rodar:

`$ docker stop nomecontainer`

Ou se precisar rodar ele novamente:
`$ docker start nomecontainer`

Se não for mais usa-lo basta remove-lo:
`$ docker rm nomecontainer`

## Usando o MongoDBUsando o MongoDB

Para trabalharmos com o servidor precisamos de um mediador, que é o mongo shell. Então abra seu terminal e execute:

` $ mongo`

Para exibirmos os bancos de dados existentes execute dentro do mongo shell:

`> show databases`

Para escolhermos qual banco de dados iremos usar informamos:

`> use nome-do-database`

Repare que se executarmos o comando acima e não tivermos um database com o nome passado, ao executarmos alguma ação após selecionar ese database o mongo irá criar um database com o nome que passamos.

## Criando uma collection

Para criarmos uma coleção podemos utilizar o comando para cria-lá(lembre-se de selecionar o database desejado):

`> db.createCollection("minhaColecao")`

Ou assim:

`> db.minhaColecao.insert({"name": "matheus", "age" : 23, "})`

Mesmo se a coleção não existir ela será criada com esse comando.

## Inserindo dados

Para inserir um único objeto temos o insertOne():

```json
db.minhaColecao.insertOne(
  {
    "name": "Botticelli",
    "age": 22
  }
)
```

Caso queiramos inserir vários de uma vez usamos o insertMany():
```json
db.minhaColecao.insertMany([
  {
    "name": "Leonardo",
    "age": 21
  },
  {
    "name": "Michelangelo",
    "age": 20
  },

  {
    "name": "Caravaggio",
    "age": 19
  }
]
```

E o método `insert()` que podemos inserir um ou mais.


## Consultando dados

Para realizarmos uma consulta em uma coleção:
`> db.minhaColecao.find()`

Talvez você ache que a saída não esteja muito bonita né? Vamos melhorar:

`> db.minhaColecao.find().pretty()`

Assim a saída será formatado em JSON para uma melhor visualização.

Caso queira filtrar os dados que busca é muito simples:

```json
db.minhaColecao.find(
  {
    "name": "Caravaggio"
  }
)
```
que nos trará todos os objetos com o nome Caravaggio, caso tenha mais de um.

## Atualizando documentos

Se quisermos atualizar os dados de alguma pessoa utilizamos:

`> db.minhaColecao.update({age : 20}, {$set: {age: 23}})`

No primeiro argumento dizemos qual o campo desejamos atualizar. Aqui, eu especifiquei `age` por questão de simplicidade. Em um ambiente de produção, você pode usar algo como o campo `_id`. Usando o _id você irá atualizar apenas uma linha. Da maneira como usamos acima iremos atualizar todos os campos com age 20.

## Removendo documentos

Como dito anteriormente, quando quiser atualizar ou remover um documento pode especificar o `_id`

`> db.myCollection.remove({name: "navindu"});`

## Removendo coleções

Para remover todos os documentos junto com a coleção:

`> db.myCollection.remove({});`

## Conclusão

Neste artigo foi discutido o básico do MongoDB para que você possa começar a desenvolver sua aplicação.

Se tiver qualquer dúvida ou feedback basta me mandar uma mensagem pelas redes socias [Instagram](https://www.instagram.com/matheusz.nied/), [Linkedin](https://www.linkedin.com/in/matheus-fernandes-da-silva-5810201b6/).
