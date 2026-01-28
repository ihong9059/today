#!/usr/bin/env python3
"""
macOS 시스템 모니터링 웹 서버

포트: 5000
사용법: python3 app.py
"""

import os
import subprocess
import platform
import socket
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
    <title>Mac 시스템 모니터</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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
        <h1>{{ system_icon }} {{ system_name }} 시스템 모니터</h1>

        <!-- 시스템 정보 -->
        <div class="card">
            <h2>💻 시스템 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">컴퓨터 이름</div>
                    <div class="info-value">{{ hostname }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">운영체제</div>
                    <div class="info-value">{{ os_version }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">커널</div>
                    <div class="info-value">{{ kernel_version }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">아키텍처</div>
                    <div class="info-value">{{ architecture }}</div>
                </div>
            </div>
        </div>

        <!-- CPU 정보 -->
        <div class="card">
            <h2>⚡ CPU 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">CPU 모델</div>
                    <div class="info-value" style="font-size: 1rem;">{{ cpu_model }}</div>
                </div>
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
                    <div class="info-value" style="font-size: 1rem;">{{ gpu_model }}</div>
                </div>
            </div>
        </div>

        <!-- 네트워크 정보 -->
        <div class="card">
            <h2>🌐 네트워크 정보</h2>
            <div class="info-grid">
                <div class="info-item">
                    <div class="info-label">로컬 IP</div>
                    <div class="info-value">{{ ip_addr }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">외부 IP</div>
                    <div class="info-value">{{ external_ip }}</div>
                </div>
            </div>
        </div>

        <!-- 네트워크 서비스 -->
        <div class="card">
            <h2>📡 실행 중인 네트워크 서비스</h2>
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
            <p style="color: #aaa;">현재 실행 중인 서비스가 없습니다.</p>
            {% endif %}
        </div>

        <!-- 프로그램 위치 -->
        <div class="card">
            <h2>📁 이 프로그램 위치</h2>
            <pre><code>{{ program_path }}</code></pre>
        </div>

        <div class="footer">
            <p>자동 새로고침: 5초 | Mac System Monitor</p>
            <p>{{ hostname }} - {{ ip_addr }}</p>
        </div>
    </div>
</body>
</html>
"""

def run_cmd(cmd):
    """명령어 실행 및 결과 반환"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=5)
        return result.stdout.strip()
    except:
        return "N/A"

def get_system_info():
    """시스템 정보"""
    system = platform.system()
    if system == "Darwin":
        os_version = run_cmd("sw_vers -productVersion")
        return {
            'name': 'Mac',
            'icon': '🍎',
            'os_version': f"macOS {os_version}",
            'kernel': platform.release(),
            'architecture': platform.machine()
        }
    else:
        return {
            'name': system,
            'icon': '🖥️',
            'os_version': platform.platform(),
            'kernel': platform.release(),
            'architecture': platform.machine()
        }

def get_cpu_model():
    """CPU 모델"""
    system = platform.system()
    if system == "Darwin":
        return run_cmd("sysctl -n machdep.cpu.brand_string")
    else:
        try:
            with open('/proc/cpuinfo') as f:
                for line in f:
                    if 'model name' in line:
                        return line.split(':')[1].strip()
        except:
            pass
    return "Unknown CPU"

def get_cpu_percent():
    """CPU 사용률"""
    system = platform.system()
    if system == "Darwin":
        try:
            output = run_cmd("top -l 1 -n 0 | grep 'CPU usage'")
            # CPU usage: 5.26% user, 10.52% sys, 84.21% idle
            if 'idle' in output:
                idle = float(output.split('idle')[0].split()[-1].replace('%', '').replace(',', ''))
                return round(100 - idle, 1)
        except:
            pass
    return 0.0

def get_cpu_cores():
    """CPU 코어 수"""
    system = platform.system()
    if system == "Darwin":
        try:
            return int(run_cmd("sysctl -n hw.ncpu"))
        except:
            pass
    return os.cpu_count() or 4

def get_load_avg():
    """시스템 부하"""
    try:
        load = os.getloadavg()
        return f"{load[0]:.2f} {load[1]:.2f} {load[2]:.2f}"
    except:
        return "N/A"

def format_bytes(b):
    """바이트를 읽기 쉬운 형식으로 변환"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if b < 1024:
            return f"{b:.1f} {unit}"
        b /= 1024
    return f"{b:.1f} PB"

def get_memory_info():
    """메모리 정보"""
    system = platform.system()
    if system == "Darwin":
        try:
            # 총 메모리
            total = int(run_cmd("sysctl -n hw.memsize"))

            # vm_stat으로 메모리 사용량 계산
            vm_stat = run_cmd("vm_stat")
            page_size = 4096  # macOS 기본 페이지 크기

            free_pages = 0
            inactive_pages = 0
            speculative_pages = 0

            for line in vm_stat.split('\n'):
                if 'Pages free' in line:
                    free_pages = int(line.split(':')[1].strip().rstrip('.'))
                elif 'Pages inactive' in line:
                    inactive_pages = int(line.split(':')[1].strip().rstrip('.'))
                elif 'Pages speculative' in line:
                    speculative_pages = int(line.split(':')[1].strip().rstrip('.'))

            free = (free_pages + inactive_pages + speculative_pages) * page_size
            used = total - free
            percent = round(used / total * 100, 1) if total > 0 else 0

            return {
                'total': format_bytes(total),
                'used': format_bytes(used),
                'percent': percent
            }
        except:
            pass

    return {'total': 'N/A', 'used': 'N/A', 'percent': 0}

def get_disk_info():
    """디스크 정보"""
    try:
        stat = os.statvfs('/')
        total = stat.f_blocks * stat.f_frsize
        free = stat.f_bavail * stat.f_frsize
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
    system = platform.system()
    if system == "Darwin":
        try:
            output = run_cmd("system_profiler SPDisplaysDataType 2>/dev/null | grep 'Chipset Model'")
            if output:
                return output.split(':')[1].strip()
        except:
            pass
    return "Unknown GPU"

def get_hostname():
    """호스트명"""
    try:
        return socket.gethostname()
    except:
        return "localhost"

def get_ip_addr():
    """로컬 IP 주소"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def get_external_ip():
    """외부 IP 주소"""
    try:
        result = run_cmd("curl -s --connect-timeout 5 https://api.ipify.org")
        if result and result != "N/A":
            return result
        return run_cmd("curl -s --connect-timeout 5 https://ifconfig.me")
    except:
        return "N/A"

def get_network_services():
    """네트워크 서비스 목록"""
    services = []
    system = platform.system()

    try:
        if system == "Darwin":
            output = run_cmd("lsof -i -P -n | grep LISTEN | head -20")
        else:
            output = run_cmd("netstat -tlnp 2>/dev/null | grep LISTEN | head -20")

        seen = set()
        for line in output.split('\n'):
            if line:
                parts = line.split()
                if len(parts) >= 9 and system == "Darwin":
                    # lsof 형식: COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
                    name = parts[8]
                    if ':' in name:
                        addr_port = name.split(':')
                        addr = addr_port[0] if addr_port[0] else '*'
                        port = addr_port[1] if len(addr_port) > 1 else ''
                        key = f"{addr}:{port}"
                        if key not in seen:
                            seen.add(key)
                            services.append({
                                'proto': 'TCP',
                                'addr': addr,
                                'port': port,
                                'status': 'LISTEN'
                            })
    except:
        pass

    return services[:15]  # 최대 15개

@app.route('/')
def index():
    sys_info = get_system_info()
    mem = get_memory_info()
    disk = get_disk_info()

    return render_template_string(
        HTML_TEMPLATE,
        system_name=sys_info['name'],
        system_icon=sys_info['icon'],
        hostname=get_hostname(),
        os_version=sys_info['os_version'],
        kernel_version=sys_info['kernel'],
        architecture=sys_info['architecture'],
        cpu_model=get_cpu_model(),
        cpu_percent=get_cpu_percent(),
        cpu_cores=get_cpu_cores(),
        load_avg=get_load_avg(),
        mem_total=mem['total'],
        mem_used=mem['used'],
        mem_percent=mem['percent'],
        disk_total=disk['total'],
        disk_used=disk['used'],
        disk_percent=disk['percent'],
        gpu_model=get_gpu_info(),
        ip_addr=get_ip_addr(),
        external_ip=get_external_ip(),
        services=get_network_services(),
        program_path=PROGRAM_PATH
    )

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000

    print("=" * 50)
    print("  Mac 시스템 모니터 웹 서버")
    print("=" * 50)
    print(f"\n프로그램 위치: {PROGRAM_PATH}")
    print(f"웹 서버 주소: http://localhost:{port}")
    print(f"             http://{get_ip_addr()}:{port}")
    print("\nCtrl+C로 종료\n")
    print("-" * 50)

    app.run(host='0.0.0.0', port=port, debug=False)
