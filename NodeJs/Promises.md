## Criando uma Promise em Node.js

Para criar uma promise é bem simples, usa-se o construtor da própria classe e passa-se uma function como único argumento, que possui funções de resolve e reject na sua assinatura. Dentro dessa function, você deve chamar resolve quando sua execução for bem sucedida, ou reject, caso contrário.

```javascript
//index.js
function soAceitaPares(numero) {
    const promise = new Promise((resolve, reject) => {
        if (numero % 2 === 0) {
            const resultado = "Viva, é par!";
            resolve(resultado);
        } else {
            reject(new Error("Você passou um número ímpar!"));
        }
    });
    return promise;
}
```

## Consumindo uma promise em Node.js

```javascript
soAceitaPares(2)
    .then((result) => console.log("Promise resolved: " + result))
    .catch((error) => console.log("Promises rejected: " + error));
```

Teremos como possíveis resultados:

```Shell
$ node code/promisse.js
Promise resolved: Viva, é par!

$ node code/promisse.js
Promises rejected: Error: Você passou um número ímpar!

```

### Sincronizando promises em Node.js

Quando lidamos com várias promisses, cada uma executando de maneira inedepedente, mas no final os resultados devem ser computados todos juntos utilizamos do `Promise.all()`.

```js
const numeros = [2, 4, 6, 8, 10];
const promises = [];
numeros.forEach((entry) => promises.push(dividePelaMetade(entry)));
Promise.all(promises)
    .then((results) => results.forEach((entry) => console.log(entry)))
    .catch((error) => console.log(error));

console.log("teste");
```
