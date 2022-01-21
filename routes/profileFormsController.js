const express = require('express');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const router = express.Router();
const profileFormsService = require('../services/profileFormsService')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});  

router.get('/multi-step-form', (req, res) => {
    profileFormsService.renderMultiStepForm(req,res);
})

router.post('/multi-step-form', (req,res) => {
    profileFormsService.submitStudentProfileForm(req,res);
});

module.exports = router