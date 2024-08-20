//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class MedicineModel extends BaseModel {
  constructor() {
    super('Medicines'); 
  }

  getMedicineByName(medicineName) {
    return super.findByProp('name', medicineName);
  }

  async getMedicinesByPrescriptionStatus(requiresPrescription) {
    return await super.getAllWithFilter('is_prescription_required', requiresPrescription);
  }
}

//module.exports = new MedicineModel();
export default new MedicineModel();