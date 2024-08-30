import BaseModel from "./baseModel.js";

class PrescriptionRequestModel extends BaseModel {
  constructor() {
    super('PrescriptionRequests'); 
  }

  // קבלת כל בקשות למרשמים של מטופל מסוים
  getPRofPatient(patientID){
    //super.findByProp('patientID',patientID);
    super.getAllWithFilter('patientID',patientID);
  }

  getIncompletedPRofPatient(patientID){
    const requests = this.getPRofPatient(patientID);
    return requests.filter(request => request.Approved === false); 
  }
  
  
}

export default new PrescriptionRequestModel();