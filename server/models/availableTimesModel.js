//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

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

    // Use the IN clause to filter by multiple doctor IDs
    const [rows] = await pool.query(`
      SELECT * 
      FROM ${this.table}
      WHERE DoctorID IN (?)
    `, [doctorIds]);

    return rows; // Return the list of available times
  }

}

//module.exports = new AvailableTimesModel();
export default new AvailableTimesModel();