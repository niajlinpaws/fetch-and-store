/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the albums
    */
    request('albums', function (err, albums) {
        if (err) return reject(message("Fetching Albums", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = albums.map(({ 
            userId, 
            title 
        })=>[userId, title]);
        
        var condensedData = JSON.stringify(data)
                            .replace(/\[/g,"(")
                            .replace(/\]/g,")")
                            .replace(/"/g,'\'')
                            .slice(1,-1);

        /* 
            Preparing the query,
            to insert the albums
        */
        
        resolve(`INSERT INTO 
            albums(userId, title) 
            VALUES ${condensedData} RETURNING *`
        );
    });
});