# Classes

Recomendado usar uma Classe por arquivo js, transformando o em um módulo. Exemplo:

```js
//Cliente.js
module.exports = class Cliente {
    //propriedades e funções da classe aqui
    constructor(nome, idade, email) {
        this.nome = nome;
        this.idade = idade;
        this.email = email;
        this.dataCadastro = new Date();
    }
    static idadeAdulto = 18;

    isAdult() {
        return this.idade >= 18;
    }

    getFirstName() {
        return this.nome.split(" ")[0];
    }
    toString() {
        return (
            this.nome +
            " " +
            this.idade +
            ", " +
            this.email +
            ", " +
            this.dataCadastro
        );
    }
};
```

Para declarar uma propriedade estática, basta declará-la com a palavra-reservada static (ao invés de var, let ou const) dentro do escopo da classe.
Um componente estático (seja ele uma função ou propriedade) é compartilhado entre todos objetos da mesma classe e não necessita que a mesma seja instanciada para que o mesmo exista e possa ser usado/manipulado.
Ao usar static, você torna esta propriedade global para a classe.
Utilizando a classe:

```js
//index.js
const Cliente = require("./Cliente");
const cliente1 = new Cliente("Luiz", 31, "contato@luiztools.com.br");
const cliente2 = new Cliente("Pedro", 5);
console.log(cliente1.nome + " é adulto? " + cliente1.isAdult());
console.log(cliente2.nome + " é adulto? " + cliente2.isAdult());
```

Crie funções `get()` e `set()` para cada uma das propriedades internas das suas classes, para evitar que as mesmas sejam acessadas e manipuladas sem qualquer tipo de encapsulamento, uma vez que em JavaScript não temos modificadores de acesso como private, protected, etc. Tecnicamente chamamos isso de métodos acessores.
