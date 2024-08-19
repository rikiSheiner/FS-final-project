//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class MedicineOrderModel extends BaseModel {
  constructor() {
    super('MedicineOrders'); 
  }

}

//module.exports = new MedicineOrderModel();
export default new MedicineOrderModel();