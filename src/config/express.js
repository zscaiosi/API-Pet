//importa o modulo express
var express = require('express');
//Carrega o load
// var load = require('express-load'); NÃO VOU MAIS USAR
var clientes = require('../routes/clientesRoutes');
var pets = require('../routes/petsRoutes');
const devices = require('../routes/devicesRoutes');
const dietas = require('../routes/dietasRoutes');
const cors = require('cors');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const ValidateLoginDAO = require('../controllers/ValidateLoginDAO');
//Carrega body parser para tratar body das REQUESTS
var bodyParser = require('body-parser');

//Determina a estratégia de autenticação
// passport.use( new localStrategy({
//   passReqToCallback : true
// },
//   function(req, username, password, done){
//     const validate = new ValidateLoginDAO();
//     //Verify callback
//     validate.isValidUser({username: username}, (err, user) => {
//       if(err){ return done(err) }

//       if(!user){ return done(null, false, req.flash('signupMessage','!user' )) }

//       if(user.senha !== password){ return done(null, false, req.flash('signupMessage','user.senha' )) }

//       return done(null, user);
//     });
//   }
// ));


module.exports = function() {
  //instancia o express na variavel app
    var app = express();
  //COnfigura CORS
    app.use(cors());
  //configura-o para utilizar como view engine o ejs
    app.set('view engine', 'ejs');
  //Configura funções que serão aplicadas aos requests na ordem estabelecida "MIDDLEWAE"
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(bodyParser.text());
  //Configua sessão e passport
    // app.use(passport.initialize());
  //Configura as rotas do app
    app.use('/clientes', clientes);
    app.use('/pets', pets);
    app.use('/devices', devices);
    app.use('/dietas', dietas);

  //retorna a instância configurada
    return app;
}
