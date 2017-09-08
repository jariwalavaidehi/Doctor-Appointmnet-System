(function () {

  angular
    .module('meanApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {

    var saveToken = function (token) {
      //console.log("hhiii");
      $window.localStorage['mean-token'] = token;
    };
    /*var saveUserRole = function (role) {
      //console.log("hhiii");
      $window.localStorage['user-role'] = role;
    };*/

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    /*var getUserRole = function () {
      //console.log("hhiii");
      return $window.localStorage['user-role'];
    };*/

    var isLoggedIn = function() {
      var token = getToken();
      //var role = getUserRole();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name
        };
      }
    };

    register = function(user) {
      return $http.post('/api/register', user).success(function(data){
        sessionStorage['user'] = JSON.stringify(user);
        saveToken(data.token);
      });
    };

    login = function(user) {
     return $http.post('/api/login', user).success(function(data) {
        //console.log(data.role);
        console.log(data.token);
        saveToken(data.token);
        //saveUserRole(data.role);
        
      });
    };

    logout = function(user) {
      $window.localStorage.removeItem('mean-token');
      //$window.localStorage.removeItem('user-role');
      //localStorage.removeItem('mean-token');
        };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
      //saveUserRole : saveUserRole,
      //getUserRole: getUserRole
    };
  }


})();