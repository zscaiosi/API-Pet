let mqtt = require('mqtt');
const fs = require('fs');

function MqttPubsController(url, t) {
	this.url = url;
	this.mqttClient = mqtt.connect('mqtt://' + url);

	this.mqttClient.on('connect', () => {
		// this.mqttClient.publish(t);
		// this.mqttClient.end();
	});

}

MqttPubsController.prototype.pub = function (t, message) {
	this.mqttClient.publish(t, message, null, (pubErr) => {
		if (pubErr) { console.log(pubErr); }

		let logObj = {
			topic: t,
			message: message,
			date: new Date()
		}
//Loga as mensagens publicadas
		fs.appendFile("/home/caio/Desktop/logs_mqtt_pubs_nodejs_petdevice.txt", JSON.stringify(logObj) + "\n", (appendErr) => {
			if (appendErr) {
				console.log(appendErr);
			} else {
				console.log("Logged..."+JSON.stringify(logObj), new Date());
			}
		});

	});
}


module.exports = MqttPubsController;