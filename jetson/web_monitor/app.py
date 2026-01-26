#!/usr/bin/env python3
"""
Jetson Nano 시스템 모니터링 웹 서버

포트: 5000
사용법: python3 app.py
"""

import os
import subprocess
from flask import Flask, render_template_string

app = Flask(__name__)

# 이 프로그램의 위치
PROGRAM_PATH = os.path.abspath(__file__)
PROGRAM_DIR = os.path.dirname(PROGRAM_PATH)

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="5">
    <title>Jetson Nano 시스템 모니터</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        h1 {
            text-align: center;
            color: #00d9ff;
            margin-bottom: 30px;
            font-size: 2rem;
            text-shadow: 0 0 10px rgba(0,217,255,0.5);
        }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        }
        .card h2 {
            color: #76ff03;
            margin-bottom: 15px;
            font-size: 1.3rem;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            padding-bottom: 10px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .info-item {
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 10px;
        }
        .info-label {
            color: #aaa;
            font-size: 0.85rem;
            margin-bottom: 5px;
        }
        .info-value {
            color: #fff;
            font-size: 1.2rem;
            font-weight: bold;
        }
        .progress-bar {
            height: 8px;
            background: rgba(255,255,255,0.2);
            border-radius: 4px;
            margin-top: 8px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s;
        }
        .progress-green { background: linear-gradient(90deg, #76ff03, #00e676); }
        .progress-yellow { background: linear-gradient(90deg, #ffeb3b, #ff9800); }
        .progress-red { background: linear-gradient(90deg, #ff5722, #f44336); }
        pre {
            background: rgba(0,0,0,0.4);
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        code { color: #00d9ff; }
        .ssh-box {
            background: rgba(0,100,0,0.3);
            padding: 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 1.1rem;
        }
        .status-ok { color: #76ff03; }
        .status-warn { color: #ffeb3b; }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 0.85rem;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        th { color: #00d9ff; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🖥️ Jetson Nano 시스템 모니터</h1>

        <!-- SSH 접속 정보 -->
        <div class="card">
            <h2>🔐 SSH 접속 정보</h2>
            <div class="ssh-box">
                <code>ssh uttec@{{ hostname }}</code>
            </div>
            <p style="margin-top: 10px; color: #aaa;">비밀번호: uttec</p>
        </div>

        <!-- CPU 정보 -->
        <div class="card">
            <h2>⚡ CPU 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">CPU 사용률</div>
                    <div class="info-value">{{ cpu_percent }}%</div>
                    <div class="progress-bar">
                        <div class="progress-fill {% if cpu_percent < 50 %}progress-green{% elif cpu_percent < 80 %}progress-yellow{% else %}progress-red{% endif %}"
                             style="width: {{ cpu_percent }}%"></div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">CPU 코어</div>
                    <div class="info-value">{{ cpu_cores }}개</div>
                </div>
                <div class="info-item">
                    <div class="info-label">CPU 온도</div>
                    <div class="info-value">{{ cpu_temp }}°C</div>
                </div>
                <div class="info-item">
                    <div class="info-label">부하 평균</div>
                    <div class="info-value">{{ load_avg }}</div>
                </div>
            </div>
        </div>

        <!-- 메모리 정보 -->
        <div class="card">
            <h2>🧠 메모리 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">사용 중</div>
                    <div class="info-value">{{ mem_used }} / {{ mem_total }}</div>
                    <div class="progress-bar">
                        <div class="progress-fill {% if mem_percent < 50 %}progress-green{% elif mem_percent < 80 %}progress-yellow{% else %}progress-red{% endif %}"
                             style="width: {{ mem_percent }}%"></div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">사용률</div>
                    <div class="info-value">{{ mem_percent }}%</div>
                </div>
            </div>
        </div>

        <!-- 디스크 정보 -->
        <div class="card">
            <h2>💾 디스크 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">사용 중</div>
                    <div class="info-value">{{ disk_used }} / {{ disk_total }}</div>
                    <div class="progress-bar">
                        <div class="progress-fill {% if disk_percent < 50 %}progress-green{% elif disk_percent < 80 %}progress-yellow{% else %}progress-red{% endif %}"
                             style="width: {{ disk_percent }}%"></div>
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">사용률</div>
                    <div class="info-value">{{ disk_percent }}%</div>
                </div>
            </div>
        </div>

        <!-- GPU 정보 -->
        <div class="card">
            <h2>🎮 GPU 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">GPU 모델</div>
                    <div class="info-value">{{ gpu_model }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">GPU 온도</div>
                    <div class="info-value">{{ gpu_temp }}°C</div>
                </div>
            </div>
        </div>

        <!-- USB 외장 스토리지 -->
        <div class="card">
            <h2>🔌 USB 외장 스토리지</h2>
            {% if usb_storages %}
            {% for usb in usb_storages %}
            <div class="info-item" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div>
                        <span style="color: #00d9ff; font-weight: bold;">{{ usb.model }}</span>
                        <span style="color: #888; font-size: 0.9rem;"> ({{ usb.device }})</span>
                    </div>
                    <span style="color: #76ff03;">{{ usb.size }}</span>
                </div>
                <table style="width: 100%; font-size: 0.9rem;">
                    <tr>
                        <td style="color: #aaa; width: 100px;">마운트</td>
                        <td><code>{{ usb.mount }}</code></td>
                    </tr>
                    <tr>
                        <td style="color: #aaa;">파일시스템</td>
                        <td>{{ usb.fstype }}</td>
                    </tr>
                    <tr>
                        <td style="color: #aaa;">사용량</td>
                        <td>{{ usb.used }} / {{ usb.total }} ({{ usb.percent }}%)</td>
                    </tr>
                    <tr>
                        <td style="color: #aaa;">용도</td>
                        <td style="color: #ffeb3b;">{{ usb.purpose }}</td>
                    </tr>
                </table>
                <div class="progress-bar" style="margin-top: 10px;">
                    <div class="progress-fill {% if usb.percent < 50 %}progress-green{% elif usb.percent < 80 %}progress-yellow{% else %}progress-red{% endif %}"
                         style="width: {{ usb.percent }}%"></div>
                </div>
            </div>
            {% endfor %}
            {% else %}
            <p style="color: #aaa;">연결된 USB 외장 스토리지가 없습니다.</p>
            {% endif %}
        </div>

        <!-- 네트워크 서비스 -->
        <div class="card">
            <h2>🌐 현재 실행 중인 웹 서비스</h2>
            {% if services %}
            <table>
                <tr>
                    <th>프로토콜</th>
                    <th>로컬 주소</th>
                    <th>포트</th>
                    <th>상태</th>
                </tr>
                {% for svc in services %}
                <tr>
                    <td>{{ svc.proto }}</td>
                    <td>{{ svc.addr }}</td>
                    <td>{{ svc.port }}</td>
                    <td class="status-ok">{{ svc.status }}</td>
                </tr>
                {% endfor %}
            </table>
            {% else %}
            <p style="color: #aaa;">현재 실행 중인 웹 서비스가 없습니다.</p>
            {% endif %}
        </div>

        <!-- 프로그램 위치 -->
        <div class="card">
            <h2>📁 이 프로그램 위치</h2>
            <pre><code>{{ program_path }}</code></pre>
        </div>

        <div class="footer">
            <p>자동 새로고침: 5초 | Jetson Nano System Monitor</p>
            <p>{{ hostname }} - {{ ip_addr }}</p>
        </div>
    </div>
</body>
</html>
"""

def run_cmd(cmd):
    """명령어 실행 및 결과 반환 (Python 3.6 호환)"""
    try:
        proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, _ = proc.communicate(timeout=5)
        return stdout.decode().strip()
    except:
        return "N/A"

def get_cpu_percent():
    """CPU 사용률"""
    try:
        output = run_cmd("top -bn1 | grep 'Cpu(s)' | awk '{print $2}'")
        return float(output.replace(',', '.'))
    except:
        return 0.0

def get_cpu_cores():
    """CPU 코어 수"""
    try:
        return int(run_cmd("nproc"))
    except:
        return 4

def get_cpu_temp():
    """CPU 온도"""
    try:
        with open('/sys/devices/virtual/thermal/thermal_zone0/temp') as f:
            return round(int(f.read().strip()) / 1000, 1)
    except:
        return 0.0

def get_load_avg():
    """시스템 부하"""
    try:
        with open('/proc/loadavg') as f:
            parts = f.read().split()
            return f"{parts[0]} {parts[1]} {parts[2]}"
    except:
        return "N/A"

def get_memory_info():
    """메모리 정보"""
    def format_bytes(b):
        for unit in ['B', 'KB', 'MB', 'GB']:
            if b < 1024:
                return f"{b:.1f} {unit}"
            b /= 1024
        return f"{b:.1f} TB"

    try:
        with open('/proc/meminfo') as f:
            meminfo = {}
            for line in f:
                parts = line.split()
                if len(parts) >= 2:
                    key = parts[0].rstrip(':')
                    val = int(parts[1]) * 1024  # kB to bytes
                    meminfo[key] = val

        total = meminfo.get('MemTotal', 0)
        free = meminfo.get('MemFree', 0)
        buffers = meminfo.get('Buffers', 0)
        cached = meminfo.get('Cached', 0)
        used = total - free - buffers - cached
        percent = round(used / total * 100, 1) if total > 0 else 0

        return {
            'total': format_bytes(total),
            'used': format_bytes(used),
            'percent': percent
        }
    except:
        return {'total': 'N/A', 'used': 'N/A', 'percent': 0}

def get_disk_info():
    """디스크 정보"""
    def format_bytes(b):
        for unit in ['B', 'KB', 'MB', 'GB']:
            if b < 1024:
                return f"{b:.1f} {unit}"
            b /= 1024
        return f"{b:.1f} TB"

    try:
        import os
        stat = os.statvfs('/')
        total = stat.f_blocks * stat.f_frsize
        free = stat.f_bfree * stat.f_frsize
        used = total - free
        percent = round(used / total * 100, 1) if total > 0 else 0

        return {
            'total': format_bytes(total),
            'used': format_bytes(used),
            'percent': percent
        }
    except:
        return {'total': 'N/A', 'used': 'N/A', 'percent': 0}

def get_gpu_info():
    """GPU 정보"""
    try:
        with open('/sys/devices/virtual/thermal/thermal_zone1/temp') as f:
            gpu_temp = round(int(f.read().strip()) / 1000, 1)
    except:
        gpu_temp = 0.0

    return {
        'model': 'NVIDIA Maxwell (128 CUDA cores)',
        'temp': gpu_temp
    }

def get_hostname():
    """호스트명"""
    try:
        import socket
        return socket.gethostname()
    except:
        return "jetson"

def get_ip_addr():
    """IP 주소"""
    try:
        import socket
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "192.168.1.11"

def get_network_services():
    """네트워크 서비스 목록"""
    services = []
    try:
        output = run_cmd("netstat -tlnp 2>/dev/null | grep LISTEN")
        for line in output.split('\n'):
            if line:
                parts = line.split()
                if len(parts) >= 4:
                    proto = parts[0]
                    local_addr = parts[3]
                    if ':' in local_addr:
                        addr, port = local_addr.rsplit(':', 1)
                        services.append({
                            'proto': proto,
                            'addr': addr if addr else '0.0.0.0',
                            'port': port,
                            'status': 'LISTEN'
                        })
    except:
        pass
    return services

def get_usb_storage_info():
    """USB 외장 스토리지 정보"""
    import re

    def format_bytes(b):
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if b < 1024:
                return f"{b:.1f} {unit}"
            b /= 1024
        return f"{b:.1f} PB"

    def get_purpose(mount_point):
        """마운트 포인트에 따른 용도 설명"""
        if mount_point == '/home':
            return '사용자 홈 디렉토리 (사용자 데이터, 설정 파일, 프로젝트)'
        elif mount_point == '/':
            return '시스템 루트 (OS, 시스템 파일)'
        elif 'HOME' in mount_point.upper():
            return '백업/추가 데이터 스토리지'
        elif 'data' in mount_point.lower():
            return '데이터 저장소'
        elif 'media' in mount_point.lower():
            return '외장 미디어 스토리지'
        elif 'mnt' in mount_point.lower():
            return '수동 마운트 스토리지'
        else:
            return '일반 스토리지'

    storages = []
    disk_models = {}  # 디스크별 모델명 저장

    try:
        # lsblk로 디스크 정보 가져오기
        output = run_cmd("/bin/lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,FSTYPE,MODEL -P 2>/dev/null")

        # 먼저 디스크 모델명 수집
        for line in output.split('\n'):
            if not line.strip():
                continue
            # 정규식으로 파싱: KEY="VALUE" 패턴
            info = dict(re.findall(r'(\w+)="([^"]*)"', line))

            name = info.get('NAME', '')
            model = info.get('MODEL', '').strip()
            dev_type = info.get('TYPE', '')

            if dev_type == 'disk' and name.startswith('sd') and model:
                disk_models[name] = model

        # 파티션 정보 수집
        for line in output.split('\n'):
            if not line.strip():
                continue

            info = dict(re.findall(r'(\w+)="([^"]*)"', line))

            name = info.get('NAME', '')
            mount = info.get('MOUNTPOINT', '')
            fstype = info.get('FSTYPE', '')
            size = info.get('SIZE', '')
            dev_type = info.get('TYPE', '')

            # sda, sdb 등의 파티션이고 마운트되어 있는 경우
            if name.startswith('sd') and mount and fstype and dev_type == 'part':
                # 사용량 계산
                try:
                    stat = os.statvfs(mount)
                    total = stat.f_blocks * stat.f_frsize
                    free = stat.f_bfree * stat.f_frsize
                    used = total - free
                    percent = round(used / total * 100, 1) if total > 0 else 0
                except:
                    total = used = 0
                    percent = 0

                # 부모 디스크에서 모델명 가져오기
                parent_disk = ''.join([c for c in name if not c.isdigit()])
                model = disk_models.get(parent_disk, 'USB Storage')

                storages.append({
                    'device': f'/dev/{name}',
                    'model': model,
                    'size': size,
                    'mount': mount,
                    'fstype': fstype,
                    'used': format_bytes(used),
                    'total': format_bytes(total),
                    'percent': percent,
                    'purpose': get_purpose(mount)
                })
    except Exception as e:
        pass

    return storages

@app.route('/')
def index():
    mem = get_memory_info()
    disk = get_disk_info()
    gpu = get_gpu_info()
    usb = get_usb_storage_info()

    return render_template_string(
        HTML_TEMPLATE,
        hostname=get_hostname(),
        ip_addr=get_ip_addr(),
        cpu_percent=get_cpu_percent(),
        cpu_cores=get_cpu_cores(),
        cpu_temp=get_cpu_temp(),
        load_avg=get_load_avg(),
        mem_total=mem['total'],
        mem_used=mem['used'],
        mem_percent=mem['percent'],
        disk_total=disk['total'],
        disk_used=disk['used'],
        disk_percent=disk['percent'],
        gpu_model=gpu['model'],
        gpu_temp=gpu['temp'],
        usb_storages=usb,
        services=get_network_services(),
        program_path=PROGRAM_PATH
    )

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 80

    print("=" * 50)
    print("  Jetson Nano 시스템 모니터 웹 서버")
    print("=" * 50)
    print(f"\n프로그램 위치: {PROGRAM_PATH}")
    print(f"웹 서버 주소: http://0.0.0.0:{port}")
    print("\nCtrl+C로 종료\n")
    print("-" * 50)

    app.run(host='0.0.0.0', port=port, debug=False)
