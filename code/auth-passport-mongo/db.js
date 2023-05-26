const bcrypt = require("bcryptjs");

function createUser(username, password, email, callback) {
    const cryptPwd = bcrypt.hashSync(password, 10);
    result =  global.db
        .collection("users")
        .insertOne({ username, password: cryptPwd, email }).then(result => {
            return result;
        }).catch(err => {
            callback(err);
        });

    return result
}

function findUser(email, callback) {
    console.log('findUser,  ' + email)
    global.db.collection("users").findOne({ email: email}).then((doc, err) => {
        callback(err, doc)
    });
}

function changePassword(email, password) {
    console.log('changePassword')

    const cryptPwd = bcrypt.hashSync(password, 10)
    global.db.collection('users').updateOne({ email: email, password: cryptPwd})
}

module.exports = { createUser, findUser, changePassword};
