DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS albums CASCADE;
DROP TABLE IF EXISTS photos CASCADE;
DROP TABLE IF EXISTS todos CASCADE;  

CREATE TABLE users(
   id serial PRIMARY KEY NOT NULL,
   name VARCHAR (100) NOT NULL,
   username VARCHAR (100) NOT NULL,
   email VARCHAR (200) NOT NULL,
   address JSON,
   phone VARCHAR (75) NOT NULL,
   website VARCHAR(100) NOT NULL,
   company JSON
);

CREATE TABLE albums(
   id serial PRIMARY KEY NOT NULL,
   userId INTEGER NOT NULL REFERENCES users(id),
   title VARCHAR (255) NOT NULL
);

CREATE TABLE posts(
   id serial PRIMARY KEY NOT NULL,
   userId INTEGER NOT NULL REFERENCES users(id),
   title VARCHAR (255) NOT NULL,
   body TEXT
);

CREATE TABLE comments(
   id serial PRIMARY KEY NOT NULL,
   postId INTEGER NOT NULL REFERENCES posts(id),
   name VARCHAR (100) NOT NULL,
   email VARCHAR (200) NOT NULL,
   body TEXT
);

CREATE TABLE photos(
   id serial PRIMARY KEY NOT NULL,
   albumId INTEGER NOT NULL REFERENCES albums(id),
   title VARCHAR (255) NOT NULL,
   url VARCHAR (200) NOT NULL,
   thumbnailUrl VARCHAR (200) NOT NULL
);

CREATE TABLE todos(
   id serial PRIMARY KEY NOT NULL,
   userId INTEGER NOT NULL REFERENCES users(id),
   title VARCHAR (255) NOT NULL,
   completed BOOLEAN
);