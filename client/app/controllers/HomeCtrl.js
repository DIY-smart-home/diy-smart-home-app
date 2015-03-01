'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('HomeCtrl', ['$scope', 'UserSession', '$meteor', function ($scope, UserSession, $meteor) {
    var me = this;
    me.isLampOn = false;
    me.temperature = 'n/a';

    $meteor.subscribe("temperature").then(function() {
      var collection = new Meteor.Collection("temperature");
      collection.find({}).observe({
        added: function(item){
          me.temperature = item.message;
        }
      });
    });

    me.powerOn = function(beeId, isOn) {
      me.isLampOn = isOn;
      $meteor.call("powerOn", beeId, isOn, function(response) {
        me.isLampOn = true;
      });
    }
  }]);
