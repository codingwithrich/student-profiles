const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('studentProfiles');
const parentDetails = mongoose.model('studentParentDetails');
const paymentDetails = mongoose.model('studentPaymentDetails');

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

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

router.get('/student-profile', getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
module.exports = router;