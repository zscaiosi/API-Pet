const mongodbClient = require("mongodb").MongoClient;
const { mongodbUrl, mqttAws } = require('../config/endpoints.json');
const MqttPubsController = require("../controllers/mqttPubsController");

function Alimentacao(idDevice) {
  this._device = idDevice;
}

Alimentacao.prototype.feed = function (next) {

  const mqttClient = new MqttPubsController(mqttAws, `device/racao/${this._idDevice}/alimentar/pet`);
  mqttClient.pub(`device/racao/${this._idDevice}/alimentar/pet`, "{\"aberto\": true, \"qtde_abrir\": 1}", "28864b");

  let date = new Date();
  let data = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
  let horario = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();

  mongodbClient.connect(mongodbUrl, (connErr, db) => {
    console.log("------connected------", this._device);
    if (connErr) {
      console.log("Connction error", connErr);       
    }else{

      db.collection("devices").updateOne({ _id: this._device },
      {
        $push: {
          atividades: {
            aberto: true,
            qtde_abrir: 1,
            data: data,
            horario: horario
          }
        }
      },
      (updateErr, updateResult) => {

        if( updateErr ){
          next("Error: "+updateErr);
        }else if( updateResult ){
          next(updateResult.result);
        }
      }
      );

    }

    db.close();
  });
}

module.exports = Alimentacao;