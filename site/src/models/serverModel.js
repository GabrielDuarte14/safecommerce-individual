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
    var instruction = `SELECT valor, horario FROM leituraCPU where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosCPUCore(id) {
    var instruction = `SELECT valor, horario FROM leituraCoreCPU where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosFreq(id) {
    var instruction = `SELECT valor, horario FROM leituraFreq where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosRam(id) {
    var instruction = `SELECT valor, horario FROM leituraRam where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosDisk(id) {
    var instruction = `SELECT valor, horario FROM leituraDisco where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosRDisk(id) {
    var instruction = `SELECT valor, horario FROM leituraLDisco where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosWDisk(id) {
    var instruction = `SELECT valor, horario FROM leituraEDisco where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosTotalDisk(id) {
    var instruction = `SELECT valor FROM leituraTotalDisco where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosTotalRam(id) {
    var instruction = `SELECT valor FROM leituraTotalRAM where idServidor = ${id};`
   
    return database.execute(instruction);
}

function obterDadosTotalCpus(id) {
    var instruction = `SELECT valor FROM leituraQtdCores where idServidor = ${id};`
   
    return database.execute(instruction);
}

module.exports = {
    getServers,
    getCurrentServer,
    obterDadosCPU,
    obterDadosCPUCore,
    obterDadosRam,
    obterDadosFreq,
    obterDadosDisk,
    obterDadosRDisk,
    obterDadosWDisk,
    obterDadosTotalDisk,
    obterDadosTotalRam,
    obterDadosTotalCpus,
}