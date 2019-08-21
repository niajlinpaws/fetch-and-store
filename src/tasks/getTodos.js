/* 
    Importing the utility modules
*/
var { request, message } = require('../utils');

module.exports = new Promise(function (resolve, reject) {
    /* 
        Making a network call to fetch the todos
    */
    request('todos', function (err, todos) {
        if (err) return reject(message("Fetching Todos", err));

        /*
            Modifying the data received,
            to insert into database
        */
        
        var data = todos.map(({ 
            userId, 
            title,
            completed
        })=>[userId, title, completed]);
        var condensedData = JSON.stringify(data)
                            .replace(/\[/g,"(")
                            .replace(/\]/g,")")
                            .replace(/"/g,'\'')
                            .slice(1,-1);

        /* 
            Preparing the query,
            to insert the todos
        */
        
        resolve(`INSERT INTO 
                 todos(userId, title, completed) 
                 VALUES ${condensedData} RETURNING *`
        );
    });
});