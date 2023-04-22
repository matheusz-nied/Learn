var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

module.exports = router;

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
        .exec()
        .then((docs) => {
            res.json(docs);
            res.end();
        });
});

router.get("/customers/:id", function (req, res, next) {
    var db = require("../db");
    var Customer = db.Mongoose.model(
        "customers",
        db.CustomerSchema,
        "customers"
    );
    Customer.find({ _id: req.params.id })
        .lean()
        .exec()
        .then((docs) => {
            res.json(docs);
            res.end();
        });
});

/* POST ONE customer. */
router.post("/customers/", function (req, res, next) {
    var db = require("../db");
    var Customer = db.Mongoose.model(
        "customers",
        db.CustomerSchema,
        "customers"
    );
    var newcustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
    });
    newcustomer
        .save()
        .then(() => {
            res.json(newcustomer);
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
    })
        .then(() => {
            res.json(req.body);
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
