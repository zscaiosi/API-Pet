let mqtt = require('mqtt');
var DietaDAO = require('./DietaDAO');

function MqttSubsController(url, t) {
	this._url = url;
	this._mqttClient = mqtt.connect('mqtt://' + url);

	this._mqttClient.on('connect', () => {
		this._mqttClient.subscribe(t);
	});

	this._mqttClient.on('message', (topic, message) => {
		console.log('Received--->', message.toString(), 'from topic', topic);

		let arrTopic = topic.split("/");
		let activity = JSON.parse(message.toString());
//Pega o ID do device, que deve ser um nível do tópico
		let id = arrTopic.filter((segment, index) => {
			if ((segment !== "device" || segment !== "racao" || segment !== "atividades") && index === 2) {
				return segment;
			}
		});
//Função para filtrar os tópicos
		let filterTopic = (element, index) => {
			return element === "racao";
		}
//Instancia DietaDAO e invoca a função que atualiza o array de atividades do documento,
//APENAS SE HOUVER O NÍVEL RAÇÃO NO TÓPICO
		if (arrTopic.findIndex(filterTopic) !== -1) {
			const dietaActivity = new DietaDAO();
			dietaActivity.registerActivity(id, activity.atividade);
		} else {
			console.log("OUTRO TÓPICO = ", topic, activity);
		}
	});
}


module.exports = MqttSubsController;