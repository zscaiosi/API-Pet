const mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;

function ValidateLoginDAO(){

}

ValidateLoginDAO.prototype.isValidUser = function(u, next){

  mongodbClient.connect(mongoUrl, (connErr, db) => {

    if(connErr) console.log(connErr);
    console.log('isValidUser');

    if( u.hasOwnProperty("username") ){
      db.collection('clientes').findOne({ email: u.username }, (findErr, result) => {
        if(next) {
          next(findErr, result);
        }

        console.log('isValidUser', u, result);
        db.close();
      });
    }else{

    }

  });
}

module.exports= ValidateLoginDAO;