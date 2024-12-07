const express = require("express");
const { realizarConversao } = require("../controller/CalculadoraController");

const router = express.Router();

router.post("/", realizarConversao);

module.exports = router;
