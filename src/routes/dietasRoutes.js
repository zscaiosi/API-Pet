//importa o modulo express
var express = require('express');
//instancia o router
var router = express.Router();
//importa mongodb client
let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json');
//importa http
const http = require('http');
const queryString = require('querystring');

router.get('/procurar', (req, res) => {
  try {
    let queryObj = req.query;
    console.log('query', queryObj);

    if (queryObj.hasOwnProperty("_id")) {
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {

        db.collection('dietas').findOne(queryObj, (findErr, result) => {
          
          if( findErr ){
            res.status(500).json({response: 'Transacion failed!'});
          }else{
            res.status(200).json({response: 'ok', data: result});
          }
          db.close();
        });

      });
    } else if( queryObj.hasOwnProperty("device_id") ) {
      mongodbClient.connect(mongoUrl.mongodbUrl, (dbErr, db) => {

        db.collection('dietas').findOne({device: queryObj.device_id}, (findErr, result) => {
          
          if( findErr ){
            res.status(500).json({response: 'Transacion failed!'});
          }else{
            res.status(200).json({response: 'ok', data: result});
          }
          db.close();
        });

      });
    } else {
      res.status(400).json({ response: 'Parâmetros insuficientes para a busca.' });
      db.close();
    }
  } catch (exception) {
    throw exception;
  }
});

router.get('/listar', (req, res) => {
  try {
    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if (connErr) throw connErr;
      //Lista todos documentos em um array
      db.collection("dietas").find().toArray((findErr, results) => {
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
    // console.log("post payload=", payload);

    mongodbClient.connect(mongoUrl.mongodbUrl, (connErr, db) => {
      if (connErr) throw connErr;
      //Verifica se há campo _id
      if( payload.hasOwnProperty("_id") ){
        //Insert do payload do post, sem options e com callback
        db.collection('dietas').insert(payload, null, (dbErr, insertResult) => {
          if (insertResult.result.n > 0 && insertResult.result.ok === 1) {
            //Update do device com a nova dieta
            db.collection('devices').updateOne({_id: Number(payload.device)},
              {
                $push: {
                  dietas: payload
                }
              },
              null,
              //Update Callback
              (updateErr, updateResult) => {
                if( updateErr ){
                  res.status(500).json({ update: {
                    response: 'Update failed!', data: updateErr
                  } });
                }else{
                  res.status(200).json({ insert: {
                    ok: insertResult.result.ok, inserted: insertResult.result
                  }, update: {
                    ok: updateResult.result.ok, response: {
                      scanned: updateResult.result.n, modified: updateResult.result.nModified
                    }
                  } });
                }
            });
            //res.status(200).json({ response: { ok: insertResult.result.ok, inserted: insertResult.result.n } });
          } else {
            res.status(500).json({ insert: {
              repsonse: { ok: insertResult.result.ok, data: "Insert failed!" }
            } });
          }
          db.close();
        });
      }else{
        res.status(400).json({response: 'Precisa de uma chave _id!'});
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
        db.collection('dietas').updateOne({_id: payload._id},
          {
            $set: payload
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