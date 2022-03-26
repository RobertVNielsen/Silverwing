const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/customers_controller");

router.get("/add_customer", auth, controller.addCustomerPage);
router.get("/customer_table", auth, controller.customerTablePage);
router.get("/display_customer", auth, controller.displayCustomerPage);
router.get("/customers", auth, controller.editCustomerPage);

router.post("/submit_customer", auth, controller.postAddCustomer);
router.post("/delete_customer", auth, controller.postDeleteCustomer);

module.exports = router;
