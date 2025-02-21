const express = require("express");
const usuarioController = require("../controller/UsuarioController.js");

const router = express.Router();

router.get("/", usuarioController.getAllPerfis); 
router.get("/perfil/:id", usuarioController.getPerfilById); 
router.get("/perfil/usuarios/:id", usuarioController.getPerfilByIdMain); 
router.put("/perfil/:id", usuarioController.updatePerfil); 
router.delete("/perfil/:id", usuarioController.deletePerfil); 

module.exports = router;
