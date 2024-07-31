const BaseModel = require('./baseModel');

class PrescriptionRequestModel extends BaseModel {
  constructor() {
    super('PrescriptionRequests'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new PrescriptionRequestModel();