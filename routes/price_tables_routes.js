const express = require("express");
const router = express.Router();
const controller = require("../controllers/price_tables_controller");

router.get("/add_price_table", controller.addPriceTablePage);
router.get("/price_table_table", controller.priceTableTablePage);
router.get("/display_price_table", controller.displayPriceTablePage);
router.get("/edit_price_table", controller.editPriceTablePage);

router.post("/submit_price_table", controller.postAddPriceTable);
router.post("/delete_product", controller.postDeletePriceTable);

module.exports = router;
