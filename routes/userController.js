const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const loginService = require('../services/loginService')

router.get('/', (req, res) => {
    loginService.renderLogin(req, res);
});

router.get('/login', (req, res) =>{
    loginService.renderLogin(req, res);
});

router.post('/login', (req, res) => {
    loginService.submitLogin(req, res);
});

router.get('/register', (req, res) => {
    res.render('register', { title: 'Register'})
});

router.post('/register', (req, res) => {
    console.log("Request Body:" + req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
       loginService.registerUser(req, res);
    } else {
        res.render('register', {
            title: 'Register',
            errors: errors.array(),
            data: req.body 
        });
    }
});

router.get('/logout', (req,res) => {
    res.clearCookie('username');
    loginService.renderLogin(req,res);
});

module.exports = router;