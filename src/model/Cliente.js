let mongodbClient = require('mongodb').MongoClient;
const mongoUrl = require('../config/endpoints.json').mongodbUrl;
const mailer = require('nodemailer');

const nodeTransporter = mailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'zscaio.si@gmail.com',
		pass: 'gm4il2911925Bcaio'
	}
});

function Cliente(){

}

Cliente.prototype.sendEmail = function(body) {

  mongodbClient.connect( mongoUrl, (connErr, db) => {
    db.collection("clientes").findOne({ "device": body.device }, (findErr, findResult) => {
      if( findErr ){
        console.log("findErr", findErr);
      }else{
        //console.log("result---", findResult)
        let recipient = "zscaio.si@gmail.com";

        let mailOptions = {
          from: "zscaio.si@gmail.com",
          to: recipient,
          subject: "Nodejs TESTE",
          html: `<h1>Olá ${recipient}!</h1><br /><p>Seu pet acaba de ser alimentado através do dispositivo <strong> ${body.device}</strong></p>`
        }

        nodeTransporter.sendMail(mailOptions, (mailErr, mailInfo) => {
          if (mailErr) {
            console.log(mailErr);
          } else {
            console.log('Email sent: ' + mailInfo.response);
          }
        });
      }
      db.close();
    });
    
  });
}

module.exports = Cliente;