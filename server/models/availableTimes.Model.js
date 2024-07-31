const BaseModel = require('./baseModel');

class AvailableTimesModel extends BaseModel {
  constructor() {
    super('AvailableTimes'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new AvailableTimesModel();