let mqtt = require('mqtt');

function MqttSubsController(url, t){
    this._url = url;
    this._mqttClient = mqtt.connect('mqtt://'+url);

    this._mqttClient.on('connect', () => {
        this._mqttClient.subscribe(t);
    });

    this._mqttClient.on('message', (topic, message) => {
        console.log('--->', message.toString());
    });
}


module.exports = MqttSubsController;