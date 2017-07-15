"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DietasDAO = require("./infra/DietaDAO");
//Carrega a função controller para se conectar a um MQTT BROKER
var MqttSubsController = require("./controllers/mqttSubsController");
//Invoca a função de config do express criando minha var app que será utilizada para os requests
//Carrega a função de config do express
var config = require("./config/express");
var app = config();
//Instancia os subscribers logo no início
var mqttSubFeed = new MqttSubsController('localhost', 'device/racao/pote1/rex');
var dietas = new DietasDAO();
var typeTest;
app.listen(5000, function () {
    console.log('Servidor rodando!');
});
