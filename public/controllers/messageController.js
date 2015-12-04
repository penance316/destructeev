(function () {
  'use strict';

  // create the controller and inject Angular's $scope
  app.controller('messageController', function ($scope, $http, $routeParams) {
    $scope.idHash = $routeParams.messageId;
    $scope.messageContent = 'Fetching message...';
    $scope.messageDeleted = false;
    $scope.disableTb = true;

    $http.get('/api/message/' + $routeParams.messageId)
      .success(function (data) {
        if (data) {
          $scope.messageContent = data.text;
          $scope.messageDeleted = true;
          $scope.disableTb = false;
        } else {
          $scope.messageContent = 'No message found or message has already been deleted.';
        }
      })
      .error(function (data) {
        console.log('Error: ' + data);
      });
  });
})();
  