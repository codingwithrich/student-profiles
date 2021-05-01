const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const { check, validationResult } = require('express-validator');

const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

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

router.get('/multi-step-form', (req, res) => {
    renderMultiStepForm(req,res);
})

router.post('/multi-step-form', (req,res) => {
    console.log('clicked');
    submitStudentProfileForm(req,res);
 });

function renderMultiStepForm(req, res){
    res.render('multi-step-form', {
        title: 'Multi Step Form'
    });
}

module.exports = router