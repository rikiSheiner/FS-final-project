const BaseModel = require('./baseModel');

class PrescriptionModel extends BaseModel {
  constructor() {
    super('Prescriptions'); // שם הטבלה
  }

  getPatientPrescriptions(patientId){
    return super.findByProp('patientId', patientId);
  }

}

module.exports = new PrescriptionModel();