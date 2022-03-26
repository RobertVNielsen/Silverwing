const mongoose = require('mongoose')
const Item = require('./Item')

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  id: {
      type: String,
      required: false
  },
  customer: {
      type: String,
      required: false
  },
  items: {
      // type: [{
      //   model: {
      //     type: String
      //   },
      //   price: {
      //     type: Number
      //   }
      // }],
      type: [Item.prototype.schema],
      required: false
  },
  orderDate: {
      type: String,
      required: false
  },
  needDate: {
      type: String,
      required: false
  },
  notes: {
      type: String,
      required: false
  }
})

module.exports = mongoose.model("orders", orderSchema);
