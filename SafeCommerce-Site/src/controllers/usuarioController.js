var usuarioModel = require("../models/usuarioModel");
var nodemailer = require('nodemailer');

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
    var emailEmpresa = nome.replace(" ", "_");

    usuarioModel.consultarEmpresa(nome, email)
    .then(
        function (resultado) {
            cadastrarUsuarioAdmin(resultado, emailEmpresa);
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

function cadastrarUsuarioAdmin(res, palavraChave) {
    var nome = 'admin';
    var email = 'admin@' + palavraChave + '.com';
    var senha = 'admin_' + palavraChave;
    var idEmpresa = res[0].idEmpresa;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrarUsuarioAdmin(nome, email, senha, idEmpresa)
            .then(
                enviarEmail(email, senha),
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

function cadastrarUsuarioComum(req, res) {
    var nome = req.body.nameServer;
    var email = req.body.emailServer;
    var senha = req.body.passwdServer;
    var idEmpresa = req.body.idCompanyServer;
    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    } else {
        usuarioModel.cadastrarUsuarioComum(nome, email, senha, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
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
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: 'safecommerce@outlook.com.br',
                pass: 'Grupo8-CCO',
            }
        });

        var mailOptions = {
            from: 'safecommerce@outlook.com.br',
            to: 'kauan.brianez@sptech.school',
            subject: 'Acesso a plataforma SafeCommerce!',
            html: '<h1>Bem vindo ao SafeCommerce!!!</h1><br>' +
            "<p>Aqui está seu login para acessar a plataforma: </p><br>" +
            `Email: ${email} <br>` +
            `Senha: ${senha}`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(error);
            } else {
                console.log('Email enviado: ' + info.response);
            }
        })
    }
}

module.exports = {
    entrar,
    cadastrarEmpresa,
    cadastrarUsuarioAdmin,
    cadastrarUsuarioComum,
    consultarEmpresa
}