const database = require('../database/config');

function getServers(idCompany) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", idCompany);
    var instruction = 
    `
    SELECT * FROM Servidor WHERE fkEmpresa = ${idCompany};
    `
    return database.execute(instruction);
}

function getCurrentServer(id) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", id);
    var instruction =
    `
    SELECT * FROM Servidor WHERE idServidor = ${id};
    `
    return database.execute(instruction);
}

function obterDadosCPU(id) {
    var instruction = `SELECT valor, horario FROM leituraCPU where fkServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosRam(id) {
    var instruction = `SELECT porcentagemUso, horario FROM leituraRam where fkServidor = ${id};`
   
    return database.execute(instruction);
}
module.exports = {
    getServers,
    getCurrentServer,
    obterDadosCPU,
    obterDadosRam,
}