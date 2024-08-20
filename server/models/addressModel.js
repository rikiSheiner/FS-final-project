import BaseModel from "./baseModel.js";

class AddressModel extends BaseModel {
  constructor() {
    super('Addresses'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

export default new AddressModel();