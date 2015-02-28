Meteor.startup(function () {
  console.log("started");
  mqttClient = mqtt.connect('mqtt://test.mosquitto.org', {
    clientId: "fromServer"
  });
  mqttClient.on("connect", function() {
    console.log("Connected");
  });

  mqttClient.on("error", function(param) {
    console.log("Wahhhh");
  });

  mqttClient.subscribe("/testD");

  mqttClient.on("message", function(topic, message) {
    var msg = {
      message: message.toString(),
      topic: topic,
      ts: new Date()
    };

    console.log(msg);

    //self.added('messages', new Date().toString(), msg);
  });


  mqttClient.publish("/testD", "blaaaah", function() {
    console.log("Sent Sir!");
  });

});
