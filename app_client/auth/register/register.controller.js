(function () {

  angular
    .module('meanApp')
    .controller('registerCtrl', registerCtrl);

  registerCtrl.$inject = ['$location', 'authentication', '$scope'];
  function registerCtrl($location, authentication, $scope) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : "",
      //role: ""
    };

    vm.onSubmit = function () {
      $scope.errorMessages = [];
      if($scope.vm.credentials.password.length < 8) {
              $scope.errorMessages.push("Password must be atleast 8 characters long...Atleast 1 Alphabet! .... 1 Number...1 Special Character");
        }
      console.log('Submitting registration');
      authentication
        .register(vm.credentials)
        .error(function(err){
             alert("Duplicate Email!!!");
        }).success(function(err){alert("Registered Successfully!!!");})
        .then(function(){
          $location.path('profile');
        });
    };

    
     var strongRegularExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
      var mediumRegularExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

      $scope.checkpwdStrength = {
        "width": "150px",
        "height": "25px",
        "float": "right"
      };



      $scope.validationInputPwdText = function(value) {
        if (strongRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "green";
        } else if (mediumRegularExp.test(value)) {
          $scope.checkpwdStrength["background-color"] = "orange";
        } else {
          $scope.checkpwdStrength["background-color"] = "red";
        }

        
      };




  }

})();