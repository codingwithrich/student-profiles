
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
    },
    paid_amount: {
        type: Number,
        trim: true
    },
    remaining_balance: {
        type: Number,
        trim: true
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    updated_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    }
});

module.exports = mongoose.model('payment_details', PAYMENT_DETAILS_SCHEMA);