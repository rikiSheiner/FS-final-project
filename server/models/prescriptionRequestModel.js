import BaseModel from "./baseModel.js";

class PrescriptionRequestModel extends BaseModel {
  constructor() {
    super('PrescriptionRequests'); 
  }

  getPRofPatient(patientID){
    super.findByProp('patientID',patientID);
  }

  getIncompletedPRofPatient(patientID){
    const requests = this.getPRofPatient(patientID);
    return requests.filter(request => request.Approved === false); 
  }
  
  
}

export default new PrescriptionRequestModel();