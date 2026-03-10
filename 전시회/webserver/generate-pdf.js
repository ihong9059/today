const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(htmlFile, pdfFile) {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    const htmlPath = path.join(__dirname, htmlFile);
    await page.goto(`file://${htmlPath}`, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });

    await page.pdf({
        path: path.join(__dirname, pdfFile),
        format: 'A4',
        landscape: true,
        printBackground: true,
        margin: {
            top: '10mm',
            right: '10mm',
            bottom: '10mm',
            left: '10mm'
        },
        preferCSSPageSize: true
    });

    console.log(`PDF 생성 완료: ${pdfFile}`);
    await browser.close();
}

// 명령줄 인자 처리
const args = process.argv.slice(2);
const htmlFile = args[0] || 'sales_guide.html';
const pdfFile = args[1] || htmlFile.replace('.html', '.pdf');

generatePDF(htmlFile, pdfFile);
