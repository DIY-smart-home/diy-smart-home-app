'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('DevCtrl', ['$rootScope', '$meteor', function ($rootScope, $meteor) {
    var devCtrl = this;

    devCtrl.hello = 'Hello world!';

  }]);
