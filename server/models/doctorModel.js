import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js'; 

class DoctorModel extends BaseModel {
  constructor() {
    super('Doctors'); 
  }

  async getSpecialties() {
    try {
      const specialties = await this.findDistinct('Profession');
      console.log('Specialties:', specialties);
  
      return specialties.map(row => row.Profession);
    } catch (error) {
      console.error('Error in getSpecialties:', error); 
      throw error;
    }
  }

  async getDoctorsWithClinicDetails(propName, propValue) {
    try {
      const [rows] = await pool.query(`
        SELECT 
          d.DoctorID,
          u.FirstName,
          u.LastName,
          c.Location
        FROM 
          doctors d
        JOIN 
          users u ON d.UserID = u.UserID
        JOIN 
          clinics c ON d.ClinicID = c.ClinicID
        WHERE 
          d.${propName} = ?;
      `, [propValue]);

      return rows;
    } catch (error) {
      console.error('Error in getDoctorsWithClinicDetails:', error);
      throw error;
    }
  }
}

export default new DoctorModel();
