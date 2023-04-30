# Yield & Iterators & Generators

Exempolo de uma generator function:

```js
function* foo(){
    var index = 0;
    while(index <=2>)
        yield index++;
}
```

Uma vez que a generator function é definida, isso pode ser usada para construir um iterator como este:

```js
var iterator = foo();          // Valores
console.log(iterator.next()); // {value: 0, done:false}
console.log(iterator.next()); // {value: 1, done:false}
console.log(iterator.next()); // {value: 2, done:false}
console.log(iterator.next()); // {value: undefinied, done:true}
```

A palavra-chave `yield` pausa oa execução de uma generator function e o valor da expressão em frente ao yield é retornado para a chamada do generator.

O `yield` retorna um objeto do tipo `IteratorReult` com duas propriedades `value` e `done`. **`Done`** como false indica que a generator function não foi completa.

Uma vez pausada em  uma expressão yield, a execução do código permanece pausada até a próxima chamada do método `next()`.


Podemos criar iteradores a partir de generator.

