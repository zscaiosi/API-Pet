module.exports = function(app){
  var petsArr = [];

  app.post("/pets/cadastrar", function(req,res){
    var petCadastrado = req.body;

    if(  Object.getOwnPropertyNames(clienteCadastrado).length > 1 ){
      petsArr.push(petCadastrado);
      res.status(200).send(petsArr);
    }else{
      res.status(404).send({erro: "Você não passou parâmetros suficientes!", esperado: "?raça='seulogin'&idade='suasenha'"})
    }
  });
}
