var mysql  = require('mysql2');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'db2017',
        database: 'PET_DEVICE'
    });
}

module.exports = createDBConnection;
