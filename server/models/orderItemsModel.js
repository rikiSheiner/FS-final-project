import BaseModel from "./baseModel.js";

class OrderItemsModel extends BaseModel {
  constructor() {
    super('order_items'); // שם הטבלה
  }

}

export default new OrderItemsModel();