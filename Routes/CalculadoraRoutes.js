const express = require("express");
const { realizarConversao, getHistoricoByUser, adicionarHistorico } = require("../controller/CalculadoraController");
const router = express.Router();

router.post("/", realizarConversao);
router.get("/historico/:userId", getHistoricoByUser);
router.post("/historico/:userId", adicionarHistorico);

module.exports = router;
