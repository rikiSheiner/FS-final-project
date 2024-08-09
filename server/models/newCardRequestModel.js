const BaseModel = require('./baseModel');

class NewCardRequestModel extends BaseModel {
  constructor() {
    super('NewCardRequests'); // שם הטבלה
  }

}

module.exports = new NewCardRequestModel();