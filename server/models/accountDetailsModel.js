//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class AccountDetailsModel extends BaseModel {
  constructor() {
    super('AccountDetails'); 
  }

}

//module.exports = new AccountDetailsModel();
export default new AccountDetailsModel();