const pool = require("../actions");

export async function createRole(obj) {
  const columns = Object.keys(obj).join(', ');
  const placeholders = Object.keys(obj).map(() => '?').join(', ');
  const values = Object.values(obj);
  const [result] = await pool.query(`
    INSERT INTO Roles (${columns})
    VALUES (${placeholders})
  `, values);
  return result;
}

export async function getRole(roleID) {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Roles
    WHERE RoleID = ?
  `, [roleID]);
  return rows[0];
}

export async function getAllRoles() {
  const [rows] = await pool.query(`
    SELECT * 
    FROM Roles
  `);
  return rows;
}

export async function deleteRole(roleID) {
  const [result] = await pool.query(`
    DELETE FROM Roles
    WHERE RoleID = ?
  `, [roleID]);
  return result;
}
