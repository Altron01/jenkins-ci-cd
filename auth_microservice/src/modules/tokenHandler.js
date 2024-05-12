const crypto = require("crypto");

function createSessionToken(stringChain='') {
    if (stringChain.length == 0) throw new Error({ status: 400, msg: 'stringChain must have length > 0' })
    return (stringChain.concat("|")).concat(crypto.randomBytes(40).toString('hex').slice(0, 40))
}

//Don't judge, sessions is not the objective of the tutorial
function getSessionToken(stringChain='') {
    if (stringChain.length == 0) throw new Error({ status: 400, msg: 'stringChain must have length > 0' })
    return (stringChain.split("|")[0])
}

module.exports = { createSessionToken, getSessionToken }