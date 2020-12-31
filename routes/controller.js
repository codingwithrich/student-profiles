const express = require('express');
const mongoose = require('mongoose');
const Registration = mongoose.model('registrations');
const StudentProfiles = mongoose.model('studentProfiles');

const { check, validationResult } = require('express-validator');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({ file: path.join(__dirname, '../users.htpasswd') })
const router = express.Router();

module.exports = router;

function redirectStudentProfileForm(req, res){
    res.render('student-profile-form', {
        title: 'Student Profile Form',
        data: req.body
    });
}

function submitStudentProfileForm(req, res){
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const student = new StudentProfiles(req.body);
        console.log("Student:" + student);
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

function getStudentProfiles(res){
    StudentProfiles.find()
    .then((students) => {
        res.render('student-profiles', { title: 'Student Profiles', students });
    })
    .catch(() => { res.send('Sorry! Something when wrong.') });
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

router.get('/student-profile', (req, res) => {
    getStudentProfiles(res);
});

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
