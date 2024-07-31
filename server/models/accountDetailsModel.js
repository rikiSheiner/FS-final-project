const BaseModel = require('./baseModel');

class AccountDetailsModel extends BaseModel {
  constructor() {
    super('AccountDetails'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new AccountDetailsModel();