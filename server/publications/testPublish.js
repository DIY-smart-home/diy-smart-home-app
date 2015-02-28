Meteor.publish("messages", function () {
  var self = this;
  mqttClient.on("message", function(topic, message) {
    var msg = {
      message: message.toString(),
      topic: topic,
      ts: new Date()
    };

    console.log(msg);

    self.added('messages', new Date().toString(), msg);
  });

  self.ready();
});