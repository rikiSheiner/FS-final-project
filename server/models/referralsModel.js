const BaseModel = require('./baseModel');

class ReferralsModel extends BaseModel {
  constructor() {
    super('Referrals'); // שם הטבלה
  }

  // ניתן להוסיף פונקציות מיוחדות למודל זה אם יש צורך
}

module.exports = new ReferralsModel();