//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class PatientDoctorModel extends BaseModel {
  constructor() {
    super('PatientDoctor'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

//module.exports = new PatientDoctorModel();
export default new PatientDoctorModel();