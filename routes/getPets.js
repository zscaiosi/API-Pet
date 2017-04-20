module.exports = function(app){
  const listaPets = [
    {
      nome:'Rex',
      raca: 'Poodle',
      idade: 3
    },
    {
      nome:'Toto',
      raca: 'Rotweiller',
      idade: 5
    }
  ]

  //retorna a instância configurada
  app.get('/pets', function(req,res){
  // Usar query, pois o GET é feito em quey string
     var petProcurado = req.query;

     if( Object.getOwnPropertyNames(petProcurado).length > 1 ){
       //Executa a função para cada elemento do array
       listaPets.map((pet, index) => {

         if( pet.raca === petProcurado.nome ){
           res.send("Olá, "+pet);
           return;
         }else{
           return;
         }

       });
     }else{
       res.status(404).send({erro: "Você não passou parâmetros suficientes!", esperado: "?nome=nomeanimal'"});
     }
   });
}
