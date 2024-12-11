const express = require("express");
const { realizarConversao, getHistorico } = require("../controller/CalculadoraController");
const router = express.Router();

// Rota para realizar conversão
router.post("/", realizarConversao);
// Rota para buscar histórico de conversões
router.get("/historico", getHistorico);
module.exports = router;
// 2 rotas
