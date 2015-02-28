// Library only shared with server
console.log("started");
//var x = 'mqtt://test.mosquitto.org';

var x = 'mqtt://192.168.43.9';

mqttClient = mqtt.connect(x, {
  clientId: "fromServer2"
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
