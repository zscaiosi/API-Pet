//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
router.get('/procura', function (req, res) {
    //Importa e instancia connection e ClientesDAO
    var connection = require('../infra/ConnectionFactory')();
    var DAO = require('../infra/ClientesDAO');
    var clientesDAO = new DAO(connection);
    //Parametros do GET
    var clienteProcurado = req.query;
    clientesDAO.procura(clienteProcurado.login, clienteProcurado.pswd, function (err, results) {
        if (err) {
            res.send({ erro: err });
        }
        else {
            res.send({ lista: results });
        }
    });
    clientesDAO.close();
});
router.get('/lista', function (req, res) {
    //Importa e instancia connection e ClientesDAO
    var connection = require('../infra/ConnectionFactory')();
    var DAO = require('../infra/ClientesDAO');
    var clientesDAO = new DAO(connection);
    clientesDAO.lista(function (err, results) {
        if (err) {
            res.send({ erro: err });
        }
        else {
            res.send({ lista: results });
        }
    });
    clientesDAO.close();
});
router.post('/cadastra', function (req, res) {
    //Importa e instancia connection e ClientesDAO
    // var connection = require('../infra/ConnectionFactory')();
    // var DAO = require('../infra/ClientesDAO');
    // var clientesDAO = new DAO(connection);
    var clienteCadastrado = req.body;
    console.log('req body = ', clienteCadastrado);
    var nome = clienteCadastrado.nome;
    var email = clienteCadastrado.email;
    var dtNasc = clienteCadastro.dtNasc;
    var cpf = clienteCadastro.cpf;
    var telefone = clienteCadastro.telefone;
    var endereco = clienteEndereco.endereco;
    var cidade = clienteCadastrado.cidade;
    var estado = clienteCadastrado.estado;
    // clientesDAO.cadastra(clienteCadastrado, function(err, results){
    //   if(err){
    //     res.send({erro: err});
    //   }else{
    //     res.send({lista: results});
    //   }
    // });
    // clientesDAO.end();
    res.status(200).send('OK');
});
module.exports = router;