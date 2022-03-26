const Order = require('../models/Order')
const puppeteer = require("puppeteer");
const fs = require('fs');

exports.postDeleteOrder = (req, res, next) => {
    const order = req.body.orderID;

    Order
        .findOneAndRemove({'id': order})
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
}


exports.orderTablePage = (req, res, next) => {
  Order
      .find()
      .then(orders => {
        // console.log(req.query.url);

        // (async () => {
        //   const browser = await puppeteer.launch();
        //   const page = await browser.newPage();
        //   await page.goto('http://localhost:5000/login', {
        //     waitUntil: "networkidle2"
        //   });
        //   // const html = fs.readFileSync(`${__dirname}/../template.html`, 'utf8')
        //   // await page.setContent(html, {
        //   //   waitUntil: 'domcontentloaded'
        //   // })
        //
        //   await page.setViewport({ width: 1680, height: 1050 });
        //
        //   await page.pdf({
        //     path: "test3.pdf",
        //     format: "A4",
        //     printBackground: true,
        //     displayHeaderFooter: true,
        //     headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;">
        //                         ${new Date().toDateString()} ${orders[0].date}
        //                         <span style="margin-left: 10px;">Generated PDF</span>
        //                     </div>`,
        //     footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
        //                         Generated PDF
        //                         <span style="display:inline-block;float:right;margin-right:10px;">
        //                             <span class="pageNumber"></span> / <span class="totalPages"></span>
        //                         </span>
        //                     </div>`,
        //     margin: {
        //       top: '38px',
        //       right: '38px',
        //       bottom: '38px',
        //       left: '38px'
        //     }
        //   });
        //
        //   await browser.close();
        // })();
        let today = new Date();
        console.log(today);
        res.render('view_orders/order_table', {
            title: 'db',
            path: '/db',
            isPlaylistPage: false,
            orders: orders,
            dd: today.getDay(),
            mm: today.getMonth(),
            yyyy: today.getFullYear(),
            secondLayer: false
        });
      })
      .catch(err => {
          console.log(err);
      })

}

exports.postEditOrder = (req, res, next) => {
  const id = req.body.id;
  const customer = req.body.customer;
  let models = req.body.models;
  let prices = req.body.prices;
  const quantities = req.body.quantities;
  const orderDate = req.body.orderDate;
  const needDate = req.body.needDate;
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
      .findOne({'id': id})
      .then(song => {
          song.title = updatedTitle;
          song.price = updatedPrice;
          song.description = updatedDescription;
          return song.save();
      })
      .then(result => {
          console.log("Updated Song");
          res.redirect('/admin')
      })
      .catch(err => {
          console.log(err);
      })
}

exports.singleOrderPage = (req, res, next) => {
  const order = req.params.id;

  Order
      .findOne({'_id': order})
      .then(result => {

        (async () => {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('http://localhost/view_orders/single_order_pdf/' + result._id, {
            waitUntil: "networkidle2"
          });
          // const html = fs.readFileSync(`${__dirname}/../template.html`, 'utf8')
          // await page.setContent(html, {
          //   waitUntil: 'domcontentloaded'
          // })

          // await page.setViewport({ width: 1680, height: 1050 });

          await page.pdf({
            path: "public/build_list_" + result.id + ".pdf",
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;">
                                ${new Date().toDateString()}
                                <span style="margin-left: 10px;">Generated PDF</span>
                            </div>`,
            footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
                                Generated PDF
                                <span style="display:inline-block;float:right;margin-right:10px;">
                                    <span class="pageNumber"></span> / <span class="totalPages"></span>
                                </span>
                            </div>`,
            // margin: {
            //   top: '38px',
            //   right: '38px',
            //   bottom: '38px',
            //   left: '38px'
            // }
          });

          await browser.close();
          res.render('view_orders/single_order', {
              title: 'Order',
              path: '/single_order',
              isPlaylistPage: false,
              order: result,
              secondLayer: true
          });
        })();

        // res.render('view_orders/single_order', {
        //     title: 'Order',
        //     path: '/single_order',
        //     isPlaylistPage: false,
        //     order: result,
        //     secondLayer: true
        // });

      })
      .catch(err => {
          console.log(err);
      })
}

exports.postSingleOrderPage = (req, res, next) => {
  const order = req.params.id;

  Order
      .findOne({'_id': order})
      .then(result => {
        (async () => {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('http://orderingmanagement22.com/view_orders/single_order_pdf/' + result._id, {
            waitUntil: "networkidle2"
          });
          // const html = fs.readFileSync(`${__dirname}/../template.html`, 'utf8')
          // await page.setContent(html, {
          //   waitUntil: 'domcontentloaded'
          // })

          // await page.setViewport({ width: 1680, height: 1050 });

          await page.pdf({
            path: "public/build_list_" + result.id + ".pdf",
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;">
                                ${new Date().toDateString()}
                                <span style="margin-left: 10px;">Generated PDF</span>
                            </div>`,
            footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
                                Generated PDF
                                <span style="display:inline-block;float:right;margin-right:10px;">
                                    <span class="pageNumber"></span> / <span class="totalPages"></span>
                                </span>
                            </div>`,
            // margin: {
            //   top: '38px',
            //   right: '38px',
            //   bottom: '38px',
            //   left: '38px'
            // }
          });

          await browser.close();
          res.render('view_orders/single_order', {
              title: 'Order',
              path: '/single_order',
              isPlaylistPage: false,
              order: result,
              secondLayer: true
          });
        })();

        // res.render('view_orders/single_order', {
        //     title: 'Order',
        //     path: '/single_order',
        //     isPlaylistPage: false,
        //     order: result,
        //     secondLayer: true
        // });

      })
      .catch(err => {
          console.log(err);
      })
}

exports.hiddenPDFPage = (req, res, next) => {
  const order = req.params.id;

  Order
      .findOne({'_id': order})
      .then(result => {

        res.render('view_orders/single_order_pdf', {
            title: 'Order',
            path: '/single_order',
            isPlaylistPage: false,
            order: result,
            secondLayer: true
        });
      })
      .catch(err => {
          console.log(err);
      })
}

exports.createPDF = (req, res, next) => {

}
