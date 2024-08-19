//const BaseModel = require('./baseModel');

import BaseModel from "./baseModel.js";

//const pool = require('../config/db'); // Ensure the connection to the database is accessible
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

//module.exports = new DoctorModel();
export default new DoctorModel();