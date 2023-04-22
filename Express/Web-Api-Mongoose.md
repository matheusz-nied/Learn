# Web api com Node.Js

## Configurando o projeto

Crie uma pasta e então inicie um projeto Express:

`$ express -e --git apitest`

Agora instale as depêndencias:

`$ npm install mongodb mongoose`

## Configurando o banco de dados

Artigo configurando com Docker.


## Configurando o Mongoose

Primeiro passo, crie um arquivo db.js na raiz do seu projeto apitest. Dentro dele, cole o seguinte código, que explicarei na sequência:

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/apitest');

var customerSchema = new mongoose.Schema({
    name: String,
    email: String
}, { collection: 'customers' }
);

module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }
```


## GET

Rota para retornar todos os customers e depois para apenas um cliente
```js
/* GET all customers. */
router.get("/customers", function (req, res, next) {
    var db = require("../db");
    var Customer = db.Mongoose.model(
        "customers",
        db.CustomerSchema,
        "customers"
    );
    Customer.find({})
        .lean()
        .exec().then((docs)=> {
          res.json(docs);
       res.end();
   });
});

/* GET ONE customers. */

router.get('/customers/:id', function (req, res, next) {
    var db = require('../db');
    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    Customer.find({ _id: req.params.id }).lean().exec().then((docs)=> {
           res.json(docs);
        res.end();
    });
});
```

## POST de um cliente


```js
/* POST ONE customer. */
router.post('/customers/', function (req, res, next) {
  var db = require('../db');
  var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
  var newcustomer = new Customer({ name: req.body.name, email: req.body.email });
  newcustomer.save()
  .then(()=>{
    res.json(newcustomer);
      res.end();
  }).catch(err =>{
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
  })
  

});
```

## PUT de um cliente

```js
/* PUT ONE customer. */
router.put("/customers/:id", function (req, res, next) {
    var db = require("../db");
    var Customer = db.Mongoose.model(
        "customers",
        db.CustomerSchema,
        "customers"
    );
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, {
        upsert: true,
    }).then(() => {
        res.json(req.body);
        res.end();
    }).catch((err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        res.end();
        return;
    }
    });
});

```


## DELETE de um cliente

```js
/* DELETE ONE customer. */
router.delete("/customers/:id", function (req, res, next) {
    var db = require("../db");
    var Customer = db.Mongoose.model(
        "customers",
        db.CustomerSchema,
        "customers"
    );
    Customer.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.json({ success: true });
            res.end();
        })
        .catch((err) => {
            if (err) {
                res.status(500).json({ error: err.message });
                res.end();
                return;
            }
        });
});

```