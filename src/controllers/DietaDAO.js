let MqttPubsController = require('../controllers/mqttPubsController.js');
let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;
const mqttUrl = require('../config/endpoints.json').mqttAws;
const fs = require('fs');

function DietasDAO() {
	
}

DietasDAO.prototype.checkDiets = function () {
		let now = new Date();
		//Checa se há alguma dieta para agora
		mongodbClient.connect(mongoUrl, function (connErr, db) {
			if (connErr) throw connErr;
			console.log('CONECTOU!')
			//Transforma o Cusor em um array
			db.collection('devices').find().toArray(function (dbErr, items) {
				if (dbErr) {console.log('dbErr', dbErr)}

				items.map(function (item, index) {
					console.log(`Retorno ${index}-->>`, item);

					item.dietas.map((dieta, index) => {
						console.log("now", now);

						if (dieta.primeiro_horario === now || dieta.segundo_horario === now) {

							let mqttPub = new MqttPubsController(mqttUrl, 'device/racao/pote1/alimentar/rex');
							mqttPub.pub('device/racao/pote1/alimentar/rex', JSON.stringify({ aberto: true }));
						} else {
							console.log("Agora, ", now, "nenhuma dieta programada...");
							return;
						}
					});
				});
			});
			db.close();
		});
	};

DietasDAO.prototype.registerActivity = function (deviceId, activityJson) {
		//Salva no banco a nova atividade
		mongodbClient.connect(mongoUrl, function (connErr, db) {
			if (connErr) throw connErr;

			console.log(deviceId, activityJson);

			if( typeof deviceId !== 'undefined' && typeof activityJson !== 'undefined' ){
				db.collection("devices").updateOne({ _id: deviceId },
					{
						$push: {
							atividades: activityJson
						}
					}, (updateErr, updateResult) => {
						if( updateErr ){
							console.log("updateErr", updateErr);
						}if( updateResult.result.ok === 1 ){
							console.log("Atualizado com sucesso!", updateResult.result);
						}
				});
			}else{
//Objeto descritivo do erro				
				let logObj = {
					erro: 1,
					description: "Não há deviceId AND activityJson",
					date: new Date(),
					data: {
						deviceId: deviceId,
						activityJson: activityJson ? activityJson : 'undefined'
					}
				}///home/ubuntu/Documents/logs_nodejs_petdevice.txt
//Cria ou insere no arquivo o log da mensagem incorreta				
				fs.appendFile("/home/caio/Desktop/logs_nodejs_petdevice.txt", JSON.stringify(logObj)+"\n", (appendErr) => {
					if( appendErr ){
						console.log("error: ", appendErr);
					}else{
						console.log("Logged...");
					}
				});
			}

			db.close();
		});
	}

module.exports = DietasDAO;
