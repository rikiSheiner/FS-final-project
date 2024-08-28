import BaseModel from "./baseModel.js";
import pool from '../config/dbConfig.js';

class DoctorModel extends BaseModel {
  constructor() {
    super('Doctors'); // Table name
  }

  // Method to get unique specialties
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

  
}

export default new DoctorModel();