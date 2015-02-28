'use strict';

/* Directives */

angular.module('dsh.directives', []).
  directive('appVersion', function (version) {
    return function (scope, elm, attrs) {
      elm.text(version);
    };
  });
