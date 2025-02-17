const express = require("express");
const authPerfilController = require("../controller/AuthPerfilController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js")


const router = express.Router();
router.post("/login", authPerfilController.loginUser); 
router.post("/cadastrar", authPerfilController.createUser); 
router.post("/esquecersenha", authPerfilController.forgotPassword); 

router.get("/verify-auth", authMiddleware, (req, res) => {
    res.status(200).json({ 
      message: "Autenticação válida.",
      user: req.user 
    });
  });

module.exports = router;