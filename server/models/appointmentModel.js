const BaseModel = require('./baseModel');

class AppointmentModel extends BaseModel {
  constructor() {
    super('Appointments'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new AppointmentModel();