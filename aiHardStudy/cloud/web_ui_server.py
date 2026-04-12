"""
UTTEC Web UI Server (port 8094)
Flutter 앱 기능을 웹 브라우저에서 구현 — 빌드 API는 8092 프록시
"""
import asyncio
import httpx
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, Response
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="UTTEC Web UI", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

BUILD_API = "http://localhost:8092"

# 정적 파일 서빙
WEB_DIR = Path(__file__).parent / "web"

@app.get("/", response_class=HTMLResponse)
@app.get("/firmware", response_class=HTMLResponse)
@app.get("/firmware/", response_class=HTMLResponse)
async def index():
    html_path = WEB_DIR / "index.html"
    if not html_path.exists():
        raise HTTPException(500, "index.html not found")
    return html_path.read_text(encoding="utf-8")

@app.get("/firmware/{filename}")
async def static_file(filename: str):
    """PWA manifest, icons 등 정적 파일 서빙"""
    file_path = WEB_DIR / filename
    if not file_path.exists() or not file_path.is_file():
        raise HTTPException(404, "File not found")
    media_types = {
        ".json": "application/json",
        ".png": "image/png",
        ".ico": "image/x-icon",
        ".js": "application/javascript",
        ".css": "text/css",
    }
    ext = file_path.suffix.lower()
    from fastapi.responses import FileResponse as FR
    return FR(path=str(file_path), media_type=media_types.get(ext, "application/octet-stream"))

# ─── 빌드 API 프록시 (8092 → 8094) ───

@app.get("/api/v1/health")
async def proxy_health():
    async with httpx.AsyncClient(timeout=10) as c:
        r = await c.get(f"{BUILD_API}/health")
        return r.json()

@app.post("/api/v1/generate")
async def proxy_generate(request: Request):
    body = await request.json()
    async with httpx.AsyncClient(timeout=10) as c:
        r = await c.post(f"{BUILD_API}/api/v1/generate", json=body)
        return r.json()

@app.get("/api/v1/status/{job_id}")
async def proxy_status(job_id: str):
    async with httpx.AsyncClient(timeout=10) as c:
        r = await c.get(f"{BUILD_API}/api/v1/status/{job_id}")
        return r.json()

@app.get("/api/v1/download/{job_id}")
async def proxy_download(job_id: str):
    async with httpx.AsyncClient(timeout=30) as c:
        r = await c.get(f"{BUILD_API}/api/v1/download/{job_id}")
        if r.status_code != 200:
            raise HTTPException(r.status_code, r.text)
        return Response(
            content=r.content,
            media_type="application/octet-stream",
            headers={
                "Content-Disposition": f"attachment; filename=firmware_{job_id}.bin",
                "X-Firmware-Size": r.headers.get("x-firmware-size", "0"),
                "X-Firmware-SHA256": r.headers.get("x-firmware-sha256", ""),
            }
        )

@app.get("/api/v1/code/{job_id}")
async def proxy_code(job_id: str):
    async with httpx.AsyncClient(timeout=10) as c:
        r = await c.get(f"{BUILD_API}/api/v1/code/{job_id}")
        return r.json()

@app.post("/api/v1/chat")
async def proxy_chat(request: Request):
    body = await request.json()
    async with httpx.AsyncClient(timeout=120) as c:
        r = await c.post(f"{BUILD_API}/api/v1/chat", json=body)
        if r.status_code != 200:
            raise HTTPException(r.status_code, r.text)
        return r.json()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8094)
