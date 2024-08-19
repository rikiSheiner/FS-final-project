import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'fullstack',
    database: 'hmodb',
}).promise();

export default pool;