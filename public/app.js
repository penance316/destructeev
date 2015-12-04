/*global app: true*/
// public/core.js
var app = angular.module('app', ['ngRoute']);


app.config(function ($routeProvider, $locationProvider) {
  'use strict';


  $routeProvider

    //route to get a particular message which should then be deleted
    .when('/message/:messageId', {
      templateUrl: 'pages/message.html',
      controller: 'messageController'
    })

    // route for the home page
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'mainController'
    })

    .otherwise({
      redirectTo: '/'
    });


  $locationProvider.html5Mode(true);
});


