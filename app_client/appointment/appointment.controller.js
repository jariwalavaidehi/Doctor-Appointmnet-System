(function() {
  
  var app = angular
    .module('meanApp'/*,['ngTouch','ui.grid', 'ui.grid.pagination']*/)
    .controller('appointmentCtrl', appointmentCtrl);

  appointmentCtrl.$inject = ['$location', 'authentication','$http','$scope','meanData'];
  function appointmentCtrl($location, authentication, $http,$scope, meanData) {

    var vm = this;
    vm.appointments = []
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
        return Math.ceil(vm.appointments.length/vm.pageSize);                
      }
    console.log("hello");

    //display appointments
    $http.get('/api/appointment', {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      }).success(function(data) {
        
        vm.appointments = data;
        console.log(vm.appointments);
          })
      .error(function (e) {
        console.log(e);
      });

      //redirect to Add Appointment page after list appointment page
      $scope.redirectAddApp = function(){
      $location.path('/appointment/new');
   }

    // Insert new appointment to mongoose
     $scope.onSub = function () {
      console.log("Hey there");
      console.log($scope.newAppointment);

      //validations to add new appointment
      $scope.errorMessages = [];

      if($scope.newAppointment.date == undefined || $scope.newAppointment.time == undefined || $scope.newAppointment.complain == undefined || $scope.newAppointment.complain == '') {
      $scope.errorMessages.push("All three fields are requied!");
      return;
    }

    if($scope.newAppointment.complain.length < 10) {
      $scope.errorMessages.push("Complain must be at least 10 characters long!");
      
    }

    if($scope.newAppointment.date < new Date()) {
      $scope.errorMessages.push("You can only add a future appointment!");
    }

  
    if(8 > $scope.newAppointment.time.getHours() || $scope.newAppointment.time.getHours() > 16) {
      $scope.errorMessages.push("Appointment must be between 8am and 5pm!");
    }

     $http.post('/api/appointment/new',$scope.newAppointment).success(function(data){
        console.log("Success");
        //redirect to appointment view page after successfully inserted/posted to db
        $location.path('/appointment');

      }).error(function(error){
        console.error("error in inserting data", error);
      })

  }

};


//pagination code

//let's make a startFrom filter
app.filter('startFrom', function() {
  return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
      }
    });

})();
      


  


