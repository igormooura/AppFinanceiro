const express = require("express");
const noticiaController = require("../controller/NoticiaController.js");
const router = express.Router();
router.post("/", noticiaController.createNoticia); // Criar notícia
router.get("/", noticiaController.getAllNoticias); // Buscar todas as notícias
router.get("/:id", noticiaController.getNoticiaById); // Buscar notícia por ID
router.put("/:id", noticiaController.updateNoticia); // Atualizar notícia
router.delete("/:id", noticiaController.deleteNoticia); // Deletar notícia
module.exports = router;
// 2 rotas