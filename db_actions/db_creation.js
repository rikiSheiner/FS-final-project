var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fullstack'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE HMOdb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
    con.end();
  });
});




