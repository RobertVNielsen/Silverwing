const PriceTable = require('../models/PriceTable')
const Model = require('../models/Model')

exports.priceTableTablePage = (req, res, next) => {
  // const order = new PriceTable({
  //     name: "SWT90",
  //     category: "model",
  //     prices: [1099, 1199, 1299]
  // });
  //
  // order
  //     .save()
  //     .then(result => {
  //         console.log("Created Order");
  //         console.log(result);
  //
  //         // res.redirect('/view_orders/order_table');
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     })

  Model
    .find({'category': 'model'})
    .then(models => {
      Model
        .find({'category': 'feature'})
        .then(features => {
          res.render('price_tables/price_table_table', {
              title: 'Price Table Table',
              secondLayer: false,
              models: models,
              features: features
          });
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err);
    })
}

exports.displayPriceTablePage = (req, res, next) => {
    res.render('price_tables/display_price_table', {
        title: 'Display Price Table',
        secondLayer: false
    });
}

exports.addPriceTablePage = (req, res, next) => {
    res.render('price_tables/add_price_table', {
        title: 'Add Price Table',
        secondLayer: false
    });
}

exports.postAddPriceTable = (req, res, next) => {
  const name = req.body.name;
  const category = req.body.category;
  const a = req.body.A;
  const b = req.body.B;
  const c = req.body.C;

  const product = new Model({
    name: name,
    category: category,
    prices: [a, b, c]
  });

  product
      .save()
      .then(result => {
          console.log("Created Product");
          console.log(result);

          res.redirect('/price_tables/price_table_table');
      })
      .catch(err => {
          console.log(err);
      })
}

exports.postDeletePriceTable = (req, res, next) => {
  const priceTableID = req.body.id;

  Model
      .findOneAndRemove({'_id': priceTableID})
      .then(result => {
          console.log("Deleted Product");
          console.log(result);

          res.redirect('/price_tables/price_table_table');
      })
      .catch(err => {
          console.log(err);
      })
}

exports.editPriceTablePage = (req, res, next) => {
    res.render('price_tables/edit_price_table', {
        title: 'Edit Price Table',
        secondLayer: false
    });
}
