//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class PrescriptionModel extends BaseModel {
  constructor() {
    super('Prescriptions'); // שם הטבלה
  }

  getPatientPrescriptions(patientId){
    return super.findByProp('patientId', patientId);
  }

}

//module.exports = new PrescriptionModel();
export default new PrescriptionModel();