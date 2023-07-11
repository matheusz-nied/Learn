const logger = require('./logger');

const obj = undefined

try {
    console.log(obj.name)
    logger.info(obj.name)
} catch (err) {
console.log(err)
}
