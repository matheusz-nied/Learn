const bcrypt = require("bcryptjs");

function createUser(username, password, email, callback) {
    const cryptPwd = bcrypt.hashSync(password, 10);
    result =  global.db
        .collection("users")
        .insertOne({ username, password: cryptPwd, email }).then(result => {
            console.log("Then aqui dentro");
            return result;
        });

    return result
}

module.exports = { createUser };
