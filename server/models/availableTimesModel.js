import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js';

class AvailableTimesModel extends BaseModel {
  constructor() {
    super('AvailableTimes');
  }

  async getAvailableTimesByDoctorIds(doctorIds) {
    if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
      return [];
    }

    const [rows] = await pool.query(`
      SELECT * 
      FROM AvailableTimes
      WHERE DoctorID IN (?)
    `, [doctorIds]);

    return rows;
  }
}

export default new AvailableTimesModel();
