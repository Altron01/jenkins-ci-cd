const constants = require('../contants')
const mysql = require('mysql');

var connection = null;

function startConnection(con=connection) {
    if (con !== null)
        return con;
    con = mysql.createConnection({
        host:     constants.AUTH_DB_HOST,
        user:     constants.AUTH_DB_USER,
        password: constants.AUTH_DB_PASSWORD,
        database: constants.AUTH_DB_DB_NAME
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return con;
}

function checkHealth(con=connection) { 
    if(con.state === 'disconnected'){
        return { status: 500, msg: "unhealthy" }
    }
    if(con.state === 'authenticated'){
        return { status: 200, msg: "healthy" }
    }
    return { status: 500, msg: "unknown" }
}

function authUser(data=null, con=connection) {
    return new Promise((resolve, reject) => {
        if (data === null || data === undefined) throw { status: 400, msg: 'no uesr data sent' }
        var query = "SELECT username FROM users WHERE username = " + mysql.escape(data.username) + " AND password = " + mysql.escape(data.password) + " LIMIT 1"
        con.query(query, function (err, result) {
            if (err) reject(new Error({ status: 500, err }));
            if (result.length > 0) {
                return resolve({ status: 200, msg: 'authenticated' })
            }
            return resolve({ status: 404, msg: 'user not found' })
        });
    })
}

module.exports = { startConnection, checkHealth, authUser }