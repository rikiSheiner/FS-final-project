import BaseModel from "./baseModel.js";

class DoctorModel extends BaseModel {
  constructor() {
    super('Doctors'); // שם הטבלה
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
  
}

export default new DoctorModel();
