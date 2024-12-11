const express = require("express");
const usuarioController = require("../controller/UsuarioController.js");

const router = express.Router();

router.get("/", usuarioController.getAllUsers); // Buscar todos os usuários
router.post("/auth/login", usuarioController.loginUser); // Login de usuário
router.post("/auth/cadastrar", usuarioController.createUser); // Criar usuário
router.post("/auth/esquecersenha", usuarioController.forgotPassword); // Redefinir senha
router.get("/:id", usuarioController.getUserById); // Buscar usuário por ID
router.put("/:id", usuarioController.updateUser); // Atualizar usuário
router.delete("/:id", usuarioController.deleteUser); // Deletar usuário

module.exports = router;

// 5 rotas
