let mqtt = require('mqtt');
const fs = require('fs');
const Cliente = require('../model/Cliente');

function MqttPubsController(url, t) {
	this.url = url;
	this.mqttClient = mqtt.connect('mqtt://' + url);

	this.mqttClient.on('connect', () => {
		// this.mqttClient.publish(t);
		// this.mqttClient.end();
	});

}

MqttPubsController.prototype.pub = function (t, message, deviceId) {
	this.mqttClient.publish(t, message, null, (pubErr) => {
		if (pubErr) { console.log(pubErr); }

		let logObj = {
			topic: t,
			message: message,
			date: new Date()
		}
//Loga as mensagens publicadas
		// fs.appendFile("/home/ubuntu/Documents/logs_mqtt_pubs_nodejs_petdevice.txt", JSON.stringify(logObj) + "\n", (appendErr) => {
		// 	if (appendErr) {
		// 		console.log(appendErr);
		// 	} else {
		// 		console.log("Logged..."+JSON.stringify(logObj), new Date());
		// 	}
		// });

		const cliente = new Cliente();

		cliente.sendEmail({ device: deviceId, message, topic: t });

	});
}


module.exports = MqttPubsController;