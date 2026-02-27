"""
AI FanStick MVP - 하드웨어 테스트 서버
USB 시리얼로 ESP32-C3와 통신하는 웹 기반 테스트 도구
"""

import serial
import serial.tools.list_ports
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import uvicorn
import threading
import time

app = FastAPI(title="ESP32-C3 Hardware Tester")

# 시리얼 포트 설정
ser: Optional[serial.Serial] = None
serial_lock = threading.Lock()
read_buffer = []

class CommandRequest(BaseModel):
    command: str

class ColorRequest(BaseModel):
    r: int
    g: int
    b: int

class SerialConfig(BaseModel):
    port: str
    baudrate: int = 115200

def find_esp32_port():
    """ESP32 포트 자동 검색"""
    ports = serial.tools.list_ports.comports()
    for port in ports:
        if 'usbmodem' in port.device or 'usbserial' in port.device or 'CH340' in port.description:
            return port.device
    return None

def serial_reader():
    """시리얼 읽기 스레드"""
    global ser, read_buffer
    while True:
        if ser and ser.is_open:
            try:
                if ser.in_waiting:
                    line = ser.readline().decode('utf-8', errors='ignore').strip()
                    if line:
                        read_buffer.append(line)
                        if len(read_buffer) > 100:
                            read_buffer.pop(0)
                        print(f"[ESP32] {line}")
            except Exception as e:
                print(f"Serial read error: {e}")
        time.sleep(0.01)

# 시리얼 읽기 스레드 시작
reader_thread = threading.Thread(target=serial_reader, daemon=True)
reader_thread.start()

@app.get("/", response_class=HTMLResponse)
async def index():
    """메인 테스트 페이지"""
    return """
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ESP32-C3 Hardware Tester</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #1a1a2e;
            color: #eee;
            min-height: 100vh;
            padding: 20px;
        }
        h1 { text-align: center; margin-bottom: 20px; color: #9c27b0; }
        .container { max-width: 800px; margin: 0 auto; }

        .section {
            background: #16213e;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .section h2 {
            font-size: 1.1em;
            margin-bottom: 15px;
            color: #bb86fc;
            border-bottom: 1px solid #333;
            padding-bottom: 8px;
        }

        /* 연결 상태 */
        .status {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        .status-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #f44336;
        }
        .status-dot.connected { background: #4caf50; }

        /* 버튼 */
        button {
            background: #9c27b0;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
        }
        button:hover { background: #7b1fa2; }
        button:disabled { background: #666; cursor: not-allowed; }

        /* 색상 선택 */
        .color-picker {
            display: flex;
            gap: 15px;
            align-items: center;
            flex-wrap: wrap;
        }
        .color-input {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .color-input label { font-size: 12px; color: #999; }
        .color-input input[type="range"] { width: 150px; }
        .color-input input[type="number"] {
            width: 60px;
            background: #0f3460;
            border: 1px solid #333;
            color: #fff;
            padding: 5px;
            border-radius: 4px;
        }
        .color-preview {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 3px solid #333;
        }

        /* 프리셋 색상 */
        .color-presets {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        .preset {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: transform 0.2s;
        }
        .preset:hover { transform: scale(1.1); border-color: #fff; }

        /* 패턴 버튼 */
        .pattern-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .pattern-buttons button {
            flex: 1;
            min-width: 100px;
        }

        /* 버저 */
        .buzzer-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        /* 텍스트 입력 */
        .text-input {
            display: flex;
            gap: 10px;
        }
        .text-input input {
            flex: 1;
            background: #0f3460;
            border: 1px solid #333;
            color: #fff;
            padding: 10px;
            border-radius: 8px;
            font-size: 14px;
        }

        /* 로그 */
        .log {
            background: #0a0a15;
            border-radius: 8px;
            padding: 15px;
            height: 200px;
            overflow-y: auto;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 12px;
        }
        .log-line { margin: 2px 0; }
        .log-line.sent { color: #4caf50; }
        .log-line.received { color: #2196f3; }
        .log-line.error { color: #f44336; }

        /* 커맨드 입력 */
        .command-input {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        .command-input input {
            flex: 1;
            background: #0f3460;
            border: 1px solid #333;
            color: #fff;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ESP32-C3 Hardware Tester</h1>

        <!-- 연결 상태 -->
        <div class="section">
            <h2>Connection</h2>
            <div class="status">
                <div class="status-dot" id="statusDot"></div>
                <span id="statusText">Disconnected</span>
                <span id="portName" style="color:#666; margin-left:auto;"></span>
            </div>
            <button onclick="connect()">Connect</button>
            <button onclick="disconnect()" style="background:#f44336;">Disconnect</button>
            <button onclick="refreshPorts()" style="background:#666;">Refresh Ports</button>
        </div>

        <!-- LED 색상 -->
        <div class="section">
            <h2>LED Color (WS2812)</h2>
            <div class="color-picker">
                <div class="color-input">
                    <label>Red</label>
                    <input type="range" id="redSlider" min="0" max="255" value="128" oninput="updateColor()">
                    <input type="number" id="redValue" min="0" max="255" value="128" oninput="updateColorFromNumber()">
                </div>
                <div class="color-input">
                    <label>Green</label>
                    <input type="range" id="greenSlider" min="0" max="255" value="0" oninput="updateColor()">
                    <input type="number" id="greenValue" min="0" max="255" value="0" oninput="updateColorFromNumber()">
                </div>
                <div class="color-input">
                    <label>Blue</label>
                    <input type="range" id="blueSlider" min="0" max="255" value="128" oninput="updateColor()">
                    <input type="number" id="blueValue" min="0" max="255" value="128" oninput="updateColorFromNumber()">
                </div>
                <div class="color-preview" id="colorPreview" style="background:rgb(128,0,128)"></div>
            </div>
            <button onclick="sendColor()" style="margin-top:15px;">Send Color</button>

            <div class="color-presets">
                <div class="preset" style="background:#ff0000" onclick="setPreset(255,0,0)" title="Red"></div>
                <div class="preset" style="background:#00ff00" onclick="setPreset(0,255,0)" title="Green"></div>
                <div class="preset" style="background:#0000ff" onclick="setPreset(0,0,255)" title="Blue"></div>
                <div class="preset" style="background:#ffff00" onclick="setPreset(255,255,0)" title="Yellow"></div>
                <div class="preset" style="background:#ff00ff" onclick="setPreset(255,0,255)" title="Magenta"></div>
                <div class="preset" style="background:#00ffff" onclick="setPreset(0,255,255)" title="Cyan"></div>
                <div class="preset" style="background:#ffffff" onclick="setPreset(255,255,255)" title="White"></div>
                <div class="preset" style="background:#800080" onclick="setPreset(128,0,128)" title="Purple (BTS)"></div>
                <div class="preset" style="background:#ffd700" onclick="setPreset(255,215,0)" title="Gold"></div>
                <div class="preset" style="background:#ff69b4" onclick="setPreset(255,105,180)" title="Pink"></div>
            </div>
        </div>

        <!-- LED 패턴 -->
        <div class="section">
            <h2>LED Patterns</h2>
            <div class="pattern-buttons">
                <button onclick="sendPattern('solid')">Solid</button>
                <button onclick="sendPattern('rainbow')">Rainbow</button>
                <button onclick="sendPattern('pulse')">Pulse</button>
                <button onclick="sendPattern('blink')">Blink</button>
                <button onclick="sendPattern('wave')">Wave</button>
            </div>
        </div>

        <!-- 버저 -->
        <div class="section">
            <h2>Buzzer</h2>
            <div class="buzzer-buttons">
                <button onclick="sendBuzzer('ack')">Ack</button>
                <button onclick="sendBuzzer('beep')">Beep</button>
                <button onclick="sendBuzzer('error')">Error</button>
                <button onclick="sendBuzzer('success')">Success</button>
                <button onclick="sendBuzzer('connect')">Connect</button>
            </div>
        </div>

        <!-- OLED 텍스트 -->
        <div class="section">
            <h2>OLED Display</h2>
            <div class="text-input">
                <input type="text" id="oledText" placeholder="Enter text to display..." maxlength="84">
                <button onclick="sendText()">Send</button>
            </div>
        </div>

        <!-- 로그 -->
        <div class="section">
            <h2>Serial Log</h2>
            <div class="log" id="log"></div>
            <div class="command-input">
                <input type="text" id="rawCommand" placeholder="Raw command (e.g., C:255,0,0)" onkeypress="if(event.key==='Enter')sendRaw()">
                <button onclick="sendRaw()">Send</button>
                <button onclick="clearLog()" style="background:#666;">Clear</button>
            </div>
        </div>
    </div>

    <script>
        let isConnected = false;
        let logPollInterval = null;

        function log(msg, type = '') {
            const logDiv = document.getElementById('log');
            const line = document.createElement('div');
            line.className = 'log-line ' + type;
            line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
            logDiv.appendChild(line);
            logDiv.scrollTop = logDiv.scrollHeight;
        }

        async function connect() {
            try {
                const res = await fetch('/api/connect', { method: 'POST' });
                const data = await res.json();
                if (data.success) {
                    isConnected = true;
                    document.getElementById('statusDot').classList.add('connected');
                    document.getElementById('statusText').textContent = 'Connected';
                    document.getElementById('portName').textContent = data.port;
                    log('Connected to ' + data.port, 'sent');
                    startLogPolling();
                } else {
                    log('Connection failed: ' + data.message, 'error');
                }
            } catch (e) {
                log('Error: ' + e.message, 'error');
            }
        }

        async function disconnect() {
            try {
                await fetch('/api/disconnect', { method: 'POST' });
                isConnected = false;
                document.getElementById('statusDot').classList.remove('connected');
                document.getElementById('statusText').textContent = 'Disconnected';
                document.getElementById('portName').textContent = '';
                log('Disconnected', 'sent');
                stopLogPolling();
            } catch (e) {
                log('Error: ' + e.message, 'error');
            }
        }

        async function refreshPorts() {
            try {
                const res = await fetch('/api/ports');
                const data = await res.json();
                log('Available ports: ' + data.ports.join(', '), 'received');
            } catch (e) {
                log('Error: ' + e.message, 'error');
            }
        }

        function updateColor() {
            const r = document.getElementById('redSlider').value;
            const g = document.getElementById('greenSlider').value;
            const b = document.getElementById('blueSlider').value;
            document.getElementById('redValue').value = r;
            document.getElementById('greenValue').value = g;
            document.getElementById('blueValue').value = b;
            document.getElementById('colorPreview').style.background = `rgb(${r},${g},${b})`;
        }

        function updateColorFromNumber() {
            const r = document.getElementById('redValue').value;
            const g = document.getElementById('greenValue').value;
            const b = document.getElementById('blueValue').value;
            document.getElementById('redSlider').value = r;
            document.getElementById('greenSlider').value = g;
            document.getElementById('blueSlider').value = b;
            document.getElementById('colorPreview').style.background = `rgb(${r},${g},${b})`;
        }

        function setPreset(r, g, b) {
            document.getElementById('redSlider').value = r;
            document.getElementById('greenSlider').value = g;
            document.getElementById('blueSlider').value = b;
            updateColor();
            sendColor();
        }

        async function sendColor() {
            const r = document.getElementById('redSlider').value;
            const g = document.getElementById('greenSlider').value;
            const b = document.getElementById('blueSlider').value;
            await sendCommand(`C:${r},${g},${b}`);
        }

        async function sendPattern(pattern) {
            await sendCommand(`P:${pattern}`);
        }

        async function sendBuzzer(pattern) {
            await sendCommand(`B:${pattern}`);
        }

        async function sendText() {
            const text = document.getElementById('oledText').value;
            if (text) {
                await sendCommand(`T:${text}`);
            }
        }

        async function sendRaw() {
            const cmd = document.getElementById('rawCommand').value;
            if (cmd) {
                await sendCommand(cmd);
                document.getElementById('rawCommand').value = '';
            }
        }

        async function sendCommand(cmd) {
            log('> ' + cmd, 'sent');
            try {
                const res = await fetch('/api/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ command: cmd })
                });
                const data = await res.json();
                if (!data.success) {
                    log('Send failed: ' + data.message, 'error');
                }
            } catch (e) {
                log('Error: ' + e.message, 'error');
            }
        }

        async function pollLog() {
            try {
                const res = await fetch('/api/log');
                const data = await res.json();
                data.lines.forEach(line => log('< ' + line, 'received'));
            } catch (e) {}
        }

        function startLogPolling() {
            if (!logPollInterval) {
                logPollInterval = setInterval(pollLog, 500);
            }
        }

        function stopLogPolling() {
            if (logPollInterval) {
                clearInterval(logPollInterval);
                logPollInterval = null;
            }
        }

        function clearLog() {
            document.getElementById('log').innerHTML = '';
        }

        // 페이지 로드 시 상태 확인
        fetch('/api/status').then(r => r.json()).then(data => {
            if (data.connected) {
                isConnected = true;
                document.getElementById('statusDot').classList.add('connected');
                document.getElementById('statusText').textContent = 'Connected';
                document.getElementById('portName').textContent = data.port;
                startLogPolling();
            }
        });
    </script>
</body>
</html>
"""

@app.get("/api/ports")
async def list_ports():
    """사용 가능한 시리얼 포트 목록"""
    ports = serial.tools.list_ports.comports()
    return {"ports": [p.device for p in ports]}

@app.get("/api/status")
async def get_status():
    """연결 상태 확인"""
    global ser
    if ser and ser.is_open:
        return {"connected": True, "port": ser.port}
    return {"connected": False, "port": None}

@app.post("/api/connect")
async def connect_serial(config: Optional[SerialConfig] = None):
    """시리얼 포트 연결"""
    global ser

    if ser and ser.is_open:
        return {"success": True, "port": ser.port, "message": "Already connected"}

    port = config.port if config else find_esp32_port()
    baudrate = config.baudrate if config else 115200

    if not port:
        raise HTTPException(status_code=404, detail="ESP32 port not found")

    try:
        ser = serial.Serial(port, baudrate, timeout=1)
        time.sleep(2)  # ESP32 리셋 대기
        return {"success": True, "port": port, "message": "Connected"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/disconnect")
async def disconnect_serial():
    """시리얼 포트 연결 해제"""
    global ser
    if ser and ser.is_open:
        ser.close()
        ser = None
    return {"success": True}

@app.post("/api/send")
async def send_command(req: CommandRequest):
    """명령 전송"""
    global ser
    if not ser or not ser.is_open:
        raise HTTPException(status_code=400, detail="Not connected")

    try:
        with serial_lock:
            cmd = req.command + '\n'
            ser.write(cmd.encode())
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/log")
async def get_log():
    """읽기 버퍼 내용 반환"""
    global read_buffer
    lines = read_buffer.copy()
    read_buffer.clear()
    return {"lines": lines}

@app.post("/api/color")
async def set_color(req: ColorRequest):
    """LED 색상 설정 (편의 API)"""
    return await send_command(CommandRequest(command=f"C:{req.r},{req.g},{req.b}"))

if __name__ == "__main__":
    print("=" * 50)
    print("ESP32-C3 Hardware Tester")
    print("=" * 50)
    print("Open: http://localhost:8081")
    print("=" * 50)

    uvicorn.run(app, host="0.0.0.0", port=8081)
