
const pool = require("../actions");

export async function createNewAccountDetails(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO AccountDetailss (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getAccountDetails(patientID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM AccountDetails
    WHERE UserID = ${patientID}
    `)
    return rows[0]
  }
 
  export async function getAllAccountsDetails(patientID) {  //  את הפונקציה הזו לא נראלי צריך
    const [rows] = await pool.query(`
        SELECT * 
        FROM AccountDetails
        WHERE UserID = ${patientID}` );
    
      return rows;
  }

  export async function deleteAccountDetails(AccountID) {
    const [result] = await pool.query(`
    "DELETE FROM AccountDetails WHERE AccountID = ${AccountID}"
    `)
    return result
  }