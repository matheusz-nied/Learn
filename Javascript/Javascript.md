# Javascript

- [Métodos Array](#Métodos-Array)
- [For in & For of](#For-in-e-For-of)

## Métodos Array

Neste artigo irei discorrer sobre alguns métodos do Array no javascript. Há a poissibilidade que vocẽ esteja criando muitos `for` por ai sem precisar, já que o os métodos nativos do Array no javascript resolvem.

### Foreach

    Muito útil quando precisamos passar por todos os elementos de um array. Por exemplo,

e quisermos exibir todos os elementos de um array no `console.log()`. Por exemplo, se fossemos fazer isso utilizando o for comum ficaria assim?

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
- function(soma, numero) {...} : função de iteração com 2 parâmetros.
- 0 : O valor inicial.

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

## MAP E WEAKMAP