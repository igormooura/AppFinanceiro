const express = require("express");
const usuarioController = require("../controller/UsuarioController.js");

const router = express.Router();

// Rotas de usuário
router.post("/", usuarioController.createUser); // Criar usuário
router.get("/", usuarioController.getAllUsers); // Buscar todos os usuários
router.get("/:id", usuarioController.getUserById); // Buscar usuário por ID
router.put("/:id", usuarioController.updateUser); // Atualizar usuário
router.delete("/:id", usuarioController.deleteUser); // Deletar usuário

module.exports = router;

// 2