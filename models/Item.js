const mongoose = require('mongoose')
const Model = require('./Model')

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    model: {
        type: String,
        required: false
    },
    costs: {
        type: [{feature: {type: String}, price: {type: Number}}],
        required: false
    },
    quantity: {
      type: Number
    }

})

module.exports = mongoose.model("items", itemSchema);
