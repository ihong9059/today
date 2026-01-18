/**
 * Device Info Server - Raspberry Pi 5
 * 디바이스 사양 정보 + Cloudflare Tunnel 상태
 */

const express = require('express');
const { exec } = require('child_process');
const os = require('os');

const app = express();
const PORT = 8080;
const http = require('http');

// 서비스 정의
const SERVICES = [
  { name: 'Device Info', port: 8080, description: '시스템 정보 모니터링' },
  { name: 'n8n', port: 5678, description: '워크플로우 자동화 플랫폼' },
  { name: 'SSH', port: 22, description: 'Secure Shell' },
  { name: 'SSH (Alt)', port: 2222, description: 'SSH 대체 포트' },
  { name: 'VNC', port: 5900, description: '원격 데스크톱' }
];

// 포트 체크 (TCP 연결로 확인)
function checkPort(port) {
  return new Promise((resolve) => {
    const socket = require('net').createConnection({ port, host: '127.0.0.1', timeout: 2000 });
    socket.on('connect', () => { socket.destroy(); resolve(true); });
    socket.on('error', () => resolve(false));
    socket.on('timeout', () => { socket.destroy(); resolve(false); });
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

// 명령어 실행 Promise 래퍼
function execPromise(cmd) {
  return new Promise((resolve) => {
    exec(cmd, { timeout: 5000 }, (error, stdout) => {
      resolve(stdout?.trim() || 'N/A');
    });
  });
}

// 시스템 정보 수집
async function getSystemInfo() {
  const [model, cpuInfo, memTotal, memAvail, diskInfo, kernel, uptime, temp, nodeVersion, hostname] = await Promise.all([
    execPromise('cat /proc/device-tree/model 2>/dev/null'),
    execPromise('lscpu | grep "Model name" | head -1'),
    execPromise('cat /proc/meminfo | grep MemTotal'),
    execPromise('cat /proc/meminfo | grep MemAvailable'),
    execPromise('df -h / | tail -1'),
    execPromise('uname -r'),
    execPromise('uptime -p'),
    execPromise('cat /sys/class/thermal/thermal_zone0/temp 2>/dev/null'),
    execPromise('node --version'),
    execPromise('hostname')
  ]);

  const cpuCores = os.cpus().length;
  const totalMemKB = parseInt(memTotal.match(/(\d+)/)?.[1] || 0);
  const availMemKB = parseInt(memAvail.match(/(\d+)/)?.[1] || 0);
  const usedPercent = ((1 - availMemKB / totalMemKB) * 100).toFixed(1);

  const diskParts = diskInfo.split(/\s+/);
  const tempC = temp !== 'N/A' ? (parseInt(temp) / 1000).toFixed(1) : 'N/A';

  // 네트워크 IP
  const interfaces = os.networkInterfaces();
  let ip = '192.168.1.8';
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ip = iface.address;
        break;
      }
    }
  }

  return {
    device: {
      model: model.replace(/\0/g, '') || 'Raspberry Pi 5',
      hostname: hostname || 'uttec',
      kernel
    },
    cpu: {
      model: cpuInfo.replace('Model name:', '').trim() || 'ARM Cortex-A76',
      cores: cpuCores,
      architecture: os.arch(),
      temperature: tempC + ' C'
    },
    memory: {
      total: (totalMemKB / 1024 / 1024).toFixed(2) + ' GB',
      available: (availMemKB / 1024 / 1024).toFixed(2) + ' GB',
      usedPercent: usedPercent + '%'
    },
    storage: {
      total: diskParts[1] || 'N/A',
      used: diskParts[2] || 'N/A',
      available: diskParts[3] || 'N/A',
      usePercent: diskParts[4] || 'N/A'
    },
    system: {
      platform: os.platform(),
      nodeVersion,
      uptime
    },
    network: { ip, sshPort: 22 }
  };
}

// 메인 페이지
app.get('/', async (req, res) => {
  const [info, services] = await Promise.all([getSystemInfo(), getServicesStatus()]);
  const runningCount = services.filter(s => s.running).length;
  const tempValue = parseFloat(info.cpu.temperature);
  const tempClass = tempValue < 50 ? 'temp-value' : tempValue < 70 ? 'temp-warn' : 'temp-hot';

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${info.device.model} - 시스템 정보</title>
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
      background: linear-gradient(90deg, #c2185b, #e91e63);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .header .model { font-size: 1.2em; color: #888; }
    .raspberry-icon { font-size: 60px; margin-bottom: 15px; }
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
      color: #c2185b;
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
      background: #c2185b;
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
    .temp-value { color: #4ade80; }
    .temp-warn { color: #fbbf24; }
    .temp-hot { color: #ef4444; }
    .progress-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      margin-top: 10px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #c2185b, #e91e63);
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
      color: #c2185b;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .service-list { display: flex; flex-direction: column; gap: 12px; }
    .tunnels {
      margin-top: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
    }
    .tunnels-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .tunnels h3 {
      color: #c2185b;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .tunnel-list { display: flex; flex-direction: column; gap: 12px; }
    .tunnel-item {
      background: rgba(0,0,0,0.2);
      padding: 15px 20px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .tunnel-status {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 10px #4ade80;
    }
    .tunnel-info { flex: 1; }
    .tunnel-name { font-weight: 600; margin-bottom: 3px; }
    .tunnel-detail { font-size: 0.85em; color: #888; }
    .tunnel-badge {
      background: rgba(194, 24, 91, 0.3);
      color: #e91e63;
      padding: 5px 12px;
      border-radius: 5px;
      font-family: monospace;
      font-size: 0.9em;
    }
    .connection-info {
      margin-top: 30px;
      background: rgba(255,255,255,0.05);
      border-radius: 16px;
      padding: 25px;
    }
    .connection-info h3 {
      color: #c2185b;
      margin-bottom: 20px;
      font-size: 1.1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .command {
      background: #0d1117;
      padding: 12px 15px;
      border-radius: 8px;
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 0.9em;
      margin: 8px 0;
      overflow-x: auto;
      border-left: 3px solid #c2185b;
    }
    .command-label {
      color: #888;
      font-size: 0.85em;
      margin-bottom: 5px;
    }
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
      background: linear-gradient(135deg, #c2185b, #e91e63);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 5px 20px rgba(194,24,91,0.4);
      transition: transform 0.3s;
    }
    .refresh-btn:hover { transform: scale(1.1) rotate(180deg); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="raspberry-icon">&#127827;</div>
      <h1>${info.device.model}</h1>
      <p class="model">${info.device.hostname} | Kernel ${info.device.kernel}</p>
    </div>

    <div class="cards">
      <div class="card">
        <div class="card-title">CPU</div>
        <div class="info-row">
          <span class="info-label">모델</span>
          <span class="info-value">${info.cpu.model}</span>
        </div>
        <div class="info-row">
          <span class="info-label">코어</span>
          <span class="info-value">${info.cpu.cores} Cores</span>
        </div>
        <div class="info-row">
          <span class="info-label">아키텍처</span>
          <span class="info-value">${info.cpu.architecture}</span>
        </div>
        <div class="info-row">
          <span class="info-label">온도</span>
          <span class="info-value ${tempClass}">${info.cpu.temperature}</span>
        </div>
      </div>

      <div class="card">
        <div class="card-title">메모리</div>
        <div class="info-row">
          <span class="info-label">전체</span>
          <span class="info-value">${info.memory.total}</span>
        </div>
        <div class="info-row">
          <span class="info-label">사용 가능</span>
          <span class="info-value">${info.memory.available}</span>
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
          <span class="info-label">전체</span>
          <span class="info-value">${info.storage.total}</span>
        </div>
        <div class="info-row">
          <span class="info-label">사용 / 사용 가능</span>
          <span class="info-value">${info.storage.used} / ${info.storage.available}</span>
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
        <div class="info-row">
          <span class="info-label">Uptime</span>
          <span class="info-value">${info.system.uptime}</span>
        </div>
      </div>
    </div>

    <div class="services">
      <div class="services-header">
        <h3>서비스 상태</h3>
        <span class="status-badge" style="background: ${runningCount === services.length ? '#4ade80' : runningCount > 0 ? '#fbbf24' : '#ef4444'}; color: #000; padding: 5px 15px; border-radius: 20px; font-size: 0.85em; font-weight: 600;">${runningCount}/${services.length} 실행 중</span>
      </div>
      <div class="service-list">
        ${services.map(s => `
        <div class="tunnel-item">
          <div class="tunnel-status" style="background: ${s.running ? '#4ade80' : '#ef4444'}; box-shadow: 0 0 10px ${s.running ? '#4ade80' : '#ef4444'};"></div>
          <div class="tunnel-info">
            <div class="tunnel-name">${s.name}</div>
            <div class="tunnel-detail">${s.description}</div>
          </div>
          <span class="tunnel-badge">:${s.port}</span>
        </div>
        `).join('')}
      </div>
    </div>

    <div class="tunnels">
      <div class="tunnels-header">
        <h3>Cloudflare Tunnel 상태</h3>
      </div>
      <div class="tunnel-list">
        <div class="tunnel-item">
          <div class="tunnel-status"></div>
          <div class="tunnel-info">
            <div class="tunnel-name">SSH Tunnel</div>
            <div class="tunnel-detail">example-atmospheric-week-involved.trycloudflare.com</div>
          </div>
          <span class="tunnel-badge">TCP :22</span>
        </div>
        <div class="tunnel-item">
          <div class="tunnel-status"></div>
          <div class="tunnel-info">
            <div class="tunnel-name">Web Tunnel</div>
            <div class="tunnel-detail">began-yale-leeds-happiness.trycloudflare.com</div>
          </div>
          <span class="tunnel-badge">HTTP :8080</span>
        </div>
      </div>
    </div>

    <div class="connection-info">
      <h3>외부 접속 방법</h3>

      <div class="command-label">SSH 접속 (Windows에서):</div>
      <div class="command">"C:\\todo\\today\\cloudflared.exe" access tcp --hostname example-atmospheric-week-involved.trycloudflare.com --url localhost:2222</div>
      <div class="command">ssh -p 2222 uttec@localhost</div>

      <div class="command-label" style="margin-top: 20px;">웹 접속:</div>
      <div class="command">https://see-domain-fleet-refine.trycloudflare.com</div>
    </div>

    <div class="footer">
      마지막 업데이트: ${new Date().toLocaleString('ko-KR')} |
      Node.js ${info.system.nodeVersion} |
      <a href="/api/info" style="color: #c2185b;">API</a>
    </div>
  </div>

  <button class="refresh-btn" onclick="location.reload()">&#8635;</button>

  <script>
    setTimeout(() => location.reload(), 30000);
  </script>
</body>
</html>`;

  res.send(html);
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
  console.log('Raspberry Pi 5 Device Info Server running on port ' + PORT);
});
