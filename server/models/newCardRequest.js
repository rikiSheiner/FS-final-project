const BaseModel = require('./baseModel');

class NewCardRequestModel extends BaseModel {
  constructor() {
    super('NewCardRequests'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new NewCardRequestModel();