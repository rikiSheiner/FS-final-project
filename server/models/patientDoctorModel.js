const BaseModel = require('./baseModel');

class PatientDoctorModel extends BaseModel {
  constructor() {
    super('PatientDoctor'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new PatientDoctorModel();