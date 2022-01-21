const express = require('express');
const mongoose = require('mongoose');
const studentProfiles = mongoose.model('student_details');
const parentDetails = mongoose.model('parent_details');
const paymentDetails = mongoose.model('payment_details');

const router = express.Router();
const studentProfileService = require('../services/studentProfileService')

router.get('/student-profile', studentProfileService.getStudentProfiles, studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);

router.get('/grade-6', studentProfileService.getStudentProfilesByGrade("Grade 6"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/grade-5', studentProfileService.getStudentProfilesByGrade("Grade 5"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/grade-4', studentProfileService.getStudentProfilesByGrade("Grade 4"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/grade-3', studentProfileService.getStudentProfilesByGrade("Grade 3"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/grade-2', studentProfileService.getStudentProfilesByGrade("Grade 2"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/grade-1', studentProfileService.getStudentProfilesByGrade("Grade 1"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);

router.get('/kinder-1', studentProfileService.getStudentProfilesByGrade("Kinder 1"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/kinder-2', studentProfileService.getStudentProfilesByGrade("Kinder 2"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/kinder-3', studentProfileService.getStudentProfilesByGrade("Kinder 3"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);
router.get('/nursery', studentProfileService.getStudentProfilesByGrade("Nursery"), studentProfileService.getParentDetailsByStudent,
    studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);


// router.get('/students', studentProfileService.getStudentProfilesByGrade("Grade 6"), studentProfileService.getParentDetailsByStudent,
//     studentProfileService.getPaymentDetailsByStudent, studentProfileService.renderStudentProfilePage);

// var validate = [
//     check('name').isLength({ min: 1 }).withMessage('Name cannot be blank.'),
//     check('email').isLength({ min: 1 }).withMessage('Email address cannot be blank.')
// ]
module.exports = router;