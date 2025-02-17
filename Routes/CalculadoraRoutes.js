const express = require("express");
<<<<<<< HEAD
const { realizarConversao, getHistorico } = require("../controller/CalculadoraController");
const router = express.Router();

// Rota para realizar conversão
router.post("/", realizarConversao);
// Rota para buscar histórico de conversões
router.get("/historico", getHistorico);
module.exports = router;
// 2 rotas
=======
const { realizarConversao, getHistoricoByUser, adicionarHistorico } = require("../controller/CalculadoraController");
const router = express.Router();

router.post("/", realizarConversao);
router.get("/historico/:userId", getHistoricoByUser);
router.post("/historico/:userId", adicionarHistorico);

module.exports = router;
>>>>>>> cd4bd102040b77ec12d267c3155ec371acc8049e
