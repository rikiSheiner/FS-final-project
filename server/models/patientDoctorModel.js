import BaseModel from "./baseModel.js";

class PatientDoctorModel extends BaseModel {
  constructor() {
    super('PatientDoctor'); // שם הטבלה
  }

}

export default new PatientDoctorModel();