import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// 로그 파일 경로
const LOG_FILE = path.join(__dirname, '../../visitor_logs.json');

// 로그 파일 초기화
function initLogFile() {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
  }
}

// 로그 읽기
function readLogs() {
  initLogFile();
  const data = fs.readFileSync(LOG_FILE, 'utf-8');
  return JSON.parse(data);
}

// 로그 저장
function saveLogs(logs: any[]) {
  // 최대 5000개 유지
  if (logs.length > 5000) {
    logs = logs.slice(-5000);
  }
  fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
}

// 방문 기록 저장 API
router.post('/log', (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] ||
                     req.headers['x-real-ip'] ||
                     req.socket.remoteAddress ||
                     'unknown';

    const log = {
      id: 'log_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      ip: Array.isArray(clientIp) ? clientIp[0] : clientIp.toString().replace('::ffff:', ''),
      page: req.body.page || '/',
      referrer: req.body.referrer || '',
      userAgent: req.body.userAgent || req.headers['user-agent'] || '',
      device: req.body.device || 'Unknown',
      browser: req.body.browser || 'Unknown',
      os: req.body.os || 'Unknown',
      screenSize: req.body.screenSize || '',
      language: req.body.language || '',
      sessionId: req.body.sessionId || '',
    };

    const logs = readLogs();
    logs.push(log);
    saveLogs(logs);

    res.json({ success: true, id: log.id });
  } catch (error) {
    console.error('Visitor log error:', error);
    res.status(500).json({ error: 'Failed to save log' });
  }
});

// 로그 조회 API (관리자용)
router.get('/logs', (req, res) => {
  try {
    const logs = readLogs();
    // 최신순 정렬
    logs.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(logs);
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Failed to get logs' });
  }
});

// 로그 삭제 API (관리자용)
router.delete('/logs', (req, res) => {
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify([], null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Delete logs error:', error);
    res.status(500).json({ error: 'Failed to delete logs' });
  }
});

export default router;
