const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/view_orders_controller");

router.get("/single_order/:id", auth, controller.singleOrderPage)
router.get("/single_order_pdf/:id", controller.hiddenPDFPage)
router.get("/order_table", auth, controller.orderTablePage)
router.get("/order_table_pdf", auth, controller.orderTablePage)

router.post("/single_order/:id", auth, controller.postSingleOrderPage)
router.post("/delete_order", auth, controller.postDeleteOrder)

module.exports = router;
