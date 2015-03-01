// Library only shared with server
Mqtt.getClient().on("connect", function() {
  console.log("Connected");
});

Mqtt.getClient().on("error", function(param) {
  console.log("Wahhhh");
});

Mqtt.getClient().subscribe("/testD");

Mqtt.getClient().on("message", function(topic, message) {
  var msg = {
    message: message.toString(),
    topic: topic,
    ts: new Date()
  };

  console.log(msg);
});
