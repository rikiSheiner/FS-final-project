import BaseModel from "./baseModel.js";
import pool from "../config/dbConfig.js";

class ReferralsModel extends BaseModel {
  constructor() {
    super("Referrals");
  }

  async getPatientRefferals(patientId) {
    try {
      const [rows] = await pool.query(
        `
        SELECT r.*, u.FirstName, u.LastName
        FROM ${this.table} r
        JOIN doctors d ON r.DoctorID = d.DoctorID
        JOIN users u ON d.UserID = u.UserID
        WHERE r.PatientID = ?
        `,
        [patientId]
      );

      console.log("Rows retrieved with doctor names:", rows); 

      return rows;
    } catch (error) {
      console.error("Error executing query in RefferalModel:", error);
      throw error;
    }
  }
}

export default new ReferralsModel();
