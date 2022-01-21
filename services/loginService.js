const mongoose = require('mongoose');
const users = mongoose.model('user_profiles');

const { check, validationResult } = require('express-validator');

function renderLogin(req, res){
    res.render('login', { title: 'Login'});
}

function submitLogin(req, res){
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
            if(req.cookies){
                console.log('User found! ' + user.username);
                res.cookie('username', username, {maxAge: 360000});
                res.render('student-profile-form', {
                    title: 'Student Profile Form'
                });;
            }
        }
    });
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

module.exports = {renderLogin, submitLogin, registerUser}