/**
 * Device Info Server - Lenovo TB310FU
 * 디바이스 사양 정보 + 서비스 상태 모니터링
 */

const express = require('express');
const { exec } = require('child_process');
const os = require('os');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 8080;

// 서비스 정의
const SERVICES = [
  { name: 'SensorMonitor', port: 5000, dir: 'SensorMonitor/server', script: 'server.js' },
  { name: 'cert-guide', port: 4000, dir: 'cert-guide', script: 'static-server.js' },
  { name: 'edu-platform Frontend', port: 3001, dir: 'hw-c-edu-platform/frontend', script: 'static-server.js' },
  { name: 'edu-platform Backend', port: 3000, dir: 'hw-c-edu-platform/backend', script: 'server-lite.js' },
  { name: 'Device Info', port: 8080, dir: 'device-info', script: 'server.js' }
];

// 명령어 실행 Promise 래퍼
function execPromise(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { timeout: 5000 }, (error, stdout) => {
      resolve(stdout?.trim() || 'N/A');
    });
  });
}

// 포트 체크 (HTTP 요청으로 확인)
function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port, method: 'GET', path: '/', timeout: 2000 }, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

// 모든 서비스 상태 확인
async function getServicesStatus() {
  const statuses = await Promise.all(
    SERVICES.map(async (service) => {
      const running = await checkPort(service.port);
      return { ...service, running };
    })
  );
  return statuses;
}

// 시스템 정보 수집
async function getSystemInfo() {
  const [model, brand, androidVersion, kernel, uptime, cpuInfo, memInfo, diskInfo, nodeVersion] = await Promise.all([
    execPromise('getprop ro.product.model'),
    execPromise('getprop ro.product.brand'),
    execPromise('getprop ro.build.version.release'),
    execPromise('uname -r'),
    execPromise('uptime -p 2>/dev/null || uptime'),
    execPromise('cat /proc/cpuinfo | grep -c processor'),
    execPromise('cat /proc/meminfo | head -3'),
    execPromise('df -h /data 2>/dev/null | tail -1'),
    execPromise('node --version')
  ]);

  const memLines = memInfo.split('\n');
  const totalMem = memLines[0]?.match(/(\d+)/)?.[1] || 0;
  const freeMem = memLines[1]?.match(/(\d+)/)?.[1] || 0;
  const availMem = memLines[2]?.match(/(\d+)/)?.[1] || 0;

  const diskParts = diskInfo.split(/\s+/);

  return {
    device: { model: model || 'TB310FU', brand: brand || 'Lenovo', androidVersion: androidVersion || '13', kernel },
    cpu: { cores: parseInt(cpuInfo) || 8, architecture: 'ARM64 (aarch64)', features: 'AES, SHA1, SHA2, CRC32' },
    memory: {
      total: (parseInt(totalMem) / 1024 / 1024).toFixed(2) + ' GB',
      available: (parseInt(availMem) / 1024 / 1024).toFixed(2) + ' GB',
      usedPercent: (100 - (parseInt(availMem) / parseInt(totalMem) * 100)).toFixed(1) + '%'
    },
    storage: { total: diskParts[1] || 'N/A', used: diskParts[2] || 'N/A', available: diskParts[3] || 'N/A', usePercent: diskParts[4] || 'N/A' },
    system: { platform: 'Android (Termux)', nodeVersion, uptime },
    network: { ip: '192.168.0.31', sshPort: 8022 }
  };
}

// 메인 페이지
app.get('/', async (req, res) => {
  const [info, services] = await Promise.all([getSystemInfo(), getServicesStatus()]);
  const runningCount = services.filter(s => s.running).length;

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.device.brand} ${info.device.model} - 시스템 정보</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      min-height: 100vh;
      color: #fff;
      padding: 20px;
    }
    .container { max-width: 1000px; margin: 0 auto; }
    .header {
      text-align: center;
      padding: 30px 0;
      border-bottom: 2px solid rgba(255,255,255,0.1);
      margin-bottom: 30px;
    }
    .header h1 {
      font-size: 2.5em;
      background: linear-gradient(90deg, #e94560, #ff6b6b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .header .model { font-size: 1.2em; color: #888; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .card-title {
      font-size: 0.9em;
      color: #e94560;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .card-title::before {
      content: '';
      width: 30px;
      height: 3px;
      background: #e94560;
      border-radius: 2px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #888; }
    .info-value { color: #fff; font-weight: 500; }
    .progress-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      margin-top: 10px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #e94560, #ff6b6b);
      border-radius: 4px;
    }
    .services {
      margin-top: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
    }
    .services-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .services h3 {
      color: #e94560;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .status-badge {
      background: ${runningCount === services.length ? '#4ade80' : runningCount > 0 ? '#fbbf24' : '#ef4444'};
      color: #000;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
    }
    .service-list { display: flex; flex-direction: column; gap: 12px; }
    .service-item {
      background: rgba(0,0,0,0.2);
      padding: 15px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
      transition: transform 0.2s;
    }
    .service-item:hover { transform: translateX(5px); }
    .service-status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .status-running { background: #4ade80; box-shadow: 0 0 10px #4ade80; }
    .status-stopped { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
    .service-info { flex: 1; }
    .service-name { font-weight: 600; margin-bottom: 3px; }
    .service-detail { font-size: 0.85em; color: #888; }
    .service-port {
      background: rgba(255,255,255,0.1);
      padding: 5px 12px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 0.9em;
    }
    .service-link {
      color: #e94560;
      text-decoration: none;
      padding: 5px 12px;
      border: 1px solid #e94560;
      border-radius: 5px;
      font-size: 0.85em;
      transition: all 0.2s;
    }
    .service-link:hover { background: #e94560; color: #fff; }
    .service-link.disabled { opacity: 0.3; pointer-events: none; }

    .howto {
      margin-top: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
    }
    .howto h3 {
      color: #e94560;
      margin-bottom: 20px;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .howto-section {
      background: rgba(0,0,0,0.3);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 15px;
    }
    .howto-section:last-child { margin-bottom: 0; }
    .howto-section h4 {
      color: #4ade80;
      margin-bottom: 15px;
      font-size: 1em;
    }
    .command {
      background: #0d1117;
      padding: 12px 15px;
      border-radius: 8px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9em;
      margin: 8px 0;
      overflow-x: auto;
      border-left: 3px solid #e94560;
    }
    .command-label {
      color: #888;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
    .tip {
      background: rgba(233, 69, 96, 0.1);
      border: 1px solid rgba(233, 69, 96, 0.3);
      padding: 15px;
      border-radius: 8px;
      margin-top: 15px;
      font-size: 0.9em;
    }
    .tip-icon { color: #e94560; margin-right: 8px; }

    .footer {
      text-align: center;
      margin-top: 30px;
      padding: 20px;
      color: #666;
      font-size: 0.9em;
    }
    .refresh-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #e94560, #ff6b6b);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(233,69,96,0.4);
      transition: transform 0.3s;
    }
    .refresh-btn:hover { transform: scale(1.1) rotate(180deg); }

    @media (max-width: 600px) {
      .service-item { flex-wrap: wrap; }
      .service-link { margin-top: 10px; width: 100%; text-align: center; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${info.device.brand} ${info.device.model}</h1>
      <p class="model">Android ${info.device.androidVersion} | Kernel ${info.device.kernel}</p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-title">CPU</div>
        <div class="info-row">
          <span class="info-label">코어</span>
          <span class="info-value">${info.cpu.cores} Cores</span>
        </div>
        <div class="info-row">
          <span class="info-label">아키텍처</span>
          <span class="info-value">${info.cpu.architecture}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">메모리</div>
        <div class="info-row">
          <span class="info-label">전체</span>
          <span class="info-value">${info.memory.total}</span>
        </div>
        <div class="info-row">
          <span class="info-label">사용률</span>
          <span class="info-value">${info.memory.usedPercent}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${info.memory.usedPercent}"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">저장소</div>
        <div class="info-row">
          <span class="info-label">전체 / 사용</span>
          <span class="info-value">${info.storage.total} / ${info.storage.used}</span>
        </div>
        <div class="info-row">
          <span class="info-label">사용률</span>
          <span class="info-value">${info.storage.usePercent}</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${info.storage.usePercent}"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-title">네트워크</div>
        <div class="info-row">
          <span class="info-label">IP 주소</span>
          <span class="info-value">${info.network.ip}</span>
        </div>
        <div class="info-row">
          <span class="info-label">SSH 포트</span>
          <span class="info-value">${info.network.sshPort}</span>
        </div>
      </div>
    </div>

    <div class="services">
      <div class="services-header">
        <h3>서비스 상태</h3>
        <span class="status-badge">${runningCount}/${services.length} 실행 중</span>
      </div>
      <div class="service-list">
        ${services.map(s => `
        <div class="service-item">
          <div class="service-status ${s.running ? 'status-running' : 'status-stopped'}"></div>
          <div class="service-info">
            <div class="service-name">${s.name}</div>
            <div class="service-detail">${s.dir}/${s.script}</div>
          </div>
          <span class="service-port">:${s.port}</span>
          <a href="http://${info.network.ip}:${s.port}" target="_blank" class="service-link ${s.running ? '' : 'disabled'}">
            ${s.running ? '열기' : '중지됨'}
          </a>
        </div>
        `).join('')}
      </div>
    </div>

    <div class="howto">
      <h3>서버 시작 방법</h3>

      <div class="howto-section">
        <h4>1. SSH로 Lenovo 태블릿에 접속</h4>
        <div class="command-label">Windows/Mac/Linux에서:</div>
        <div class="command">ssh -p 8022 192.168.0.31</div>
      </div>

      <div class="howto-section">
        <h4>2. 개별 서버 시작</h4>
        ${services.filter(s => s.port !== 8080).map(s => `
        <div class="command-label">${s.name} (포트 ${s.port}):</div>
        <div class="command">cd ~/webServer/${s.dir} && nohup node ${s.script} > server.log 2>&1 &</div>
        `).join('')}
      </div>

      <div class="howto-section">
        <h4>3. 모든 서버 한번에 시작</h4>
        <div class="command-label">start-all.sh 스크립트 실행:</div>
        <div class="command">cd ~/webServer && ./start-all.sh</div>
      </div>

      <div class="howto-section">
        <h4>4. 서버 중지</h4>
        <div class="command-label">모든 Node.js 서버 중지:</div>
        <div class="command">killall node</div>
        <div class="command-label">특정 포트의 서버만 중지:</div>
        <div class="command">kill $(lsof -t -i:포트번호)</div>
      </div>

      <div class="tip">
        <span class="tip-icon">💡</span>
        <strong>팁:</strong> Termux 앱이 백그라운드에서 종료되면 서버도 함께 중지됩니다.
        Termux:Boot 앱을 설치하면 부팅 시 자동으로 서버를 시작할 수 있습니다.
      </div>
    </div>

    <div class="footer">
      마지막 업데이트: ${new Date().toLocaleString('ko-KR')} |
      <a href="/api/services" style="color: #e94560;">API</a>
    </div>
  </div>

  <button class="refresh-btn" onclick="location.reload()">↻</button>

  <script>
    // 30초마다 자동 새로고침
    setTimeout(() => location.reload(), 30000);
  </script>
</body>
</html>`;

  res.send(html);
});

// API: 서비스 상태
app.get('/api/services', async (req, res) => {
  const services = await getServicesStatus();
  res.json({ services, timestamp: new Date().toISOString() });
});

// API: 시스템 정보
app.get('/api/info', async (req, res) => {
  const info = await getSystemInfo();
  res.json(info);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📱 Device Info Server running on port ${PORT}`);
  console.log(`🌐 http://0.0.0.0:${PORT}`);
});
