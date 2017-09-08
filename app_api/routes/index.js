var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var  ctrlApp = require('../controllers/appointments');
var ctrlDoc = require('../controllers/doctors');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// appoinements
router.get('/appointment', auth, ctrlApp.appointmentAll);
router.post('/appointment/new',ctrlApp.appointmentInsert);
router.post('/appointment/update',ctrlApp.appointmentUpdate);
router.post('/appointment/delete',ctrlApp.appointmentDelete);
//admin-doctors
router.post('/admin/doctor/new', ctrlDoc.doctorInsert); 
router.post('/admin/doctor/update', ctrlDoc.doctorUpdate);
router.post('/admin/doctor/delete',ctrlDoc.doctorDelete);
router.post('/admin/doctor/find/',ctrlDoc.doctorSearchByName);
router.get('/admin/doctor',ctrlDoc.doctorAll);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
console.log("start");

console.log("end");
module.exports = router;
