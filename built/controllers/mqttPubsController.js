var mqtt = require('mqtt');
function MqttPubsController(url, t) {
    var _this = this;
    this.url = url;
    this.mqttClient = mqtt.connect('mqtt://' + url);
    this.mqttClient.on('connect', function () {
        _this.mqttClient.publish(t);
        _this.mqttClient.end();
    });
}
MqttPubsController.prototype.pub = function (t, message) {
    this.mqttClient.publish(t, message);
};
module.exports = MqttPubsController;
