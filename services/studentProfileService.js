const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const { check, validationResult } = require('express-validator');


function getStudentProfilesByGrade(req, res, next){
//     Person.
//   find({ occupation: /host/ }).
//   where('name.last').equals('Ghost').
//   where('age').gt(17).lt(66).
//   where('likes').in(['vaporizing', 'talking']).
//   limit(10).
//   sort('-occupation').
//   select('name occupation').
//   exec(callback);
}


function getStudentProfiles(req, res, next){
    studentProfiles.find()
    .then((result) => {
        console.log("result:" + result.length);
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
            if(result.length > 0){
                req.payment = result;
            } else {
                req.payment = null;
            }
            return next();
        }).catch(() => { res.send('Sorry! Something when wrong.') });
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

module.exports = {getStudentProfiles, getParentDetailsByStudent, getPaymentDetailsByStudent, renderStudentProfilePage}