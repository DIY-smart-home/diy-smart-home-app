'use strict';

// Declare app level module which depends on filters, and services

  angular.module('dsh', [
    'angular-meteor',
    'angular-meteor.user',
    'ui.router',
    'dsh.controllers',
    'dsh.filters',
    'dsh.services',
    'dsh.directives'
  ])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {

      /**
       * Resolver for the currentUser
       * @see UserSession.currentUserPromise() for details
       * @type {*[]}
       */
      var currentUserResolver = [
        '$rootScope',
        function($rootScope) {
          return $rootScope.currentUserPromise;
        }
      ];

      var regExpMongoId = String(SimpleSchema.RegEx.Id);
      regExpMongoId = regExpMongoId.substring(2, regExpMongoId.length - 2); // remove the starting and trailing / and ^$ from the regexp

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'client/app/views/home.ng.html',
          controller: 'HomeCtrl',
          controllerAs: 'homeCtrl'
        })
        .state('login', {
          url: '/login',
          controller: [
            '$state',
            function($state) {
              // TODO: Develop a login dialog may be?
              $state.go('home');
            }
          ]
        })
        //.state('about', {
        //  url: '/about',
        //  templateUrl: 'client/app/views/about.ng.html'
        //})
        .state('dev', {
          url: '/dev',
          templateUrl: 'client/app/views/dev.ng.html',
          controller: 'DevCtrl',
          controllerAs: 'devCtrl'
        });

      $urlRouterProvider.otherwise("/");
  }]);

