const serverModel = require("../models/serverModel");

// const spawn = require('child_process').spawn;

// function createPages(req, res) {
//     var process = spawn('python', ['./public/python/createPage.py']);
//     process.stdout.on('data', (data) => {
//         console.log(data)
//     })
// }  

function registerServer(req, res) {
    var model = req.body.modelServer;
    var os = req.body.osServer;
    var cpuAmount = req.body.cpuAmountServer;
    var ramMemory = req.body.ramMemoryServer;
    var diskAmount = req.body.diskAmountServer;
    var idCompany = req.body.idCompanyServer;

    if(model === undefined) {
        res.status(400).send("O modelo está undefined!");
    } else if(os === undefined) {
        res.status(400).send("O sistema operacional está undefined!");
    } else if(cpuAmount === undefined) {
        res.status(400).send("A quantidade de CPU está undefined!");
    } else if(ramMemory === undefined) {
        res.status(400).send("A memória RAM está undefined!");
    } else if(diskAmount === undefined) {
        res.status(400).send("A quantidade de disco está undefined!");
    }

    serverModel.registerServer(model, os, cpuAmount, ramMemory, diskAmount, idCompany)
        .then(
            function (result) {
                res.json(result);
            }
        ).catch(
            function (error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao realizar o cadastro do servidor! Erro: ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            }
        );
};

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
    console.log(id);

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


module.exports = {
    registerServer,
    getServers,
    getCurrentServer
    // createPages
}