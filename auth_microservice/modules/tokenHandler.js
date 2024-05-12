var crypto = require("crypto");

function createSessionToken(stringChain) {
    return (stringChain.concat("|")).concat(crypto.randomBytes(40).toString('hex').slice(0, 40))
}

//Don't judge, sessions is not the objective of the tutorial
function getSessionToken(stringChain) {
    return stringChain.split("|")[0]
}

module.exports = { createSessionToken, getSessionToken }