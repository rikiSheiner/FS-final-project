const BaseModel = require('./baseModel');

class UserModel extends BaseModel {
  constructor() {
    super('Users'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new UserModel();
