import BaseModel from "./baseModel.js";

class MedicineOrderModel extends BaseModel {
  constructor() {
    super('MedicineOrders'); 
  }

}

export default new MedicineOrderModel();