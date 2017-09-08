(function() {
  
  angular
    .module('meanApp')
    .controller('profileCtrl', profileCtrl);

  profileCtrl.$inject = ['$location', 'meanData','authentication'];
  function profileCtrl($location, meanData, authentication) {
    var vm = this;

    vm.user = {};


    vm.logout = function(){
      authentication.logout();
      $location.path('login');
    }

    meanData.getProfile()
      .success(function(data) {
        vm.user = data;
        console.log(vm.user);
      })
      .error(function (e) {
        console.log(e);
      });
  }

})();