    const express = require("express");
    const usuarioController = require("../controller/UsuarioController.js");
    const authMiddleware = require("../middleware/AuthMiddleware.js");

    const router = express.Router();

    router.get("/", authMiddleware , usuarioController.getAllPerfis);
    router.get("/perfil/:id", authMiddleware , usuarioController.getPerfilById);
    router.put("/perfil/:id", authMiddleware , usuarioController.updatePerfil); 
    router.delete("/perfil/:id", authMiddleware ,usuarioController.deletePerfil); 

    module.exports = router;

    // 2 rotas
