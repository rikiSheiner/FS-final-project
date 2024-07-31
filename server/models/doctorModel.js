const BaseModel = require('./baseModel');

class DoctorModel extends BaseModel {
  constructor() {
    super('Doctors'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new DoctorModel();