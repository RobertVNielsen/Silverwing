const Customer = require('../models/Customer')

exports.customerTablePage = (req, res, next) => {
  Customer
      .find()
      .then(customers => {
        console.log(customers)
        res.render('customers/customer_table', {
            title: 'Customer Table',
            customers: customers,
            secondLayer: false
      });
  });
}

exports.displayCustomerPage = (req, res, next) => {
    res.render('customers/display_customer', {
        title: 'Display Customer',
        secondLayer: false
    });
}

exports.addCustomerPage = (req, res, next) => {
    res.render('customers/add_customer', {
        title: 'Add Customer',
        secondLayer: false
    });
}

exports.postAddCustomer = (req, res, next) => {
  const name = req.body.name;
  const priceTable = req.body.priceTable;
  const phone = req.body.phone;
  const email = req.body.email;

  const customer = new Customer({
    title: name,
    priceTable: priceTable,
    phone: phone,
    email: email
  });

  customer
      .save()
      .then(result => {
          console.log("Created Customer");
          console.log(result);

          res.redirect('/customers/customer_table');
      })
      .catch(err => {
          console.log(err);
      })
}

exports.postDeleteCustomer = (req, res, next) => {
  const customerID = req.body.id;

  Customer
      .findOneAndRemove({'_id': customerID})
      .then(result => {
          console.log("Deleted Customer");
          console.log(result);

          res.redirect('/customers/customer_table');
      })
      .catch(err => {
          console.log(err);
      })
}

exports.editCustomerPage = (req, res, next) => {
    res.render('customers/edit_customer', {
        title: 'Edit Customer',
        secondLayer: false
    });
}
