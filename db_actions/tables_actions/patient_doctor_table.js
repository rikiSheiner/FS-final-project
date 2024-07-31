const pool = require("../actions");

export async function createDPConnection(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO PatientDoctor (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getDoctor(patientID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM PatientDoctor
    WHERE PatientID = ${patientID}
    `)
    return rows[0]
  }
 
  export async function getAllPatients(doctorID) {
    const [rows] = await pool.query(`
     "SELECT * 
     FROM PatientDoctor 
     WHERE DoctorID = ${doctorID}
    `)
    return rows
  }

  export async function deleteDPConnection(patientID) {
    const [result] = await pool.query(`
    "DELETE FROM PatientDoctor WHERE UserID = ${patientID}"
    `)
    return result
  }