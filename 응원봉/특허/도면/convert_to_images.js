const puppeteer = require('puppeteer');
const path = require('path');

async function convertToImages() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // HTML 파일 로드
    const htmlPath = path.join(__dirname, 'generate_drawings.html');
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

    // 각 도면 캡처
    const drawings = [
        { id: 'fig1', name: '도1_전체시스템구성도' },
        { id: 'fig2', name: '도2_시스템프롬프트생성흐름도' },
        { id: 'fig3', name: '도3_음성AI_LED파이프라인시퀀스' },
        { id: 'fig4', name: '도4_BLE명령프로토콜구조' },
        { id: 'fig5', name: '도5_AI응답파싱알고리즘흐름도' },
        { id: 'fig6', name: '도6_하이브리드AI아키텍처' },
        { id: 'fig7', name: '도7_온디바이스AI처리상세흐름도' }
    ];

    for (const drawing of drawings) {
        const element = await page.$(`#${drawing.id}`);
        if (element) {
            await element.screenshot({
                path: path.join(__dirname, `${drawing.name}.png`),
                type: 'png'
            });
            console.log(`생성 완료: ${drawing.name}.png`);
        }
    }

    // 전체 PDF도 생성
    await page.pdf({
        path: path.join(__dirname, '특허도면_전체.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }
    });
    console.log('생성 완료: 특허도면_전체.pdf');

    await browser.close();
    console.log('\n모든 도면 생성 완료!');
}

convertToImages().catch(console.error);
