from flask import Flask, render_template_string, request, redirect, session
import psutil
import platform
import datetime
import socket
import os

app = Flask(__name__)
app.secret_key = 'sam-aws-secret-key-2026'

FILE_BROWSER_PASSWORD = '3232'

# EC2 인스턴스 타입 데이터 (서울 리전 기준)
EC2_INSTANCES = [
    # Free Tier
    {"type": "t2.micro", "vcpu": 1, "memory": "1 GB", "network": "Low", "price_hourly": 0.0116, "price_monthly": 8.47, "category": "Free Tier", "note": "프리티어 적용"},
    {"type": "t3.micro", "vcpu": 2, "memory": "1 GB", "network": "Up to 5 Gbps", "price_hourly": 0.0104, "price_monthly": 7.59, "category": "Free Tier", "note": "프리티어 적용"},
    # General Purpose
    {"type": "t3.nano", "vcpu": 2, "memory": "0.5 GB", "network": "Up to 5 Gbps", "price_hourly": 0.0052, "price_monthly": 3.80, "category": "General Purpose", "note": ""},
    {"type": "t3.small", "vcpu": 2, "memory": "2 GB", "network": "Up to 5 Gbps", "price_hourly": 0.0208, "price_monthly": 15.18, "category": "General Purpose", "note": ""},
    {"type": "t3.medium", "vcpu": 2, "memory": "4 GB", "network": "Up to 5 Gbps", "price_hourly": 0.0416, "price_monthly": 30.37, "category": "General Purpose", "note": ""},
    {"type": "t3.large", "vcpu": 2, "memory": "8 GB", "network": "Up to 5 Gbps", "price_hourly": 0.0832, "price_monthly": 60.74, "category": "General Purpose", "note": ""},
    {"type": "t3.xlarge", "vcpu": 4, "memory": "16 GB", "network": "Up to 5 Gbps", "price_hourly": 0.1664, "price_monthly": 121.47, "category": "General Purpose", "note": ""},
    {"type": "t3.2xlarge", "vcpu": 8, "memory": "32 GB", "network": "Up to 5 Gbps", "price_hourly": 0.3328, "price_monthly": 242.94, "category": "General Purpose", "note": ""},
    {"type": "m5.large", "vcpu": 2, "memory": "8 GB", "network": "Up to 10 Gbps", "price_hourly": 0.096, "price_monthly": 70.08, "category": "General Purpose", "note": ""},
    {"type": "m5.xlarge", "vcpu": 4, "memory": "16 GB", "network": "Up to 10 Gbps", "price_hourly": 0.192, "price_monthly": 140.16, "category": "General Purpose", "note": ""},
    {"type": "m5.2xlarge", "vcpu": 8, "memory": "32 GB", "network": "Up to 10 Gbps", "price_hourly": 0.384, "price_monthly": 280.32, "category": "General Purpose", "note": ""},
    {"type": "m5.4xlarge", "vcpu": 16, "memory": "64 GB", "network": "Up to 10 Gbps", "price_hourly": 0.768, "price_monthly": 560.64, "category": "General Purpose", "note": ""},
    # Compute Optimized
    {"type": "c5.large", "vcpu": 2, "memory": "4 GB", "network": "Up to 10 Gbps", "price_hourly": 0.085, "price_monthly": 62.05, "category": "Compute Optimized", "note": ""},
    {"type": "c5.xlarge", "vcpu": 4, "memory": "8 GB", "network": "Up to 10 Gbps", "price_hourly": 0.17, "price_monthly": 124.10, "category": "Compute Optimized", "note": ""},
    {"type": "c5.2xlarge", "vcpu": 8, "memory": "16 GB", "network": "Up to 10 Gbps", "price_hourly": 0.34, "price_monthly": 248.20, "category": "Compute Optimized", "note": ""},
    {"type": "c5.4xlarge", "vcpu": 16, "memory": "32 GB", "network": "Up to 10 Gbps", "price_hourly": 0.68, "price_monthly": 496.40, "category": "Compute Optimized", "note": ""},
    # Memory Optimized
    {"type": "r5.large", "vcpu": 2, "memory": "16 GB", "network": "Up to 10 Gbps", "price_hourly": 0.126, "price_monthly": 91.98, "category": "Memory Optimized", "note": ""},
    {"type": "r5.xlarge", "vcpu": 4, "memory": "32 GB", "network": "Up to 10 Gbps", "price_hourly": 0.252, "price_monthly": 183.96, "category": "Memory Optimized", "note": ""},
    {"type": "r5.2xlarge", "vcpu": 8, "memory": "64 GB", "network": "Up to 10 Gbps", "price_hourly": 0.504, "price_monthly": 367.92, "category": "Memory Optimized", "note": ""},
    {"type": "r5.4xlarge", "vcpu": 16, "memory": "128 GB", "network": "Up to 10 Gbps", "price_hourly": 1.008, "price_monthly": 735.84, "category": "Memory Optimized", "note": ""},
    # GPU Instances
    {"type": "g4dn.xlarge", "vcpu": 4, "memory": "16 GB", "network": "Up to 25 Gbps", "price_hourly": 0.526, "price_monthly": 383.98, "category": "GPU (NVIDIA T4)", "note": "1x NVIDIA T4"},
    {"type": "g4dn.2xlarge", "vcpu": 8, "memory": "32 GB", "network": "Up to 25 Gbps", "price_hourly": 0.752, "price_monthly": 548.96, "category": "GPU (NVIDIA T4)", "note": "1x NVIDIA T4"},
    {"type": "g4dn.4xlarge", "vcpu": 16, "memory": "64 GB", "network": "Up to 25 Gbps", "price_hourly": 1.204, "price_monthly": 878.92, "category": "GPU (NVIDIA T4)", "note": "1x NVIDIA T4"},
    {"type": "g4dn.8xlarge", "vcpu": 32, "memory": "128 GB", "network": "50 Gbps", "price_hourly": 2.176, "price_monthly": 1588.48, "category": "GPU (NVIDIA T4)", "note": "1x NVIDIA T4"},
    {"type": "g4dn.12xlarge", "vcpu": 48, "memory": "192 GB", "network": "50 Gbps", "price_hourly": 3.912, "price_monthly": 2855.76, "category": "GPU (NVIDIA T4)", "note": "4x NVIDIA T4"},
    {"type": "p3.2xlarge", "vcpu": 8, "memory": "61 GB", "network": "Up to 10 Gbps", "price_hourly": 3.06, "price_monthly": 2233.80, "category": "GPU (NVIDIA V100)", "note": "1x NVIDIA V100"},
    {"type": "p3.8xlarge", "vcpu": 32, "memory": "244 GB", "network": "10 Gbps", "price_hourly": 12.24, "price_monthly": 8935.20, "category": "GPU (NVIDIA V100)", "note": "4x NVIDIA V100"},
    {"type": "p4d.24xlarge", "vcpu": 96, "memory": "1152 GB", "network": "400 Gbps", "price_hourly": 32.77, "price_monthly": 23922.10, "category": "GPU (NVIDIA A100)", "note": "8x NVIDIA A100"},
]

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>sam-aws Resource Monitor</title>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="5">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Arial, sans-serif; background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); color: #eee; min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        header { text-align: center; padding: 30px 0; border-bottom: 2px solid #00d4ff; margin-bottom: 30px; }
        h1 { color: #00ff88; font-size: 2.2em; margin-bottom: 10px; }
        .subtitle { color: #00d4ff; font-size: 1.1em; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: rgba(20, 20, 50, 0.9); border-radius: 12px; padding: 20px; border: 1px solid #00d4ff; box-shadow: 0 4px 15px rgba(0, 212, 255, 0.1); }
        .card h2 { color: #00d4ff; margin-bottom: 15px; font-size: 1.2em; display: flex; align-items: center; gap: 10px; }
        .card h2::before { content: ""; width: 10px; height: 10px; background: #00ff88; border-radius: 50%; }
        .progress-container { background: #1a1a3e; border-radius: 10px; height: 25px; margin: 10px 0; overflow: hidden; }
        .progress-bar { height: 100%; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
        .progress-green { background: linear-gradient(90deg, #00ff88, #00cc6a); }
        .progress-yellow { background: linear-gradient(90deg, #ffcc00, #ff9900); }
        .progress-red { background: linear-gradient(90deg, #ff4444, #cc0000); }
        .info-table { width: 100%; border-collapse: collapse; }
        .info-table td { padding: 10px 5px; border-bottom: 1px solid #333; }
        .info-table td:first-child { color: #888; width: 45%; }
        .info-table td:last-child { color: #00ff88; text-align: right; }
        .status-online { display: inline-block; padding: 5px 15px; background: #00ff88; color: #000; border-radius: 20px; font-weight: bold; }
        footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; }
        .wide-card { grid-column: span 2; }
        @media (max-width: 768px) { .wide-card { grid-column: span 1; } }
        .nav-link { display: inline-block; margin: 5px; padding: 10px 20px; background: #00d4ff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; }
        .nav-link:hover { background: #00ff88; }
        .code-box { background: #0d1117; padding: 12px 15px; border-radius: 8px; font-family: "Consolas", monospace; font-size: 13px; color: #00ff88; margin: 8px 0; overflow-x: auto; }
        .code-label { color: #888; font-size: 12px; margin-bottom: 5px; }
        .ssh-section { margin-bottom: 15px; }
        .ssh-section:last-child { margin-bottom: 0; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>sam-aws Resource Monitor</h1>
            <p class="subtitle">{{ hostname }} | <span class="status-online">ONLINE</span></p>
            <p style="margin-top: 10px; color: #888;">{{ current_time }}</p>
            <div style="margin-top: 15px;">
                <a href="/files" class="nav-link">File Browser</a>
                <a href="/ec2-pricing" class="nav-link">EC2 Pricing</a>
            </div>
        </header>
        <div class="grid">
            <div class="card">
                <h2>CPU</h2>
                <div class="progress-container"><div class="progress-bar {{ cpu_class }}" style="width: {{ cpu_percent }}%;">{{ cpu_percent }}%</div></div>
                <table class="info-table"><tr><td>코어 수</td><td>{{ cpu_count }}</td></tr><tr><td>논리 코어</td><td>{{ cpu_count_logical }}</td></tr><tr><td>현재 사용률</td><td>{{ cpu_percent }}%</td></tr></table>
            </div>
            <div class="card">
                <h2>메모리</h2>
                <div class="progress-container"><div class="progress-bar {{ mem_class }}" style="width: {{ mem_percent }}%;">{{ mem_percent }}%</div></div>
                <table class="info-table"><tr><td>전체</td><td>{{ mem_total }}</td></tr><tr><td>사용 중</td><td>{{ mem_used }}</td></tr><tr><td>사용 가능</td><td>{{ mem_available }}</td></tr></table>
            </div>
            <div class="card">
                <h2>디스크</h2>
                <div class="progress-container"><div class="progress-bar {{ disk_class }}" style="width: {{ disk_percent }}%;">{{ disk_percent }}%</div></div>
                <table class="info-table"><tr><td>전체</td><td>{{ disk_total }}</td></tr><tr><td>사용 중</td><td>{{ disk_used }}</td></tr><tr><td>남은 공간</td><td>{{ disk_free }}</td></tr></table>
            </div>
            <div class="card">
                <h2>시스템 정보</h2>
                <table class="info-table"><tr><td>OS</td><td>{{ os_info }}</td></tr><tr><td>커널</td><td>{{ kernel }}</td></tr><tr><td>아키텍처</td><td>{{ arch }}</td></tr><tr><td>업타임</td><td>{{ uptime }}</td></tr></table>
            </div>
            <div class="card">
                <h2>네트워크</h2>
                <table class="info-table"><tr><td>호스트명</td><td>{{ hostname }}</td></tr><tr><td>공인 IP</td><td>15.164.220.60</td></tr><tr><td>Tailscale IP</td><td>{{ tailscale_ip }}</td></tr><tr><td>송신 (TX)</td><td>{{ net_sent }}</td></tr><tr><td>수신 (RX)</td><td>{{ net_recv }}</td></tr></table>
            </div>
            <div class="card">
                <h2>SSH 접속 방법</h2>
                <div class="ssh-section"><div class="code-label">Tailscale (권장)</div><div class="code-box">ssh ec2-user@100.78.187.70</div></div>
                <div class="ssh-section"><div class="code-label">공인 IP (PEM 필요)</div><div class="code-box">ssh -i samks204.pem ec2-user@15.164.220.60</div></div>
                <div class="ssh-section"><div class="code-label">SSH Config 설정 후</div><div class="code-box">ssh sam-aws</div></div>
            </div>
            <div class="card wide-card">
                <h2>Tailscale 접속 설정</h2>
                <div class="ssh-section"><div class="code-label">1. Tailscale 설치</div><div class="code-box">https://tailscale.com/download</div></div>
                <div class="ssh-section"><div class="code-label">2. 로그인</div><div class="code-box">tailscale up</div></div>
                <div class="ssh-section"><div class="code-label">3. SSH 접속</div><div class="code-box">ssh ec2-user@100.78.187.70</div></div>
                <div class="ssh-section"><div class="code-label">4. ~/.ssh/config</div><div class="code-box">Host sam-aws<br>&nbsp;&nbsp;HostName 100.78.187.70<br>&nbsp;&nbsp;User ec2-user</div></div>
            </div>
        </div>
        <footer><p>sam-aws Resource Monitor | 자동 새로고침: 5초</p></footer>
    </div>
</body>
</html>
'''

EC2_PRICING_TEMPLATE = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>AWS EC2 Pricing - 서울 리전</title>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Arial, sans-serif; background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); color: #eee; min-height: 100vh; padding: 20px; }
        .container { max-width: 1400px; margin: 0 auto; }
        header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 2px solid #00d4ff; margin-bottom: 20px; }
        h1 { color: #00ff88; font-size: 1.8em; }
        .nav-links a { color: #00d4ff; text-decoration: none; margin-left: 20px; padding: 8px 15px; border: 1px solid #00d4ff; border-radius: 5px; }
        .nav-links a:hover { background: #00d4ff; color: #000; }
        .subtitle { color: #888; margin-bottom: 20px; }
        .category-section { margin-bottom: 30px; }
        .category-title { color: #00d4ff; font-size: 1.3em; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #333; }
        .pricing-table { width: 100%; border-collapse: collapse; background: rgba(20, 20, 50, 0.9); border-radius: 12px; overflow: hidden; border: 1px solid #00d4ff; }
        .pricing-table th { background: #1a1a3e; color: #00d4ff; padding: 15px 10px; text-align: left; font-weight: 600; }
        .pricing-table td { padding: 12px 10px; border-bottom: 1px solid #333; }
        .pricing-table tr:hover { background: rgba(0, 212, 255, 0.1); }
        .pricing-table tr:last-child td { border-bottom: none; }
        .instance-type { color: #00ff88; font-weight: bold; }
        .price { color: #ffcc00; }
        .note { color: #888; font-size: 0.9em; }
        .free-tier { background: rgba(0, 255, 136, 0.1); }
        .gpu-row { background: rgba(255, 100, 100, 0.1); }
        footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>AWS EC2 Pricing</h1>
            <div class="nav-links">
                <a href="/">Resource Monitor</a>
                <a href="/files">File Browser</a>
            </div>
        </header>
        <p class="subtitle">서울 리전 (ap-northeast-2) | On-Demand 가격 | 2026년 2월 기준</p>
        {% for category, instances in categories.items() %}
        <div class="category-section">
            <h2 class="category-title">{{ category }}</h2>
            <table class="pricing-table">
                <thead><tr><th>인스턴스 타입</th><th>vCPU</th><th>메모리</th><th>네트워크</th><th>시간당 (USD)</th><th>월간 (USD)</th><th>비고</th></tr></thead>
                <tbody>
                {% for inst in instances %}
                <tr class="{% if 'Free Tier' in category %}free-tier{% elif 'GPU' in category %}gpu-row{% endif %}">
                    <td class="instance-type">{{ inst.type }}</td>
                    <td>{{ inst.vcpu }}</td>
                    <td>{{ inst.memory }}</td>
                    <td>{{ inst.network }}</td>
                    <td class="price">${{ "%.4f"|format(inst.price_hourly) }}</td>
                    <td class="price">${{ "%.2f"|format(inst.price_monthly) }}</td>
                    <td class="note">{{ inst.note }}</td>
                </tr>
                {% endfor %}
                </tbody>
            </table>
        </div>
        {% endfor %}
        <footer>
            <p>※ 가격은 변동될 수 있습니다. 정확한 가격은 <a href="https://aws.amazon.com/ec2/pricing/" style="color: #00d4ff;">AWS 공식 사이트</a>를 참조하세요.</p>
            <p style="margin-top: 10px;">sam-aws Resource Monitor</p>
        </footer>
    </div>
</body>
</html>
'''

FILES_LOGIN_TEMPLATE = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>File Browser - Login</title>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Arial, sans-serif; background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); color: #eee; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-box { background: rgba(20, 20, 50, 0.95); padding: 40px; border-radius: 15px; border: 1px solid #00d4ff; text-align: center; min-width: 350px; }
        h1 { color: #00d4ff; margin-bottom: 30px; }
        input[type="password"] { width: 100%; padding: 15px; margin: 10px 0 20px; border: 1px solid #00d4ff; border-radius: 8px; background: #1a1a3e; color: #fff; font-size: 16px; }
        button { width: 100%; padding: 15px; background: #00d4ff; color: #000; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; }
        button:hover { background: #00ff88; }
        .error { color: #ff4444; margin-bottom: 15px; }
        .back-link { display: block; margin-top: 20px; color: #00d4ff; text-decoration: none; }
    </style>
</head>
<body>
    <div class="login-box">
        <h1>File Browser</h1>
        {% if error %}<p class="error">{{ error }}</p>{% endif %}
        <form method="POST">
            <input type="password" name="password" placeholder="비밀번호 입력" autofocus>
            <button type="submit">로그인</button>
        </form>
        <a href="/" class="back-link">← Resource Monitor로 돌아가기</a>
    </div>
</body>
</html>
'''

FILES_BROWSER_TEMPLATE = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>File Browser - {{ current_path }}</title>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: "Segoe UI", Arial, sans-serif; background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); color: #eee; min-height: 100vh; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        header { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 2px solid #00d4ff; margin-bottom: 20px; }
        h1 { color: #00ff88; font-size: 1.8em; }
        .nav-links a { color: #00d4ff; text-decoration: none; margin-left: 20px; padding: 8px 15px; border: 1px solid #00d4ff; border-radius: 5px; }
        .nav-links a:hover { background: #00d4ff; color: #000; }
        .path-bar { background: #1a1a3e; padding: 15px; border-radius: 8px; margin-bottom: 20px; font-family: monospace; color: #00ff88; word-break: break-all; }
        .file-list { background: rgba(20, 20, 50, 0.9); border-radius: 12px; border: 1px solid #00d4ff; overflow: hidden; }
        .file-item { display: flex; align-items: center; padding: 12px 20px; border-bottom: 1px solid #333; text-decoration: none; color: #eee; }
        .file-item:hover { background: rgba(0, 212, 255, 0.1); }
        .file-item:last-child { border-bottom: none; }
        .file-icon { width: 30px; font-size: 1.2em; margin-right: 15px; }
        .file-name { flex: 1; }
        .file-size { color: #888; width: 100px; text-align: right; }
        .file-date { color: #666; width: 150px; text-align: right; }
        .folder { color: #00d4ff; }
        .file { color: #00ff88; }
        .parent-dir { color: #ffcc00; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>File Browser</h1>
            <div class="nav-links">
                <a href="/">Resource Monitor</a>
                <a href="/ec2-pricing">EC2 Pricing</a>
                <a href="/files/logout">로그아웃</a>
            </div>
        </header>
        <div class="path-bar">{{ current_path }}</div>
        <div class="file-list">
            {% if parent_path %}
            <a href="/files?path={{ parent_path }}" class="file-item">
                <span class="file-icon">📁</span><span class="file-name parent-dir">..</span><span class="file-size"></span><span class="file-date"></span>
            </a>
            {% endif %}
            {% for item in items %}
            <a href="{{ item.link }}" class="file-item">
                <span class="file-icon">{{ item.icon }}</span><span class="file-name {{ item.type }}">{{ item.name }}</span><span class="file-size">{{ item.size }}</span><span class="file-date">{{ item.date }}</span>
            </a>
            {% endfor %}
        </div>
    </div>
</body>
</html>
'''

def bytes_to_human(n):
    for unit in ["", "KB", "MB", "GB", "TB"]:
        if n < 1024:
            return f"{n:.1f} {unit}"
        n /= 1024
    return f"{n:.1f} PB"

def get_progress_class(percent):
    if percent < 60:
        return "progress-green"
    elif percent < 85:
        return "progress-yellow"
    return "progress-red"

def get_uptime():
    boot_time = datetime.datetime.fromtimestamp(psutil.boot_time())
    uptime = datetime.datetime.now() - boot_time
    days = uptime.days
    hours, remainder = divmod(uptime.seconds, 3600)
    minutes, _ = divmod(remainder, 60)
    return f"{days}일 {hours}시간 {minutes}분"

def get_tailscale_ip():
    try:
        addrs = psutil.net_if_addrs()
        if "tailscale0" in addrs:
            for addr in addrs["tailscale0"]:
                if addr.family == socket.AF_INET:
                    return addr.address
    except:
        pass
    return "100.78.187.70"

@app.route("/")
def index():
    cpu_percent = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage("/")
    net = psutil.net_io_counters()

    return render_template_string(HTML_TEMPLATE,
        hostname=socket.gethostname(),
        current_time=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        cpu_percent=cpu_percent,
        cpu_class=get_progress_class(cpu_percent),
        cpu_count=psutil.cpu_count(logical=False),
        cpu_count_logical=psutil.cpu_count(logical=True),
        mem_percent=mem.percent,
        mem_class=get_progress_class(mem.percent),
        mem_total=bytes_to_human(mem.total),
        mem_used=bytes_to_human(mem.used),
        mem_available=bytes_to_human(mem.available),
        disk_percent=disk.percent,
        disk_class=get_progress_class(disk.percent),
        disk_total=bytes_to_human(disk.total),
        disk_used=bytes_to_human(disk.used),
        disk_free=bytes_to_human(disk.free),
        os_info=f"{platform.system()} {platform.release()}",
        kernel=platform.release(),
        arch=platform.machine(),
        uptime=get_uptime(),
        tailscale_ip=get_tailscale_ip(),
        net_sent=bytes_to_human(net.bytes_sent),
        net_recv=bytes_to_human(net.bytes_recv)
    )

@app.route("/ec2-pricing")
def ec2_pricing():
    categories = {}
    for inst in EC2_INSTANCES:
        cat = inst["category"]
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(inst)

    return render_template_string(EC2_PRICING_TEMPLATE, categories=categories)

@app.route("/files", methods=["GET", "POST"])
def files():
    if not session.get("files_authenticated"):
        error = None
        if request.method == "POST":
            if request.form.get("password") == FILE_BROWSER_PASSWORD:
                session["files_authenticated"] = True
                return redirect("/files")
            else:
                error = "비밀번호가 틀렸습니다."
        return render_template_string(FILES_LOGIN_TEMPLATE, error=error)

    current_path = request.args.get("path", "/home/ec2-user")
    current_path = os.path.abspath(current_path)

    if not os.path.exists(current_path):
        current_path = "/home/ec2-user"

    items = []
    parent_path = None

    if current_path != "/":
        parent_path = os.path.dirname(current_path)

    try:
        for name in sorted(os.listdir(current_path)):
            full_path = os.path.join(current_path, name)
            try:
                stat = os.stat(full_path)
                is_dir = os.path.isdir(full_path)

                if is_dir:
                    icon = "📁"
                    item_type = "folder"
                    size = ""
                    link = f"/files?path={full_path}"
                else:
                    icon = "📄"
                    item_type = "file"
                    size = bytes_to_human(stat.st_size)
                    link = "#"

                date = datetime.datetime.fromtimestamp(stat.st_mtime).strftime("%Y-%m-%d %H:%M")

                items.append({"name": name, "icon": icon, "type": item_type, "size": size, "date": date, "link": link})
            except (PermissionError, OSError):
                continue
    except PermissionError:
        items = []

    items.sort(key=lambda x: (x["type"] != "folder", x["name"].lower()))

    return render_template_string(FILES_BROWSER_TEMPLATE, current_path=current_path, parent_path=parent_path, items=items)

@app.route("/files/logout")
def files_logout():
    session.pop("files_authenticated", None)
    return redirect("/files")

@app.route("/api/stats")
def api_stats():
    cpu_percent = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    return {"cpu_percent": cpu_percent, "memory_percent": mem.percent, "disk_percent": disk.percent, "uptime": get_uptime()}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=19999)
