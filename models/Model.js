const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const modelSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: false
    },
    prices: {
      type: [Number]
    }
})

module.exports = mongoose.model("models", modelSchema);
