const Customer = require('../models/Customer')

exports.reportCreationPage = (req, res, next) => {
  Customer
      .find()
      .then(customers => {
        console.log(customers)
        res.render('reports/report_creation', {
            customers: customers,
            secondLayer: false
      });
  });
}
