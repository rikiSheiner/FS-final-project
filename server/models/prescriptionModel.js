const BaseModel = require('./baseModel');

class PrescriptionModel extends BaseModel {
  constructor() {
    super('Prescriptions'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new PrescriptionModel();