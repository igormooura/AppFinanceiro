const express = require("express");
const noticiaController = require("../controller/NoticiaController.js");
const router = express.Router();
router.post("/", noticiaController.createNoticia); 
router.get("/", noticiaController.getAllNoticias); 
router.get("/:id", noticiaController.getNoticiaById); 
router.put("/:id", noticiaController.updateNoticia); 
router.delete("/:id", noticiaController.deleteNoticia); 
module.exports = router;