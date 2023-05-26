const express = require("express");
const router = express.Router();
const passport = require("passport");

/* GET login page. */
router.get("/", (req, res, next) => {
    if (req.query.fail)
        res.render("login", { message: "Usuário e/ou senha incorretos!" });
    else res.render("login", { message: null });
});

/* POST login page */
router.post(
    "/",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?fail=true",
    })
);

router.post("/logoff", function (req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
});
module.exports = router;
