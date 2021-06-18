const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const { check, validationResult } = require('express-validator');

const router = express.Router();
const profileFormsService = require('../services/profileFormsService')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});  

router.get('/multi-step-form', (req, res) => {
    renderMultiStepForm(req,res);
})

router.post('/multi-step-form', (req,res) => {
    profileFormsService.submitStudentProfileForm(req,res);
});

function renderMultiStepForm(req, res){
    res.render('multi-step-form');
}

module.exports = router