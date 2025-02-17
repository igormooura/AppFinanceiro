const express = require("express");
const usuarioController = require("../controller/UsuarioController.js");

const router = express.Router();

router.get("/", usuarioController.getAllPerfis); // Buscar todos os Perfis
router.get("/perfil/:id", usuarioController.getPerfilById); // Buscar Perfil por ID
router.get("/perfil/usuarios/:id", usuarioController.getPerfilByIdMain); // Buscar Perfil por ID Main
router.put("/perfil/:id", usuarioController.updatePerfil); // Atualizar Perfil
router.delete("/perfil/:id", usuarioController.deletePerfil); // Deletar Perfil

module.exports = router;

// 2 rotas
