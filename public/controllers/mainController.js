(function () {
  'use strict';

  // create the controller and inject Angular's $scope
  app.controller('mainController', function ($scope, $http) {
    $scope.formData = {};
    $scope.newHash = '';

    // when submitting the add form, send the text to the node API
    $scope.createMessage = function () {
      $scope.newHash = '';

      $http.post('/api/message', $scope.formData)
        .success(function (idHash) {
          $scope.formData = {}; // clear the form so our user is ready to enter another
          $scope.newHash = idHash;
          console.log('new hash ' + idHash);
        })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    };
  });

})();