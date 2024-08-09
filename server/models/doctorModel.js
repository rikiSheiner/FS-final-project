const BaseModel = require('./baseModel');
const pool = require('../config/db'); // Ensure the connection to the database is accessible
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

  
  // Additional methods specific to doctors can be added here
}

module.exports = new DoctorModel();