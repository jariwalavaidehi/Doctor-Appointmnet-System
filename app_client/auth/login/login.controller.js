(function () {

  angular
  .module('meanApp')
  .controller('loginCtrl', loginCtrl);

  loginCtrl.$inject = ['$location', 'authentication'];
  function loginCtrl($location, authentication) {
    var vm = this;

    vm.credentials = {
      email : "",
      password : ""
    };

      vm.onSubmit = function () {
        authentication.login(vm.credentials)
        .error(function(err){
        console.log(err);
        alert("Login Failed!!!");
        }).then(function(){
        console.log('login sucessfull');
        alert("Login Successful");
        //console.log(authentication.getUserRole()+"hiiii");
        var cUser = authentication.currentUser();
        console.log(cUser.email);
          if(cUser.email == 'admin@healthcare.com'){
          $location.path('doctor');
        }else{
          sessionStorage['user'] = JSON.stringify(cUser)
          $location.path('/appointment');
        }
        });
    };

  }

})();