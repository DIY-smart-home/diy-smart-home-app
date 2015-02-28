// Library only shared with server
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
});
