import BaseModel from "./baseModel.js";
import pool from "../config/dbConfig.js";

class PatientDoctorModel extends BaseModel {
  constructor() {
    super('patientdoctor'); 
  }

  async getPatientsOfDoctor(doctorID) {
    console.log(`Querying patients for doctorID: ${doctorID}`);
    
    const [rows] = await pool.query(`
      SELECT Users.*
      FROM ${this.table}
      INNER JOIN Users ON ${this.table}.PatientID = Users.UserID
      WHERE ${this.table}.DoctorID = ?
    `, [doctorID]);

    return rows;
  }

  async countPatients(doctorId) {
    const [result] = await pool.query(`
        SELECT COUNT(DISTINCT PatientID) AS patientCount 
        FROM patientdoctor 
        WHERE DoctorID = ?
    `, [doctorId]);
    
    return result[0].patientCount;
}

}

export default new PatientDoctorModel();
