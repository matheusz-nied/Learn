var express = require("express");
var router = express.Router();
const db = require("../db");
/* GET home page. */


router.get("/new", (req, res, next) => {
    res.render("new", {
        title: "Novo Cadastro",
        doc: { name: "", age: "" },
        action: "/new",
    });
});

router.post("/new", async (req, res, next) => {
    const name = req.body.name;
    const age = parseInt(req.body.age);

    try {
        const result = await db.insert({ name, age });
        //console.log(result);
        res.redirect("/");
    } catch (err) {
        next(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const doc = await db.findOne(id);
        res.render("new", {
            title: "Edição de clientes",
            doc,
            action: "/edit/" + doc._id,
        });
    } catch (error) {
        next(error);
    }
});

router.post('/edit/:id', async (req, res, next) => {
    const id = req.params.id;
    const name = req.params.name
    const age = parseInt(req.params.age)

    try {
        const result = await db.update(id, {name, age})
        // console.log(result)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})

router.get('/delete/:id', async (req, res, next) => {
    const id = req.params.id

    console.log(id)
    try {
        const result = await db.deleteOne(id)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
})


router.get('/:pagina?', async (req, res, next) => {
    const pagina = parseInt(req.params.pagina || "1");
  
    try {
      const docs = await db.findAll(pagina);
      const count = await db.countAll()
      const qtdPaginas = Math.ceil(count / db.TAMANHO_PAGINA)
      res.render('index', { title: 'Lista de Clientes', docs, count, qtdPaginas, pagina });
    } catch (err) {
      next(err);
    }
  })
module.exports = router;
