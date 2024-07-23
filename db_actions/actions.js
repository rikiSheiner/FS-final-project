import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'fullstack',
    database: 'hmodb',
  }).promise();

  module.exports = pool;