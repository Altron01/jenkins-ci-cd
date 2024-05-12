const constants = require('../contants')
const mysql = require('mysql');


var connection = null;

function startConnection() {
    if (connection !== null)
        return connection;
    connection = mysql.createConnection({
        host:     constants.AUTH_DB_HOST,
        user:     constants.AUTH_DB_USER,
        password: constants.AUTH_DB_PASSWORD,
        database: constants.AUTH_DB_DB_NAME
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    return connection;
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

function authUser(data, con=connection) {
    return new Promise((resolve, reject) => {
        var query = "SELECT username FROM users WHERE username = " + mysql.escape(data.username) + " AND password = " + mysql.escape(data.password) + " LIMIT 1"
        con.query(query, function (err, result) {
            if (err) throw err;
            if (result.length > 0) {
                return resolve({ msg: 'authenticated' })
            }
            return reject({ msg: 'user not found' })
        });
    })
}

module.exports = { startConnection, checkHealth, authUser }