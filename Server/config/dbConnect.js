
const mysql = require('mysql2');

exports.connect = () => {
  const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"fUckE15@",
    database: "resume",


    // host:"sql6.freesqldatabase.com",
    // user: "sql6680355",
    // password:"sleEqS2WYc",
    // database: "sql6680355",
  });

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  // Close the connection when the Node.js process ends
  process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });

  return connection;
};
