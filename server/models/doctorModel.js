import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js';

class DoctorModel extends BaseModel {
  constructor() {
    super('Doctors'); // Table name
  }

  // Method to get unique specialties
  async getSpecialties() {
    const [rows] = await pool.query(`
      SELECT DISTINCT Profession
      FROM Doctors
    `);
    return rows.map(row => row.Profession);
  }

  
}

export default new DoctorModel();