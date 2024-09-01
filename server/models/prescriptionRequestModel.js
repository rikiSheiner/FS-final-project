import BaseModel from "./baseModel.js";
import pool from "../config/dbConfig.js";

class PrescriptionRequestModel extends BaseModel {
  constructor() {
    super("PrescriptionRequests");
  }

  getPRofPatient(patientID) {
    super.getAllWithFilter("patientID", patientID);
  }

  getIncompletedPRofPatient(patientID) {
    const requests = this.getPRofPatient(patientID);
    return requests.filter((request) => request.Approved === false);
  }

  async getRequestsWithMedicineDetails(filters) {
    const filterKeys = Object.keys(filters);
    const filterValues = Object.values(filters);

    const whereClause = filterKeys
      .map((key) => `${this.table}.${key} = ?`)
      .join(" AND ");

    const [rows] = await pool.query(
      `
      SELECT ${this.table}.*, Medicines.Name as MedicineName, Medicines.Price, Medicines.ImagePath
      FROM ${this.table}
      INNER JOIN Medicines ON ${this.table}.MedicineID = Medicines.MedicineID
      WHERE ${whereClause}
    `,
      filterValues
    );

    return rows;
  }

  async countUnapprovedPrescriptions(doctorId) {
    const [result] = await pool.query(
      `
        SELECT COUNT(*) AS unapprovedCount 
        FROM prescriptionrequests 
        WHERE DoctorID = ? 
        AND Approved = FALSE
    `,
      [doctorId]
    );

    return result[0].unapprovedCount;
  }

  async getPrescriptionsWithDetails(doctorID) {
    const [rows] = await pool.query(
      `
        SELECT pr.*, m.Name as MedicineName, u.FirstName, u.LastName 
        FROM prescriptionrequests pr
        JOIN medicines m ON pr.MedicineID = m.MedicineID
        JOIN users u ON pr.PatientID = u.UserID
        WHERE pr.DoctorID = ?
    `,
      [doctorID]
    );

    return rows;
  }
}

export default new PrescriptionRequestModel();
