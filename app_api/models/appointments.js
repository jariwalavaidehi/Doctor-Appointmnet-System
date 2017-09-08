var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var appointmentSchema = new mongoose.Schema({
  time:{type:String},
  patient_name:{type:String, unique: true},
  complain:{type:String},
  date:{type:Date},
  patient_email:{type:String}
});


mongoose.model('Appointment', appointmentSchema);
