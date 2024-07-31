const pool = require("../actions");

export async function createAvailableTime(obj) {
    const columns = Object.keys(obj).join(', ');
    const placeholders = Object.keys(obj).map(() => '?').join(', ');
    const values = Object.values(obj);
    const [result] = await pool.query(`
    INSERT INTO AvailableTimes (${columns})
    VALUES (${placeholders})
    `, values)
    return result
  }

  export async function getAvailableTime(doctorID) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM AvailableTimes
    WHERE DoctorID = ${doctorID}
    `)
    return rows[0]
  }
 
  export async function getAllAvailableTimes(DoctorID) {
    const [rows] = await pool.query(`
        SELECT * 
        FROM AvailableTimes
        WHERE DoctorID =${DoctorID}` );
    
      return rows;
  }

  export async function deleteAvailableTime(TimeID) {
    const [result] = await pool.query(`
    "DELETE FROM AvailableTimes WHERE TimeID = ${TimeID}"
    `)
    return result
  }