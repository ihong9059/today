/**
 * Windows PC - Device Info Server
 * 시스템 정보 및 서비스 상태 모니터링
 * Port: 8080
 */

const http = require('http');
const os = require('os');
const { exec } = require('child_process');

const PORT = 8080;

// Windows PC 서비스 목록
const SERVICES = [
  { name: 'SensorMonitor', port: 5000, description: '센서 모니터링' },
  { name: 'cert-guide', port: 4000, description: '자격시험 가이드' },
  { name: 'edu-platform Frontend', port: 3001, description: '교육 플랫폼 프론트엔드' },
  { name: 'edu-platform Backend', port: 3000, description: '교육 플랫폼 백엔드' },
  { name: 'Device Info', port: 8080, description: '시스템 정보 (현재 페이지)' }
];

// 포트 체크 함수
function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request({
      host: '127.0.0.1',
      port: port,
      method: 'GET',
      path: '/',
      timeout: 5000
    }, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

// Windows 시스템 정보 가져오기
function getWindowsInfo() {
  return new Promise((resolve) => {
    const info = {
      computerName: os.hostname(),
      osVersion: '',
      cpu: '',
      cpuCores: os.cpus().length,
      totalMemory: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1) + ' GB',
      freeMemory: (os.freemem() / (1024 * 1024 * 1024)).toFixed(1) + ' GB',
      uptime: Math.floor(os.uptime() / 3600) + '시간 ' + Math.floor((os.uptime() % 3600) / 60) + '분',
      nodeVersion: process.version,
      platform: os.platform(),
      arch: os.arch()
    };

    // CPU 모델
    if (os.cpus().length > 0) {
      info.cpu = os.cpus()[0].model;
    }

    // Windows 버전 정보
    exec('ver', (err, stdout) => {
      if (!err && stdout) {
        info.osVersion = stdout.trim();
      } else {
        info.osVersion = os.type() + ' ' + os.release();
      }
      resolve(info);
    });
  });
}

// 네트워크 정보
function getNetworkInfo() {
  const interfaces = os.networkInterfaces();
  const result = [];
  for (const [name, addrs] of Object.entries(interfaces)) {
    for (const addr of addrs) {
      if (addr.family === 'IPv4' && !addr.internal) {
        result.push({ name, ip: addr.address });
      }
    }
  }
  return result;
}

// HTML 페이지 생성
async function generateHTML() {
  const sysInfo = await getWindowsInfo();
  const networkInfo = getNetworkInfo();

  // 서비스 상태 체크 (포트 8080은 자기 자신이므로 항상 Running)
  const serviceStatuses = await Promise.all(
    SERVICES.map(async (service) => {
      const isRunning = service.port === PORT ? true : await checkPort(service.port);
      return { ...service, isRunning };
    })
  );

  const localIP = networkInfo.length > 0 ? networkInfo[0].ip : 'localhost';

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="30">
  <title>Windows PC - 시스템 정보</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      color: #fff;
      min-height: 100vh;
      padding: 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 2em;
      text-shadow: 0 2px 10px rgba(0,150,255,0.5);
    }
    h1 .icon { font-size: 1.2em; margin-right: 10px; }
    .card {
      background: rgba(255,255,255,0.1);
      border-radius: 15px;
      padding: 20px;
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .card h2 {
      color: #4fc3f7;
      margin-bottom: 15px;
      font-size: 1.2em;
      border-bottom: 1px solid rgba(255,255,255,0.2);
      padding-bottom: 10px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    .info-item {
      background: rgba(0,0,0,0.2);
      padding: 15px;
      border-radius: 10px;
    }
    .info-item .label {
      color: #81d4fa;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
    .info-item .value {
      font-size: 1.1em;
      font-weight: 500;
    }
    .service-list { list-style: none; }
    .service-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background: rgba(0,0,0,0.2);
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .service-info { flex: 1; }
    .service-name { font-weight: 600; }
    .service-desc { font-size: 0.85em; color: #aaa; }
    .service-status {
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
    }
    .status-running {
      background: rgba(76, 175, 80, 0.3);
      color: #81c784;
      border: 1px solid #81c784;
    }
    .status-stopped {
      background: rgba(244, 67, 54, 0.3);
      color: #e57373;
      border: 1px solid #e57373;
    }
    .service-link {
      color: #4fc3f7;
      text-decoration: none;
      margin-left: 15px;
      font-size: 0.9em;
    }
    .service-link:hover { text-decoration: underline; }
    .network-item {
      display: inline-block;
      background: rgba(0,0,0,0.3);
      padding: 8px 15px;
      border-radius: 20px;
      margin: 5px;
      font-size: 0.9em;
    }
    .timestamp {
      text-align: center;
      color: #888;
      font-size: 0.85em;
      margin-top: 20px;
    }
    .guide-section {
      background: rgba(255,193,7,0.1);
      border: 1px solid rgba(255,193,7,0.3);
      border-radius: 10px;
      padding: 15px;
      margin-top: 15px;
    }
    .guide-section h3 {
      color: #ffd54f;
      margin-bottom: 10px;
      font-size: 1em;
    }
    .guide-section code {
      background: rgba(0,0,0,0.3);
      padding: 2px 8px;
      border-radius: 4px;
      font-family: 'Consolas', monospace;
      font-size: 0.9em;
    }
    .guide-section ul {
      list-style: none;
      margin-top: 10px;
    }
    .guide-section li {
      padding: 5px 0;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1><span class="icon">💻</span>Windows PC 시스템 정보</h1>

    <div class="card">
      <h2>🖥️ 시스템 사양</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="label">컴퓨터 이름</div>
          <div class="value">${sysInfo.computerName}</div>
        </div>
        <div class="info-item">
          <div class="label">운영체제</div>
          <div class="value">${sysInfo.osVersion}</div>
        </div>
        <div class="info-item">
          <div class="label">CPU</div>
          <div class="value">${sysInfo.cpu}</div>
        </div>
        <div class="info-item">
          <div class="label">CPU 코어</div>
          <div class="value">${sysInfo.cpuCores} cores</div>
        </div>
        <div class="info-item">
          <div class="label">전체 메모리</div>
          <div class="value">${sysInfo.totalMemory}</div>
        </div>
        <div class="info-item">
          <div class="label">사용 가능 메모리</div>
          <div class="value">${sysInfo.freeMemory}</div>
        </div>
        <div class="info-item">
          <div class="label">시스템 가동 시간</div>
          <div class="value">${sysInfo.uptime}</div>
        </div>
        <div class="info-item">
          <div class="label">Node.js 버전</div>
          <div class="value">${sysInfo.nodeVersion}</div>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>🌐 네트워크</h2>
      <div>
        ${networkInfo.map(n => `<span class="network-item">${n.name}: <strong>${n.ip}</strong></span>`).join('')}
      </div>
    </div>

    <div class="card">
      <h2>🚀 웹 서비스 상태</h2>
      <ul class="service-list">
        ${serviceStatuses.map(s => `
          <li class="service-item">
            <div class="service-info">
              <div class="service-name">${s.name} (포트 ${s.port})</div>
              <div class="service-desc">${s.description}</div>
            </div>
            <span class="service-status ${s.isRunning ? 'status-running' : 'status-stopped'}">
              ${s.isRunning ? '● Running' : '○ Stopped'}
            </span>
            ${s.isRunning && s.port !== 8080 && s.port !== 3000 ? `<a class="service-link" href="http://${localIP}:${s.port}" target="_blank">열기 →</a>` : ''}
          </li>
        `).join('')}
      </ul>

      <div class="guide-section">
        <h3>📋 서버 시작 방법</h3>
        <ul>
          <li><strong>SensorMonitor:</strong> <code>cd webServer/SensorMonitor/server && npm start</code></li>
          <li><strong>cert-guide:</strong> <code>cd webServer/cert-guide && npm run dev -- -p 4000</code></li>
          <li><strong>edu Frontend:</strong> <code>cd webServer/hw-c-edu-platform/frontend && npm run dev -- -p 3001</code></li>
          <li><strong>edu Backend:</strong> <code>cd webServer/hw-c-edu-platform/backend && npm run dev</code></li>
          <li><strong>Device Info:</strong> <code>cd webServer/device-info-pc && node server.js</code></li>
        </ul>
      </div>
    </div>

    <div class="timestamp">
      마지막 업데이트: ${new Date().toLocaleString('ko-KR')} (30초마다 자동 새로고침)
    </div>
  </div>
</body>
</html>`;
}

// HTTP 서버
const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const html = await generateHTML();
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else if (req.url === '/api/status') {
    const statuses = await Promise.all(
      SERVICES.map(async (service) => ({
        ...service,
        isRunning: await checkPort(service.port)
      }))
    );
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(statuses));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`💻 Windows PC Device Info Server`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📊 서비스 상태 API: http://localhost:${PORT}/api/status`);
});
