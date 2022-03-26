const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/price_tables_controller");

router.get("/add_price_table", auth, controller.addPriceTablePage);
router.get("/price_table_table", auth, controller.priceTableTablePage);
router.get("/display_price_table", auth, controller.displayPriceTablePage);
router.get("/edit_price_table", auth, controller.editPriceTablePage);

router.post("/submit_price_table", auth, controller.postAddPriceTable);
router.post("/delete_product", auth, controller.postDeletePriceTable);

module.exports = router;
