/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the photos
    */
    request('photos', function (err, photos) {
        if (err) return reject(message("Fetching Photos", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = photos.map(({ 
            albumId, 
            title,
            url,
            thumbnailUrl 
        })=>[albumId, title, url, thumbnailUrl]);
        var condensedData = JSON.stringify(data)
                            .replace(/\[/g,"(")
                            .replace(/\]/g,")")
                            .replace(/"/g,'\'')
                            .slice(1,-1);

        /* 
            Preparing the query,
            to insert the photos
        */
        
        resolve(`INSERT INTO 
                photos(albumId, title, url, thumbnailUrl) 
                VALUES ${condensedData} RETURNING *`
        );
    });
});