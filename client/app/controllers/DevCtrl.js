'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('DevCtrl', ['$rootScope', '$meteor', function ($rootScope, $meteor) {
    $meteor.subscribe("messages").then(function() {
      var collection = new Meteor.Collection("messages");
      collection.find({}).observe({
        added: function(item){
          console.log(item);
        }
      });
    });
  }]);
