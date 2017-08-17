const mqtt = require('mqtt');

//Classe usando sintaxe ES6
class ActiveClients {
  constructor(checkTopic, url, responseTopic){
    this._activeList = [];
    this._isChecking = false;
    this._checkTopic = checkTopic;
    this._mqttClient = mqtt.connect('mqtt://'+url);
    this._url = url;
    this._responseTopic = responseTopic;

    this._mqttClient.on('connect', () => {
      console.log("connected");
      this._mqttClient.subscribe(this._responseTopic);
    });

    this._mqttClient.on('message', (t, m) => {
      this._activeList.push(m.slice(-5));
      console.log("list", String(this._activeList));
    });
  }

  checkClients(){
    this._mqttClient.publish(this._checkTopic, "1_3", null, (mqttErr) => {
      
    });
  }
}

module.exports = ActiveClients;