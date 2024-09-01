import BaseModel from "./baseModel.js";
import pool from "../config/dbConfig.js";

class AppointmentModel extends BaseModel {
  constructor() {
    super("Appointments");
  }

  async getAppointmentsWithPatientDetails(doctorId) {
    const [rows] = await pool.query(
      `
      SELECT appointments.*, 
             users.FirstName, 
             users.LastName, 
             users.Email, 
             users.Phone
      FROM ${this.table}
      JOIN users ON appointments.UserID = users.UserID
      WHERE appointments.DoctorID = ?
    `,
      [doctorId]
    );

    return rows;
  }

  async getFutureAppointmentsModel(doctorID) {

    const now = new Date();
    const [rows] = await pool.query(`
      SELECT a.*, u.FirstName, u.LastName, u.Email, u.Phone 
      FROM appointments a
      JOIN users u ON a.UserID = u.UserID
      WHERE a.DoctorID = ? AND a.Date >= ? 
      ORDER BY a.Date ASC, a.StartTime ASC
    `, [doctorID, now]);
  
    return rows;
  }
  
  async countAppointmentsToday(doctorId) {
    const [result] = await pool.query(
      `
        SELECT COUNT(*) AS appointmentCount 
        FROM appointments 
        WHERE DoctorID = ? 
        AND Date = CURDATE()
    `,
      [doctorId]
    );

    return result[0].appointmentCount;
  }
}

export default new AppointmentModel();
