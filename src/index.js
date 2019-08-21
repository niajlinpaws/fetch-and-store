/* 
   Challenge: 
   - Fetch the data from endpoints.
   - Store the data fetched in database, 
     preserving all the relational data.
   
   Ground Rules:
   - Minimal use of npm packages
   - A package.json file
   - .sql extension schema
   - Maintainable & Modular Code Style
*/

/* This is the starting point fdr the assignment */

/* 
    Importing the modules
*/
var {
    addTables,
    getUsers,
    getTodos,
    getPosts,
    getComments,
    getAlbums,
    getPhotos
} = require('./tasks');
var { query }  = require('./utils');


/* 
    addTables: 
    creates the table in database, based on the specified schema 
*/
addTables.then(data => {
    /*
        Running the tasks to fetch the data 
        from endpoints in parallel to reduce overload,   
    */
    Promise.all([
        getUsers,
        getTodos,
        getPosts,
        getComments,
        getAlbums,
        getPhotos
    ])
    .then(tasks=>{
        /* 
            Upon completion of fetching data from the endpoints,
            It's time to insert the retrieved data into database.  
        */

        query(tasks.join(';'),(err,result)=>{
            if(err) throw err;

            /*
                After storing the data,
                Following will display the metrics
                for the data stored like:
                Total Count, Glimpse of a random record being stored.
            */
            var data = [
                "Users",
                "Todos",
                "Posts",
                "Comments",
                "Albums",
                "Photos"
            ];
            result.forEach(({rows},index)=>{
                console.log(
                    `\x1b[34m${data[index]} data uploaded successfully\x1b[33m`,
                    `\n\nTotal:\x1b[32m${rows.length}\x1b[0m\n\n`,
                    `\x1b[36mHere is a glimpse of a random record:\x1b[0m\n\n`,
                    rows[Math.floor(Math.random()*10)],
                    `\n\n\x1b[44m                                              \x1b[0m\n`
                );
            });
        });
    })
    .catch(err => console.log(err));

}).catch(err => console.log(err));