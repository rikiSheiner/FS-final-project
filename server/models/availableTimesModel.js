import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js';
class AvailableTimesModel extends BaseModel {
  constructor() {
    super('AvailableTimes'); // שם הטבלה
  }

  // Method to get available times by doctor IDs
  async getAvailableTimesByDoctorIds(doctorIds) {
    // Ensure doctorIds is an array
    if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
        return []; // Return an empty array if no valid doctor IDs are provided
    }

    // Log the doctor IDs being used in the query
    console.log("Querying available times for doctor IDs:", doctorIds);

    // Use the IN clause to filter by doctor IDs
    const [rows] = await pool.query(`
        SELECT * 
        FROM AvailableTimes
        WHERE DoctorID IN (?)
    `, [doctorIds]);

    console.log("Query result:", rows); // Log the query result
    return rows; // Return the list of available times
}


}

export default new AvailableTimesModel();