
//Função 'construtora'
function ClientesDAO(connection) {
    this._connection = connection;
    console.log('connection dentro do dao', this._connection);
}
//USa prototype para atribuir funções/atributos ao objeto
ClientesDAO.prototype.lista = function(callback) {
    console.log('entrou em ClientesDAO.prototype.lista');
    this._connection.query('select * from TBL_CLIENTES', callback);
}

ClientesDAO.prototype.procura = function(login, pswd, callback) {
    this._connection.query('select * from TBL_CLIENTES WHERE LOGIN = ? AND SENHA = ?', [login, pswd], callback);
}

module.exports = function(){
    return ClientesDAO;
};
