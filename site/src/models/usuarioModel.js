var database = require("../database/config")

function procurarPorId(idUsuario){
    
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function procurarPorId(): ", idUsuario)
    var instrucao = `
        SELECT 
            u.nome, 
            u.email, 
            u.senha, 
            e.nome as 'empresa',
            e.idEmpresa,
            u.fkUsuario 
        FROM Usuario u
        INNER JOIN Empresa e ON u.fkEmpresa = e.idEmpresa 
        WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.execute(instrucao);
}

function procurarPorEmail(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function procurarPorEmail(): ", email)
    var instrucao = `
        SELECT 
            u.nome, 
            u.email, 
            u.senha, 
            e.nome as 'empresa',
            e.idEmpresa,
            u.fkUsuario 
        FROM Usuario u
        INNER JOIN Empresa e ON u.fkEmpresa = e.idEmpresa 
        WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.execute(instrucao);
}

function cadastrar(nome, email, senha, fkEmpresa, fkUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarAdmin(): ", nome, email, senha, fkEmpresa, fkUsuario)
    var instrucao = `
        INSERT INTO Usuario (nome, email, senha, fkEmpresa, fkUsuario) VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkUsuario});
    `;
    return database.execute(instrucao);
}

module.exports = {
    procurarPorEmail,
    cadastrar,
    procurarPorId
};