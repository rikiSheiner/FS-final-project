const pool = require("../actions");

export async function createUser(obj) {
  const columns = Object.keys(obj).join(', ');
  const placeholders = Object.keys(obj).map(() => '?').join(', ');
  const values = Object.values(obj);
  const [result] = await pool.query(`
    INSERT INTO Users (${columns})
    VALUES (${placeholders})
  `, values);
  return result;
}

export async function getUser(userID) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Users
    WHERE UserID = ?
  `, [userID]);
  return rows[0];
}

export async function getAllUsers() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Users
  `);
  return rows;
}

export async function deleteUser(userID) {
  const [result] = await pool.query(`
    DELETE FROM Users
    WHERE UserID = ?
  `, [userID]);
  return result;
}

export async function updateUser(userID, obj) {
  const updates = Object.keys(obj).map(key => `${key} = ?`).join(', ');
  const values = Object.values(obj);
  values.push(userID);
  const [result] = await pool.query(`
    UPDATE Users
    SET ${updates}
    WHERE UserID = ?
  `, values);
  return result;
}
