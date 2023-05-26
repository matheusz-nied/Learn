var express = require("express");
var router = express.Router();
const db = require("../db");
/* GET users listing. */
router.get("/signup", (req, res, next) => {
    if (req.query.fail)
        res.render("signup", { message: "Falha ao cadastrar o usuario!" });
    else res.render("signup", { message: null });
});

router.post("/signup", async (req, res, next) => {
    const result = await db.createUser(
        req.body.username,
        req.body.password,
        req.body.email,
        (err, result) => {
            if (err) res.redirect("/signup?fail=true");
            res.redirect("/");
        }
    );
    require("../mail")(
        req.body.email,
        "Bem vindo ao nosso chat",
        "Olá " + req.body.username + ", obrigado por se cadastrar!"
    );

    console.log("Resul:->  ", result);
    res.redirect("/");
});

router.get("/forgot", function (req, res, next) {
    res.render("forgot", {});
});

router.post("/forgot", function (req, res, next) {
    db.findUser(req.body.email, (err, doc) => {
        console.log(err);
        console.log(doc.username);
        if (err || !doc) res.redirect("/"); //Manda para o login mesmo que não ache
        const newpass = require("../util").generatePassword();
        console.log('Tentando 1')

        db.changePassword(req.body.email, newpass);
        console.log('Tentando 2')

        require("../mail")(
            req.body.email,
            "Sua nova senha do chat",
            "Olá " + doc.username + ", sua nova senha é " + newpass
        );
        res.redirect("/");
    });
});
module.exports = router;
