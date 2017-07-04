//Carrega a função de config do express
var config = require('./config/express');

var DietasDAO = require('./infra/DietaDAO');
//Carrega a função controller para se conectar a um MQTT BROKER
var MqttSubsController = require('./controllers/mqttSubsController');
var MqttPubsController = require('./controllers/mqttPubsController');
//Invoca a função de config do express criando minha var app que será utilizada para os requests
var app = config();

//Instancia os subscribers logo no início
let mqttSubFeed = new MqttSubsController('localhost', 'device/racao/pote1/rex');

let dietas = new DietasDAO();


app.listen(5000, function(){
  console.log('Servidor rodando!');
});
