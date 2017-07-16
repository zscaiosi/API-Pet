let mqtt = require('mqtt');

function MqttPubsController(url, t){
    this.url = url;
    this.mqttClient = mqtt.connect('mqtt://'+url);

    this.mqttClient.on('connect', () => {
        this.mqttClient.publish(t);
        this.mqttClient.end();
    });

}

MqttPubsController.prototype.pub = function(t, message){
    this.mqttClient.publish(t, message);
}


module.exports = MqttPubsController;