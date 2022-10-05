var express = require('express');
var router = express.Router();

var serverController = require('../controllers/serverController');

router.post("/registerServer", (req, res) => {
    serverController.registerServer(req, res);
});

router.post("/getServers", (req, res) => {
    serverController.getServers(req, res);
});

router.post("/getCurrentServer", (req, res) => {
    serverController.getCurrentServer(req, res);
})
router.post("/obterDadosCPU", (req,res)=>{
    serverController.obterDadosCPU(req, res);
    console.log(req)
})
router.post("/obterDadosRam", (req,res)=>{
    serverController.obterDadosRam(req, res);
    console.log(req)
})

module.exports = router;