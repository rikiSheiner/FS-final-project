const BaseModel = require('./baseModel');

class MedicineOrderModel extends BaseModel {
  constructor() {
    super('MedicineOrders'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new MedicineOrderModel();