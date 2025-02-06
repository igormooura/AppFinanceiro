const express = require("express");
const { realizarConversao, getHistorico } = require("../controller/CalculadoraController");
const router = express.Router();

// Rota para realizar conversão
router.post("/", authMiddleware , realizarConversao);

router.get("/historico", authMiddleware , getHistorico);
module.exports = router;
// 2 rotas
