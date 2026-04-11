from flask import Flask, render_template, request, jsonify, send_from_directory
import json
import os
import sys

app = Flask(__name__)

PROTO_DIR = r"C:\todo\today\aiHardStudy\prototype"
REQUEST_FILE = os.path.join(PROTO_DIR, "_request.json")
STATUS_FILE = os.path.join(PROTO_DIR, "_status.json")


@app.after_request
def add_no_cache(response):
    """브라우저 캐시 방지"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/manifest.json")
def manifest():
    m = {
        "name": "Vibe Firmware",
        "short_name": "VibeFW",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#0F172A",
        "theme_color": "#2563EB",
        "icons": [
            {"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}
        ]
    }
    return json.dumps(m), 200, {"Content-Type": "application/manifest+json"}


@app.route("/sw.js")
def service_worker():
    sw = "self.addEventListener('install',e=>{self.skipWaiting()});\n"
    sw += "self.addEventListener('activate',e=>{clients.claim()});\n"
    sw += "self.addEventListener('fetch',e=>{e.respondWith(fetch(e.request))});\n"
    return sw, 200, {"Content-Type": "application/javascript"}


@app.route("/wifi-qr")
def wifi_qr():
    return render_template("wifi_qr.html")


@app.route("/api/run", methods=["POST"])
def api_run():
    """프롬프트 실행 — 요청 파일 생성, 워커 데몬이 감지"""
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON 필요"}), 400

    prompt = data.get("prompt", "").strip()
    if not prompt:
        return jsonify({"error": "프롬프트를 입력해주세요"}), 400

    # 워커 상태 확인
    if os.path.exists(STATUS_FILE):
        with open(STATUS_FILE, "r", encoding="utf-8") as f:
            st = json.load(f)
        if st.get("state") in ("generating", "building"):
            return jsonify({"error": "이미 빌드 중입니다"}), 409

    # 상태를 queued로 초기화 (이전 상태 잔존 방지)
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump({"state": "queued", "message": "대기 중...", "code": "", "error": "", "elapsed": 0}, f)

    # 요청 파일 생성
    with open(REQUEST_FILE, "w", encoding="utf-8") as f:
        json.dump({"prompt": prompt}, f, ensure_ascii=False)

    print(f"[API] Request created: {prompt[:50]}...", flush=True)
    return jsonify({"status": "started"})


@app.route("/api/reset", methods=["POST"])
def api_reset():
    """상태 초기화 — 새 명령 준비"""
    with open(STATUS_FILE, "w", encoding="utf-8") as f:
        json.dump({"state": "idle", "message": "", "code": "", "error": "", "elapsed": 0}, f)
    return jsonify({"status": "reset"})


@app.route("/api/explain", methods=["POST"])
def api_explain():
    """생성된 코드를 초보자에게 설명 — 워커에 설명 요청"""
    data = request.get_json()
    code = data.get("code", "").strip()
    if not code:
        return jsonify({"error": "코드가 없습니다"}), 400

    # 설명 요청 파일 생성
    explain_req = os.path.join(PROTO_DIR, "_explain_request.json")
    explain_res = os.path.join(PROTO_DIR, "_explain_result.json")

    # 이전 결과 삭제
    if os.path.exists(explain_res):
        os.remove(explain_res)

    with open(explain_req, "w", encoding="utf-8") as f:
        json.dump({"code": code}, f, ensure_ascii=False)

    # 결과 대기 (최대 60초)
    import time
    for _ in range(120):
        time.sleep(0.5)
        if os.path.exists(explain_res):
            with open(explain_res, "r", encoding="utf-8") as f:
                result = json.load(f)
            os.remove(explain_res)
            return jsonify(result)

    return jsonify({"error": "설명 생성 타임아웃"}), 504


@app.route("/api/status")
def api_status():
    """워커 데몬의 상태 파일 읽기"""
    if os.path.exists(STATUS_FILE):
        with open(STATUS_FILE, "r", encoding="utf-8") as f:
            return jsonify(json.load(f))
    return jsonify({"state": "idle", "message": "", "code": "", "error": "", "elapsed": 0})


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    print(f"[Server] Request file: {REQUEST_FILE}", flush=True)
    print(f"[Server] Status file: {STATUS_FILE}", flush=True)
    app.run(host="0.0.0.0", port=5051, debug=False)
