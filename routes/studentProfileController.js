const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const router = express.Router();

function getStudentProfiles(req, res, next){
    studentProfiles.find()
    .then((result) => {
        console.log("result:" + result.length);
        if(result.length > 0){
            req.students = result;
        } else {
            req.students = null;
        }
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function getParentDetailsByStudent(req, res, next){
    parentDetails.find()
    .then((result) => {
        if(result.length > 0){
            req.parents = result;
        } else {
            req.parents = null;
        }   
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function getPaymentDetailsByStudent(req, res, next){
    paymentDetails.find()
        .then((result) => {
            if(result.length > 0){
                req.payment = result;
            } else {
                req.payment = null;
            }
            return next();
        }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function renderStudentProfilePage(req, res){
    res.render('student-profiles', { title: 'Student Profiles', students: req.students, parents: req.parents, payments: req.payment });
}

router.get('/student-profile', getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
module.exports = router;