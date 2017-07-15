let MqttPubsController = require('../controllers/mqttPubsController.js');
let mongodbClient = require('mongodb').MongoClient;

let mongoUrl = 'mongodb://mongocaio:m0ng0ldb*@clusteruno-shard-00-01-7t23t.mongodb.net:27017/petdevice?ssl=true&replicaSet=ClusterUno-shard-0&authSource=admin';

function DietasDAO() {

	//Verifica se há alguma dieta no momento
	let checkDiet = function () {
		let now = new Date();
		//Checa se há alguma dieta para agora
		mongodbClient.connect(mongoUrl, function (connErr, db) {
			if (connErr) throw connErr;
			//Transforma o Cusor em um array
			db.collection('devices').find().toArray(function (dbErr, items) {
				if (dbErr) throw dbErr;

				items.map(function (item, index) {
					console.log(`Retorno ${index}-->>`, item);

					item.dietas.map((dieta, index) => {
						console.log("now", now);
						console.log(now > dieta.segundo_horario, 'seg', dieta.segundo_horario);
						if (dieta.primeiro_horario === now || dieta.segundo_horario === now) {

							let mqttPub = new MqttPubsController('localhost', 'device/racao/pote1/alimentar/rex');
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

}

DietasDAO.prototype.registerActivity = function (deviceId, activityJson) {
		//Salva no banco a nova atividade
		mongodbClient.connect(mongoUrl, function (connErr, db) {
			if (connErr) throw connErr;

			db.collection("devices").updateOne({ _id: deviceId },
				{
					$push: {
						atividades: activityJson
					}
				}, (updateErr, result) => {
					if(updateErr) throw updateErr;
					
					if( result.result.ok === 1 ){
						console.log("Atualizado com sucesso!");
					}
				});
			db.close();
		});
	}

module.exports = DietasDAO;
