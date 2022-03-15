const express = require("express");
const router = express.Router();
const fs = require('fs');
const controller = require("../controllers/reports_controller");

router.get("/report_creation", controller.reportCreationPage);
// router.get("/report_creation", controller.reportCreationPage);
// fs.readFile('test3.pdf', 'utf8')

module.exports = router;
