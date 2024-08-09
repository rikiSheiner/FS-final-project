const BaseModel = require('./baseModel');

class ReferralsModel extends BaseModel {
  constructor() {
    super('Referrals'); // שם הטבלה
  }

  getPatientRefferals(patientId){
    return super.findByProp('patientId', patientId);
  }
}

module.exports = new ReferralsModel();