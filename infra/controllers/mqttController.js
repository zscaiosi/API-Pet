let mqtt = require('mqtt');

function MqttController(url){
    this._url = url;
    
    let mqttClient = mqtt.connect();
}