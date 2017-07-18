//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
//importa mongodb client
let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json');

router.get('/procurar', (req, res) => {
  try {
    let queryObj = req.query;
    console.log('query', queryObj);

    if (queryObj.hasOwnProperty("_id")) {
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {

        db.collection('devices').findOne(queryObj, (findErr, result) => {
          
          if( findErr ){
            res.status(500).json({response: 'Transacion failed!'});
          }else{
            res.status(200).json({response: 'ok', data: result});
          }
          db.close();
        });

      });
    } else {
      res.status(400).json({ response: 'Busca possível apenas por _id.' });
    }
  } catch (exception) {
    throw exception;
  }
});

router.get('/procurar/clienteAssociado', (req, res) => {
  try{
    let queryObj = req.query;
    //Se a query string possuir cliente_id, abre a conexão e faz a consulta
    if( queryObj.hasOwnProperty("cliente_id") ){
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {
        if(dbErr) throw dbErr;

        db.collection("devices").findOne({ cliente: queryObj.cliente_id }, (findErr, findResult) => {
          if( findErr ){
            res.status(500).json({ response: 'Find failed!', error: findErr });
          }else{
            res.status(200).json({ response: 'ok', data: findResult });
          }
          db.close();
        });
      });
    }else{
    //Caso não tenha cliente_id retona bad request
      res.status(400).json({ response: 'Informe um parâmetro cliente_id para a busca!' });
    }
  }catch(exception){
    throw exception;
    console.log('excep', exception);
  }
})

router.get('/listar', (req, res) => {
  try {
    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if (connErr) throw connErr;
      //Lista todos documentos em um array
      db.collection("devices").find().toArray((findErr, results) => {
        if (findErr) {
          res.status(500).json({ response: 'Transaction failed!' });
        } else {
          res.status(200).json({ response: 'ok', data: results });
        }

      });
      db.close();
    });
  } catch (exception) {
    throw exception;
  }
});

router.post('/cadastrar', (req, res) => {
  try {
    const payload = req.body;
    console.log("post payload=", payload);

    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if (connErr) throw connErr;
      //Insert do payload do post, sem options e com callback
      db.collection('devices').insert(payload, null, (dbErr, result) => {
        if (result.result.n > 0 && result.result.ok === 1) {
          res.status(200).json({ response: { ok: result.result.ok, inserted: result.result.n } });
        } else {
          res.status(500).json({ repsonse: { ok: result.result.ok, data: "Transaction failed!" } });
        }
        db.close();
      });
    });
  } catch (exception) {
    throw exception;
  }
});

router.put('/atualizar', function (req, res) {
  try{
    const payload = req.body;
    console.log("put payload=",payload);

    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if(connErr) throw connErr;
    //Faz update do cliente sem options e com callback
      if( payload.hasOwnProperty("_id") ){
        db.collection('devices').updateOne({_id: payload._id},
          {
            $set: payload
          },
          null,
          (updateErr, result) => {
            if( updateErr ){
              res.status(500).json({ response: 'Transaction failed!', data: updateErr });
            }else{
              res.status(200).json({ ok: result.result.ok, response: {
                scanned: result.result.n, modified: result.result.nModified
              } });
            }
            db.close();
          }
        );
      }else{
        res.status(400).json({ response: 'Atualização possível apenas por _id.' });
        db.close();
      }
    });
  }catch(exception){
    console.log('exceptio', exception);
    throw exception;
  }
});

router.put('/associar/dieta', (req, res) => {
  try{
    const payload = req.body;
    console.log("put payload de /associar/dieta =", typeof payload.device);

    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if(connErr) throw connErr;
    //Insert desta dieta no documento do device correspondente
      if( payload.hasOwnProperty("device") ){
        db.collection('devices').updateOne({_id: Number(payload.device)},
          {
            $push: {
              dietas: payload
            }
          },
          null,
          //Callback
          (updateErr, result) => {
            if( updateErr ){
              res.status(500).json({ response: 'Transaction failed!', data: updateErr });
            }else{
              res.status(200).json({ ok: result.result.ok, response: {
                scanned: result.result.n, modified: result.result.nModified
              } });
            }
          });
      }else{
        res.status(400).json({ response: 'Associação possível apenas por device.' });
      }
      db.close();
    });
  }catch(exception){
    console.log('exceptio', exception);
    throw exception;
  }
});

module.exports = router;