const BaseModel = require('./baseModel');

class AddressModel extends BaseModel {
  constructor() {
    super('Addresses'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new AddressModel();