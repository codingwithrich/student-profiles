const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const validator = require('node-input-validator');
const { renderStudentProfilePage } = require('./studentProfileService');

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
            const student_username = (student.first_name.split(" ")[0] + student.last_name).toLowerCase();
            const firstNameTitleCase = titleCase(student.first_name);
            const middleNameTitleCase = titleCase(student.middle_name);
            const lastNameTitleCase = titleCase(student.last_name);

            student.username = student_username;
            student.first_name = firstNameTitleCase;
            student.middle_name = middleNameTitleCase;
            student.last_name = lastNameTitleCase;

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

function renderMultiStepForm(req, res){
   getLatestIdNumber(req, res);
}

function titleCase(str) {
    return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}

function getLatestIdNumber(req, res){
    studentProfiles.findOne()
    .sort({field: 'asc', _id: -1})
    .then((result) => {
        console.log("get LatestIdNumber: " + result.id_number);
        if(result.id_number != null){
            var latestIdNumber = generateLatestIdNumber(result, res);
            console.log("New Student ID Number: " + latestIdNumber);
            res.latestIdNumber = latestIdNumber;
            res.render('multi-step-form');
        } else {
            res.latestIdNumber = null;
        }
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function generateLatestIdNumber(req, res){
    var currentIdNumber =req.id_number.split("-")[1];
    var currentTime = new Date();
    var currentYear = currentTime.getFullYear();
    return currentYear + "-" + pad(currentIdNumber++, 4);
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

module.exports = {submitStudentProfileForm, renderMultiStepForm}