var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT 
            u.nome, 
            u.email, 
            u.senha, 
            u.fkEmpresa, 
            u.fkUsuario 
        FROM Usuario u
        INNER JOIN Empresa e ON u.fkEmpresa = e.idEmpresa 
        WHERE email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.execute(instrucao);
}

function cadastrar(nome, email, senha, fkEmpresa, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAdmin(): ", nome, email, senha, fkEmpresa, fkUsuario)
    var instrucao = `
        INSERT INTO usuario (nomeUser, emailUser, senhaUser, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkUsuario});
    `;
    return database.execute(instrucao);
}

module.exports = {
    entrar,
    cadastrar 
};