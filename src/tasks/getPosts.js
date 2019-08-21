/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the posts
    */
    request('posts', function (err, posts) {
        if (err) return reject(message("Fetching Posts", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = posts.map(({ 
            userId, 
            title,
            body
        })=>[userId, title, body]);
        var condensedData = JSON.stringify(data)
                            .replace(/\[/g,"(")
                            .replace(/\]/g,")")
                            .replace(/"/g,'\'')
                            .slice(1,-1);

        /* 
            Preparing the query,
            to insert the posts
        */
        
        resolve(`INSERT INTO 
                posts(userId, title, body) 
                VALUES ${condensedData} RETURNING *`
        );
    });
});