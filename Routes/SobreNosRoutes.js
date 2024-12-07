const express = require("express");
const { getSobreNos } = require("../controller/SobreNosController.js");

const router = express.Router();
router.get("/", getSobreNos);

module.exports = router;
