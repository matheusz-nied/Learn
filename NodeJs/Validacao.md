# Validações

É possível fazer todas as validações utilizando um monte de `ifs`. Mas isso pode levar a muita repetição de código, uma arquitetura não muito bonita e dificuldade na hora de testar.

Logo podemos utilizar bibliotecas que nos ajudam nisso:

## Joi

Iremos utilizar o pacote @hapi/joi

`npm i joi`

O Joi usa uma linguagem descritiva para criar schemas de validação e iremos criar um desses schemas agora. Em um arquivo index.js:

```javascript
//index.js
const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(2001),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

const val1 = userSchema.validate({ username: 'abc', birth_year: 1994 });
console.log("passou na validação: " + !val1.error)

const val2 = userSchema.validate({});
console.log("passou na validação: " + !val2.error)
```

No primeiro teste, o val1 irá passar no teste, pois o objeto passado por parâmetro atende aos requisitos do userSchema. Já no segundo teste, val2 terá um erro pois não foi passado o username, que é obrigatório segundo as regras que criamos (required).