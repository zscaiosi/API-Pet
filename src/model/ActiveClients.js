const mqtt = require('mqtt');

//Classe usando sintaxe ES6
function ActiveClients(checkTopic, url, responseTopic) {

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
}

ActiveClients.prototype.checkClients = function(next){
  
    this._mqttClient.publish(this._checkTopic, "on", null, (mqttErr) => {
      this._mqttClient.on('message', (t, m) => {
        this._activeList.push(String(m));
        console.log("list", String(this._activeList));
        //Callback
        next({topic: t, message: m});
        console.log(next);
      });      
    });
}

module.exports = ActiveClients;