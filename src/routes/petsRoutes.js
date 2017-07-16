//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
//importa mongodb client
let mongodbClient = require('mongodb').MongoClient;

let mongoUrl = 'mongodb://mongocaio:m0ng0ldb*@clusteruno-shard-00-01-7t23t.mongodb.net:27017/petdevice?ssl=true&replicaSet=ClusterUno-shard-0&authSource=admin';

router.get('/procurar', function(req, res){
 
});

router.post('/cadastrar', (req, res) => {

});

module.exports = router;