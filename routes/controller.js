const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('studentProfiles');
const parentDetails = mongoose.model('studentParentDetails');
const paymentDetails = mongoose.model('studentPaymentDetails');
const users = mongoose.model('users');

const { check, validationResult } = require('express-validator');

const path = require('path');
const auth = require('http-auth');
const basic = auth.basic({ file: path.join(__dirname, '../users.htpasswd') })
const router = express.Router();

module.exports = router;

function renderStudentProfileForm(req, res){
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

function validateLogin(req, res){
    var username = req.body.username;
    var password = req.body.password;
    console.log('[Start] Validate Login for ' + username);

    users.where({'username': username, 'password': password})
    .findOne(function(err,  user){
        if(err) {
            console.log(err); res.send('Sorry! Something went wrong.');
        } else if (user == null) {
            res.render('login', { error: true });
        } else {
            console.log('User found! ' + user);
            res.render('student-profile-form', {
                title: 'Student Profile Form',
                response: user
            });;
        }
    });
}

function renderLogin(req, res){
    res.render('login', { title: 'Login'});
}

function registerUser(req, res){
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const user = new users(req.body);
        console.log("User:" + user);
        user.save().then(() => {
           renderLogin(req, res);
        }).catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.')
        });
    } else {
        res.render('register', {
            errors: errors.array(),
            data: req.body 
        });
    }
}

router.get('/', (req, res) => {
    renderStudentProfileForm(req, res);
});

router.post('/', (req, res) => {
   submitStudentProfileForm(req, res);
});

router.get('/student-profile/form', (req, res) => {
   renderStudentProfileForm(res);
});

router.post('/student-profile/form', (req,res) => {
   submitStudentProfileForm(req,res);
});

router.get('/student-profile', getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

router.get('/login', (req, res) =>{
    renderLogin(req, res);
});

router.post('/login', (req, res) => {
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) { 
        validateLogin(req, res);
    } else {
        res.render('login', {
            title: 'Login',
            errors: errors.array(),
            data: req.body 
        });
    }
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register'})
});

router.post('/register', (req, res) => {
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
       registerUser(req, res);
    } else {
        res.render('register', {
            title: 'Register',
            errors: errors.array(),
            data: req.body 
        });
    }
});
// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
