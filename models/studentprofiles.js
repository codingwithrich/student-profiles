const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    middle_name: {
        type: String,
        trim: true
    },
    last_name: {    
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    nickname: {
        type: String,
        trim: true
    },
    birthday: {
        type: Date,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    contact_number:{
        type: String,
        trim: true
    }
}); 

const parentDetailsSchema = new mongoose.Schema({
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
    }
});

const paymentDetailsSchema = new mongoose.Schema({
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

module.exports = mongoose.model('studentProfiles', studentProfileSchema);
module.exports = mongoose.model('studentParentDetails', parentDetailsSchema);
module.exports = mongoose.model('studentPaymentDetails', paymentDetailsSchema);
