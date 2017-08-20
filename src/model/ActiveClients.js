const mqtt = require('mqtt');

//Classe usando sintaxe ES6
class ActiveClients {
  constructor(checkTopic, url, responseTopic, next){
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
      this._activeList.push(String(m));
      console.log("list", String(this._activeList));
      //Callback
      next({topic: t, message: m});
    });
  }

  checkClients(){
    this._mqttClient.publish(this._checkTopic, "1_3", null, (mqttErr) => {
      
    });
  }
}

module.exports = ActiveClients;