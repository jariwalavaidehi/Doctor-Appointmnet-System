var app = angular.module('meanApp')

   app.controller('doctorCtrl', ['$location', 'authentication','$http','$scope','meanData', function($location, authentication, $http,$scope, meanData){

    var vm = this;
    vm.doctors = []
    vm.currentPage = 0;
    vm.pageSize = 3;
    vm.user = {};

    vm.logout = function(){
      alert("clicked");
      console.log("logout");
      authentication.logout();
      $location.path('/login');
    }

      vm.numberOfPages=function(){
        return Math.ceil(vm.doctors.length/vm.pageSize);                
      }
    console.log("hello");

    //display doctor's list
    $http.get('/api/admin/doctor').success(function(data) {
        
        vm.doctors = data;
        console.log(vm.doctors);
          })
      .error(function (e) {
        console.log(e);
      });

       $scope.redirectAddDoctor = function(){
      $location.path('doctor/new');
   }


   // delete and edit doctor
    vm.store = function(doctor){
    sessionStorage['doctor'] = JSON.stringify(doctor)
    $location.path('update');
  }

  vm.delete = function(r){
    $http.post('/api/admin/doctor/delete', {doctor_email: r.doctor_email}).success(function(data) {
      console.log('response..', data);
      window.location.reload(true);
    })
    .error(function (e) {
      console.log('error..', e);
    });
  }

}]);


app.controller('insertdoctorCtrl',['$http', 'authentication', '$location', function($http, authentication, $location) {
  console.log("add doctor controller is running...");
  var vm = this
  vm.doctor = {
    doctor_name: '',
    doctor_email: '',
    speciality: '',
   // email: '',
  }
  
 //var cUser = authentication.currentUser();
 //vm.doctor.email = cUser.email;
//console.log(vm.doctor.email);
  //var test = "namrata";
  vm.onSubmit = function () {
    console.log('Submitting new form');
    console.log(vm.doctor);
    $http.post('/api/admin/doctor/new', vm.doctor).success(function(data) {
      console.log('response..', data);
      alert("Registered Successfully!!!");
      $location.path('doctor');
    })
    .error(function (e) {
      console.log('error..', e);
      alert("Duplicate Email!!!");
    });
  }

}]);

app.controller('updateDoctorCtrl',['$http', 'authentication', '$location', function($http, authentication, $location) {
  console.log("update doctor controller is running...");
  var vm = this
  var doctor = JSON.parse(sessionStorage.doctor);
  vm.doctor = {
    doctor_name: doctor.doctor_name,
    doctor_email:  doctor.doctor_email,
    speciality: doctor.speciality,
    //time_start: doctor.time_start,
    //time_end: doctor.time_end
  }
  
  vm.onSubmit = function () {
    console.log('Submitting new form');
    $http.post('/api/admin/doctor/update', vm.doctor).success(function(data) {
      alert("Updated Successfully!!!");
      console.log('response..', data);
      $location.path('doctor');
    })
    .error(function (e) {
      console.log('error..', e);
      alert("Duplicate Email!!!");
    });
  }

}]);





app.filter('startFrom', function() {
  return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      }
    });
 


