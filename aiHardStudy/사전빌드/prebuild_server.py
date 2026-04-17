"""
UTTEC 사전빌드 펌웨어 서버
- 카탈로그 조회/필터링
- firmware.bin 다운로드
- guide.json 조회
- 태그 매칭 검색
"""

import json
import hashlib
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="UTTEC Prebuilt Firmware Server", version="1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

SCRIPT_DIR = Path(__file__).parent
FIRMWARE_DB = SCRIPT_DIR / "firmware_db"
WEB_DIR = SCRIPT_DIR / "web"

# 카탈로그 캐시
_catalog = None

def load_catalog():
    global _catalog
    cat_path = FIRMWARE_DB / "catalog.json"
    if cat_path.exists():
        _catalog = json.loads(cat_path.read_text(encoding="utf-8"))
    else:
        _catalog = {"version": "1.0", "total": 0, "items": []}
    return _catalog

@app.on_event("startup")
async def startup():
    load_catalog()

# ─── API ───

@app.get("/api/catalog")
async def get_catalog(category: str = None, difficulty: int = None):
    """카탈로그 조회 (필터 가능)"""
    items = _catalog["items"]
    if category:
        items = [i for i in items if i["category"] == category.upper()]
    if difficulty:
        items = [i for i in items if i["difficulty"] == difficulty]
    return {"total": len(items), "items": items}

@app.get("/api/categories")
async def get_categories():
    """카테고리 목록"""
    cats = {}
    for item in _catalog["items"]:
        c = item["category"]
        if c not in cats:
            cats[c] = {"category": c, "name": item["category_name"], "count": 0,
                       "difficulty": item["difficulty"]}
        cats[c]["count"] += 1
    return sorted(cats.values(), key=lambda x: x["category"])

@app.get("/api/prebuilt/{no}")
async def get_prebuilt(no: str):
    """firmware.bin 다운로드"""
    bin_path = FIRMWARE_DB / no.upper() / "firmware.bin"
    if not bin_path.exists():
        raise HTTPException(404, f"Firmware {no} not found")
    return FileResponse(str(bin_path), filename=f"firmware_{no}.bin",
                        media_type="application/octet-stream")

@app.get("/api/prebuilt/{no}/guide")
async def get_guide(no: str):
    """학습 가이드 조회"""
    guide_path = FIRMWARE_DB / no.upper() / "guide.json"
    if not guide_path.exists():
        raise HTTPException(404, f"Guide {no} not found")
    return json.loads(guide_path.read_text(encoding="utf-8"))

@app.get("/api/prebuilt/{no}/code")
async def get_code(no: str):
    """생성 코드 조회"""
    code_path = FIRMWARE_DB / no.upper() / "code.ino"
    if not code_path.exists():
        raise HTTPException(404, f"Code {no} not found")
    return {"code": code_path.read_text(encoding="utf-8")}

@app.get("/api/search")
async def search(q: str):
    """태그 매칭 검색"""
    keywords = q.lower().split()
    results = []
    for item in _catalog["items"]:
        score = 0
        for kw in keywords:
            for tag in item["tags"]:
                if kw in tag.lower() or tag.lower() in kw:
                    score += 3
                    break
            if kw in item["user_prompt"].lower():
                score += 2
        if score > 0:
            results.append({**item, "score": score})
    results.sort(key=lambda x: -x["score"])
    return {"query": q, "total": len(results), "items": results[:20]}

@app.post("/api/stats/{no}")
async def update_stats(no: str):
    """사용 카운트"""
    stats_path = FIRMWARE_DB / "stats.json"
    stats = json.loads(stats_path.read_text()) if stats_path.exists() else {}
    stats[no] = stats.get(no, 0) + 1
    stats_path.write_text(json.dumps(stats))
    return {"no": no, "count": stats[no]}

@app.get("/api/reload")
async def reload_catalog():
    """카탈로그 리로드"""
    load_catalog()
    return {"total": _catalog["total"], "message": "Catalog reloaded"}

# ─── 웹 UI ───

@app.get("/", response_class=HTMLResponse)
async def root():
    html_path = WEB_DIR / "index.html"
    if html_path.exists():
        return html_path.read_text(encoding="utf-8")
    return "<h1>Web UI not found</h1>"

if __name__ == "__main__":
    import uvicorn
    print("=" * 50)
    print("UTTEC Prebuilt Firmware Server")
    print(f"Catalog: {_catalog['total'] if _catalog else 0} items")
    print("http://localhost:8095")
    print("=" * 50)
    load_catalog()
    uvicorn.run("prebuild_server:app", host="0.0.0.0", port=8095, reload=True)
