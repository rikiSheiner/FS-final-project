const BaseModel = require('./baseModel');

class MedicineModel extends BaseModel {
  constructor() {
    super('Medicines'); // שם הטבלה
  }


  getMedicineByName(medicineName){
    return super.findByProp('name', medicineName);
  }

}

module.exports = new MedicineModel();