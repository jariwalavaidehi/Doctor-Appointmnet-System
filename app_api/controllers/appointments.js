var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports.appointmentAll = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Appointment
      .find({})
      .exec(function(err, appointment) {
        res.status(200).json(appointment);
        //console.log(appointment);
      });
  }

};

module.exports.appointmentInsert = function(req,res){
  var appointment = new Appointment();
  console.log('request', req.body)
  appointment.date = req.body.date;
  appointment.time = req.body.time;
  appointment.patient_name = 'popio';
  appointment.complain = req.body.complain;
  appointment.patient_email = req.bod.email;
  appointment.save(function (err) {
   if(!err)
   {
     res.status(200).json(appointment);
   }
  });

};

module.exports.appointmentUpdate = function(req, res) {
console.log(req.body)
  
  var appointment = new Appointment();
  appointment.date = req.body.date;
  appointment.time = req.body.time;
  appointment.complain = req.body.complain;
  
  Appointment.findOne({patient_name: req.body.patient_name }, function(err,doc){  
    doc.date= req.body.date, 
    doc.time= req.body.time, 
    doc.complain= req.body.complain
    doc.save(function(err, appointment) {
    if (!err)res.status(200).json(appointment);
    else
    {
      console.error("error"+err);
      console.log("errrrrr");
    }
  });
  });

};

module.exports.appointmentDelete = function(req,res){
   Appointment.remove({'patient_name' : req.body.patient_name}, function (err,patient){
    console.log("err");
    if(!err){
      res.status(200).json(patient);
      console.log("Deleted");
    }
   });

};