var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
console.log("passando valores como parametro")

function cadastrar(nome, cnpj, email, senha) {
    console.log(nome, cnpj, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, cnpj, email, senha) VALUES ('${nome}', '${cnpj}', '${email}', '${senha}');
    `;
            console.log("Executando a instrução SQL: \n" + instrucao);
            return database.executar(instrucao);
        }

console.log("Instrução mysql")

module.exports = {
    entrar,
    cadastrar
};