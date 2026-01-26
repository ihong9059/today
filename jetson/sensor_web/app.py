#!/usr/bin/env python3
"""
AHT20 센서 웹 모니터

포트: 8080
사용법: python3 app.py
"""

import os
import time
import smbus2
from flask import Flask, render_template_string, jsonify

app = Flask(__name__)

# AHT20 설정
I2C_BUS = 1
AHT20_ADDR = 0x38

def read_aht20():
    """AHT20 센서에서 온습도 읽기"""
    try:
        bus = smbus2.SMBus(I2C_BUS)

        # 초기화
        bus.write_i2c_block_data(AHT20_ADDR, 0xBE, [0x08, 0x00])
        time.sleep(0.01)

        # 측정 명령
        bus.write_i2c_block_data(AHT20_ADDR, 0xAC, [0x33, 0x00])
        time.sleep(0.08)

        # 데이터 읽기
        data = bus.read_i2c_block_data(AHT20_ADDR, 0x00, 7)
        bus.close()

        # 데이터 변환
        humidity = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576.0 * 100
        temperature = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576.0 * 200 - 50

        return {
            'temperature': round(temperature, 1),
            'humidity': round(humidity, 1),
            'status': 'ok'
        }
    except Exception as e:
        return {
            'temperature': 0,
            'humidity': 0,
            'status': f'error: {str(e)}'
        }

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AHT20 센서 모니터</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #eee;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            width: 100%;
        }
        h1 {
            text-align: center;
            color: #00d9ff;
            margin-bottom: 30px;
            font-size: 1.8rem;
            text-shadow: 0 0 10px rgba(0,217,255,0.5);
        }
        .sensor-card {
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }
        .sensor-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }
        .sensor-item {
            background: rgba(0,0,0,0.3);
            padding: 30px 20px;
            border-radius: 15px;
        }
        .sensor-icon {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .sensor-label {
            color: #aaa;
            font-size: 1rem;
            margin-bottom: 10px;
        }
        .sensor-value {
            font-size: 3rem;
            font-weight: bold;
        }
        .sensor-unit {
            font-size: 1.5rem;
            color: #888;
        }
        .temp-value { color: #ff6b6b; }
        .humid-value { color: #4ecdc4; }
        .status {
            color: #76ff03;
            font-size: 0.9rem;
        }
        .status.error {
            color: #ff5722;
        }
        .update-time {
            color: #666;
            font-size: 0.85rem;
            margin-top: 15px;
        }
        .gauge-container {
            margin-top: 20px;
        }
        .gauge {
            height: 10px;
            background: rgba(255,255,255,0.2);
            border-radius: 5px;
            overflow: hidden;
            margin: 10px 0;
        }
        .gauge-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 0.5s ease;
        }
        .gauge-temp { background: linear-gradient(90deg, #4ecdc4, #ff6b6b); }
        .gauge-humid { background: linear-gradient(90deg, #a8e6cf, #4ecdc4); }
        .info {
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #aaa;
        }
        .info code {
            color: #00d9ff;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌡️ AHT20 센서 모니터</h1>

        <div class="sensor-card">
            <div class="sensor-grid">
                <div class="sensor-item">
                    <div class="sensor-icon">🌡️</div>
                    <div class="sensor-label">온도</div>
                    <div class="sensor-value temp-value">
                        <span id="temp">--</span><span class="sensor-unit">°C</span>
                    </div>
                    <div class="gauge">
                        <div class="gauge-fill gauge-temp" id="temp-gauge" style="width: 0%"></div>
                    </div>
                </div>
                <div class="sensor-item">
                    <div class="sensor-icon">💧</div>
                    <div class="sensor-label">습도</div>
                    <div class="sensor-value humid-value">
                        <span id="humid">--</span><span class="sensor-unit">%</span>
                    </div>
                    <div class="gauge">
                        <div class="gauge-fill gauge-humid" id="humid-gauge" style="width: 0%"></div>
                    </div>
                </div>
            </div>

            <div class="status" id="status">연결 중...</div>
            <div class="update-time">업데이트: <span id="update-time">--</span></div>
        </div>

        <div class="info">
            <p><strong>센서:</strong> AHT20 (I2C 온습도 센서)</p>
            <p><strong>주소:</strong> <code>0x38</code> (I2C Bus 1)</p>
            <p><strong>위치:</strong> <code>/home/uttec/sensor_web/app.py</code></p>
        </div>
    </div>

    <script>
        function updateSensor() {
            fetch('/api/sensor')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('temp').textContent = data.temperature.toFixed(1);
                    document.getElementById('humid').textContent = data.humidity.toFixed(1);

                    // 게이지 업데이트 (온도: -10~50, 습도: 0~100)
                    let tempPercent = Math.min(100, Math.max(0, (data.temperature + 10) / 60 * 100));
                    let humidPercent = Math.min(100, Math.max(0, data.humidity));
                    document.getElementById('temp-gauge').style.width = tempPercent + '%';
                    document.getElementById('humid-gauge').style.width = humidPercent + '%';

                    // 상태 업데이트
                    let statusEl = document.getElementById('status');
                    if (data.status === 'ok') {
                        statusEl.textContent = '센서 정상';
                        statusEl.className = 'status';
                    } else {
                        statusEl.textContent = data.status;
                        statusEl.className = 'status error';
                    }

                    // 시간 업데이트
                    document.getElementById('update-time').textContent = new Date().toLocaleTimeString('ko-KR');
                })
                .catch(error => {
                    document.getElementById('status').textContent = '연결 오류';
                    document.getElementById('status').className = 'status error';
                });
        }

        // 초기 로드 및 2초마다 업데이트
        updateSensor();
        setInterval(updateSensor, 2000);
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/sensor')
def api_sensor():
    return jsonify(read_aht20())

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

    print("=" * 50)
    print("  AHT20 센서 웹 모니터")
    print("=" * 50)
    print(f"\n웹 서버: http://0.0.0.0:{port}")
    print("Ctrl+C로 종료\n")
    print("-" * 50)

    app.run(host='0.0.0.0', port=port, debug=False)
