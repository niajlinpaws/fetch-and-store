/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the users
    */
    request('users', function (err, users) {
        if (err) return reject(message("Fetching Users", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = users.map(({ 
            name, 
            username,
            email,
            address,
            phone,
            website,
            company 
        })=>JSON.stringify([name, username, email, phone, website])
            .replace(/\[/g,"(")
            .replace(/\]/g,"")
            .replace(/"/g,'\'') 
            +",'"
            + JSON.stringify(address)
            +"','"
            +JSON.stringify(company)+"')"
        );
        
        var condensedData = data.join(",");

        /* 
            Preparing the query,
            to insert the users
        */

        resolve(`INSERT INTO 
                users(name, userName, email, phone, website, address, company) 
                VALUES ${condensedData} RETURNING *`
        );
    });
});