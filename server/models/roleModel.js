import BaseModel from "./baseModel.js";

class RolesModel extends BaseModel {
  constructor() {
    super('Roles'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

export default new RolesModel();
