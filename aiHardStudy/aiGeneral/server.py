"""
UTTEC aiGeneral — 일반 질문 답변 서비스 (웹 검색 + 승인 기능)
프롬프트 → (웹 검색) → Claude 답변 → 웹 표시 (모바일 최적화)

Usage: python3 server.py
       → http://localhost:8090
       → https://uttec-ask.duckdns.org
"""

import asyncio
import json
import os
import re
import shutil
import subprocess
import tempfile
import time
import uuid
from urllib.parse import quote_plus

import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="UTTEC aiGeneral Server", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

WEB_DIR = os.path.join(os.path.dirname(__file__), "web")

# ─── 세션 & 작업 관리 ───
sessions = {}
jobs = {}
MAX_HISTORY = 20
MAX_SESSIONS = 100

SYSTEM_PROMPT = """You are a helpful, knowledgeable AI assistant.
You answer questions on any topic — technology, science, business, daily life, coding, etc.

Rules:
1. Answer in Korean (한국어) by default. If the user writes in English, answer in English.
2. Be concise but thorough.
3. Use markdown formatting for readability (headers, lists, code blocks, bold).
4. When showing code, specify the language in code blocks.
5. If you're unsure, say so honestly.
6. Be friendly and professional.
7. When web search results are provided, use them to give accurate, up-to-date answers.
   Cite the source if relevant.
"""

# ─── 웹 검색 ───

# 실시간 정보가 필요한 키워드 패턴
REALTIME_PATTERNS = [
    r"오늘|현재|지금|최근|실시간|요즘",
    r"날씨|기온|온도|습도|미세먼지|자외선|강수|비가|눈이",
    r"뉴스|속보|이슈",
    r"주가|환율|비트코인|코인|주식|코스피|코스닥|나스닥",
    r"경기|스코어|순위|결과",
    r"맛집|영업시간|운영시간|개장|폐장",
    r"how.+today|current|latest|weather|news|price",
]
REALTIME_RE = re.compile("|".join(REALTIME_PATTERNS), re.IGNORECASE)


def needs_web_search(question: str) -> bool:
    return bool(REALTIME_RE.search(question))


def search_web(query: str, max_results: int = 5) -> str:
    """DuckDuckGo HTML 검색 → 요약 텍스트"""
    try:
        url = f"https://html.duckduckgo.com/html/?q={quote_plus(query)}"
        headers = {"User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36"}
        resp = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(resp.text, "html.parser")

        results = []
        for i, item in enumerate(soup.select(".result")):
            if i >= max_results:
                break
            title_el = item.select_one(".result__title")
            snippet_el = item.select_one(".result__snippet")
            title = title_el.get_text(strip=True) if title_el else ""
            snippet = snippet_el.get_text(strip=True) if snippet_el else ""
            if title or snippet:
                results.append(f"[{i+1}] {title}\n{snippet}")

        return "\n\n".join(results) if results else ""
    except Exception:
        return ""


def search_weather(location: str = "Seoul") -> str:
    """wttr.in에서 날씨 정보 가져오기"""
    try:
        resp = requests.get(
            f"https://wttr.in/{quote_plus(location)}?format=j1&lang=ko",
            headers={"User-Agent": "curl/7.68.0"},
            timeout=10,
        )
        data = resp.json()
        current = data.get("current_condition", [{}])[0]
        weather_desc = current.get("lang_ko", [{}])
        desc = weather_desc[0].get("value", "") if weather_desc else current.get("weatherDesc", [{}])[0].get("value", "")
        temp = current.get("temp_C", "?")
        feels = current.get("FeelsLikeC", "?")
        humidity = current.get("humidity", "?")
        wind = current.get("windspeedKmph", "?")
        precip = current.get("precipMM", "0")

        forecast_lines = []
        for day in data.get("weather", [])[:3]:
            date = day.get("date", "")
            max_t = day.get("maxtempC", "?")
            min_t = day.get("mintempC", "?")
            desc_day = ""
            hourly = day.get("hourly", [])
            if hourly:
                mid = hourly[len(hourly)//2]
                lang = mid.get("lang_ko", [{}])
                desc_day = lang[0].get("value", "") if lang else ""
            forecast_lines.append(f"  {date}: {min_t}°C ~ {max_t}°C {desc_day}")

        return (
            f"현재 날씨 ({location}):\n"
            f"  상태: {desc}\n"
            f"  기온: {temp}°C (체감 {feels}°C)\n"
            f"  습도: {humidity}%\n"
            f"  바람: {wind} km/h\n"
            f"  강수: {precip} mm\n"
            f"예보:\n" + "\n".join(forecast_lines)
        )
    except Exception:
        return ""


def gather_web_context(question: str) -> str:
    """질문에 필요한 웹 컨텍스트 수집"""
    context_parts = []

    # 날씨 관련
    weather_re = re.compile(r"날씨|기온|온도|습도|미세먼지|강수|weather|temperature", re.IGNORECASE)
    if weather_re.search(question):
        # 지역 추출 시도
        loc_match = re.search(r"(서울|부산|인천|대구|대전|광주|울산|제주|수원|성남|[\w]+)의?\s*날씨", question)
        location = loc_match.group(1) if loc_match else "Seoul"
        weather = search_weather(location)
        if weather:
            context_parts.append(f"[날씨 정보]\n{weather}")

    # 일반 웹 검색
    search_results = search_web(question)
    if search_results:
        context_parts.append(f"[웹 검색 결과]\n{search_results}")

    return "\n\n".join(context_parts)


# ─── Claude 호출 ───

def call_claude(question: str, history: list, web_context: str = "") -> str:
    """Claude CLI 호출 → 답변 생성"""
    parts = [SYSTEM_PROMPT, ""]

    if web_context:
        parts.append(f"=== 웹에서 가져온 참고 정보 (실시간) ===\n{web_context}\n===\n")

    for h in history[-10:]:
        parts.append(f"User: {h['question']}")
        parts.append(f"Assistant: {h['answer']}")
        parts.append("")
    parts.append(f"User: {question}")

    full_prompt = "\n".join(parts)
    claude_cmd = shutil.which("claude") or "claude"

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".txt", delete=False, encoding="utf-8"
    ) as f:
        f.write(full_prompt)
        prompt_file = f.name

    try:
        cmd_str = f'cat "{prompt_file}" | claude -p - --output-format stream-json --verbose'
        result = subprocess.run(
            cmd_str, capture_output=True, text=True, timeout=120, shell=True,
        )
    except Exception as e:
        raise RuntimeError(f"Claude error: {e}")
    finally:
        os.unlink(prompt_file)

    text_parts = []
    for line in result.stdout.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            obj = json.loads(line)
            if obj.get("type") == "assistant":
                for block in obj.get("message", {}).get("content", []):
                    if block.get("type") == "text":
                        text_parts.append(block["text"])
        except json.JSONDecodeError:
            continue

    answer = "".join(text_parts).strip()
    if not answer:
        raise RuntimeError("Claude returned empty response")
    return answer


# ─── 비동기 작업 처리 ───

async def process_job(job_id: str, question: str, session_id: str,
                      web_search_enabled: bool):
    """질문 처리 (웹 검색 → 승인 대기 → Claude 호출)"""
    job = jobs[job_id]

    # 세션 관리
    if len(sessions) > MAX_SESSIONS:
        oldest = sorted(sessions.keys(), key=lambda k: sessions[k].get("last", 0))
        for k in oldest[:10]:
            del sessions[k]

    if session_id not in sessions:
        sessions[session_id] = {"history": [], "last": time.time()}
    session = sessions[session_id]
    session["last"] = time.time()
    history = session["history"]

    web_context = ""

    # 1. 웹 검색 필요 여부 판단
    if web_search_enabled and needs_web_search(question):
        job["status"] = "searching"
        job["message"] = "웹에서 정보를 검색하고 있습니다..."

        web_context = await asyncio.to_thread(gather_web_context, question)

        if web_context:
            job["web_context"] = web_context[:500] + ("..." if len(web_context) > 500 else "")

    # 2. 승인 대기 체크 (approval_required가 설정된 경우)
    if job.get("approval_required"):
        job["status"] = "awaiting_approval"
        job["message"] = job.get("approval_message", "계속 진행할까요?")
        # 사용자 응답 대기 (최대 5분)
        for _ in range(300):
            if job.get("approval_response") is not None:
                break
            await asyncio.sleep(1)

        if job.get("approval_response") != "approve":
            job["status"] = "cancelled"
            job["message"] = "사용자가 취소했습니다."
            return

    # 3. Claude 호출
    job["status"] = "thinking"
    job["message"] = "AI가 답변을 생성하고 있습니다..."

    try:
        t0 = time.time()
        answer = await asyncio.to_thread(
            call_claude, question, history, web_context
        )
        elapsed = round(time.time() - t0, 1)

        # 히스토리 추가
        history.append({
            "question": question,
            "answer": answer,
            "time": time.time(),
        })
        if len(history) > MAX_HISTORY:
            history[:] = history[-MAX_HISTORY:]

        job["status"] = "done"
        job["answer"] = answer
        job["elapsed"] = elapsed
        job["message"] = f"완료 ({elapsed}초)"

    except Exception as e:
        job["status"] = "error"
        job["message"] = str(e)


# ─── API Models ───

class AskRequest(BaseModel):
    question: str
    session_id: str = "default"
    web_search: bool = True


class ApprovalRequest(BaseModel):
    response: str  # "approve" or "deny"


class ApprovalTrigger(BaseModel):
    job_id: str
    message: str


class ClearRequest(BaseModel):
    session_id: str = "default"


# ─── API Endpoints ───

@app.get("/health")
async def health():
    claude_cmd = shutil.which("claude")
    return {
        "status": "ok",
        "system": "aiGeneral",
        "version": "2.0",
        "claude_available": claude_cmd is not None,
        "features": ["web_search", "approval"],
        "active_sessions": len(sessions),
        "active_jobs": sum(1 for j in jobs.values() if j["status"] in ("searching", "thinking")),
    }


@app.post("/api/v1/ask")
async def ask(req: AskRequest):
    if not req.question.strip():
        raise HTTPException(400, "Question is empty")

    job_id = str(uuid.uuid4())[:8]
    jobs[job_id] = {
        "job_id": job_id,
        "status": "pending",
        "message": "처리 대기 중...",
        "question": req.question.strip(),
        "answer": "",
        "elapsed": 0,
        "web_context": "",
    }

    asyncio.create_task(process_job(
        job_id, req.question.strip(), req.session_id, req.web_search
    ))

    return {"job_id": job_id, "status": "pending"}


@app.get("/api/v1/status/{job_id}")
async def get_status(job_id: str):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    return {
        "job_id": job["job_id"],
        "status": job["status"],
        "message": job["message"],
        "answer": job.get("answer", ""),
        "elapsed": job.get("elapsed", 0),
        "web_context": job.get("web_context", ""),
        "approval_message": job.get("approval_message", ""),
    }


@app.post("/api/v1/approve/{job_id}")
async def approve(job_id: str, req: ApprovalRequest):
    if job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[job_id]
    if job["status"] != "awaiting_approval":
        raise HTTPException(400, f"Job not awaiting approval: {job['status']}")
    job["approval_response"] = req.response
    return {"status": "ok", "response": req.response}


@app.post("/api/v1/request-approval")
async def request_approval(req: ApprovalTrigger):
    """외부에서 특정 job에 승인 요청을 트리거"""
    if req.job_id not in jobs:
        raise HTTPException(404, "Job not found")
    job = jobs[req.job_id]
    job["approval_required"] = True
    job["approval_message"] = req.message
    return {"status": "ok"}


@app.post("/api/v1/clear")
async def clear(req: ClearRequest):
    if req.session_id in sessions:
        sessions[req.session_id]["history"] = []
    return {"status": "ok"}


@app.get("/api/v1/history/{session_id}")
async def get_history(session_id: str):
    if session_id not in sessions:
        return {"history": []}
    return {"history": sessions[session_id]["history"]}


# ─── 정적 파일 서빙 ───

@app.get("/")
async def index():
    return FileResponse(os.path.join(WEB_DIR, "index.html"))


if os.path.exists(WEB_DIR):
    app.mount("/web", StaticFiles(directory=WEB_DIR), name="web")


if __name__ == "__main__":
    import uvicorn
    print("=" * 50)
    print("  UTTEC aiGeneral Server v2.0")
    print("  http://localhost:8090")
    print("  https://uttec-ask.duckdns.org")
    print("  Features: web search, approval")
    print("=" * 50)
    uvicorn.run(app, host="0.0.0.0", port=8090)
