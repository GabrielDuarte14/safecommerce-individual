var usuarioModel = require("../models/usuarioModel");

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarEmpresa(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarEmpresa(nome, cnpj, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                    consultarEmpresa(nome, email)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function consultarEmpresa(nome, email) {
    usuarioModel.consultarEmpresa(nome, email)
    .then(
        function (resultado) {
            cadastrarUsuario(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function cadastrarUsuario(res) {
    var nome = 'admin';
    var email = 'admin@email.com';
    var senha = 'admin123';
    var idEmpresa = res[0].idEmpresa;
    console.log(idEmpresa)
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarUsuario(nome, email, senha, idEmpresa)
            .then(
                // enviarEmail(email, senha),
                console.log("Usuário cadastrado com sucesso!")
            ).catch(    
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function enviarEmail(email, senha) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

    }
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarUsuario,
    consultarEmpresa
}