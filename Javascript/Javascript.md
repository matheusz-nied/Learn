# Javascript

-   [Métodos Array](#Métodos-Array)
    -   [Foreach](#Foreach)
    -   [Map](#Map)
    -   [Filter](#Filter)
    -   [Find](#Find)
    -   [Every](#Every)
    -   [Some](#Some)
    -   [Reduce](#Reduce)
-   [For in e For of](#For-in-e-For-of)
-   [Map e WeakMap](#Map-e-WeakMap)
-   [Sets e WeakSets](#Sets-e-WeakSets)
-   [Tornando parâmetro obrigatório](#Tornando-parâmetro-obrigatório)

## Métodos Array

Neste artigo irei discorrer sobre alguns métodos do Array no javascript. Há a poissibilidade que vocẽ esteja criando muitos `for` por ai sem precisar, já que o os métodos nativos do Array no javascript resolvem.

### Foreach

Muito útil quando precisamos passar por todos os elementos de um array. Por exemplo, e quisermos exibir todos os elementos de um array no `console.log()`. Por exemplo, se fossemos fazer isso utilizando o for comum ficaria assim:

```js
const pintores = ["Leonardo da Vince", "Michelangelo", "Van Gogh"];
for (let i = 0; i < pintores.length; i++) {
    console.log(pintores[i]);
}
```

Já usando o método ForEach:

```js
const pintores = ["Leonardo da Vince", "Michelangelo", "Van Gogh"];
pintores.forEach(function (pintor) {
    console.log(pintores);
});
```

Preste atenção, passamos para o forEach uma função que irá executar uma ação desejada para cada item do array.

### Map

O método map é muito útil quando precisamos não somente passar por todos os elementos de um Array , mas também modificá-los. Se formos fazer utilizando o `for`:

```js
var numeros = [1,2,3];
var dobro = [];
for(var i = 0; i < numeros.length; i++) {
dobro.push(numeros[i] _ 2);
}
console.log(numeros); // [1,2,3]
console.log(dobro); // [2,4,6]
```

Agora usando o `map`:

```js
var numeros = [1,2,3];
var dobro = numeros.map(function(numero) {
return numero _ 2;
});
console.log(numeros); // [1,2,3]
```

Claramente podemos ver o quão mais claro é usando o `map`.

### Filter

Como o próprio nome já pode induzir, este método é deve ser utilizado quando temos a necessidade de filtrar nossa lista de acordo com algum critério.

```js
var alunos = [
    { nome: "joão", idade: 15 },
    { nome: "josé", idade: 18 },
    { nome: "maria", idade: 20 },
];
var alunosDeMaior = alunos.filter(function (aluno) {
    return aluno.idade >= 18;
});
console.log(alunosDeMaior);
// [{nome:'josé', idade:18}, {nome:'maria', idade:20}]
```

### Find

Esta função auxiliar é particularmente interessante quando o objetivo é encontrar um item específico dentro de um Array .

```js
var alunos = [{ nome: "joão" }, { nome: "josé" }, { nome: "maria" }];
var aluno = alunos.find(function (aluno) {
    return aluno.nome === "josé";
});
console.log(aluno); // {"nome":"josé"}
```

### Every

A função every é pertinente para validar se todos os elementos de um Array respeitam uma dada condição.

```js
var alunos = [
{nome:'joão', idade: 18},
{nome:'maria' idade: 20},
{nome:'pedro', idade: 24}
];
var todosAlunosDeMaior = alunos.every(function(aluno){
return aluno.idade > 18;
});
console.log(todosAlunosDeMaior); // true
```

### Some

O Some valida se pelo menos um dos elementos de um Array satisfaz uma dada condição:

```js
var pesoDasMalas = [12, 32, 21, 29];
var temMalaAcimaDoPeso = pesoDasMalas.some(function (pesoDaMala) {
    return pesoDaMala > 30;
});
console.log(temMalaAcimaDoPeso); // true
```

### Reduce

A ideia por trás dela é pegar todos os valores de um Array e condensá-los em um único.

```js
const numeros = [1, 2, 3, 4, 5];

let soma = 0;
soma = numeros.reduce(function (soma, numero) {
    return soma + numero;
}, 0);

console.log(soma); //15
```

Diferente dos outros métodos acima o reduce recebe 2 parâmetros:

-   function(soma, numero) {...} : função de iteração com 2 parâmetros.
-   0 : O valor inicial.

## For in e For of

### For in

`for in`: percorre os nomes dos atributos de um objeto, segue abaixo um exemplo:

```js
var perfilDoFacebook = {
    nome: "Carlos",
    idade: 22,
    // ...
};
for (var propriedade in perfilDoFacebook) {
    var info = perfilDoFacebook[propriedade];
    console.log(info);
}
```

### For of

`for of`: Este tipo de laço foi criado para percorrer um objeto se, e somente se, ele for iterável. Seu funcionamento é bem simples. Sua sintaxe é:

```js
const numeros = [0, 1, 2, 3, 4, 5];
for (numero of numeros) {
    console.log(numero);
}
```

## Map e WeakMap

Mapas são estruturas de dados em que é possível associar uma chave a um valor — como em um dicionário, onde há um significado correspondente para cada palavra. Cada uma das chaves é única e possui apenas um valor associado, mesmo que este se repita em várias chaves.

### Map

Em um Map do Javascript, qualquer valor (tanto objetos, funções ou valores primitivos) podem ser usados como chave ou valor.
E ara recuprerar os valores de um map atráves das chaves usamos o método get:

```js
const map = new Map();
function funcao() {}
var objeto = {};

map.set("string", "sou uma string");
map.set(objeto, "sou um objeto");
map.set(funcao, "sou uma função");

console.log(map.get("string"));
console.log(map.get(objeto));
console.log(map.get(funcao));
```

O map também traz outras funcionalidades interessantes:

Para saber quantos itens um mapa tem, usamos a propriedade size :

`console.log("tamanho: " + map.size); // tamanho: 3`
Para saber se já existe uma chave específica dentro do mapa, utilizamos o método has . Ele retorna um valor booleano: true caso exista; false caso não exista.

`console.log(map.has("string")); // true`
`console.log(map.has("abc")); // false`

Também podemos remover um registro específico do mapa com o método delete , passando como parâmetro a chave do registro que queremos eliminar.

```js
map.delete("string");
console.log(map.has("string")); // false
```

Há também a possibilidade de eliminar todos os registros do
mapa usando o método clear.

```js
map.clear();
console.log("tamanho: " + map.size); // tamanho: 0
```

Podemos utilizar o laço para iterá-los através dos métodos: keys , values e entries. Eles retornam todas as chaves, todos os valores e todas (par chave/valor), respectivamente.

```js
var map = new Map();
map.set("um", 1);
map.set("dois", 2);
map.set("três", 3);
for (var chave of mapa.keys()) {
    console.log(chave); // um dois três
}
for (var valor of mapa.values()) {
    console.log(valor); // 1 2 3
}
for (var entrada of mapa.entries()) {
    console.log(entrada);
}
// saida:
// ['um',1]
// ['dois',2]
// ['três',3]
```

### WeakMap

Um WeakMap é uma coleção de pares de chave/valor na qual as chaves só podem ser objetos. As referências do objetos nas chaves são fracamente mantidas. Isso significa que eles não estão previnidos de serem coletados pelo Garbage Collector caso não existir nenhuma outra referência para o objeto em memória.

## Sets e WeakSets

### Set

O Set é uma estrutura de dados que nos permite ter listas com
valores que nunca se duplicam e que mantém a ordem de inserção
dos seus itens.

```js
var set = new Set();
set.add(2);
set.add(1);
set.add(2);
for (const valor of set) {
    console.log(valor); // 2, 1
}

set.delete(1); // Deleta o 1

set.clear(); // Limpa tudo

set.has(2); // Returna true se o 2 estiver no Set, false caso não esteja

set.size; // Retorna o tamanho
```

### WeakSet

É um Set que não previce seus elementos de serem coletados pelo Garbage Collector.
Sempre que você tiver preocupação com vazamento de memória, o WeakSet estará a seu dispor.

## Tornando parâmetro obrigatório

Se quisermos que um parâmetro seja obrigatório utilizamos uma técnica que ao executar o método sem passar nenhum parâmetro temos:

```js
function parametroObrigatorio(parametro) {
    throw new Error(`O parâmetro "${parametro}" é obrigatório!`);
}
function inserirNaTela(objeto = parametroObrigatorio("objeto")) {
    // lógica de implementação do método
}
inserirNaTela();
// Error: O parâmetro "objeto" é obrigatório!
```

Esta é uma maneira interessante de impedir
