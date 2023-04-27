var bcrypt = require ('bcryptjs')
var salt = bcrypt.genSaltSync(10)
console.log(salt)
var senhaParaSalvar = bcrypt.hashSync("123", salt)
console.log(senhaParaSalvar)


const isValid = bcrypt.compareSync("1234", senhaParaSalvar);

console.log(isValid)

