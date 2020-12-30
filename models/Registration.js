const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
});

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
    }
});

module.exports = mongoose.model('registrations', registrationSchema);
module.exports = mongoose.model('studentProfiles', studentProfileSchema);
