const mysql = require("mysql");
// Create a connection to the database
var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "nodelogin",
});
// open the MySQL connection
connection.getConnection((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});
module.exports = connection;
