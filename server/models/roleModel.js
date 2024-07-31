const BaseModel = require('./baseModel');

class RolesModel extends BaseModel {
  constructor() {
    super('Roles'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new RolesModel();