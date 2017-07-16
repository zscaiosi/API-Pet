//importa o modulo express
var express = require('express');
//Carrega o load
// var load = require('express-load'); NÃO VOU MAIS USAR
var clientes = require('../routes/clientesRoutes');
var pets = require('../routes/petsRoutes');
//Carrega body parser para tratar body das REQUESTS
var bodyParser = require('body-parser');
module.exports = function () {
    //instancia o express na variavel app
    var app = express();
    //configura-o para utilizar como view engine o ejs
    app.set('view engine', 'ejs');
    //Configura funções que serão aplicadas aos requests na ordem estabelecida
    app.use(bodyParser.urlencoded({ extended: true }));
    //Configura as rotas do app
    app.use('/clientes', clientes);
    app.use('/pets', pets);
    //retorna a instância configurada
    return app;
};
