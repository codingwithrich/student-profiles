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

router.get('/', (req, res) => {
    res.render('form', { title: 'Registration form' });
});

var validate = [
    check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
    check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
]

router.post('/', validate, (req, res) => {
    processRegistrationForm(req, res);
});

function processRegistrationForm(req, res) {
    console.log(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save().then(() => {
            res.send("Thank you! Bye.");
        }).catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.')
        });
    } else {
        res.render('form', {
            title: 'Registration form',
            errors: errors.array(),
            data: req.body
        });
    }
}

router.get('/registrations', basic.check((req, res) => {
    getRegistrationList(req, res)
}));

function getRegistrationList(req, res) {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
        })
        .catch(() => { res.send('Sorry! Something when wrong.') })
}

router.get('/student-profile/form', (req, res) => {
    res.render('student-profile-form')
});

router.post('/student-profile/form', (req,res) => {
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const student = new StudentProfiles(req.body);
        console.log("Student:" + student);
        student.save().then(() => {
            StudentProfiles.find()
                .then((students) => {
                    res.render('student-profiles', { title: 'Listing students', students });
                })
                .catch(() => { res.send('Sorry! Something when wrong.') })
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
});

router.get('/student-profile', (req, res) => {
    StudentProfiles.find()
    .then((students) => {
        res.render('student-profiles', { title: 'Listing students', students });
    })
    .catch(() => { res.send('Sorry! Something when wrong.') })
});

router.get('/form-elements', (req, res) => {
    res.render('form-elements')
});