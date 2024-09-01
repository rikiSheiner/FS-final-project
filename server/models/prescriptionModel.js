import BaseModel from "./baseModel.js";
import pool from "../config/dbConfig.js";

class PrescriptionModel extends BaseModel {
  constructor() {
    super('prescriptions'); 
  }


async getPatientPrescriptions(patientId) {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, u.FirstName AS DoctorFirstName, u.LastName AS DoctorLastName, m.Name AS MedicineName
      FROM ${this.table} p
      JOIN doctors d ON p.DoctorID = d.DoctorID
      JOIN users u ON d.UserID = u.UserID
      JOIN medicines m ON p.MedicineID = m.MedicineID
      WHERE p.PatientID = ?
    `, [patientId]);

    console.log("Rows retrieved with doctor and medicine names:", rows); 

    return rows;
  } catch (error) {
    console.error("Error executing query in PrescriptionModel:", error);
    throw error;
  }
}
}

export default new PrescriptionModel();
