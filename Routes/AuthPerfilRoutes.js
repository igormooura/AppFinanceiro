const express = require("express");
const authPerfilController = require("../controller/AuthPerfilController.js");

const router = express.Router();
router.post("/login", authPerfilController.loginUser); // Login de usuário
router.post("/cadastrar", authPerfilController.createUser); // Criar usuário
router.post("/esquecersenha", authPerfilController.forgotPassword); // Redefinir senha
module.exports = router;
// 3 rotas