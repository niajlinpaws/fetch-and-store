/* 
    Importing the modules
*/
var fs = require('fs');
var path = require('path');
/* 
    Importing the utility modules
*/
var { query, message } = require('./../utils');

module.exports = new Promise((resolve, reject) =>
    /* 
        Reading the appSchema.sql file to
        register the tables in database
    */
    fs.readFile(
        path.join(__dirname, '../../appSchema.sql'),
        'utf-8',
    function (err, result) {
        if (err) return reject(message("Reading A File", err));

        /* 
            Running queries based on the schema
        */
        query(result, function (err, result) {
            if (err) console.log(err);
            if (err) return reject(message("Creating Schema", err));
            resolve(result);
        });
    })
);