from flask import Flask, jsonify, render_template_string
import subprocess
import json

app = Flask(__name__)

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Galaxy M53 Sensor Monitor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh; color: #fff; padding: 20px;
        }
        h1 { text-align: center; margin-bottom: 20px; color: #00d9ff; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 15px; }
        .card {
            background: rgba(255,255,255,0.1); border-radius: 15px;
            padding: 20px; backdrop-filter: blur(10px);
        }
        .card h3 { color: #00d9ff; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
        .card h3::before { content: ""; width: 10px; height: 10px; background: #00ff88; border-radius: 50%; }
        .value { font-size: 24px; font-weight: bold; margin: 5px 0; }
        .label { color: #888; font-size: 12px; }
        .bar-container { height: 8px; background: rgba(255,255,255,0.2); border-radius: 4px; margin: 5px 0; }
        .bar { height: 100%; border-radius: 4px; transition: width 0.3s; }
        .bar-x { background: #ff6b6b; }
        .bar-y { background: #4ecdc4; }
        .bar-z { background: #ffe66d; }
        .status { text-align: center; padding: 10px; color: #00ff88; }
        .btn {
            background: #00d9ff; border: none; padding: 10px 20px;
            border-radius: 8px; color: #000; font-weight: bold;
            cursor: pointer; margin: 5px;
        }
        .btn:hover { background: #00b8d9; }
        .controls { text-align: center; margin-bottom: 20px; }
        .xyz { display: flex; gap: 20px; flex-wrap: wrap; }
        .xyz > div { flex: 1; min-width: 80px; }
    </style>
</head>
<body>
    <h1>Galaxy M53 Sensor Monitor</h1>
    <div class="controls">
        <button class="btn" onclick="toggleUpdate()">Start/Stop</button>
        <button class="btn" onclick="updateAll()">Refresh</button>
    </div>
    <div class="status" id="status">Ready</div>
    <div class="grid">
        <div class="card">
            <h3>Accelerometer</h3>
            <div class="xyz">
                <div><div class="label">X</div><div class="value" id="acc-x">-</div>
                    <div class="bar-container"><div class="bar bar-x" id="acc-x-bar" style="width:50%"></div></div></div>
                <div><div class="label">Y</div><div class="value" id="acc-y">-</div>
                    <div class="bar-container"><div class="bar bar-y" id="acc-y-bar" style="width:50%"></div></div></div>
                <div><div class="label">Z</div><div class="value" id="acc-z">-</div>
                    <div class="bar-container"><div class="bar bar-z" id="acc-z-bar" style="width:50%"></div></div></div>
            </div>
        </div>
        <div class="card">
            <h3>Gyroscope</h3>
            <div class="xyz">
                <div><div class="label">X</div><div class="value" id="gyro-x">-</div></div>
                <div><div class="label">Y</div><div class="value" id="gyro-y">-</div></div>
                <div><div class="label">Z</div><div class="value" id="gyro-z">-</div></div>
            </div>
        </div>
        <div class="card">
            <h3>Magnetometer</h3>
            <div class="xyz">
                <div><div class="label">X</div><div class="value" id="mag-x">-</div></div>
                <div><div class="label">Y</div><div class="value" id="mag-y">-</div></div>
                <div><div class="label">Z</div><div class="value" id="mag-z">-</div></div>
            </div>
        </div>
        <div class="card">
            <h3>Light Sensor</h3>
            <div class="value" id="light">-</div>
            <div class="label">lux</div>
            <div class="bar-container"><div class="bar bar-y" id="light-bar" style="width:0%"></div></div>
        </div>
        <div class="card">
            <h3>Proximity</h3>
            <div class="value" id="proximity">-</div>
            <div class="label">cm</div>
        </div>
        <div class="card">
            <h3>Battery</h3>
            <div class="value" id="battery">-</div>
            <div class="label" id="battery-status">-</div>
            <div class="bar-container"><div class="bar bar-y" id="battery-bar" style="width:0%"></div></div>
        </div>
        <div class="card">
            <h3>Step Counter</h3>
            <div class="value" id="steps">-</div>
            <div class="label">steps today</div>
        </div>
        <div class="card">
            <h3>Orientation</h3>
            <div class="xyz">
                <div><div class="label">Azimuth</div><div class="value" id="ori-x">-</div></div>
                <div><div class="label">Pitch</div><div class="value" id="ori-y">-</div></div>
                <div><div class="label">Roll</div><div class="value" id="ori-z">-</div></div>
            </div>
        </div>
    </div>
    <script>
        let interval = null;
        let running = false;

        function toggleUpdate() {
            if (running) {
                clearInterval(interval);
                document.getElementById("status").textContent = "Stopped";
            } else {
                interval = setInterval(updateAll, 1000);
                document.getElementById("status").textContent = "Running...";
            }
            running = !running;
        }

        async function updateAll() {
            try {
                const res = await fetch("/api/sensors");
                const data = await res.json();

                if (data.accelerometer) {
                    document.getElementById("acc-x").textContent = data.accelerometer.x.toFixed(2);
                    document.getElementById("acc-y").textContent = data.accelerometer.y.toFixed(2);
                    document.getElementById("acc-z").textContent = data.accelerometer.z.toFixed(2);
                    document.getElementById("acc-x-bar").style.width = (50 + data.accelerometer.x * 5) + "%";
                    document.getElementById("acc-y-bar").style.width = (50 + data.accelerometer.y * 5) + "%";
                    document.getElementById("acc-z-bar").style.width = (50 + data.accelerometer.z * 5) + "%";
                }
                if (data.gyroscope) {
                    document.getElementById("gyro-x").textContent = data.gyroscope.x.toFixed(3);
                    document.getElementById("gyro-y").textContent = data.gyroscope.y.toFixed(3);
                    document.getElementById("gyro-z").textContent = data.gyroscope.z.toFixed(3);
                }
                if (data.magnetometer) {
                    document.getElementById("mag-x").textContent = data.magnetometer.x.toFixed(1);
                    document.getElementById("mag-y").textContent = data.magnetometer.y.toFixed(1);
                    document.getElementById("mag-z").textContent = data.magnetometer.z.toFixed(1);
                }
                if (data.light !== undefined && data.light !== null) {
                    document.getElementById("light").textContent = data.light.toFixed(0);
                    document.getElementById("light-bar").style.width = Math.min(data.light / 10, 100) + "%";
                }
                if (data.proximity !== undefined && data.proximity !== null) {
                    document.getElementById("proximity").textContent = data.proximity;
                }
                if (data.battery) {
                    document.getElementById("battery").textContent = data.battery.percentage + "%";
                    document.getElementById("battery-status").textContent = data.battery.status;
                    document.getElementById("battery-bar").style.width = data.battery.percentage + "%";
                }
                if (data.steps !== undefined && data.steps !== null) {
                    document.getElementById("steps").textContent = data.steps;
                }
                if (data.orientation) {
                    document.getElementById("ori-x").textContent = data.orientation.azimuth.toFixed(1) + String.fromCharCode(176);
                    document.getElementById("ori-y").textContent = data.orientation.pitch.toFixed(1) + String.fromCharCode(176);
                    document.getElementById("ori-z").textContent = data.orientation.roll.toFixed(1) + String.fromCharCode(176);
                }
            } catch (e) {
                document.getElementById("status").textContent = "Error: " + e.message;
            }
        }
    </script>
</body>
</html>
'''

def get_sensor(sensor_name, count=1):
    try:
        result = subprocess.run(
            ["termux-sensor", "-s", sensor_name, "-n", str(count)],
            capture_output=True, text=True, timeout=5
        )
        data = json.loads(result.stdout)
        # Format: {"SensorName": {"values": [...]}}
        if data and sensor_name in data:
            return data[sensor_name].get("values", [])
    except:
        pass
    return None

def get_battery():
    try:
        result = subprocess.run(["termux-battery-status"], capture_output=True, text=True, timeout=5)
        return json.loads(result.stdout)
    except:
        return None

@app.route("/")
def index():
    return render_template_string(HTML_TEMPLATE)

@app.route("/api/sensors")
def sensors():
    data = {}

    # Accelerometer
    acc = get_sensor("LSM6DSL Accelerometer")
    if acc and len(acc) >= 3:
        data["accelerometer"] = {"x": acc[0], "y": acc[1], "z": acc[2]}

    # Gyroscope
    gyro = get_sensor("LSM6DSL Gyroscope")
    if gyro and len(gyro) >= 3:
        data["gyroscope"] = {"x": gyro[0], "y": gyro[1], "z": gyro[2]}

    # Magnetometer
    mag = get_sensor("MMC5633 Magnetometer")
    if mag and len(mag) >= 3:
        data["magnetometer"] = {"x": mag[0], "y": mag[1], "z": mag[2]}

    # Light
    light = get_sensor("STK33910 Light")
    if light and len(light) >= 1:
        data["light"] = light[0]

    # Proximity
    prox = get_sensor("STK33910 Proximity")
    if prox and len(prox) >= 1:
        data["proximity"] = prox[0]

    # Step Counter
    steps = get_sensor("Step Counter")
    if steps and len(steps) >= 1:
        data["steps"] = int(steps[0])

    # Orientation
    ori = get_sensor("Samsung Orientation Sensor")
    if ori and len(ori) >= 3:
        data["orientation"] = {"azimuth": ori[0], "pitch": ori[1], "roll": ori[2]}

    # Battery
    battery = get_battery()
    if battery:
        data["battery"] = {
            "percentage": battery.get("percentage", 0),
            "status": battery.get("status", "unknown")
        }

    return jsonify(data)

if __name__ == "__main__":
    print("Starting Sensor Monitor...")
    print("Open http://192.168.0.12:5000 in your browser")
    app.run(host="0.0.0.0", port=5000, debug=False)
