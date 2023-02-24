require("dotenv").config(); //.ENV
const mysql = require("mysql2/promise"); //MYSQL

// create the connection to database
const connection = mysql.createPool({
   host: process.env.DB_HOST,
   port: process.env.DB_POST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0,
});

module.exports = connection;
