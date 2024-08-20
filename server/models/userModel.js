//const BaseModel = require('./baseModel');
import BaseModel from "./baseModel.js";

class UserModel extends BaseModel {
  constructor() {
    super('Users'); // שם הטבלה
  }

  getUserByEmail(email) {
    return super.findByProp('email', email);
  }

  deleteUserById(id){
    super.deleteByProp('userId', id);
  }
  
}

//module.exports = new UserModel();
export default new UserModel();
