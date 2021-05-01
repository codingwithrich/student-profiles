
const mongoose = require('mongoose');

const PAYMENT_DETAILS_SCHEMA = new mongoose.Schema({
    student_username: {
        type: String,
        trim: true
    },
    payment_method: {
        type: String,
        trim: true
    },
    payment_status: {
        type: String,
        trim: true
    },
    payment_type: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('payment_details', PAYMENT_DETAILS_SCHEMA);