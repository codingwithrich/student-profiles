const mongoose = require('mongoose');

const USER_PROFILE_SCHEMA = new mongoose.Schema({
    id_number: {
        type: String,
        trim: true
    },
    adviser_grade_level: {
        type: String,
        trim: true
    },
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
    password: {
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

module.exports = mongoose.model('user_profiles', USER_PROFILE_SCHEMA);