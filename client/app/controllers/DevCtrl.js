'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('DevCtrl', ['$rootScope', '$meteor', function ($rootScope, $meteor) {
    Meteor.subscribe("messages", function(response) {
      console.log(response);
    });
  }]);
