const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    database: 'electoral_bond',
    user: 'root',
    password: 'root'
})

module.exports = connection;