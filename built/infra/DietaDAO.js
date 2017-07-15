var MqttPubsController = require('../controllers/mqttPubsController.js');
var mongodbClient = require('mongodb').MongoClient;
function DietasDAO() {
    
    var mongUrl = 'mongodb://mongocaio:m0ng0ldb*@clusteruno-shard-00-01-7t23t.mongodb.net:27017/petdevice?ssl=true&replicaSet=ClusterUno-shard-0&authSource=admin';

    var checkDiet = function () {
        var currentDateTime = new Date();
        //Checa se há alguma dieta para agora
        mongodbClient.connect(url, function (err, db) {
            //Transforma o Cusor em um array
            db.collection('dietas').find().toArray(function (err, items) {
                items.map(function (item, index) {
                    console.log('-->>', item);
                    var mqttPub = new MqttPubsController('localhost', 'device/pote_caracao1/rex');
                    mqttPub.pub('device/pote_caracao1/rex', JSON.stringify(item));
                });
            });
            db.close();
        });
    };
    checkDiet();
    setInterval(checkDiet, 10000);
    console.log('passou');
}
module.exports = DietasDAO;
