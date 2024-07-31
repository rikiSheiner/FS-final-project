const pool = require("../actions");

export async function createPrescriptionRequests(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO PrescriptionRequests (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getPrescriptionRequest(patientID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM PrescriptionRequests
    WHERE PatientID = ${patientID}
    `)
    return rows[0]
  }
 
  export async function getAllPrescriptionRequests(patientID) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM PrescriptionRequest
        WHERE PatientID = ${patientID}` );
    
      return rows;
  }

  export async function deletePrescriptionRequest(RequestID) {
    const [result] = await pool.query(`
    "DELETE FROM PrescriptionRequest WHERE RequestID = ${RequestID}"
    `)
    return result
  }