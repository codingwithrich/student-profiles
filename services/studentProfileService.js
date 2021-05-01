const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const { check, validationResult } = require('express-validator');

function getStudentProfiles(req, res, next){
    studentProfiles.find()
    .then((response) => {

        if(response.length != 0){
            req.students = response;
            return next();
        }
    })
    .catch(() => { res.send('Sorry! Something when wrong.') });
}

function getParentDetailsByStudent(req, res, next){
    parentDetails.find()
    .then((result) => {
        req.parents = result;
        return next();
    });
}

function getPaymentDetailsByStudent(req, res, next){
    paymentDetails.find()
        .then((result) => {
            req.payment = result;
            next();
        });
}

function renderStudentProfilePage(req, res){
    res.render('student-profiles', { title: 'Student Profiles', students: req.students, parents: req.parents, payments: req.payment });
}

module.exports = {getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage}