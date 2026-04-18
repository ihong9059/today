"""
UTTEC 바이브 Python — 스마트폰 하드웨어 활용 교육 서버
Port 8094
"""
import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

app = FastAPI(title="UTTEC Vibe Python Server", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

SCRIPT_DIR = Path(__file__).parent
WEB_DIR = SCRIPT_DIR / "web"
EXAMPLES_DIR = SCRIPT_DIR / "examples"

# 예시 카탈로그
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

@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = WEB_DIR / "index.html"
    if html_path.exists():
        return html_path.read_text(encoding="utf-8")
    return "<h1>Web UI not found</h1>"

if __name__ == "__main__":
    import uvicorn
    load_examples()
    print("=" * 50)
    print("UTTEC Vibe Python Server")
    print(f"Examples: {_examples['total']}")
    print("http://localhost:8094")
    print("=" * 50)
    ssl_cert = SCRIPT_DIR / "cert.pem"
    ssl_key = SCRIPT_DIR / "key.pem"
    if ssl_cert.exists() and ssl_key.exists():
        print("HTTPS mode (self-signed)")
        uvicorn.run(app, host="0.0.0.0", port=8094,
                    ssl_certfile=str(ssl_cert), ssl_keyfile=str(ssl_key))
    else:
        print("HTTP mode (sensors may not work on mobile)")
        uvicorn.run(app, host="0.0.0.0", port=8094)
