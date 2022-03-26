const express = require("express");
const router = express.Router();
const controller = require("../controllers/authentication_controller");

// router.get("/accounts", controller.accountsPage);
router.get("/login", controller.loginPage);
// router.get("/signup", controller.signupPage)

router.post("/login", controller.authenticate)
// router.post("/signup", controller.createAccount)
router.post("/logout", controller.logout)

module.exports = router;
