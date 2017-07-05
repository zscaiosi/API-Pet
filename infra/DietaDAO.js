let MqttPubsController = require('../controllers/mqttPubsController.js');
let mongodbClient = require('mongodb').MongoClient;

function DietasDAO(){

const url = 'mongodb://localhost:27017/petDevice';

const checkDiet = () => {
    let currentDateTime = new Date();
    //Checa se há alguma dieta para agora
    mongodbClient.connect(url, (err, db) => {
        //Transforma o Cusor em um array
        db.collection('dietas').find().toArray( (err, items) =>{
            items.map( (item, index) => {
                console.log('-->>', item);
                let mqttPub = new MqttPubsController('localhost', 'device/pote_caracao1/rex');
                mqttPub.pub('device/pote_caracao1/rex', JSON.stringify(item))
            });
        });
        
        db.close();
    });
}

checkDiet();

setInterval(checkDiet, 10000);

console.log('passou');
}

module.exports = DietasDAO;
