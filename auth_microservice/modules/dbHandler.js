const constants = require('../contants')

var mysql = require('mysql');

var con = mysql.createConnection({
    host:     constants.AUTH_DB_HOST,
    user:     constants.AUTH_DB_USER,
    password: constants.AUTH_DB_PASSWORD,
    database: constants.AUTH_DB_DB_NAME
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function checkHealth() { 
    if(con.state === 'disconnected'){
        return false, { msg: "unhealthy" }
    }
    if(con.state === 'authenticated'){
        return true, { msg: "healthy" }
    }
    return false, { msg: "unknown" }
}

function authUser(data) {
    return new Promise((resolve, reject) => {
        var query = "SELECT username FROM users WHERE username = " + mysql.escape(data.username) + " AND password = " + mysql.escape(data.password) + " LIMIT 1"
        console.log(query)
        con.query(query, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                return resolve({ msg: 'authenticated' })
            }
            return reject({ msg: 'user not found' })
        });
    })
}

module.exports = { checkHealth, authUser }