const mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;

function ValidateLoginDAO(){

}

ValidateLoginDAO.prototype.isValidUser = function(u, next){

  mongodbClient.connect(mongoUrl, (connErr, db) => {

    if(connErr) console.log(connErr);
    console.log('u', u);

    if( u.hasOwnProperty("username") ){
      db.collection('clientes').findOne({ email: u.username, pswd: u.pswd }, (findErr, result) => {
        console.log("....", findErr, result)        
        if(next) {
          console.log("....")
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