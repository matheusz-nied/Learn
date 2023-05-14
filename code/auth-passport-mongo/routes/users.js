var express = require("express");
var router = express.Router();
const db = require("../db");
/* GET users listing. */
router.get("/signup", (req, res, next) => {
    if (req.query.fail)
        res.render("signup", { message: "Falha ao cadastrar o usuario!" });
    else res.render("signup", { message: null });
});

router.post("/signup", async  (req, res, next) =>{
    const result = await db.createUser(
        req.body.username,
        req.body.password,
        req.body.email
    );
    res.redirect('/')
});

module.exports = router;
