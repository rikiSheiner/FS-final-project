const pool = require("../actions");

export async function createNewCardRequest(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO NewCardRequests (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getNewCardRequest(patientID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM NewCardRequests
    WHERE PatientID = ${patientID}
    `)
    return rows[0]
  }
 
  export async function getAlNewCardRequests(patientID) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM NewCardRequests
        WHERE PatientID = ${patientID}` );
    
      return rows;
  }

  export async function deleteNewCardRequest(RequestID) {
    const [result] = await pool.query(`
    "DELETE FROM NewCardRequests WHERE RequestID = ${RequestID}"
    `)
    return result
  }