const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const router = express.Router();

function getStudentProfilesByGrade6(req, res, next){
    studentProfiles.find()
    .where('grade_level').equals('Grade 6')
    .then((result) => {
        console.log("g6 result:" + result.length);
        if(result.length > 0){
            req.students = result;
        } else {
            req.students = null;
        }
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function getStudentProfilesByGrade5(req, res, next){
    studentProfiles.find()
    .where('grade_level').equals('Grade 5')
    .then((result) => {
        console.log("g5 result:" + result.length);
        if(result.length > 0){
            req.students = result;
        } else {
            req.students = null;
        }
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}
    

function getStudentProfiles(req, res, next){
    studentProfiles.find()
    .then((result) => {
        console.log("all students result:" + result);
        if(result.length > 0){
            req.students = result;
        } else {
            req.students = null;
        }
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function getParentDetailsByStudent(req, res, next){
    parentDetails.find()
    .then((result) => {
        console.log("parents result:" + result);
        if(result.length > 0){
            req.parents = result;
        } else {
            req.parents = null;
        }   
        return next();
    }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function getPaymentDetailsByStudent(req, res, next){
    paymentDetails.find()
        .then((result) => {
            console.log("payment result:" + result);
            if(result.length > 0){
                req.payment = result;
            } else {
                req.payment = null;
            }
            return next();
        }).catch(() => { res.send('Sorry! Something when wrong.') });
}

function renderStudentProfilePage(req, res){
    res.render('student-profiles', { title: 'Student Profiles', students: req.students, parents: req.parents, payments: req.payment });
}
router.get('/student-profile', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

router.get('/grade-6', getStudentProfilesByGrade6, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/grade-5', getStudentProfilesByGrade5, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/grade-4', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/grade-3', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/grade-2', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/grade-1', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

router.get('/kinder-1', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/kinder-2', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);
router.get('/nursery', getStudentProfiles,  getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage);

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
module.exports = router;