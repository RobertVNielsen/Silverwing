const express = require("express");
const router = express.Router();
const controller = require("../controllers/customers_controller");

router.get("/add_customer", controller.addCustomerPage);
router.get("/customer_table", controller.customerTablePage);
router.get("/display_customer", controller.displayCustomerPage);
router.get("/customers", controller.editCustomerPage);

router.post("/submit_customer", controller.postAddCustomer);
router.post("/delete_customer", controller.postDeleteCustomer);

module.exports = router;
