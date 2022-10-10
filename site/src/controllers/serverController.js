const serverModel = require("../models/serverModel");

function getServers(req, res) {
    var idCompany = req.body.idCompanyServer;

    serverModel.getServers(idCompany)
        .then(
            function(result) {
                res.json(result);
            }
        ).catch(
            function(error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao receber os dados dos servidores! Erro ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            }
        );
}

function getCurrentServer(req, res) {
    var id = req.body.idServer;
    console.log(id + 'dadsadasdasdasd');

    serverModel.getCurrentServer(id)
        .then(
            function(result) {
                res.json(result);
            }
        ).catch(
            function(error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao receber os dados dos servidores! Erro ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            }
        )
}

function obterDadosCPU(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosCPU(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosRam(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosRam(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
module.exports = {
    getServers,
    getCurrentServer,
    obterDadosCPU,
    obterDadosRam
}