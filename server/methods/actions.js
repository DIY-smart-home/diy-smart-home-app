Meteor.methods({
  powerOn: function (beeId, isOn) {
    console.log(beeId);
    console.log(isOn);
    Mqtt.getClient().publish(beeId, isOn);
  }
});