const express = require("express");
const graficoController = require("../controller/GraficoController.js");
const router = express.Router();

router.post("/:userId", graficoController.createGrafico); 
router.get("/:userId", graficoController.getGraficoByUser); 
router.get("/moeda/:moeda", graficoController.getGraficoByMoeda);
router.put("/:id", graficoController.updateGrafico); 
router.delete("/:id/usuario/:userId", graficoController.deleteGrafico);

module.exports = router;