let mqtt = require('mqtt');
var DietaDAO = require('../infra/DietaDAO');

function MqttSubsController(url, t){
    this._url = url;
    this._mqttClient = mqtt.connect('mqtt://'+url);

    this._mqttClient.on('connect', () => {
        this._mqttClient.subscribe(t);
    });

    this._mqttClient.on('message', (topic, message) => {
        console.log('Received--->', message.toString(), 'from topic', topic);
        console.log("teste", JSON.parse(String(message)));
        //let activity = JSON.parse(message.toString());

        //console.log("activity", activity);

        if( topic === "device/racao/pote1/atividades/rex" ){
            const dietaActivity = new DietaDAO();
            // dietaActivity.registerActivity(activity.id, activity.atividade);
        }
    });
}


module.exports = MqttSubsController;