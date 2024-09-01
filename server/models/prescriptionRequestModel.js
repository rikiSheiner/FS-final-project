import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js'

class PrescriptionRequestModel extends BaseModel {
  constructor() {
    super('PrescriptionRequests'); 
  }

  // קבלת כל בקשות למרשמים של מטופל מסוים
  getPRofPatient(patientID){
    //super.findByProp('patientID',patientID);
    super.getAllWithFilter('patientID',patientID);
  }

  getIncompletedPRofPatient(patientID){
    const requests = this.getPRofPatient(patientID);
    return requests.filter(request => request.Approved === false); 
  }
  
  async getRequestsWithMedicineDetails(filters) {
    const filterKeys = Object.keys(filters);
    const filterValues = Object.values(filters);
    
    const whereClause = filterKeys.map(key => `${this.table}.${key} = ?`).join(" AND ");
    
    const [rows] = await pool.query(`
      SELECT ${this.table}.*, Medicines.Name as MedicineName, Medicines.Price, Medicines.ImagePath
      FROM ${this.table}
      INNER JOIN Medicines ON ${this.table}.MedicineID = Medicines.MedicineID
      WHERE ${whereClause}
    `, filterValues);

    return rows;
  }

}

export default new PrescriptionRequestModel();