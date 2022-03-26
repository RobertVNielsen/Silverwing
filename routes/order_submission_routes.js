const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/order_submission_controller");

// router.get("/choose_model", controller.chooseModelPage);
// router.get("/item_specs/:model", controller.itemSpecsPage);
router.get("/add_order", auth, controller.addOrderPage);
router.post("/copy_order", auth, controller.copyOrderPage);

router.post("/submit_order", auth, controller.postSubmitOrder)

module.exports = router;
