const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/view_orders_controller");

router.get("/single_order/:id", controller.singleOrderPage)
router.get("/single_order_pdf/:id", controller.hiddenPDFPage)
router.get("/order_table", auth, controller.orderTablePage)
router.get("/order_table_pdf", controller.orderTablePage)

router.post("/delete_order", controller.postDeleteOrder)

module.exports = router;
