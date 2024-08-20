import BaseModel from "./baseModel.js";

class NewCardRequestModel extends BaseModel {
  constructor() {
    super('NewCardRequests'); 
  }

}

export default new NewCardRequestModel();