const BaseModel = require('./baseModel');

class MedicineModel extends BaseModel {
  constructor() {
    super('Medicines'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new MedicineModel();