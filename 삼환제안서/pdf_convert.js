const puppeteer = require('puppeteer');
const path = require('path');

async function convertToPDF(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const filePath = path.resolve(htmlFile);
  await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfFile,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', bottom: '16mm', left: '12mm', right: '12mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;text-align:center;font-size:9px;color:#999;font-family:sans-serif"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
  });

  console.log('Created: ' + pdfFile);
  await browser.close();
}

(async () => {
  await convertToPDF(process.argv[2], process.argv[3]);
})();
