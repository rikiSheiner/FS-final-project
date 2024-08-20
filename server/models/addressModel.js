//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class AddressModel extends BaseModel {
  constructor() {
    super('Addresses'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

//module.exports = new AddressModel();
export default new AddressModel();