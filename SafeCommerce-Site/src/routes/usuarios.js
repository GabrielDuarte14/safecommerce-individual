var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/cadastrarUsuarioAdmin", function (req, res) {
    usuarioController.cadastrarUsuarioAdmin(req, res);
})

router.post("/cadastrarUsuarioComum", function (req, res) {
    usuarioController.cadastrarUsuarioComum(req, res);
})

router.post("/enviarEmail", function (req, res) {
    usuarioController.enviarEmail(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

module.exports = router;