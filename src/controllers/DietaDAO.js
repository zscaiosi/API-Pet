let MqttPubsController = require('../controllers/mqttPubsController.js');
let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;
const mqttUrl = require('../config/endpoints.json').mqttAws;
const fs = require('fs');

function DietasDAO() {
	this._lastTime = '';
}

DietasDAO.prototype.checkDiets = function () {
		let now = new Date();
		//Checa se há alguma dieta para agora
		mongodbClient.connect(mongoUrl, function (connErr, db) {
			if (connErr) throw connErr;
			console.log("LAST TIME FEED", this._lastTime);
			//Transforma o Cusor em um array
			db.collection('dietas').find().toArray(function (dbErr, items) {
				//Trata erro
				if (dbErr) {console.log('dbErr', dbErr)}

				items.map(function (item, index) {
					console.log(`Dieta Item ${index}-->>`, item.data_inicio.split("-"));

					let ini = item.data_inicio.split("-");
					let end = item.data_fim.split("-");
					let date_ini = new Date(...ini);
					let date_end = new Date(...end);
					let today = new Date();
					
					console.log("date_ini", date_ini, "today", today, "date_end", date_end);
					console.log("date_ini < today", date_ini < today, "date_end > today", date_end > today);

					item.horarios.map((horario, index) => {
//Se hora e minutos forem iguais e último horário de alimentação for diferente da hora atual, alimenta.
						if( horario.slice(0, 5) === String(now).slice(16, 21) && String(this._lastTime).slice(0, 5) !== String(now).slice(16, 21) ){
							console.log("----------alimentar!------------", horario.slice(0, 5), String(now).slice(16, 21));
//Controlando o horário da alimentação para impedir que acione duas vezes no memso minuto o device
							this._lastTime = horario;

							let mqttPub = new MqttPubsController(mqttUrl, `device/racao/${item.device}/alimentar/rex`);
							mqttPub.pub(`device/racao/${item.device}/alimentar/pet`, JSON.stringify({ aberto: true }), item.device);

						}else{
							console.log("----------------------diferente...----------------------", horario.slice(0, 5), String(now).slice(16, 21), "\n");
						}
//--------------FIM MAP DOS HORARIOS--------------
					});
//-----------FIM MAP DAS DIETAS-------------------				
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
				// fs.appendFile("/home/ubuntu/Documents/logs_nodejs_petdevice.txt", JSON.stringify(logObj)+"\n", (appendErr) => {
				// 	if( appendErr ){
				// 		console.log("error: ", appendErr);
				// 	}else{
				// 		console.log("Logged...");
				// 	}
				// });
			}

			db.close();
		});
	}

module.exports = DietasDAO;
