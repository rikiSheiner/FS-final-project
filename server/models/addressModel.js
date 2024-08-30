import BaseModel from "./baseModel.js";

class AddressModel extends BaseModel {
  constructor() {
    super('Addresses'); 
  }

}

export default new AddressModel();