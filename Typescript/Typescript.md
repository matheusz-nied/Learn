# Typescript

- [Criando um projeto com Typescript](#Criando-um-projeto-com-Typescript)
    - [Adicionando e configurando o TypeScript](#Adicionando-e-configurando-o-TypeScript)
    - [Criando os scripts build, start e dev](#Criando-os-scripts-build,-start-e-dev)
    - [Começando o desenvolvimento](#Começando-o-desenvolvimento)
- [Criando arquivo de configuração](#criando-arquivo-de-configuração)
- [Typecasting](#typecasting)
- [Templates](#tipagem-e-seus-tipos)
- [Tipos de objetos](#tipos-de-objetos)
- [TypeScript com Node.js](#typeScript-com-Node.js)
- [Models com TypeScript](#Models-com-TypeScript)
- [Tipos de Função](#Tipos-de-Função)
- [Asserção de tipos](#Asserção-de-tipos)
- [Intersecção de Tipos](#Intersecção-de-Tipos)
- [Açucares de linguagem](#Açucares-de-linguagem)


## Criando um projeto com Typescript

### Adicionando e configurando o TypeScript

Após iniciar seu projeto com `npm init` or `yarn init` instalaremos o typescript:
`yarn add -D typescript`

Após isso temos que criar o arquivo de configuração `tsconfig.json`:
`yarn tsc --init`

Com isso, será criado um arquivo tsconfig.json.
Uma configuração que vale a pena frisar é o `"strict":true`, que é recomendado que seja deixado assim, porque ela reforça regras de segurança no código, como o cuidado a variáveis nulas e a tipos não especificados.
Se você tiver algum trecho de código que possa retornar null e com isso estourar uma exceção em produção, o compilador do TS não vai deixar você avançar antes de implementar um teste para ver se o valor não é null primeiro.
Declaração de tipos deixará de ser opcional e passará a ser obrigatória. Caso você, por algum motivo, ainda queira que uma variável, parâmetro ou retorno de função tenha tipagem dinâmica, você pode usar o tipo ‘any’ para ele

Localize no arquivo `tsconfig.json` as opções outDir e rootDir. Elas são importantes pois vão definir em qual pasta vai estar o código em TypeScript e em qual pasta ele vai ser compilado em JavaScript. Substitua os valores padrões pelos seguintes valores:

- Alterar o diretório padrão onde os arquivos compilados serão armazenados no `tsconfig.json`.
`"outDir": "./dist/",                        /* Redirect output structure to the directory. */`
- Quando criamos uma pasra `src` para guardar os arquivos fontes do projeto devemos mudar o `tsconfig.json` para que o compilador do Typescript não se perca.
`"rootDir": "./src/",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */`

ou

```json
"outDir": "./build", 
"rootDir": "./src",
```

Se quiser fazer um teste, crie um arquivo index.ts dentro da pasta src contendo um console.log('Olá TypeScript') e execute o seguinte comando para ver a mágica acontecer:
`yarn tsc`

### Criando os scripts build, start e dev

Instalaremos o `ts-node-dev` para não precisarmos compilar o código todas vez que fizermos alguma alteração durante o desenvolvimento.

`yarn add -D ts-node-dev`

E após isso, basta adicionar o script com a flag --ignore-watch node_modules para que ele ignore a pasta node_modules:

```json
"scripts": {
  "build": "tsc",
  "start": "node build/index.js",
  "dev": "ts-node-dev --ignore-watch node_modules src/index.ts"
},
```

### Começando o desenvolvimento

Agora que configuramos o necessário basta começarmos a codar!

`yarn add express`
`yarn add -D @types/express`

```js
import express from 'express';

const app = express();
app.use(express.json());

interface RequestBody {
  name: string;
}

app.post('/', (request, response) => {
  const user = request.body as RequestBody;

  return response.send({
    message: `Hello ${user.name}`,
  });
});

app.listen(3000, () => console.log('Listening 3000'));
```

## Typecasting

Em alguns casos a inferência de tipos não vai lhe ajudar, seja porque o tipo retornado por uma função é muito genérico, seja porque a função não tem tipo de retorno definido.

Em ambos os casos, se você sabe o que será retornado, você pode usar typecasting ou conversão de tipo.

Para fazer isso, você usa o operador ‘as’ logo depois da chamada da function, citando o tipo a ser convertido logo a sequência.
```js
function multiplicar(num1, num2){
    return num1 * num2;
}

const resultado2 = multiplicar(2,3) as number;
```
Se a conversão for possível dará certo, caso contrário dará erro, então tome cuidado com esse recurso.

## Tipagem e seus tipos

Um truque que vale a pena mencionar é para conversão de strings para numbers nos parâmetros de função. Basta usar o sinal de ‘+’ antes da variável string para transformá-la em number, como abaixo.
```javascript
const var1 = "2";
const var2 = "3";
somar(+var1, +var2);
```

Podemos tipar oa parâmetros ou retorno de funções, como por exemplo:

```javascript
function dividir(num1: number, num2: number): number{
    return num1 / num2;
}
```
No exemplo acima, além dos parâmetros terem de ser numéricos, o retorno também o será.

Inferência de tipos é quando o compilador define o tipo de uma variável a partir da atribuição de valor realizado sobre ela. Isso já é feito no JS normal, afinal ele até faz isso várias vezes mesmo com tipos diferentes e somente no caso de const que ele não deixa ficar mudando o tipo. Na verdade ele não deixa mudar o valor né, e a restrição no tipo acaba sendo um bônus.

Mas no TS esse poder sobe um nível.

Com TypeScript, quando uma função possui um tipo explícito, a inferência de tipos fica ainda mais poderosa uma vez que estamos falando de uma linguagem tipada.

Assim sendo, no código abaixo, a variável resultado é do tipo number, com certeza e o VS Code sabe disso antes mesmo da execução deste programa.
```js
function dividir(num1: number, num2: number): number{
    return num1 / num2;
}

const resultado = dividir(4,2);
```
Normalmente, o interpretador JS só saberia o tipo desta const em produção, durante a execução daquela linha de código. Aqui temos esta inferência em tempo de código onde o VS Code irá mostrar o tipo da `const resultado` antes de executarmos o código.

O TypeScript permite o uso de Union Types, que nada mais são do que diferentes tipos, mas ainda estáticos para suas variáveis, como abaixo.

```js
function somar(num1 : number | string, num2: number){
    if(typeof num1 === 'number')
        return num1 + num2;
    else
        return `${num1}${num2}`;
}
```
Note que defini mais de um tipo para o parâmetro num1, através do uso do pipe (‘|’). No entanto, o TypeScript me obriga a fazer checagem de tipo com um if quando uso Union Types, como você pode ver que fiz no código acima.
Ainda na linha de Union Types, o TypeScript possui os Type Aliases, que são apelidos para Union Types.
`type NumberOrString = number | string;`

## Tipos de objetos

Quando você passa um objeto por parâmetro, você pode definir a sua estrutura no mesmo lugar em que declararia o seu tipo, como abaixo.
```js
function cadastrar(cliente: { nome: string, dataNascimento: Date}){
    console.log(cliente.nome);
    console.log(cliente.dataNascimento);
}
```
E ela pode ir além, juntando com o conceito de Alias Type que mostrei na seção anterior, que eu posso usar para definir um novo tipo de objeto, como abaixo.
```js
type Cliente = { nome: string, dataNascimento: Date  };
function cadastrar2(cliente: Cliente){
    console.log(cliente.nome);
    console.log(cliente.dataNascimento);
}
```

Em TypeScript, podemos definir o tipo de dado que deve estar presente no array desta forma.
```js
const numeros : number[] = [];
numeros.push(4);
```


## TypeScript com Node.js

Agora como usamos em um projeto real?

Primeiro, crie uma pasta e vamos configurar o nosso projeto Node.js. Nesta pasta, rode o comando `tsc –init` para criar o arquivo de configuração do TypeScript e `npm init` para criar o arquivo de configuração do Node.js.
`$ tsc --init`
`$ npm init`

Vamos criar uma Web API REST como exemplo.
`$ npm i express body-parser`

Crie um app.ts:
```js
//app.ts
const express = require("express");
const app = express();
app.listen(3000);
```
Você vai notar que já irá aparecer um erro aqui, no comando require, pois ele não é nativo do JavaScript, mas sim do Node.js e portanto o TypeScript não o conhece.

Para que o TypeScript conheça os tipos existentes no Node.js, precisamos instalar esta dependência, mas somente em ambiente de desenvolvimento.
`$ npm i --save-dev @types/node`

Todos os pacotes @types são extensões de pacotes já existentes no NPM para que eles suporte TypeScript, fornecendo, entre outras coisas, os tipos definidos para estes pacotes. Com @types/node, o TS irá conseguir entender sintaxe específica do Node.js, como nosso comando require.

E se quisermos oferecer suporte a TS no Express também, podemos instalar o @types dele, o que nos dará não apenas suporte aos seus tipos.

`$ npm i --save-dev @types/express`


Atualmente existe suporte com @types à maioria das dependências mais populares do NPM.
Mas para que consigamos desbloquear esses poderes, é necessário fazer uma configuração no tsconfig, deixando-o como abaixo:
```ts
"target": "es6",
"module": "commonjs",
"moduleResolution": "node",
```
Mudamos o target para ES6, uma versão bem mais interessante de JavaScript e que o Node.js possui suporte, bem como adicionei o moduleResolution configurado para Node, pois por padrão o TS foi criado para JavaScript client-side.


## Models com TypeScript

Vamos criar um modelo com o Typescript

```js
export interface Customer{
    id: number,
    name: string,
    birthDate: Date
}
```
Assim podemos importa-lo e utiliza-lo em outro arquivo. E iremos criar um array de Costumer com a seguinte sintaxe:

```js
import {Customer} from '../models/customer';

const customers : Customer[] = [];
```



### Interface

Uma interface é, em essência, um tipo literal de objeto nomeada. Vamos alterar o exemplo anterior para usar uma interface:

```tsx
interface Point {
  x: number;
  y: number;
}
 
let point: Point;
let point2: Point;
```

Essa alteração permite que o tipo **Point** seja usado em vários locais dentro do código sem precisar redefinir os detalhes do tipo repetidas vezes

Interfaces também podem estender outras interfaces ou classes usando a palavra-chave **extends** para compor tipos mais complexos a partir de tipos simples:

```tsx
interface Point3d extends Point {
  z: number;
}
```

Neste exemplo, o tipo **Point3d** resultante consistiria nas propriedades **x** e **y** da interface **Point**, além da nova propriedade **z**.

Métodos e propriedades em objetos também podem ser especificados como opcionais, da mesma forma que os parâmetros de função podem ser opcionais.

## Tipos de Função

Aqui, **printPoint** é definido para aceitar uma função que recebe um objeto de ponto e retorna uma string.

```tsx
let printPoint: {
  (point: Point): string;
};
//Ou
let printPoint: (point: Point) => string;
//Ou
let printPoint: (point: Point): string
```

## Asserção de tipos

```tsx
type UserResponse = {
	id: number;
	name: string;
	avatar: string;
}

let userResponse = {} as UserResponse;
```

## Intersecção de Tipos

```tsx
type User = {
	id: number;
	name: string;
}

type Char = {
	nick: string;
	level: number;
}

type PlayerInfo = User & Char;

```



## Açucares de linguagem

Parâmetros opcionais agora podem ser definidos pela sufixação de um identificador de parâmetro com um ponto de interrogação:

`function getRange(max, min, exclusive?) { ... }`

Aqui **exclusive** é um parâmetro opcional. Isso não tem sentido quando se fala em JavaScript, já que todos os parâmetros são sempre opcionais, mas no TypeScript, o compilador proíbe omitir os argumentos tipados, a menos que eles sejam especificados como opcionais ou tenham um valor padrão.
