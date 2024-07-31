const pool = require("../actions");

export async function createAppointment(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO PatientDoctor (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getAppointment(patientID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM Appointments
    WHERE PatientID = ${patientID}
    `)
    return rows[0]
  }
 
  export async function getAllAppointments(userID,userType) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM Appointments
        WHERE ${userType} =${userID}` );
    
      return rows;
  }

  export async function deleteAppointment(patientID) {
    const [result] = await pool.query(`
    "DELETE FROM Appointments WHERE UserID = ${patientID}"
    `)
    return result
  }