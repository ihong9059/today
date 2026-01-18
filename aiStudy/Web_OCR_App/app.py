#!/usr/bin/env python3
"""
Web OCR App - Lenovo Tablet
IP Webcam에서 이미지를 가져와 OCR 수행 (EasyOCR 사용)
Flask 웹 서버로 결과 표시 (실시간 영상 미리보기 포함)
"""

from flask import Flask, render_template_string, request, jsonify, Response
from PIL import Image
import easyocr
import numpy as np
import requests
from io import BytesIO
import base64
import time

# EasyOCR Reader 초기화 (한국어 + 영어)
print("EasyOCR 모델 로딩 중... (처음 실행시 시간이 걸립니다)")
reader = easyocr.Reader(['ko', 'en'], gpu=False)
print("EasyOCR 모델 로딩 완료!")

app = Flask(__name__)

# 기본 IP Webcam 주소
DEFAULT_WEBCAM_URL = "http://192.168.0.32:8080"

# HTML 템플릿
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web OCR App - EasyOCR</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            color: white;
            padding: 20px;
        }
        .container { max-width: 900px; margin: 0 auto; }
        h1 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 1.8em;
            background: linear-gradient(90deg, #00d4ff, #7b2cbf);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card {
            background: rgba(255,255,255,0.1);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
        }
        .input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }
        input[type="text"] {
            flex: 1;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            background: rgba(255,255,255,0.2);
            color: white;
            min-width: 200px;
        }
        input::placeholder { color: rgba(255,255,255,0.5); }
        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-primary {
            background: linear-gradient(90deg, #00d4ff, #7b2cbf);
            color: white;
        }
        .btn-primary:hover { transform: scale(1.05); }
        .btn-secondary {
            background: rgba(255,255,255,0.2);
            color: white;
        }
        .preview-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        @media (max-width: 600px) {
            .preview-container { grid-template-columns: 1fr; }
        }
        .preview-box {
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 10px;
            text-align: center;
        }
        .preview-box h3 {
            margin-bottom: 10px;
            font-size: 0.9em;
            color: #00d4ff;
        }
        .preview-box img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            background: rgba(0,0,0,0.5);
            object-fit: contain;
        }
        .result-box {
            background: rgba(0,0,0,0.3);
            border-radius: 10px;
            padding: 15px;
            min-height: 100px;
            white-space: pre-wrap;
            font-family: monospace;
            font-size: 18px;
            line-height: 1.6;
            text-align: center;
            color: #2ed573;
        }
        .status {
            text-align: center;
            padding: 10px;
            font-size: 0.9em;
            color: #888;
        }
        .loading {
            display: none;
            text-align: center;
            padding: 20px;
        }
        .loading.active { display: block; }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255,255,255,0.3);
            border-top-color: #00d4ff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .info {
            font-size: 0.8em;
            color: #888;
            text-align: center;
            margin-top: 20px;
        }
        .live-indicator {
            display: inline-block;
            width: 10px;
            height: 10px;
            background: #ff4757;
            border-radius: 50%;
            margin-right: 5px;
            animation: blink 1s infinite;
        }
        .live-indicator.active {
            background: #2ed573;
        }
        @keyframes blink {
            50% { opacity: 0.5; }
        }
        .frozen {
            border: 3px solid #ffa502;
        }
        .tip {
            background: rgba(255,165,2,0.2);
            border-left: 3px solid #ffa502;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 0.85em;
            border-radius: 0 8px 8px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Web OCR App (EasyOCR)</h1>

        <div class="card">
            <div class="tip">
                팁: 번호판을 화면 중앙에 크게 배치하면 인식률이 높아집니다!
            </div>
            <div class="input-group">
                <input type="text" id="webcamUrl" placeholder="IP Webcam URL" value="{{ webcam_url }}">
                <button class="btn btn-secondary" onclick="updateUrl()">연결</button>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn btn-primary" onclick="captureAndOCR()" id="captureBtn" style="flex: 1;">캡처 & 인식</button>
                <button class="btn btn-secondary" onclick="clearResult()">초기화</button>
            </div>
        </div>

        <div class="loading" id="loading">
            <div class="spinner"></div>
            <p>OCR 처리 중...</p>
        </div>

        <div class="card">
            <div class="preview-container">
                <div class="preview-box">
                    <h3><span class="live-indicator" id="liveIndicator"></span>실시간 영상</h3>
                    <img id="livePreview" src="" alt="실시간 영상">
                </div>
                <div class="preview-box">
                    <h3>OCR 처리된 이미지</h3>
                    <img id="capturedImage" src="" alt="처리된 이미지">
                </div>
            </div>
        </div>

        <div class="card">
            <h3 style="margin-bottom: 10px; color: #00d4ff;">인식 결과</h3>
            <div class="result-box" id="ocrResult">캡처 버튼을 눌러 시작하세요</div>
        </div>

        <p class="status" id="status">대기 중</p>

        <p class="info">
            Windows PC (i5-1235U) | EasyOCR (한국어+영어) | Python Flask<br>
            서버: {{ webcam_url }}
        </p>
    </div>

    <script>
        let webcamUrl = "{{ webcam_url }}";
        let streamInterval = null;
        let isFrozen = false;

        function updateUrl() {
            webcamUrl = document.getElementById("webcamUrl").value;
            document.getElementById("status").textContent = "URL 설정됨: " + webcamUrl;
            startStream();
        }

        function startStream() {
            if (streamInterval) {
                clearInterval(streamInterval);
            }

            const livePreview = document.getElementById("livePreview");
            const liveIndicator = document.getElementById("liveIndicator");

            // 서버를 통해 프록시로 이미지 가져오기 (서버와 동일한 이미지 보장)
            streamInterval = setInterval(() => {
                if (!isFrozen) {
                    const timestamp = new Date().getTime();
                    livePreview.src = "/proxy_image?t=" + timestamp;
                    liveIndicator.classList.add("active");
                }
            }, 500);

            livePreview.onerror = () => {
                liveIndicator.classList.remove("active");
                document.getElementById("status").textContent = "영상 연결 실패";
            };
        }

        async function captureAndOCR() {
            const loading = document.getElementById("loading");
            const status = document.getElementById("status");
            const resultBox = document.getElementById("ocrResult");
            const capturedImage = document.getElementById("capturedImage");
            const captureBtn = document.getElementById("captureBtn");

            // 스트림 멈추고 버튼 비활성화
            isFrozen = true;
            captureBtn.disabled = true;
            captureBtn.textContent = "처리 중...";

            loading.classList.add("active");
            status.textContent = "서버에서 이미지 캡처 및 OCR 처리 중...";

            try {
                // 서버에 webcam URL 전송 → 서버가 캡처 + OCR 수행 + 이미지 반환
                const response = await fetch("/capture", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ webcam_url: webcamUrl })
                });

                const data = await response.json();

                if (data.success) {
                    // 서버가 처리한 바로 그 이미지를 표시
                    capturedImage.src = "data:image/jpeg;base64," + data.image;
                    capturedImage.classList.add("frozen");
                    resultBox.textContent = data.text || "(인식된 텍스트 없음)";
                    status.textContent = "처리 시간: " + data.time.toFixed(2) + "초";
                } else {
                    resultBox.textContent = "오류: " + data.error;
                    status.textContent = "오류 발생";
                }
            } catch (error) {
                resultBox.textContent = "오류: " + error.message;
                status.textContent = "연결 오류";
            }

            loading.classList.remove("active");
            captureBtn.disabled = false;
            captureBtn.textContent = "캡처 & 인식";
        }

        function clearResult() {
            document.getElementById("ocrResult").textContent = "캡처 버튼을 눌러 시작하세요";
            document.getElementById("capturedImage").src = "";
            document.getElementById("capturedImage").classList.remove("frozen");
            document.getElementById("status").textContent = "대기 중";
            isFrozen = false;
        }

        window.onload = startStream;
    </script>
</body>
</html>
'''


@app.route("/")
def index():
    return render_template_string(HTML_TEMPLATE, webcam_url=DEFAULT_WEBCAM_URL)

# 최신 캡처 이미지 저장 (전역)
latest_image_bytes = None

@app.route("/proxy_image")
def proxy_image():
    """IP Webcam 이미지를 프록시로 제공하고 최신 이미지 저장"""
    global latest_image_bytes
    try:
        shot_url = f"{DEFAULT_WEBCAM_URL}/shot.jpg"
        response = requests.get(shot_url, timeout=5)
        response.raise_for_status()
        latest_image_bytes = response.content
        return Response(latest_image_bytes, mimetype='image/jpeg')
    except:
        return Response(status=503)

@app.route("/capture", methods=["POST"])
def capture():
    """캡처 버튼 클릭 시 호출 - 그 순간 이미지를 가져와서 OCR 처리"""
    start_time = time.time()

    try:
        data = request.get_json()
        webcam_url = data.get("webcam_url", DEFAULT_WEBCAM_URL)

        # 캡처 버튼을 누른 순간의 이미지를 가져옴
        shot_url = f"{webcam_url}/shot.jpg"
        response = requests.get(shot_url, timeout=10)
        response.raise_for_status()

        # 이 이미지를 OCR 처리 AND 클라이언트에게 반환 (동일한 이미지 보장)
        image_bytes = response.content
        image = Image.open(BytesIO(image_bytes))

        # 디버깅: 캡처한 이미지를 파일로 저장
        debug_path = "C:/todo/today/ocr_captured.jpg"
        with open(debug_path, "wb") as f:
            f.write(image_bytes)
        print(f"[DEBUG] 캡처 이미지 저장: {debug_path}, 크기: {image.size}")

        # 2. OCR 수행
        img_array = np.array(image)
        results = reader.readtext(img_array)

        # 결과 텍스트 추출 (신뢰도 0.3 이상만)
        text_lines = []
        for (bbox, text, confidence) in results:
            if confidence > 0.3:
                text_lines.append(f"{text} ({confidence:.0%})")

        final_text = '\n'.join(text_lines) if text_lines else '(인식된 텍스트 없음)'

        # 3. 캡처한 이미지를 base64로 인코딩하여 클라이언트에 반환
        img_base64 = base64.b64encode(image_bytes).decode()

        elapsed_time = time.time() - start_time

        return jsonify({
            "success": True,
            "text": final_text,
            "image": img_base64,  # OCR 처리한 바로 그 이미지
            "time": elapsed_time
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "success": False,
            "error": f"IP Webcam 연결 실패: {str(e)}"
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })

if __name__ == "__main__":
    print("="*50)
    print("Web OCR App - EasyOCR")
    print("="*50)
    print("서버 시작: http://0.0.0.0:5000")
    print("브라우저에서 http://192.168.0.20:5000 으로 접속하세요")
    print("OCR 엔진: EasyOCR (한국어+영어)")
    print("="*50)
    app.run(host="0.0.0.0", port=5000, debug=False)
