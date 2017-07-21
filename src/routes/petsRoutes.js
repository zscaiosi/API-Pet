//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
//importa mongodb client
let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json');

router.get('/procurar', function(req, res){
  try {
    let queryObj = req.query;
    console.log('query', queryObj);

    if (queryObj.hasOwnProperty("_id")) {
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {

        db.collection('pets').findOne(queryObj, (findErr, findResult) => {
          
          if( findErr ){
            res.status(500).json({response: 'Transacion failed!', error: findErr});
          }else{
            res.status(200).json({response: 'ok', data: findResult});
          }
          db.close();
        });

      });
    } else {
      res.status(400).json({ response: 'Busca possível apenas por _id.', query: queryObj });
    }
  } catch (exception) {
    throw exception;
  }
});

router.get('/procurar/deviceAssociado', (req, res) => {
  try{
    let queryObj = req.query;
    console.log('q: ',queryObj)

    if( queryObj.hasOwnProperty("device_id") ){
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {
        db.collection('pets').findOne({ device: queryObj.device_id }, (findErr, findResult) => {
          if( findErr ){
            res.status(500).json({response: 'Find failed!', error: findErr});
          }else{
            res.status(200).json({response: 'ok', data: findResult});
          }
        });
        db.close();
      });
    }else{
      res.status(400).json({response: 'Informe um device_id para realizar a busca!', query: queryObj})
    }
  }catch(exception){
    throw exception
    console.log('esception', exception);
  }
});

router.get('/listar', (req, res) => {
  try {
    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if (connErr) throw connErr;
      //Lista todos documentos em um array
      db.collection("pets").find().toArray((findErr, results) => {
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
      //Verifica se há _id
      if( payload.hasOwnProperty("_id") ){
        //Insert do payload do post, sem options e com callback
        db.collection('pets').insert(payload, null, (dbErr, result) => {
          //Update do device com o novo pet
          db.collection("devices").updateOne({_id: Number(payload.device)},
            {
              $set: { pet_alimentado: Number(payload._id)}
            },
            null,
            (updateErr, updateResult) => {
              if( updateErr ){
                res.status(500).json({response: 'Update failed!'});
              }else{
                res.status(200).json({ update: {
                  ok: updateResult.result.ok, response: {
                    scanned: updateResult.result.scanned, modified: updateResult.result.nModified
                  }
                }, insert: {
                  response: { ok: result.result.ok, inserted: result.result.n }
                } });
              }
            }
          );
          if (result.result.n > 0 && result.result.ok === 1) {
            //res.status(200).json({ response: { ok: result.result.ok, inserted: result.result.n } });
          } else {
            res.status(500).json({ repsonse: { ok: result.result.ok, data: "Transaction failed!" } });
          }
          db.close();
        });   
      }else{
        res.status(400).json({ response: 'Precisa de _id!'});
        db.close();
      }
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
        db.collection('pets').updateOne({_id: payload._id},
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

module.exports = router;
