var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT nomeUser, emailUser, senhaUser, idEmpresa, nomeEmpresa FROM usuario, empresa WHERE emailuser = '${email}' and senhaUser = '${senha}' and fkEmpresa = idEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.execute(instrucao);
}

function cadastrarEmpresa(nome, cnpj, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa(): ", nome, cnpj, email, senha)
    var instrucao = `
        INSERT INTO empresa (nomeEmpresa, cnpj, emailEmpresa, senhaEmpresa) VALUES ('${nome}', '${cnpj}', '${email}', '${senha}');
    `;
    return database.execute(instrucao);
}

function consultarEmpresa(nome, email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function consultarEmpresa(): ", nome, email)
    var instrucao = `
        SELECT idEmpresa FROM empresa WHERE nomeEmpresa = '${nome}' AND emailEmpresa = '${email}';
    `;
    return database.execute(instrucao);

}

function cadastrarUsuario(nome, email, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", nome, email, senha, idEmpresa)
    var instrucao = `
        INSERT INTO usuario (nomeUser, emailUser, senhaUser, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${idEmpresa}');
    `;
    return database.execute(instrucao);
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarUsuario,
    consultarEmpresa
};