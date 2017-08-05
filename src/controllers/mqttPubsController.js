let mqtt = require('mqtt');
const fs = require('fs');
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
		fs.appendFile("/home/ubuntu/Documents/logs_mqtt_pubs_nodejs_petdevice.txt", JSON.stringify(logObj) + "\n", (appendErr) => {
			if (appendErr) {
				console.log(appendErr);
			} else {
				console.log("Logged..."+JSON.stringify(logObj), new Date());
			}
		});

		let recipient = "caio.saldanha@syligo.com";

		let mailOptions = {
			from: "zscaio.si@gmail.com",
			to: recipient,
			subject: "Nodejs TESTE",
			html: `<h1>Olá ${recipient}!</h1><br /><p>Seu pet acaba de ser alimentado através do dispositivo que assina o tópico <strong> ${logObj.topic}</strong></p>`
		}

		nodeTransporter.sendMail(mailOptions, (mailErr, mailInfo) => {
			if (mailErr) {
				console.log(mailErr);
			} else {
				console.log('Email sent: ' + mailInfo.response);
			}
		});

	});
}


module.exports = MqttPubsController;