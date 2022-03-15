const express = require("express");
const router = express.Router();
const controller = require("../controllers/order_submission_controller");

// router.get("/choose_model", controller.chooseModelPage);
// router.get("/item_specs/:model", controller.itemSpecsPage);
router.get("/add_order", controller.addOrderPage);
router.post("/copy_order", controller.copyOrderPage);

router.post("/submit_order", controller.postSubmitOrder)

module.exports = router;
