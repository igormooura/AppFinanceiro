const express = require("express");
const noticiaController = require("../controller/NoticiaController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");
const router = express.Router();


router.post("/", authMiddleware ,noticiaController.createNoticia); // Criar notícia
router.get("/",authMiddleware , noticiaController.getAllNoticias); // Buscar todas as notícias
router.get("/:id", authMiddleware , noticiaController.getNoticiaById); // Buscar notícia por ID
router.put("/:id", authMiddleware , noticiaController.updateNoticia); // Atualizar notícia
router.delete("/:id", authMiddleware , noticiaController.deleteNoticia); // Deletar notícia
module.exports = router;
// 2 rotas