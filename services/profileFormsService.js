const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const validator = require('node-input-validator');

function submitStudentProfileForm(req, res){
    const validate = new validator.Validator(req.body, {
        id_number : 'required',
        grade_level : 'required',
        first_name : 'required',
        last_name : 'required',
        father_name : 'required',
        mother_name : 'required',
        father_contact_number :  'required',
        mother_contact_number : 'required',
        birthday : 'date'
    });
    validate.check().then((matched) => {
        if(!matched){
            console.log("Form is empty.");   
            renderMultiStepFormError(req, res);
        } else {
            const student = new studentProfiles(req.body);
            const student_username = student.first_name.split(" ") + student.last_name;
            const firstNameEdited = titleCase(student.first_name);
            student.username = student_username;
            student.first_name = firstNameEdited;
            console.log("Student:" + student);

            const parents = new parentDetails(req.body);
            parents.student_username = student_username;
            console.log("Parents:" + parents);

            const payment = new paymentDetails(req.body);
            payment.student_username = student_username;
            console.log("Payment: " + payment);

            parents.save();
            payment.save();
            student.save().then(() => {
                renderMultiStepFormSuccess(req,res);
            }).catch((err) => {
                console.log(err);
                res.send('Sorry! Something went wrong.')
            });
        }
    });
}

function renderMultiStepFormError(req, res){
    res.render('multi-step-form-error');
}

function renderMultiStepFormSuccess(req, res){
    res.render('multi-step-form-success');
}

function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

module.exports = {submitStudentProfileForm}