const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const priceTableSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    category: {
      type: String
    },
    prices: {
        type: [Number],
        required: false
    }
})

module.exports = mongoose.model("priceTables", priceTableSchema);
