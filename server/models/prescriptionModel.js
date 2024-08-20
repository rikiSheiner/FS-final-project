import BaseModel from "./baseModel.js";

class PrescriptionModel extends BaseModel {
  constructor() {
    super('Prescriptions'); // שם הטבלה
  }

  getPatientPrescriptions(patientId){
    return super.findByProp('patientId', patientId);
  }

}

export default new PrescriptionModel();