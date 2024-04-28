var crypto = require("crypto");

function createSessionToken(stringChain) {
    return (stringChain.concat("|")).concat(crypto.randomBytes(20).toString('hex'))
}

//Don't judge, sessions is not the objective of the tutorial
function getSessionToken(stringChain) {
    return stringChain.split("|")[0]
}

module.exports = { createSessionToken, getSessionToken }