
const mongoose = require('mongoose');

const PARENT_DETAILS_SCHEMA = new mongoose.Schema({
    student_username: {
        type: String,
        trim: true
    },
    father_name: {
        type: String,
        trim: true
    },
    father_email: {
        type: String,
        trim: true
    },
    father_address: {
        type: String,
        trim: true
    },
    father_contact_number: {
        type: String,
        trim: true
    },
    mother_name: {
        type: String,
        trim: true
    },
    mother_email: {
        type: String,
        trim: true
    },
    mother_address: {
        type: String,
        trim: true
    },
    mother_contact_number: {
        type: String,
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

module.exports = mongoose.model('parent_details', PARENT_DETAILS_SCHEMA);