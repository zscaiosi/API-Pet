var mqtt = require('mqtt');
function MqttSubsController(url, t) {
    var _this = this;
    this._url = url;
    this._mqttClient = mqtt.connect('mqtt://' + url);
    this._mqttClient.on('connect', function () {
        _this._mqttClient.subscribe(t);
    });
    this._mqttClient.on('message', function (topic, message) {
        console.log('--->', message.toString());
    });
}
module.exports = MqttSubsController;
