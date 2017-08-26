const mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;

function ValidateLoginDAO(){

}

ValidateLoginDAO.prototype.isValidUser = function(u, next){

  mongodbClient.connect(mongoUrl, (connErr, db) => {

    if(connErr) console.log(connErr);
    console.log('user to be validated:', u);

    if( u.hasOwnProperty("username") ){
      db.collection('clientes').findOne({ email: u.username, psw: u.psw }, (findErr, result) => {
        console.log("Validating login, err, result:", findErr, result)        
        if(result !== null) {
          next(findErr, result);
        }else{
          console.log("----\n");
          next(findErr, result);
        }

        console.log('isValidUser', u, result);
        db.close();
      });
    }else{
      next({error: "Campo username não informado."});
    }

  });
}

module.exports= ValidateLoginDAO;