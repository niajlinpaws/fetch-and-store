/* 
    Importing the modules
*/
var http = require('http');

module.exports = function (url, callback) {
    /* 
        Utillity function to make network calls
        to endpoints provided, pass a BASE_URL
        via environment variable
    */
    http.get(`${process.env.BASE_URL}${url}`, function (response) {
        var data = '';

        /* 
            A chunk of data has been recieved.
        */
        response.on('data', (chunk) => {
            data += chunk;
        });

        /*
         The whole response has been received. Print out the result.
        */
        response.on('end', () => {
            callback(null, JSON.parse(data));
        });

    }).on("error", (err) => {
        callback(err, null);
    });
};