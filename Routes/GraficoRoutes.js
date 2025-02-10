const express = require("express");
const graficoController = require("../controller/GraficoController.js");
const router = express.Router();

router.post("/:userId", graficoController.createGrafico); // Criar gráfico
router.get("/:userId", graficoController.getGraficoByUser); // Buscar todos os gráficos
router.get("/moeda/:moeda", graficoController.getGraficoByMoeda); // Buscar gráfico por moeda
router.put("/:id", graficoController.updateGrafico); // Atualizar gráfico
router.delete("/:id/usuario/:userId", graficoController.deleteGrafico); // Deletar gráfico ✅ Fixed!

module.exports = router;
//3 rotas