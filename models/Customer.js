const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    priceTable: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("customers", customerSchema);
