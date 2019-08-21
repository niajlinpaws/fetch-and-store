/* 
    Importing the modules
*/
var { Pool } = require('pg');

/* 
    Setting up the database connection using
    connecion string (to be provided
    via environment variables)
*/

var pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

module.exports = function (query, callback) {

    /* 
        Utility function to reuse
        the pool connection for data querying, 
        without a termination after every 
        data querying done.
    */

    pool.query(query, function (err, result) {
        if (err) {
            pool.end();
            return callback(err, null);
        }

        callback(null, result);
    });
};