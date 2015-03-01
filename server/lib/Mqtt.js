Mqtt = (function () {
  function getClient() {
    if(!this.client) {
      //var x = 'mqtt://test.mosquitto.org';
      var x = 'mqtt://192.168.43.9';
      this.client = mqtt.connect(x, {
        clientId: 'fromServer'
      });
    }

    return this.client;
  }

  return {
    getClient: getClient
  };
}());