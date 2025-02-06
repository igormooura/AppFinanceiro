const express = require("express");
const graficoController = require("../controller/GraficoController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");
const router = express.Router();

router.post("/", authMiddleware , graficoController.createGrafico); // Criar gráfico
router.get("/", authMiddleware , graficoController.getAllGraficos); // Buscar todos os gráficos
router.get("/moeda/:moeda", authMiddleware ,graficoController.getGraficoByMoeda);
router.put("/:id", authMiddleware , graficoController.updateGrafico); 
router.delete("/:id", authMiddleware , graficoController.deleteGrafico); 
module.exports = router;
// 3 rotas