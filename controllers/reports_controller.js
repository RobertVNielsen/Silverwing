const puppeteer = require("puppeteer");
const fs = require('fs');

exports.reportCreationPage = (req, res, next) => {

    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:5000/view_orders/order_table_pdf?pdf=true', {
        waitUntil: "networkidle2"
      });
      // const html = fs.readFileSync(`${__dirname}/../template.html`, 'utf8')
      // await page.setContent(html, {
      //   waitUntil: 'domcontentloaded'
      // })

      // await page.setViewport({ width: 1680, height: 1050 });

      await page.pdf({
        path: "public/test3.pdf",
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
    })();

    res.render('reports/report_creation', {
        title: 'Report Creation',
        secondLayer: false
    });

}
