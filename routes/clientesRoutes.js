//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();


router.get('/procura', function(req, res){

  //Parametros do GET
  var clienteProcurado = req.query;
  console.log('cliente query: ',clienteProcurado);

});

router.get('/lista', function(req, res){
  //Impota connection e ClientesDAO
  var conn = require('../infra/ConnectionFactory');
  var connection = new conn();
  connection.connect();
  var DAO = require('../infra/ClientesDAO');
  var clientesDAO = new DAO(connection);
  // console.log('DAO', clientesDAO);

  // clientesDAO.lista(function(err, results){
  //   if(err){
  //     res.send({erro: err});
  //   }else{
  //     res.send({lista: results});
  //   }
  // });
  connection.end();
});

module.exports = router;
