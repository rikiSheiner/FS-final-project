//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class ReferralsModel extends BaseModel {
  constructor() {
    super('Referrals'); // שם הטבלה
  }

  getPatientRefferals(patientId){
    return super.findByProp('patientId', patientId);
  }
}

//module.exports = new ReferralsModel();
export default new ReferralsModel();
