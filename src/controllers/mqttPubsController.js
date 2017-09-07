let mqtt = require('mqtt');
const fs = require('fs');
const Cliente = require('../model/Cliente');
const mailer = require('nodemailer');

const nodeTransporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'zscaio.si@gmail.com',
		pass: 'gm4il2911925Bcaio'
	}
});

function MqttPubsController(url, t) {
	this.url = url;
	this._topic = t;
	this.mqttClient = mqtt.connect('mqtt://' + url);

	this.mqttClient.on('connect', () => {

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
//Loga as mensagens publicadas RETIRAR COMMENT
		fs.appendFile("/home/ubuntu/Documents/logs_mqtt_pubs_nodejs_petdevice.txt", JSON.stringify(logObj) + "\n", (appendErr) => {
			if (appendErr) {
				console.log(appendErr);
			} else {
				console.log("Logged..."+JSON.stringify(logObj), new Date());
			}
		});

		const cliente = new Cliente();

		cliente.sendEmail({ device: deviceId, message, topic: t });

	});
}

module.exports = MqttPubsController;