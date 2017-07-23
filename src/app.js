
let DietasDAO = require('./controllers/DietaDAO');
//Carrega a função controller para se conectar a um MQTT BROKER
let MqttSubsController = require('./controllers/mqttSubsController');
let MqttPubsController = require('./controllers/mqttPubsController');
//Invoca a função de config do express criando minha var app que será utilizada para os requests
//Carrega a função de config do express
let config = require('./config/express');
let endpoint = require('./config/endpoints.json');

var app = config();

//Instancia os subscribers logo no início
let mqttSubFeed = new MqttSubsController(endpoint.mqttAws, 'device/racao/pote1/atividades/rex');

const diets = new DietasDAO();

setInterval(() => {diets.checkDiets()}, 550000);

app.listen(5000, function () {
  console.log('Servidor rodando! em:', 5000);
});
