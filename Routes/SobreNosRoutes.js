const express = require("express");
const { getSobreNos } = require("../controller/SobreNosController.js");
const authMiddleware = require("../middleware/AuthMiddleware.js");

const router = express.Router();
router.get("/sobrenos", authMiddleware, getSobreNos);
module.exports = router;
