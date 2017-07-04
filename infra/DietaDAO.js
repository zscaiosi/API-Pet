let MqttPubsController = require('../controllers/mqttPubsController.js');

function DietasDAO(){
let mqttPub = new MqttPubsController('localhost', 'nodejs/client/greet');

const checkDiet = () => {
    let currentDateTime = new Date();
    //Checa se há alguma dieta para agora
    console.log('chamou ->', currentDateTime);
}   

setInterval(checkDiet, 5000);

console.log('passou');
}

module.exports = DietasDAO;
