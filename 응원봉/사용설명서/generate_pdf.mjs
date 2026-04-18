import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(__dirname, 'AI_FanStick_사용설명서.html');
const pdfPath = path.join(__dirname, 'AI_FanStick_사용설명서.pdf');

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
await page.pdf({
  path: pdfPath,
  format: 'A4',
  margin: { top: '15mm', right: '12mm', bottom: '15mm', left: '12mm' },
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div></div>',
  footerTemplate: '<div style="font-size:8px;text-align:center;width:100%;color:#999;">AI FanStick 사용설명서 &nbsp;|&nbsp; <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
});
await browser.close();
console.log('PDF generated:', pdfPath);
