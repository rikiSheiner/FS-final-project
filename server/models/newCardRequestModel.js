//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class NewCardRequestModel extends BaseModel {
  constructor() {
    super('NewCardRequests'); 
  }

}

//module.exports = new NewCardRequestModel();
export default new NewCardRequestModel();