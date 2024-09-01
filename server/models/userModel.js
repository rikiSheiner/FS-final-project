import BaseModel from "./baseModel.js";

class UserModel extends BaseModel {
  constructor() {
    super('Users'); 
  }

  getUserByEmail(email) {
    console.log('email' , email);
    return super.findByProp('Email', email);
  }

  deleteUserById(id){
    super.deleteByProp('userId', id);
  }
  
}

export default new UserModel();
