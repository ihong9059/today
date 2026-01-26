#!/usr/bin/env python3
"""
WS2812 LED 테스트 웹 (Jetson Nano)

포트: 8082
사용법: sudo python3 app.py
"""

import time
import threading
from flask import Flask, render_template_string, jsonify

# LED 설정
LED_COUNT = 64
LED_PIN = 18
LED_BRIGHTNESS = 0.33  # 1/3 밝기

app = Flask(__name__)

# LED 상태
led_strip = None
is_running = False
current_led = -1
led_initialized = False

def init_led():
    """LED 초기화 - 시뮬레이션 모드"""
    global led_strip, led_initialized

    # 현재는 시뮬레이션 모드만 지원
    print("[INFO] UI 시뮬레이션 모드로 동작")
    led_initialized = False
    return False

def set_pixel(index, r, g, b):
    """개별 LED 색상 설정"""
    global led_strip
    if not led_strip:
        return

    try:
        # neopixel 방식
        if hasattr(led_strip, '__setitem__'):
            led_strip[index] = (r, g, b)
        # rpi_ws281x 방식
        elif hasattr(led_strip, 'setPixelColor'):
            from rpi_ws281x import Color
            led_strip.setPixelColor(index, Color(r, g, b))
    except Exception as e:
        print(f"LED 설정 오류: {e}")

def show_pixels():
    """LED 업데이트"""
    global led_strip
    if not led_strip:
        return
    try:
        led_strip.show()
    except Exception as e:
        print(f"LED show 오류: {e}")

def clear_leds():
    """모든 LED 끄기"""
    global led_strip, current_led
    current_led = -1
    if led_strip:
        for i in range(LED_COUNT):
            set_pixel(i, 0, 0, 0)
        show_pixels()

def run_sequence():
    """LED 순차 점등"""
    global is_running, current_led

    is_running = True
    current_led = -1

    # 먼저 모든 LED 끄기
    clear_leds()
    time.sleep(0.3)

    # 순차 점등
    for i in range(LED_COUNT):
        if not is_running:
            break
        current_led = i
        set_pixel(i, 0, 255, 0)  # 초록색
        show_pixels()
        time.sleep(0.5)

    is_running = False

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WS2812 LED 테스트</title>
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
        .container { max-width: 700px; width: 100%; }
        h1 {
            text-align: center;
            color: #00d9ff;
            margin-bottom: 30px;
            font-size: 1.8rem;
        }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 20px;
            text-align: center;
        }
        .led-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 5px;
            margin: 20px 0;
        }
        .led {
            width: 100%;
            aspect-ratio: 1;
            background: #333;
            border-radius: 50%;
            border: 2px solid #444;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
            color: #888;
            font-weight: bold;
        }
        .led.on {
            background: #00ff00;
            box-shadow: 0 0 15px #00ff00;
            color: #000;
        }
        .led.current {
            background: #ffff00;
            box-shadow: 0 0 20px #ffff00;
            animation: pulse 0.5s infinite;
            color: #000;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.15); }
        }
        .btn-group { margin: 20px 0; }
        .btn {
            padding: 15px 30px;
            font-size: 1.1rem;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s;
            font-weight: bold;
        }
        .btn-start {
            background: linear-gradient(135deg, #00d9ff, #0099cc);
            color: white;
        }
        .btn-start:hover { transform: scale(1.05); }
        .btn-start:disabled {
            background: #666;
            cursor: not-allowed;
            transform: none;
        }
        .btn-stop {
            background: linear-gradient(135deg, #ff5722, #d32f2f);
            color: white;
        }
        .btn-clear {
            background: linear-gradient(135deg, #666, #444);
            color: white;
        }
        .status {
            margin-top: 20px;
            font-size: 1.2rem;
        }
        .status-running { color: #76ff03; }
        .status-stopped { color: #aaa; }
        .progress {
            margin-top: 15px;
            font-size: 2rem;
            color: #00d9ff;
        }
        .hw-status {
            margin-top: 10px;
            font-size: 0.9rem;
            padding: 5px 15px;
            border-radius: 20px;
            display: inline-block;
        }
        .hw-ok { background: rgba(0,255,0,0.2); color: #76ff03; }
        .hw-sim { background: rgba(255,165,0,0.2); color: #ffa500; }
        .info {
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            font-size: 0.9rem;
            color: #aaa;
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>WS2812 LED Test</h1>

        <div class="card">
            <div class="led-grid" id="led-grid"></div>

            <div class="btn-group">
                <button class="btn btn-start" id="btn-start" onclick="startSequence()">
                    START
                </button>
                <button class="btn btn-stop" onclick="stopSequence()">
                    STOP
                </button>
                <button class="btn btn-clear" onclick="clearLeds()">
                    CLEAR
                </button>
            </div>

            <div class="status" id="status">Ready</div>
            <div class="progress">LED: <span id="current">-</span> / 64</div>
            <div class="hw-status" id="hw-status">Checking...</div>
        </div>

        <div class="info">
            <p><strong>LED:</strong> 64 (8x8 Grid)</p>
            <p><strong>Brightness:</strong> 33%</p>
            <p><strong>Interval:</strong> 0.5 sec</p>
            <p><strong>GPIO:</strong> Pin 12 (GPIO18)</p>
        </div>
    </div>

    <script>
        // LED 그리드 생성
        const grid = document.getElementById('led-grid');
        for (let i = 0; i < 64; i++) {
            const led = document.createElement('div');
            led.className = 'led';
            led.id = 'led-' + i;
            led.textContent = i;
            grid.appendChild(led);
        }

        function updateStatus() {
            fetch('/api/status')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('current').textContent = data.current >= 0 ? data.current : '-';
                    document.getElementById('btn-start').disabled = data.running;

                    const statusEl = document.getElementById('status');
                    if (data.running) {
                        statusEl.textContent = 'Running...';
                        statusEl.className = 'status status-running';
                    } else {
                        statusEl.textContent = 'Ready';
                        statusEl.className = 'status status-stopped';
                    }

                    // HW 상태
                    const hwEl = document.getElementById('hw-status');
                    if (data.hw_ready) {
                        hwEl.textContent = 'HW Connected';
                        hwEl.className = 'hw-status hw-ok';
                    } else {
                        hwEl.textContent = 'Simulation Mode';
                        hwEl.className = 'hw-status hw-sim';
                    }

                    // LED 상태 업데이트
                    for (let i = 0; i < 64; i++) {
                        const led = document.getElementById('led-' + i);
                        led.className = 'led';
                        if (i < data.current) {
                            led.classList.add('on');
                        }
                        if (i === data.current && data.running) {
                            led.classList.add('current');
                        }
                    }
                });
        }

        function startSequence() {
            fetch('/api/start', { method: 'POST' });
        }

        function stopSequence() {
            fetch('/api/stop', { method: 'POST' });
        }

        function clearLeds() {
            fetch('/api/clear', { method: 'POST' });
            for (let i = 0; i < 64; i++) {
                document.getElementById('led-' + i).className = 'led';
            }
        }

        setInterval(updateStatus, 300);
        updateStatus();
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route('/api/status')
def api_status():
    return jsonify({
        'running': is_running,
        'current': current_led,
        'total': LED_COUNT,
        'hw_ready': led_initialized
    })

@app.route('/api/start', methods=['POST'])
def api_start():
    global is_running
    if not is_running:
        thread = threading.Thread(target=run_sequence)
        thread.daemon = True
        thread.start()
    return jsonify({'status': 'started'})

@app.route('/api/stop', methods=['POST'])
def api_stop():
    global is_running
    is_running = False
    time.sleep(0.1)
    clear_leds()
    return jsonify({'status': 'stopped'})

@app.route('/api/clear', methods=['POST'])
def api_clear():
    global is_running
    is_running = False
    clear_leds()
    return jsonify({'status': 'cleared'})

if __name__ == '__main__':
    import sys
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8082

    print("=" * 50)
    print("  WS2812 LED Test Web")
    print("=" * 50)
    print(f"\nLED Count: {LED_COUNT}")
    print(f"Brightness: {int(LED_BRIGHTNESS*100)}%")

    init_led()

    print(f"\nWeb Server: http://0.0.0.0:{port}")
    print("Press Ctrl+C to exit\n")
    print("-" * 50)

    app.run(host='0.0.0.0', port=port, debug=False, threaded=True)
