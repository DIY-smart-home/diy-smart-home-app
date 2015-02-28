'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('MenuCtrl', ['$scope', 'UserSession', '$state', function ($scope, UserSession, $state) {
      this.logout = function () {
        UserSession.logout().then(function() {
          $state.go('login');
        });
      };
    }]);
