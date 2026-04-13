"""
UTTEC aiPython — Local Build Server
프롬프트 → Claude 코드 생성 → Python 코드 반환 (스마트폰 Pyodide에서 실행)

Usage: python server.py
       → http://localhost:8080
       → 스마트폰: adb reverse tcp:8080 tcp:8080 후 http://localhost:8080
"""

import asyncio
import os
import shutil
import subprocess
import time
import uuid
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="UTTEC aiPython Server", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

JOBS_DIR = Path(__file__).parent / "jobs"
JOBS_DIR.mkdir(exist_ok=True)
WEB_DIR = Path(__file__).parent / "web"

jobs = {}

# ─── 시스템 프롬프트 (Python용) ───
SYSTEM_PROMPT = """You are a Python code generator for an educational platform.
The generated code runs inside Pyodide (Python in WebAssembly in the browser).

Available libraries: numpy, matplotlib, Pillow (PIL), pandas, scipy, math, random, json, statistics
For matplotlib: use plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight') to save output.
For PIL: use img.save('/tmp/output.png') to save output.

INPUT DATA:
- If sensor_type is "camera", image is at /tmp/input.jpg (use PIL.Image.open)
- If sensor_type is "accel", JSON array is at /tmp/input.json (use json.load)
- If sensor_type is "geo", JSON {lat, lng, accuracy} is at /tmp/input.json
- If sensor_type is "none", no input data needed

OUTPUT:
- Save result image to /tmp/output.png (matplotlib or PIL)
- OR print text results to stdout (will be captured and displayed)
- If both image and text are needed, save image AND print text

IMPORTANT RULES:
1. Output ONLY the Python code — no explanation, no markdown, no code fences
2. Use matplotlib with Agg backend: import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
3. CRITICAL: All matplotlib text (title, xlabel, ylabel, legend, annotations, tick labels) MUST be in ENGLISH because Korean fonts are not available. Example: plt.title('Dice Roll Results') NOT plt.title('주사위 결과')
4. But print() output and comments should be in Korean. Example: print("주사위 결과:")
5. Keep code simple and educational
6. Add brief Korean comments: # 설명
7. Always handle errors gracefully with try/except
8. Do NOT use: os.system, subprocess, socket, http, urllib, __import__
9. Do NOT use: input() or any interactive functions
10. Print results in Korean
11. If the prompt is about pure computation (no sensor), just compute and print/plot
"""


# ─── 서버 실행용 시스템 프롬프트 ───
SERVER_SYSTEM_PROMPT = """You are a Python code generator for an educational platform.
The generated code runs on a server with FULL Python (not browser).

Available libraries: numpy, matplotlib, Pillow (PIL), pandas, scipy, requests, socket, serial (pyserial)
Also available: json, math, random, statistics, csv, os (read only), http.client, urllib.request

For matplotlib: use plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight') to save output.
For PIL: use img.save('/tmp/output.png') to save output.

CAPABILITIES (things browser Python CANNOT do, but this CAN):
- TCP/IP socket communication: import socket
- HTTP requests to external APIs: import requests or urllib.request
- Serial/UART communication: import serial (if pyserial installed)
- MQTT IoT communication: import paho.mqtt.client (if installed)
- File system access (read /tmp/ only)

IMPORTANT RULES:
1. Output ONLY the Python code — no explanation, no markdown, no code fences
2. Use matplotlib with Agg backend: import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
3. All matplotlib text (title, xlabel, ylabel, legend) MUST be in ENGLISH (no Korean font available)
4. print() output should be in Korean
5. Add brief Korean comments: # 설명
6. Save images to /tmp/output.png
7. Do NOT use: os.system, subprocess, __import__, eval, exec
8. Do NOT use: input() or any interactive functions
9. Network operations: use timeout (5 seconds max)
10. Handle errors gracefully with try/except
"""


def run_python_on_server(code: str, work_dir: Path) -> dict:
    """서버에서 Python 코드 실행 (샌드박스)"""
    import base64

    script_path = work_dir / "run.py"
    script_path.write_text(code, encoding="utf-8")
    output_png = work_dir / "output.png"
    if output_png.exists():
        output_png.unlink()

    # /tmp를 work_dir로 심볼릭 대체 (코드에서 /tmp/output.png 사용)
    wrapper = f'''
import sys, os
# /tmp를 작업 디렉토리로 매핑
os.makedirs(r"{work_dir}", exist_ok=True)
_orig_open = open
def _patched_open(path, *a, **kw):
    if isinstance(path, str) and path.startswith("/tmp/"):
        path = path.replace("/tmp/", r"{work_dir}\\\\".replace("\\\\\\\\", "\\\\"))
    return _orig_open(path, *a, **kw)
import builtins
builtins.open = _patched_open

# matplotlib savefig 패치
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as _plt
    _orig_savefig = _plt.savefig
    def _patched_savefig(fname, *a, **kw):
        if isinstance(fname, str) and fname.startswith("/tmp/"):
            fname = fname.replace("/tmp/", r"{work_dir}\\\\".replace("\\\\\\\\", "\\\\"))
        return _orig_savefig(fname, *a, **kw)
    _plt.savefig = _patched_savefig
except ImportError:
    pass
'''
    full_code = wrapper + "\n" + code
    full_script = work_dir / "_run_wrapped.py"
    full_script.write_text(full_code, encoding="utf-8")

    try:
        result = subprocess.run(
            ["python", str(full_script)],
            capture_output=True, text=True, timeout=30,
            cwd=str(work_dir),
        )
    except subprocess.TimeoutExpired:
        return {"stdout": "", "stderr": "실행 시간 초과 (30초)", "has_image": False}

    has_image = output_png.exists()
    image_b64 = ""
    if has_image:
        image_b64 = base64.b64encode(output_png.read_bytes()).decode()

    return {
        "stdout": result.stdout,
        "stderr": result.stderr,
        "has_image": has_image,
        "image_b64": image_b64,
        "returncode": result.returncode,
    }


class GenerateRequest(BaseModel):
    prompt: str
    sensor_type: str = "none"  # none, camera, accel, geo
    run_on: str = "browser"    # browser = Pyodide, server = 서버에서 실행
    retry_on_fail: bool = True
    max_retries: int = 3


class ChatRequest(BaseModel):
    question: str


def call_claude(full_prompt: str, work_dir: Path) -> str:
    """Claude CLI 호출 → Python 코드 생성 (stream-json 파싱)"""
    import json as _json

    claude_cmd = shutil.which("claude") or "claude.cmd"
    prompt_file = work_dir / "_prompt.txt"
    prompt_file.write_text(full_prompt, encoding="utf-8")

    try:
        cmd_str = f'type "{prompt_file}" | claude -p - --output-format stream-json --verbose'
        result = subprocess.run(
            cmd_str, capture_output=True, text=True, timeout=180,
            cwd=str(work_dir), shell=True,
        )
    except Exception as e:
        raise RuntimeError(f"Claude error: {e}")

    # stream-json에서 assistant 텍스트 블록 파싱
    code_parts = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = _json.loads(line)
            if obj.get("type") == "assistant":
                for block in obj.get("message", {}).get("content", []):
                    if block.get("type") == "text":
                        code_parts.append(block["text"])
        except _json.JSONDecodeError:
            continue

    code = "".join(code_parts).strip()
    if not code:
        raise RuntimeError(f"Claude returned empty. stdout lines: {len(result.stdout.splitlines())}")

    # 마크다운 코드블록 제거
    if "```python" in code:
        code = code.split("```python", 1)[1]
    elif "```py" in code:
        code = code.split("```py", 1)[1]
    elif "```" in code:
        code = code.split("```", 1)[1]
    if "```" in code:
        code = code.split("```")[0]
    code = code.strip()

    # Claude가 남기는 설명/독백 제거 (코드 뒤에 붙는 텍스트)
    clean_lines = []
    for line in code.split("\n"):
        # 코드가 아닌 자연어 문장 감지 (Wait, Let me, Note:, The rules 등)
        stripped = line.strip()
        if stripped and not stripped.startswith("#") and not stripped.startswith("print") and \
           any(stripped.startswith(w) for w in ["Wait,", "Let me", "Note:", "The ", "I ", "This ", "Sorry", "Actually"]):
            break  # 이후는 설명이므로 버림
        clean_lines.append(line)
    code = "\n".join(clean_lines).rstrip()

    if not code:
        raise RuntimeError("Generated code is empty after cleanup")

    return code


async def process_job(job_id: str, prompt: str, sensor_type: str,
                      run_on: str, retry_on_fail: bool, max_retries: int):
    job = jobs[job_id]
    job["status"] = "generating"
    job["message"] = "AI가 Python 코드를 생성하고 있어요..."
    job["progress"] = 20
    t_start = time.time()
    timing = {}
    job["timing"] = timing

    job_dir = JOBS_DIR / job_id
    job_dir.mkdir(exist_ok=True)

    # 실행 모드에 따라 시스템 프롬프트 선택
    sys_prompt = SERVER_SYSTEM_PROMPT if run_on == "server" else SYSTEM_PROMPT

    attempts = 0
    last_error = None

    while attempts < max_retries:
        attempts += 1
        try:
            # 프롬프트 합성
            sensor_info = ""
            if sensor_type == "camera":
                sensor_info = "\nThe user will provide a camera image at /tmp/input.jpg."
            elif sensor_type == "accel":
                sensor_info = "\nThe user will provide accelerometer data (array of {x,y,z,t}) at /tmp/input.json."
            elif sensor_type == "geo":
                sensor_info = "\nThe user will provide GPS location {lat, lng, accuracy} at /tmp/input.json."

            full_prompt = f"{sys_prompt}{sensor_info}\n\nUser request: {prompt}"
            (job_dir / "_prompt.txt").write_text(full_prompt, encoding="utf-8")

            job["message"] = f"AI 코드 생성 중 (시도 {attempts}/{max_retries})..."
            job["progress"] = 20 + (attempts - 1) * 10

            t1 = time.time()
            code = await asyncio.to_thread(call_claude, full_prompt, job_dir)
            timing[f"claude_try{attempts}"] = round(time.time() - t1, 1)

            (job_dir / "generated.py").write_text(code, encoding="utf-8")

            # 서버 실행 모드: 코드 생성 후 서버에서 실행
            if run_on == "server":
                job["message"] = "서버에서 Python 실행 중..."
                job["progress"] = 70

                t2 = time.time()
                exec_result = await asyncio.to_thread(run_python_on_server, code, job_dir)
                timing["server_exec"] = round(time.time() - t2, 1)

                total = round(time.time() - t_start, 1)
                timing["total"] = total

                job["status"] = "success"
                job["message"] = f"실행 완료! ({total}초)"
                job["progress"] = 100
                job["code"] = code
                job["elapsed"] = total
                job["exec_result"] = exec_result
                return
            else:
                # 브라우저 실행 모드: 코드만 반환
                total = round(time.time() - t_start, 1)
                timing["total"] = total

                job["status"] = "success"
                job["message"] = f"코드 생성 완료! ({total}초)"
                job["progress"] = 100
                job["code"] = code
                job["elapsed"] = total
                return

        except Exception as e:
            last_error = f"{type(e).__name__}: {e}"
            timing[f"error_try{attempts}"] = str(last_error)[:100]
            job["message"] = f"시도 {attempts} 실패: {str(last_error)[:100]}"
            if not retry_on_fail or attempts >= max_retries:
                break

    job["status"] = "failed"
    job["message"] = f"코드 생성 실패 ({attempts}회): {str(last_error)[:200]}"
    job["elapsed"] = round(time.time() - t_start, 1)


# ─── API Endpoints ───

@app.get("/health")
async def health():
    claude_cmd = shutil.which("claude")
    return {
        "status": "ok",
        "system": "aiPython",
        "claude_available": claude_cmd is not None,
        "active_jobs": sum(1 for j in jobs.values() if j["status"] == "generating"),
    }


@app.post("/api/v1/generate")
async def generate(req: GenerateRequest):
    job_id = str(uuid.uuid4())[:8]
    jobs[job_id] = {
        "job_id": job_id, "status": "pending", "progress": 0,
        "message": "대기 중...", "prompt": req.prompt,
        "elapsed": 0, "code": "",
    }
    asyncio.create_task(process_job(
        job_id, req.prompt, req.sensor_type, req.run_on,
        req.retry_on_fail, req.max_retries
    ))
    return {"job_id": job_id, "status": "pending"}


@app.get("/api/v1/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    resp = {
        "job_id": job["job_id"], "status": job["status"],
        "progress": job["progress"], "message": job["message"],
        "elapsed": job.get("elapsed", 0),
        "timing": job.get("timing", {}),
    }
    if "exec_result" in job:
        resp["exec_result"] = job["exec_result"]
    return resp


@app.get("/api/v1/code/{job_id}")
async def get_code(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "success":
        raise HTTPException(400, f"Not ready: {job['status']}")
    return {"code": job.get("code", ""), "status": job["status"]}


# ─── 코딩 질문 API ───

CHAT_PROMPT = """You are a friendly coding tutor for beginners learning Python.
The student is using a web-based Python environment (Pyodide) on their smartphone.
Available libraries: numpy, matplotlib, Pillow, pandas, scipy.
The platform can access smartphone sensors (camera, accelerometer, GPS) via Web APIs.

Rules:
1. Answer in Korean
2. Use simple, beginner-friendly explanations
3. Include Python code examples when relevant
4. Keep answers concise but educational
5. Focus on practical, hands-on examples
"""


def call_claude_chat(question: str) -> str:
    import json as _json
    import tempfile

    full_prompt = f"{CHAT_PROMPT}\n\nStudent question: {question}"
    claude_cmd = shutil.which("claude") or "claude.cmd"

    with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False, encoding='utf-8') as f:
        f.write(full_prompt)
        prompt_file = f.name

    try:
        cmd_str = f'type "{prompt_file}" | claude -p - --output-format stream-json --verbose'
        result = subprocess.run(
            cmd_str, capture_output=True, text=True, timeout=120, shell=True,
        )
    except Exception as e:
        raise RuntimeError(f"Claude error: {e}")
    finally:
        os.unlink(prompt_file)

    parts = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = _json.loads(line)
            if obj.get("type") == "assistant":
                for block in obj.get("message", {}).get("content", []):
                    if block.get("type") == "text":
                        parts.append(block["text"])
        except _json.JSONDecodeError:
            continue

    answer = "".join(parts).strip()
    if not answer:
        raise RuntimeError("Empty response from Claude")
    return answer


@app.post("/api/v1/chat")
async def chat(req: ChatRequest):
    if not req.question.strip():
        raise HTTPException(400, "Question is empty")
    try:
        t0 = time.time()
        answer = await asyncio.to_thread(call_claude_chat, req.question.strip())
        elapsed = round(time.time() - t0, 1)
        return {"answer": answer, "elapsed": elapsed}
    except Exception as e:
        raise HTTPException(500, str(e))


# ─── 정적 파일 서빙 ───

@app.get("/")
async def index():
    return FileResponse(WEB_DIR / "index.html")


# 정적 파일 (JS, CSS, 아이콘 등)
if WEB_DIR.exists():
    app.mount("/web", StaticFiles(directory=str(WEB_DIR)), name="web")


if __name__ == "__main__":
    import uvicorn
    print("=" * 50)
    print("  UTTEC aiPython Server")
    print("  http://localhost:8080")
    print("  스마트폰: adb reverse tcp:8080 tcp:8080")
    print("=" * 50)
    uvicorn.run(app, host="0.0.0.0", port=8080)
