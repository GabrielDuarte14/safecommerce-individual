var express = require('express');
var router = express.Router();

var serverController = require('../controllers/serverController');

router.post("/getServers", (req, res) => {
    serverController.getServers(req, res);
});

router.post("/getCurrentServer", (req, res) => {
    serverController.getCurrentServer(req, res);
})
router.post("/obterDadosCPU", (req,res)=>{
    serverController.obterDadosCPU(req, res);
})
router.post("/obterDadosRam", (req,res)=>{
    serverController.obterDadosRam(req, res);
})

module.exports = router;