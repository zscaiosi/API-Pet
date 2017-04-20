var mysql  = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'db2017',
        database: 'PET_DEVICE'
    });
}

module.exports = function() {
    return createDBConnection;
}
