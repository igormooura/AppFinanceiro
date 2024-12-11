const express = require("express");
const graficoController = require("../controller/GraficoController.js");
const router = express.Router();

router.post("/", graficoController.createGrafico); // Criar gráfico
router.get("/", graficoController.getAllGraficos); // Buscar todos os gráficos
router.get("/moeda/:moeda", graficoController.getGraficoByMoeda); // Buscar gráfico por moeda
router.put("/:id", graficoController.updateGrafico); // Atualizar gráfico
router.delete("/:id", graficoController.deleteGrafico); // Deletar gráfico
module.exports = router;
// 3 rotas