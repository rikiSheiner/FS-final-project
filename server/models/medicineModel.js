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

export default new MedicineModel();