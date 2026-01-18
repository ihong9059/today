const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

const NEXT_DIR = path.join(__dirname, '.next');
const SERVER_APP_DIR = path.join(NEXT_DIR, 'server', 'app');

// .next/static 정적 파일 서빙
app.use('/_next/static', express.static(path.join(NEXT_DIR, 'static')));

// public 폴더 정적 파일
app.use(express.static(path.join(__dirname, 'public')));

// 모든 라우트 처리
app.use((req, res) => {
    let urlPath = req.path;

    // 경로 정리
    if (urlPath.endsWith('/')) {
        urlPath = urlPath.slice(0, -1);
    }
    if (urlPath === '') urlPath = '/index';

    // HTML 파일 찾기 (Next.js 16 빌드 구조)
    const possiblePaths = [
        path.join(SERVER_APP_DIR, urlPath + '.html'),
        path.join(SERVER_APP_DIR, urlPath, 'index.html'),
        path.join(SERVER_APP_DIR, urlPath.slice(1) + '.html'),
        path.join(SERVER_APP_DIR, urlPath.slice(1), 'index.html')
    ];

    for (const htmlPath of possiblePaths) {
        if (fs.existsSync(htmlPath)) {
            // fs.readFile을 사용하여 직접 응답 (sendFile 대신)
            const content = fs.readFileSync(htmlPath, 'utf8');
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.send(content);
        }
    }

    // 404 페이지
    const notFoundPath = path.join(SERVER_APP_DIR, '_not-found.html');
    if (fs.existsSync(notFoundPath)) {
        const content = fs.readFileSync(notFoundPath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(404).send(content);
    }

    res.status(404).send('Page not found - ' + urlPath);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`cert-guide 정적 서버가 포트 ${PORT}에서 실행 중입니다.`);
    console.log(`http://0.0.0.0:${PORT}`);
    console.log(`Server App Dir: ${SERVER_APP_DIR}`);

    // 디렉토리 내용 확인
    if (fs.existsSync(SERVER_APP_DIR)) {
        const files = fs.readdirSync(SERVER_APP_DIR).filter(f => f.endsWith('.html'));
        console.log('Available routes:', files.slice(0, 10));
    } else {
        console.error('ERROR: Server App Dir not found!');
    }
});
