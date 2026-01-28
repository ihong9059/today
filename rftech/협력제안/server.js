const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Static files
app.use(express.static(__dirname));

// Main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║     (주)알에프텍 스마트팩토리 제안서 서버              ║
╠════════════════════════════════════════════════════════╣
║  Local:    http://localhost:${PORT}                       ║
║  Network:  http://0.0.0.0:${PORT}                         ║
╠════════════════════════════════════════════════════════╣
║  UTTEC × RFTech 기술협력 제안서                        ║
╚════════════════════════════════════════════════════════╝
    `);
});
