

const mysql = require('mysql');

console.log('Starting script...');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fullstack',
  database: 'hmodb'
  // Note: `database` key is omitted
});

console.log('Attempting to connect to MySQL server...');

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL server:', err.stack);
    return;
  }
  console.log('Connected to the MySQL server as id', connection.threadId);

  // Optionally, list databases to verify connection
  connection.query('SHOW DATABASES', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
    } else {
      console.log('Databases:', results);
    }
    // Close the connection
    //connection.end();
  });
});

console.log('Script finished.');


module.exports = connection;