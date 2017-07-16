//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
router.get('/procura', function (req, res) {
    //Importa e instancia connection e ClientesDAO
    var connection = require('../infra/ConnectionFactory')();
    var DAO = require('../infra/PetsDAO');
    var petsDAO = new DAO(connection);
    var petProcurado = req.query;
    petsDAO.procura(function (err, results) {
        if (err) {
            res.send({ erro: err });
        }
        else {
            res.send({ lista: results });
        }
    });
});
router.post('/cadastra', function (req, res) {
    //ES6 arrow function
    /*FAZER A CONEXÃO COM BD AQUI*/
    var petCadastrado = req.body;
    var infosAray = [];
    console.log(petCadastrado);
    res.send('OK');
});
module.exports = router;
