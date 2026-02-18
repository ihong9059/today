const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// API: Get scenario list
app.get('/api/scenarios', (req, res) => {
    const scenariosPath = path.join(__dirname, 'data', 'scenarios');
    const scenarios = fs.readdirSync(scenariosPath).filter(f =>
        fs.statSync(path.join(scenariosPath, f)).isDirectory()
    );
    res.json(scenarios);
});

// API: Get scenario data
app.get('/api/scenarios/:name/:type', (req, res) => {
    const { name, type } = req.params;
    const filePath = path.join(__dirname, 'data', 'scenarios', name, `${type}.json`);

    if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        res.json(data);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.listen(PORT, () => {
    console.log(`일본어 학습 서버 실행 중: http://localhost:${PORT}`);
});
