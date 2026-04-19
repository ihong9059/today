"""
UTTEC 바이브 Python — 스마트폰 Python 교육 서버
Port 8094

기능:
  GET  /                  → 웹 UI
  GET  /api/examples      → 카탈로그 전체
  GET  /api/example/{no}  → 특정 예시
  GET  /api/search?q=...  → 카탈로그 검색
  POST /api/v1/run        → Python 코드 실행 (sandbox)
  POST /api/v1/chat       → 코딩 질문 Q&A (Claude AI)
  POST /api/v1/generate   → AI 코드 생성
"""
import json
import subprocess
import tempfile
import time
import os
from pathlib import Path
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

app = FastAPI(title="UTTEC Vibe Python Server", version="2.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

SCRIPT_DIR = Path(__file__).parent
WEB_DIR = SCRIPT_DIR / "web"
EXAMPLES_DIR = SCRIPT_DIR / "examples"

# ─── 카탈로그 ───
_examples = None

def load_examples():
    global _examples
    path = EXAMPLES_DIR / "catalog.json"
    if path.exists():
        _examples = json.loads(path.read_text(encoding="utf-8"))
    else:
        _examples = {"total": 0, "items": []}

@app.on_event("startup")
async def startup():
    load_examples()

@app.get("/api/examples")
async def get_examples():
    return _examples

@app.get("/api/example/{no}")
async def get_example(no: str):
    for item in _examples["items"]:
        if item["no"] == no.upper():
            return item
    return {"error": "not found"}

@app.get("/api/search")
async def search_examples(q: str = ""):
    """카탈로그 키워드 검색"""
    if not q:
        return {"results": []}
    q_lower = q.lower()
    results = []
    for item in _examples.get("items", []):
        if (q_lower in item.get("title", "").lower() or
            q_lower in item.get("description", "").lower() or
            q_lower in item.get("hardware", "").lower() or
            q_lower in item.get("categoryName", "").lower()):
            results.append(item)
    return {"results": results[:10]}

# ─── Python 코드 실행 (sandbox) ───

class RunRequest(BaseModel):
    code: str
    timeout: int = 5  # 최대 실행 시간 (초)

@app.post("/api/v1/run")
async def run_code(req: RunRequest):
    """
    Python 코드를 안전하게 실행하고 결과를 반환합니다.

    보안:
    - subprocess로 별도 프로세스에서 실행 (메인 서버와 격리)
    - 실행 시간 제한 (기본 5초)
    - 위험한 모듈 import 차단 (os.system, subprocess 등)
    """
    code = req.code.strip()
    if not code:
        return {"output": "", "error": "", "elapsed": 0}

    # 위험한 코드 차단
    dangerous = ['os.system', 'subprocess', 'shutil.rmtree', '__import__',
                 'eval(', 'exec(', 'open(', 'import os', 'import sys',
                 'import shutil', 'import socket']
    for d in dangerous:
        if d in code:
            return {"output": "", "error": f"보안: '{d}'는 사용할 수 없습니다.", "elapsed": 0}

    # 임시 파일에 코드 저장
    start = time.time()
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False, encoding='utf-8') as f:
            f.write(code)
            tmp_path = f.name

        # 별도 Python 프로세스에서 실행
        result = subprocess.run(
            ['python', tmp_path],
            capture_output=True,
            text=True,
            timeout=req.timeout,
            encoding='utf-8',
            errors='replace',
        )

        elapsed = time.time() - start
        return {
            "output": result.stdout[:5000],  # 출력 최대 5000자
            "error": result.stderr[:2000] if result.returncode != 0 else "",
            "elapsed": round(elapsed, 3),
        }

    except subprocess.TimeoutExpired:
        return {"output": "", "error": f"시간 초과: {req.timeout}초 이내에 완료해야 합니다.", "elapsed": req.timeout}
    except Exception as e:
        return {"output": "", "error": str(e), "elapsed": round(time.time() - start, 3)}
    finally:
        try:
            os.unlink(tmp_path)
        except:
            pass

# ─── 코딩 질문 Q&A (Claude AI) ───

class ChatRequest(BaseModel):
    question: str

CHAT_SYSTEM_PROMPT = """당신은 초등학생~중학생에게 Python을 가르치는 친절한 선생님입니다.
한국어로 답변하세요. 비유를 사용해 쉽게 설명하세요.

학생은 UTTEC Python 앱으로 스마트폰 센서/카메라를 Python으로 제어하는 것을 배우고 있습니다.

규칙:
- 짧고 명확하게 답변 (200자 이내 권장)
- 코드 예시를 포함하세요
- 어려운 용어는 괄호로 쉬운 설명 추가
- 틀린 개념은 부드럽게 교정
- 관련 예시를 추천 (A01~J10)"""

@app.post("/api/v1/chat")
async def chat(req: ChatRequest):
    """코딩 질문에 Claude AI가 답변합니다."""
    question = req.question.strip()
    if not question:
        return {"answer": "질문을 입력해주세요!", "elapsed": 0}

    start = time.time()

    # Claude CLI 호출
    prompt = f"{CHAT_SYSTEM_PROMPT}\n\n학생 질문: {question}"
    try:
        with tempfile.NamedTemporaryFile(mode='w', suffix='.txt', delete=False, encoding='utf-8') as f:
            f.write(prompt)
            prompt_path = f.name

        result = subprocess.run(
            ['claude', '-p', prompt, '--output-format', 'text'],
            capture_output=True,
            text=True,
            timeout=30,
            encoding='utf-8',
            errors='replace',
        )

        elapsed = time.time() - start

        if result.returncode == 0 and result.stdout.strip():
            answer = result.stdout.strip()
        else:
            answer = _offline_answer(question)

        os.unlink(prompt_path)
        return {"answer": answer, "elapsed": round(elapsed, 1)}

    except subprocess.TimeoutExpired:
        return {"answer": _offline_answer(question), "elapsed": 30}
    except FileNotFoundError:
        # Claude CLI가 설치되지 않은 경우
        return {"answer": _offline_answer(question), "elapsed": round(time.time() - start, 1)}
    except Exception as e:
        return {"answer": _offline_answer(question), "elapsed": round(time.time() - start, 1)}

def _offline_answer(question: str) -> str:
    """Claude CLI를 사용할 수 없을 때 기본 답변"""
    # 자주 묻는 질문 사전
    faq = {
        'print': "print()는 괄호 안의 내용을 화면에 보여주는 함수예요!\n\n예시:\nprint('안녕하세요!')  # 안녕하세요! 출력\nprint(1 + 2)         # 3 출력\n\n💡 A01 예시에서 더 자세히 배울 수 있어요!",
        'for': "for문은 같은 동작을 여러 번 반복하는 명령이에요!\n\n예시:\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4 출력\n\nrange(5)는 0부터 4까지 숫자를 만들어줘요.\n\n💡 A03 구구단, D01~D10에서 다양한 반복문을 배울 수 있어요!",
        'if': "if문은 조건에 따라 다른 코드를 실행해요!\n\n예시:\nage = 15\nif age >= 19:\n    print('성인')\nelse:\n    print('미성년자')  # 이것이 실행됨\n\n💡 C01~C10에서 다양한 조건문을 배울 수 있어요!",
        '변수': "변수는 데이터를 담는 상자예요!\n\nname = '민수'  # name이라는 상자에 '민수'를 넣음\nage = 13       # age 상자에 13을 넣음\n\nprint(name)  # 민수 출력\nprint(age)   # 13 출력\n\n💡 A01, A07에서 변수를 배울 수 있어요!",
        '함수': "함수는 반복되는 동작에 이름을 붙인 것이에요!\n\ndef greet(name):\n    print(f'안녕, {name}!')\n\ngreet('민수')  # 안녕, 민수!\ngreet('영희')  # 안녕, 영희!\n\n💡 E01~E10에서 함수를 자세히 배울 수 있어요!",
        '리스트': "리스트는 여러 값을 순서대로 담는 자료구조예요!\n\nfruits = ['사과', '바나나', '딸기']\nprint(fruits[0])  # 사과 (첫번째)\nfruits.append('포도')  # 끝에 추가\n\n💡 G01~G10에서 리스트를 자세히 배울 수 있어요!",
        '센서': "스마트폰에는 가속도 센서, 자이로 센서, GPS 등이 있어요!\n\n이 앱에서는 Flutter의 sensors_plus 패키지로\n센서 데이터를 실시간으로 읽어요.\n\n💡 H01~H10에서 센서 활용법을 체험할 수 있어요!",
    }

    q_lower = question.lower()
    for keyword, answer in faq.items():
        if keyword in q_lower:
            return answer

    return f"좋은 질문이에요! '{question}'에 대해 알려드릴게요.\n\n현재 서버에 Claude AI가 연결되지 않아서 자세한 답변이 어렵습니다.\n\n💡 서버에서 'claude' 명령이 가능하면 AI가 친절하게 답변해줘요!\n\n관련 예시를 학습 탭에서 찾아보세요."

# ─── AI 코드 생성 ───

class GenerateRequest(BaseModel):
    prompt: str

GENERATE_SYSTEM_PROMPT = """당신은 Python 교육용 코드를 생성하는 AI입니다.
학생의 요청에 맞는 Python 코드를 작성하세요.

규칙:
- Python 3 표준 라이브러리만 사용
- 한국어 주석 필수
- 코드만 출력 (설명 없이)
- 초등~중학생 수준으로 간결하게
- print()로 결과를 보여주세요"""

@app.post("/api/v1/generate")
async def generate_code(req: GenerateRequest):
    """프롬프트에서 Python 코드를 생성합니다."""
    prompt = req.prompt.strip()
    if not prompt:
        return {"python_code": "# 프롬프트를 입력해주세요", "status": "error"}

    start = time.time()
    full_prompt = f"{GENERATE_SYSTEM_PROMPT}\n\n학생 요청: {prompt}"

    try:
        result = subprocess.run(
            ['claude', '-p', full_prompt, '--output-format', 'text'],
            capture_output=True,
            text=True,
            timeout=30,
            encoding='utf-8',
            errors='replace',
        )

        elapsed = time.time() - start
        if result.returncode == 0 and result.stdout.strip():
            code = result.stdout.strip()
            # 마크다운 코드블록 제거
            if code.startswith('```'):
                lines = code.split('\n')
                code = '\n'.join(lines[1:-1]) if lines[-1].startswith('```') else '\n'.join(lines[1:])
            return {"python_code": code, "status": "success", "elapsed": round(elapsed, 1)}
        else:
            return {"python_code": _fallback_code(prompt), "status": "fallback", "elapsed": round(elapsed, 1)}

    except Exception:
        return {"python_code": _fallback_code(prompt), "status": "fallback", "elapsed": round(time.time() - start, 1)}

def _fallback_code(prompt: str) -> str:
    return f"# AI 생성 (오프라인 모드)\n# 요청: {prompt}\n\nimport random\n\nprint('{prompt}')\nprint(f'랜덤 숫자: {{random.randint(1, 100)}}')\nprint()\nprint('💡 서버에 Claude AI가 연결되면')\nprint('   실제 코드가 생성됩니다!')"

# ─── 웹 UI ───

@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = WEB_DIR / "index.html"
    if html_path.exists():
        return html_path.read_text(encoding="utf-8")
    return "<h1>UTTEC Vibe Python Server v2.0</h1><p>Web UI not found</p>"

# ─── 서버 시작 ───

if __name__ == "__main__":
    import uvicorn
    load_examples()
    print("=" * 50)
    print("UTTEC Vibe Python Server v2.0")
    print(f"카탈로그: {_examples['total']}개 예시")
    print()
    print("API 목록:")
    print("  GET  /api/examples     — 카탈로그")
    print("  GET  /api/search?q=... — 검색")
    print("  POST /api/v1/run       — Python 실행")
    print("  POST /api/v1/chat      — Q&A")
    print("  POST /api/v1/generate  — AI 코드 생성")
    print()
    print("http://localhost:8094")
    print("=" * 50)
    ssl_cert = SCRIPT_DIR / "cert.pem"
    ssl_key = SCRIPT_DIR / "key.pem"
    if ssl_cert.exists() and ssl_key.exists():
        print("HTTPS mode")
        uvicorn.run(app, host="0.0.0.0", port=8094,
                    ssl_certfile=str(ssl_cert), ssl_keyfile=str(ssl_key))
    else:
        print("HTTP mode")
        uvicorn.run(app, host="0.0.0.0", port=8094)
