//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class AppointmentModel extends BaseModel {
  constructor() {
    super('Appointments'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

//module.exports = new AppointmentModel();
export default new AppointmentModel();