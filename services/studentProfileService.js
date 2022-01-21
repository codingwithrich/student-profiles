const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const { check, validationResult } = require('express-validator');

function getStudentProfiles(req, res, next) {
    studentProfiles.find()
        .then((result) => {
            console.log("getStudentProfiles:" + result.length);
            if (result.length > 0) {
                req.students = result;
            } else {
                req.students = null;
            }
            return next();
        }).catch(() => { res.send('getStudentProfiles: Sorry! Something when wrong.') });
}

function getStudentProfilesByGrade(grade_level) {
    return function (req, res, next) {
        studentProfiles.find()
            .where('grade_level').equals(grade_level)
            .then((result) => {
                console.log("getStudentProfilesByGrade result:" + result);
                if (result.length > 0) {
                    req.students = result;
                } else {
                    req.students = null;
                }
                return next();
            }).catch(() => { res.send('getStudentProfiles: Sorry! Something when wrong.') });
    }
}

function getParentDetailsByStudent(req, res, next) {
    parentDetails.find()
        .then((result) => {
            console.log("parents result:" + result.length);
            if (result.length > 0) {
                req.parents = result;
            } else {
                req.parents = null;
            }
            return next();
        }).catch(() => { res.send('getParentDetailsByStudent: Sorry! Something when wrong.') });
}

function getPaymentDetailsByStudent(req, res, next) {
    paymentDetails.find()
        .then((result) => {
            console.log("payment result:" + result.length);
            if (result.length > 0) {
                req.payment = result;
            } else {
                req.payment = null;
            }
            return next();
        }).catch(() => { res.send('getPaymentDetailsByStudent: Sorry! Something when wrong.') });
}

function renderStudentProfilePage(req, res) {
    res.render('student-profiles', { title: 'Student Profiles', students: req.students, parents: req.parents, payments: req.payment });
}

module.exports = { getStudentProfiles, getStudentProfilesByGrade, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage }