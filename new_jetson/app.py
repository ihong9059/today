#!/usr/bin/env python3
"""
AHT20 온습도 센서 웹 모니터

- Jetson Nano 40핀 헤더 I2C 연결
- AHT20 I2C 주소: 0x38
- 포트: 4000
"""

import time
import struct
from flask import Flask, render_template_string, jsonify

app = Flask(__name__)

# AHT20 I2C 설정
AHT20_I2C_ADDR = 0x38
AHT20_CMD_INIT = [0xBE, 0x08, 0x00]
AHT20_CMD_MEASURE = [0xAC, 0x33, 0x00]

# I2C 버스 (Jetson Nano는 보통 버스 1 사용)
I2C_BUS = 1

class AHT20:
    def __init__(self, bus_num=I2C_BUS):
        self.bus = None
        self.initialized = False
        self.error_msg = None
        try:
            import smbus2
            self.bus = smbus2.SMBus(bus_num)
            self._init_sensor()
            self.initialized = True
        except ImportError:
            self.error_msg = "smbus2 모듈이 설치되지 않았습니다. 'pip3 install smbus2' 실행 필요"
        except FileNotFoundError:
            self.error_msg = f"I2C 버스 {bus_num}을 찾을 수 없습니다. I2C가 활성화되어 있는지 확인하세요."
        except Exception as e:
            self.error_msg = f"센서 초기화 실패: {str(e)}"

    def _init_sensor(self):
        """센서 초기화"""
        time.sleep(0.04)  # 40ms 대기
        # 상태 확인
        status = self.bus.read_byte(AHT20_I2C_ADDR)
        if not (status & 0x08):  # calibrated bit 확인
            # 초기화 명령
            self.bus.write_i2c_block_data(AHT20_I2C_ADDR, AHT20_CMD_INIT[0], AHT20_CMD_INIT[1:])
            time.sleep(0.01)

    def read(self):
        """온도와 습도 읽기"""
        if not self.initialized:
            return None, None, self.error_msg

        try:
            # 측정 명령 전송
            self.bus.write_i2c_block_data(AHT20_I2C_ADDR, AHT20_CMD_MEASURE[0], AHT20_CMD_MEASURE[1:])
            time.sleep(0.1)  # 100ms 대기

            # 데이터 읽기 (7바이트)
            data = self.bus.read_i2c_block_data(AHT20_I2C_ADDR, 0x00, 7)

            # 습도 계산
            humidity = ((data[1] << 12) | (data[2] << 4) | (data[3] >> 4)) / 1048576.0 * 100

            # 온도 계산
            temperature = (((data[3] & 0x0F) << 16) | (data[4] << 8) | data[5]) / 1048576.0 * 200 - 50

            return round(temperature, 1), round(humidity, 1), None

        except Exception as e:
            return None, None, f"센서 읽기 실패: {str(e)}"

# 센서 인스턴스
sensor = AHT20()

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AHT20 온습도 모니터</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            width: 100%;
        }
        h1 {
            text-align: center;
            color: white;
            margin-bottom: 30px;
            font-size: 1.8rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            margin-bottom: 20px;
        }
        .sensor-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        .sensor-item {
            text-align: center;
            padding: 25px 15px;
            border-radius: 15px;
            background: linear-gradient(145deg, #f0f0f0, #e6e6e6);
        }
        .sensor-item.temp {
            background: linear-gradient(145deg, #ff6b6b, #ee5a5a);
            color: white;
        }
        .sensor-item.humidity {
            background: linear-gradient(145deg, #4ecdc4, #44b3ab);
            color: white;
        }
        .sensor-icon {
            font-size: 3rem;
            margin-bottom: 10px;
        }
        .sensor-value {
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .sensor-label {
            font-size: 1rem;
            opacity: 0.9;
        }
        .status {
            text-align: center;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
        }
        .status.ok {
            background: #d4edda;
            color: #155724;
        }
        .status.error {
            background: #f8d7da;
            color: #721c24;
        }
        .status.loading {
            background: #fff3cd;
            color: #856404;
        }
        .refresh-info {
            text-align: center;
            margin-top: 20px;
            color: white;
            font-size: 0.9rem;
            opacity: 0.8;
        }
        .history {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 10px;
        }
        .history h3 {
            margin-bottom: 10px;
            color: #333;
            font-size: 1rem;
        }
        .history-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #eee;
            font-size: 0.9rem;
        }
        .history-item:last-child {
            border-bottom: none;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        .updating .sensor-value {
            animation: pulse 1s infinite;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌡️ AHT20 온습도 센서</h1>

        <div class="card" id="sensor-card">
            <div class="sensor-grid">
                <div class="sensor-item temp">
                    <div class="sensor-icon">🌡️</div>
                    <div class="sensor-value" id="temp-value">--</div>
                    <div class="sensor-label">온도 (°C)</div>
                </div>
                <div class="sensor-item humidity">
                    <div class="sensor-icon">💧</div>
                    <div class="sensor-value" id="humidity-value">--</div>
                    <div class="sensor-label">습도 (%)</div>
                </div>
            </div>

            <div id="status" class="status loading">
                센서 데이터 로딩 중...
            </div>

            <div class="history" id="history">
                <h3>📊 최근 기록</h3>
                <div id="history-list">데이터 수집 중...</div>
            </div>
        </div>

        <div class="refresh-info">
            <span id="update-time">-</span> | 3초마다 자동 갱신
        </div>
    </div>

    <script>
        let history = [];
        const MAX_HISTORY = 5;

        async function fetchSensorData() {
            const card = document.getElementById('sensor-card');
            card.classList.add('updating');

            try {
                const response = await fetch('/api/sensor');
                const data = await response.json();

                document.getElementById('temp-value').textContent =
                    data.temperature !== null ? data.temperature + '°C' : '--';
                document.getElementById('humidity-value').textContent =
                    data.humidity !== null ? data.humidity + '%' : '--';

                const statusEl = document.getElementById('status');
                if (data.error) {
                    statusEl.className = 'status error';
                    statusEl.textContent = '⚠️ ' + data.error;
                } else {
                    statusEl.className = 'status ok';
                    statusEl.textContent = '✅ 센서 정상 작동 중';

                    // 히스토리 추가
                    const now = new Date().toLocaleTimeString('ko-KR');
                    history.unshift({
                        time: now,
                        temp: data.temperature,
                        humidity: data.humidity
                    });
                    if (history.length > MAX_HISTORY) history.pop();
                    updateHistory();
                }

                document.getElementById('update-time').textContent =
                    '마지막 업데이트: ' + new Date().toLocaleTimeString('ko-KR');

            } catch (err) {
                document.getElementById('status').className = 'status error';
                document.getElementById('status').textContent = '⚠️ 서버 연결 실패';
            }

            setTimeout(() => card.classList.remove('updating'), 500);
        }

        function updateHistory() {
            const listEl = document.getElementById('history-list');
            if (history.length === 0) {
                listEl.innerHTML = '데이터 수집 중...';
                return;
            }

            listEl.innerHTML = history.map(h => `
                <div class="history-item">
                    <span>${h.time}</span>
                    <span>🌡️ ${h.temp}°C | 💧 ${h.humidity}%</span>
                </div>
            `).join('');
        }

        // 초기 로드
        fetchSensorData();

        // 3초마다 갱신
        setInterval(fetchSensorData, 3000);
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/sensor')
def api_sensor():
    temp, humidity, error = sensor.read()
    return jsonify({
        'temperature': temp,
        'humidity': humidity,
        'error': error,
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
    })

if __name__ == '__main__':
    print("=" * 50)
    print("  AHT20 온습도 센서 웹 모니터")
    print("=" * 50)
    print(f"\n센서 상태: {'정상' if sensor.initialized else '오류'}")
    if sensor.error_msg:
        print(f"오류 내용: {sensor.error_msg}")
    print(f"\n웹 서버: http://0.0.0.0:4000")
    print("\nCtrl+C로 종료\n")
    print("-" * 50)

    app.run(host='0.0.0.0', port=4000, debug=False)
