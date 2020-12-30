const express = require('express');
const mongoose = require('mongoose');
const Registration = mongoose.model('registrations');

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
    check('name').isLength({ min: 2 }).withMessage('Your name cannot be blank.'),
    check('email').isLength({ min: 2 }).withMessage('Your email address cannot be blank.')
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

router.get('/registration-form', (req, res) => {
    res.render('registration-form')
});

router.get('/form-elements', (req, res) => {
    res.render('form-elements')
});