var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var doctorSchema = new mongoose.Schema({
  doctor_email:{type:String, unique:true},
  doctor_name:{type:String},
  speciality:{type:String},
  //email :{type:String}
   });


mongoose.model('Doctor', doctorSchema);
