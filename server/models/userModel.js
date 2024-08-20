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

export default new UserModel();
