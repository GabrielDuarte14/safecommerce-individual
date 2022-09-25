const database = require('../database/config');

function registerServer(model, os, cpuAmount, ramAmount, diskAmount, idCompany) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registerServer(): ", model, os, cpuAmount, ramAmount, diskAmount, idCompany);
    var instruction = 
    `
    INSERT INTO servidor (modelo, SO, qtd_cpus, qtd_memoria_ram, qtd_disco, fkEmpresa) VALUES ('${model}', '${os}', '${cpuAmount}', '${ramAmount}', '${diskAmount}', '${idCompany}');
    `
    console.log("Executando a instrução SQL: \n" + instruction);
    return database.execute(instruction);
}

function getServers(idCompany) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", idCompany);
    var instruction = 
    `
    SELECT * FROM servidor WHERE fkEmpresa = ${idCompany};
    `
    return database.execute(instruction);
}

function getCurrentServer(id) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", id);
    var instruction =
    `
    SELECT * FROM servidor WHERE idServidor = ${id};
    `
    return database.execute(instruction);
}

function obterDadosCPU(id) {
    var instruction = `SELECT porcentagemCpu, horario FROM processo where fkServidor = '${id}';`
    return database.execute(instruction);
}

module.exports = {
    registerServer,
    getServers,
    getCurrentServer,
    obterDadosCPU,
}