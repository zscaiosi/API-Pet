module.exports = function(app){
  var dietasArr = [];

  app.post("/dietas/cadastrar", function(req,res){
    var dietaCadastrado = req.body;

    if(  Object.getOwnPropertyNames(clienteCadastrado).length > 1 ){
      dietasArr.push(dietaCadastrado);
      res.status(200).send(dietasArr);
    }else{
      res.status(404).send({erro: "Você não passou parâmetros suficientes!", esperado: "?raça='seulogin'&idade='suasenha'"})
    }
  });
}
