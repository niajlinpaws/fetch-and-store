/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the comments
    */
    request('comments', function (err, comments) {
        if (err) return reject(message("Fetching Comments", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = comments.map(({ 
            postId, 
            name,
            email,
            body 
        })=>[postId, name, email, body]);
        var condensedData = JSON.stringify(data)
                            .replace(/\[/g,"(")
                            .replace(/\]/g,")")
                            .replace(/"/g,'\'')
                            .slice(1,-1);

        /* 
            Preparing the query,
            to insert the comments
        */
        
        resolve(`INSERT INTO 
                comments(postId, name, email, body) 
                VALUES ${condensedData} RETURNING *`
        );
    });
});