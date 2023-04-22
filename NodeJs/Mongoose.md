# Mongo & Mongoose

Mongoose é um biblioteca de Modelagem de Dados de Objeto (ou ODM, do inglês: Object Data Modeling) para MongoDB e Node.js. Ele gerencia o relacionamento entre dados, fornece a validação de esquemas e é usado como tradutor entre objetos no código e a representação desses objetos no MongoDB.

## Terminologia

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

## Criando o projeto

`$ `
Iremos criar uma pasta onde ficará nosso projeto:
`$ mkdir api_project`

Depois entramos na pasta e iniciaremos um projeto:
`$ npm init -y`

Agora instalaremos as depedências:
`$ npm install express mongodb mongoose validator
`

## Configurando o Mongoose

Crie um arquivo ./src/database.js na raiz do seu projeto.

```js
let mongoose = require("mongoose");

const server = "127.0.0.1:27017"; // COLOQUE O NOME DO SEU SERVIDOR DO BANCO DE DADOS
const database = "emails"; // COLOQUE O NOME DO SEU BANCO DE DADOS

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log("Database connection successful");
            })
            .catch((err) => {
                console.error("Database connection error");
            });
    }
}

module.exports = new Database();
```

**Definir o esquema:**

```js
let mongoose = require("mongoose");
let validator = require("validator");

let emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
            return validator.isEmail(value);
        },
    },
});

module.exports = mongoose.model("Email", emailSchema);
```

**Exportar um modelo:**

Precisamos chamar o construtor de modelos na instância do Mongoose e passá-lo para a sua coleção, assim como sua referência na definição do esquema.

`module.exports = mongoose.model('Email', emailSchema)`

**Criando registros:**

```js
let EmailModel = require("./email");

let msg = new EmailModel({
    email: "ADA.LOVELACE@GMAIL.COM",
});

msg.save()
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.error(err);
    });
```

O resultado é o retorno de um documento apontando o sucesso da transação.

**Buscando o registro:**

```js
EmailModel.find({
    email: "ada.lovelace@gmail.com", // nossa busca
})
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.error(err);
    });
```

**Atualizando o registro:**

Agora, vamos modificar o registro acima utilizando `findOneAndUpdate()` .Por questões de performance, o Mongoose não vai retornar o documento atualizado e, então, precisaremos passar um parâmetro adicional pedindo-o:

```js
EmailModel.findOneAndUpdate(
    {
        email: "ada.lovelace@gmail.com", // nossa busca
    },
    {
        email: "theoutlander@live.com", // campo a ser atualizado
    },
    {
        new: true, // retorne o doc atualizado
        runValidators: true, // valide antes de atualizar
    }
)
    .then((doc) => {
        console.log(doc);
    })
    .catch((err) => {
        console.error(err);
    });
```

**Apagando o registro:**

Para essa operação, usaremos a chamada findOneAndRemove para apagar o registro. O retorno é o documento original que foi removido:

```js
EmailModel
  .findOneAndRemove({
    email: 'theoutlander@live.com'
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })
```

## Auxiliares (ou "Helpers", no inglês)

O Mongoose também fornece a possibilidade de configurar diversos outros tipos de métodos e propriedades auxiliares. Esses podem ser usados para simplificar futuramente o trabalho com os dados.

Vamos criar um esquema para um usuário no ./src/models/user.js com os campos firstName e lastName:

```js
let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})

module.exports = mongoose.model('User', userSchema)
```

## Propriedade virtual (Virtual Property)

Uma propriedade virtual não é persistida no banco de dados. Podemos adicioná-la ao nosso esquema como uma propriedade auxiliar para obter e definir valores.

Vamos criar uma propriedade virtual chamada fullName, que pode ser usada para definir os valores de firstName e lastName, além de recuperá-los como um valor combinado quando lidos:

```js
userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName
})

userSchema.virtual('fullName').set(function(name) {
  let str = name.split(' ')
  
  this.firstName = str[0]
  this.lastName = str[1]
})
```

Agora, podemos definir firstName  e lastName através da atribuição de fullName:
```js
let model = new UserModel()

model.fullName = 'Thomas Anderson'

console.log(model.toJSON())  // Mostra os campos do modelo como JSON
console.log()
console.log(model.fullName)  // Mostra o nome completo
```

O resultado da execução do código acima é esse:

```js
{ _id: 5a7a4248550ebb9fafd898cf,
  firstName: 'Thomas',
  lastName: 'Anderson' }
  
Thomas Anderson
```

## Métodos instanciados

Podemos criar métodos auxiliares personalizados no nosso esquema e acessá-los através de uma instancia de método. Esses métodos terão acessos ao objeto do modelo e podem ser usados de modo bastante criativo. Por exemplo, poderíamos criar um métodos para encontrar todas as pessoas que tenham o mesmo nome da instância atual.

Nesse exemplo, vamos criar uma função que retorne as iniciais do usuário em questão. Vamos adicionar o método auxiliar personalizado chamado getInitials  ao esquema:

```js
userSchema.methods.getInitials = function() {
  return this.firstName[0] + this.lastName[0]
}
Esse método estará acessível através da instância do modelo:

let model = new UserModel({
  firstName: 'Thomas',
  lastName: 'Anderson'
})

let initials = model.getInitials()

console.log(initials) // O resultado será: TA
```

## Métodos estáticos

Similar aos métodos instanciados, podemos criar também métodos estáticos no nosso esquema. Vamos criar um método para trazer todos os usuários que temos em nosso banco de dados:

```js
userSchema.statics.getUsers = function() {
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        console.error(err)
        return reject(err)
      }
      
      resolve(docs)
    })
  })
}
```

Quando chamamos getUsers da classe Model, ele retornará todos os usuários de nosso banco de dados:

```js
UserModel.getUsers()
  .then(docs => {
    console.log(docs)
  })
  .catch(err => {
    console.error(err)
  })
```

Adicionar um método instanciado e um estático é uma ótima abordagem para implementar uma interface de interação de banco de dados em coleções e registros.

## Middleware

Middleware são funções executadas em estágios específicos de um "pipeline" (ou caminho, no português). O Mongoose tem suporte para middleware nas seguintes operações:

Agregação
Documento
Modelo
Busca (ou query, em inglês)
Por exemplo, o modelo tem funções pre e post, que aceitam dois parâmetros:

- Tipo do evento ("init", "validate", "save", "remove")
- Uma "callback", que é executada com o this referenciando a instância do modelo

Vamos executar um exemplo de adição de dois campos, chamados createdAt e updatedAt, no nosso esquema:

```js
let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  createdAt: Date,
  updatedAt: Date
})
module.exports = mongoose.model('User', userSchema)
```

Quando `model.save()` é chamado, é executado um evento de `pre(‘save’, …)` e `post(‘save’, …)`. Para o segundo parâmetro, você pode passar a função que é chamada quando o evento é disparado. Essas funções recebem um parâmetro para a próxima função na cadeia de middleware.

Vamos adicionar um "hook" (ou gancho, no português) de "pre-save" (algo como "salvamento prévio", na tradução)  para definir os valores de createdAt e updatedAt:

```js
userSchema.pre('save', function (next) {
  let now = Date.now()
   
  this.updatedAt = now
  // Define o valor para createdAt apenas se ele for nulo
  if (!this.createdAt) {
    this.createdAt = now
  }
  
  // Chama a próxima função na cadeia de pre-save
  next()    
})
```
Agora, vamos criar e salvar nosso modelo:

```js
let UserModel = require('./user')

let model = new UserModel({
  fullName: 'Thomas Anderson'
}

msg.save()
   .then(doc => {
     console.log(doc)
   })
   .catch(err => {
     console.error(err)
   })
```


Você deverá ver os valores para createdAt  e updatedAt quando o registro for criado e exibido:

```js
{ _id: 5a7bbbeebc3b49cb919da675,
  firstName: 'Thomas',
  lastName: 'Anderson',
  updatedAt: 2018-02-08T02:54:38.888Z,
  createdAt: 2018-02-08T02:54:38.888Z,
  __v: 0 }
  ```



 ## Criando pesquisas

O Mongoose tem uma API muito rica, que lida com diversos tipos de operações complexas que provém do MongoDB. Considere uma busca onde podemos criar incrementalmente os componentes de pesquisa.

Nesse exemplo, nós vamos:

- Encontrar todos os usuários
- Pular os primeiros 100 registros
- Limitar o resultado a 10 registros
- Ordenar os resultados pelo campo firstName
- Selecionar firstName
- Executar a busca

```js
UserModel.find()                   // encontra todos os usuários
         .skip(100)                // pula os primeiros 100 registos
         .limit(10)                // limita a 10 itens
         .sort({firstName: 1}      // ordena firstName de forma ascendente
         .select({firstName: true} // seleciona firstName apenas
         .exec()                   // executa a busca
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          })
```