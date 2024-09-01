import BaseModel from "./baseModel.js";

class OrderItemsModel extends BaseModel {
  constructor() {
    super('order_items');
  }

}

export default new OrderItemsModel();