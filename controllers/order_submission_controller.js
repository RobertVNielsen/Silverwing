const Order = require('../models/Order')
const Item = require('../models/Item')
const Model = require('../models/Model')
const Customer = require('../models/Customer')

exports.addOrderPage = (req, res, next) => {
  Order
      .find()
      .then(orders => {
        Model
            .find({category: 'model'})
            .then(models => {
              Model
                  .find({category: 'feature'})
                  .then(features => {
                    Customer
                        .find()
                        .then(customers => {
                          console.log(customers)
                          res.render('order_submission/add_order', {
                              title: 'Add Order',
                              orders: orders,
                              models: models,
                              features: features,
                              customers: customers,
                              editee: null,
                              isExists: false,
                              defaultPriceTable: 0,
                              secondLayer: false
                        });
                    });
                });
            });
      });
}

exports.copyOrderPage = (req, res, next) => {
  const id = req.body.orderID;
  Order
      .find()
      .then(orders => {
        Model
            .find({category: 'model'})
            .then(models => {
              Model
                  .find({category: 'feature'})
                  .then(features => {
                    Customer
                        .find()
                        .then(customers => {
                          console.log(customers)
                          let editee = null;
                          for (let i = 0; i < orders.length; i++) {
                            if (orders[i].id == id) {
                              editee = orders[i];
                            }
                          }
                          res.render('order_submission/add_order', {
                              title: 'Add Order',
                              orders: orders,
                              models: models,
                              features: features,
                              customers: customers,
                              editee: editee,
                              isExists: false,
                              defaultPriceTable: 0,
                              secondLayer: false
                        });
                    });
                });
            });
      });
}

exports.editOrderPage = (req, res, next) => {
  const id = req.body.orderID;
  Order
      .find()
      .then(orders => {
        Model
            .find({category: 'model'})
            .then(models => {
              Model
                  .find({category: 'feature'})
                  .then(features => {
                    Customer
                        .find()
                        .then(customers => {
                          console.log(customers)
                          let editee = null;
                          for (let i = 0; i < orders.length; i++) {
                            if (orders[i].id == id) {
                              editee = orders[i];
                            }
                          }
                          res.render('order_submission/add_order', {
                              title: 'Add Order',
                              orders: orders,
                              models: models,
                              features: features,
                              customers: customers,
                              editee: editee,
                              isExists: true,
                              defaultPriceTable: 0,
                              secondLayer: false
                        });
                    });
                });
            });
      });
}

// exports.itemSpecsPage = (req, res, next) => {
//   const model = req.params.model;
//   console.log(model);
//
//   Model
//       .findOne({'name': model})
//       .then(result => {
//         console.log(result);
//         res.render('order_submission/item_specs', {
//             title: 'Item Specs',
//             secondLayer: true,
//             model: result
//         });
//       })
//       .catch(err => {
//           console.log(err);
//       })
//
// }
//
// exports.chooseModelPage = (req, res, next) => {
//   Model
//       .find()
//       .then(models => {
//         res.render('order_submission/choose_model', {
//             title: 'Choose Model',
//             models: models,
//             secondLayer: false
//         });
//       });
// }

exports.postSubmitOrder = (req, res, next) => {
    const id = req.body.id;
    const customer = req.body.customer;
    let models = req.body.models;
    let prices = req.body.prices;
    const quantities = req.body.quantities;
    const orderDate = req.body.orderDate;
    const needDate = req.body.needDate;
    const notes = req.body.notes;
    console.log(req.body);

    if (!Array.isArray(models)) {
      if (models != null) {
        let temp = new Array()
        temp.push(models);
        models = temp
      } else {
        models = [];
      }
    }

    console.log('models '+models);

    if (!Array.isArray(prices)) {
      if (prices != null) {
        let temp = new Array();
        temp.push(prices);
        prices = temp;
      } else {
        prices = [];
      }
    }

    console.log(prices);


    let items = [];
    for (let i=0; i<models.length; i++) {
      let brokenDown = prices[i].split(',');
      let costs = [];
      for (let i=0; i<brokenDown.length; i+=2) {
        costs.push({feature: brokenDown[i], price: brokenDown[i+1]})
      }
      items.push({});
      console.log(costs)
      items[i] = new Item({
        model: models[i],
        costs: costs,
        quantity: quantities[i]
      });
      // items[i].price = prices[i];
    }

    Order
        .findOne({id: id})
        .then(result => {
          if (result) {
            result.customer = customer;
            result.items = items;
            result.orderDate = orderDate;
            result.needDate = needDate;
            result.notes = notes;

            result
                .save()
                .then(result => {
                    console.log("Updated Order " + id);
                    console.log(result);

                    res.redirect('/view_orders/order_table');
                })
                .catch(err => {
                    console.log(err);
                })
          } else {
            const order = new Order({
              id: id,
              customer: customer,
              items: items,
              orderDate: orderDate,
              needDate: needDate,
              notes: notes
            });

            order
                .save()
                .then(result => {
                    console.log("Created Order");
                    console.log(result);

                    res.redirect('/view_orders/order_table');
                })
                .catch(err => {
                    console.log(err);
                })
          }
        })






}
