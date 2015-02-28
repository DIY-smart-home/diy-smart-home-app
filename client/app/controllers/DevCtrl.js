'use strict';

/* Controllers */
angular.module('dsh.controllers').
  controller('DevCtrl', ['$rootScope', '$meteor', function ($rootScope, $meteor) {
    var devCtrl = this;
    var mqttClient = mqtt.connect('ws://test.mosquitto.org:8080', {
      clientId: "fromServer"
    });
    mqttClient.on("connect", function() {
      console.log("Connected");

      mqttClient.on("message", function(param, p2) {
        console.log("Server message", param, p2);
      });

      mqttClient.on("error", function(param) {
        console.log("Wahhhh");
      });

      mqttClient.subscribe("test/topic");

      mqttClient.publish("test/topic", "hello world", function() {
        console.log("Sent Sir!");
      });


    });

  }]);
