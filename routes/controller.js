const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('studentProfiles');
const parentDetails = mongoose.model('studentParentDetails');
const paymentDetails = mongoose.model('studentPaymentDetails');

const { check, validationResult } = require('express-validator');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({ file: path.join(__dirname, '../users.htpasswd') })
const router = express.Router();

module.exports = router;

function redirectStudentProfileForm(req, res){
    res.render('student-profile-form', {
        title: 'Student Profile Form'
    });
}

function submitStudentProfileForm(req, res){
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const student = new studentProfiles(req.body);
        const student_username = student.first_name.split(" ") + student.last_name;
        student.username = student_username;
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
           getStudentProfiles(res);
        }).catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.')
        });
    } else {
        res.render('student-profile/form', {
            errors: errors.array(),
            data: req.body 
        });
    }
}

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

router.get('/', (req, res) => {
    redirectStudentProfileForm(req, res);
});

router.post('/', (req, res) => {
   submitStudentProfileForm(req, res);
});

router.get('/student-profile/form', (req, res) => {
   redirectStudentProfileForm(req, res);
});

router.post('/student-profile/form', (req,res) => {
   submitStudentProfileForm(req,res);
});

router.get('/student-profile', getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
