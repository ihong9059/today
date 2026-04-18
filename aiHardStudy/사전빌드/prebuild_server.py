"""
UTTEC 사전빌드 펌웨어 서버
- 카탈로그 조회/필터링
- firmware.bin 다운로드
- guide.json 조회
- 태그 매칭 검색
"""

import json
import hashlib
import shutil
from pathlib import Path
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

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


# ─── 커스텀 빌드 결과 저장 ───

class SaveCustomRequest(BaseModel):
    user_prompt: str
    code: str
    tags: list[str] = []

def _next_custom_no() -> str:
    """Z01, Z02, ... Z99, ZA01, ... 순서로 번호 생성"""
    existing = sorted([d.name for d in FIRMWARE_DB.iterdir()
                       if d.is_dir() and d.name.startswith("Z")])
    if not existing:
        return "Z01"
    last = existing[-1]
    num = int(last[1:]) + 1
    return f"Z{num:02d}" if num < 100 else f"Z{num:03d}"

@app.post("/api/save-custom")
async def save_custom(req: SaveCustomRequest, request: Request):
    """커스텀 빌드 결과를 사전빌드 DB에 저장"""
    # 펌웨어 바이너리는 body에서 별도로 받지 않고, 빌드 서버에서 다운로드
    no = _next_custom_no()
    item_dir = FIRMWARE_DB / no
    item_dir.mkdir(parents=True, exist_ok=True)

    # 코드 저장
    (item_dir / "code.ino").write_text(req.code, encoding="utf-8")

    # 태그 자동 생성 (프롬프트에서 키워드 추출)
    tags = req.tags if req.tags else []
    if not tags:
        for kw in req.user_prompt.replace(",", " ").split():
            if len(kw) >= 2:
                tags.append(kw)

    return {"no": no, "item_dir": str(item_dir), "tags": tags}


@app.post("/api/save-custom-firmware/{no}")
async def save_custom_firmware(no: str, request: Request):
    """커스텀 빌드 펌웨어 바이너리 저장 + 카탈로그 등록"""
    item_dir = FIRMWARE_DB / no.upper()
    if not item_dir.exists():
        raise HTTPException(404, f"Item dir {no} not found")

    # 바이너리 저장
    body = await request.body()
    if len(body) < 1000:
        raise HTTPException(400, "Invalid firmware data")

    bin_path = item_dir / "firmware.bin"
    bin_path.write_bytes(body)

    fw_sha256 = hashlib.sha256(body).hexdigest()

    # catalog.json에 추가
    code_path = item_dir / "code.ino"
    code = code_path.read_text(encoding="utf-8") if code_path.exists() else ""

    # 메타 파일에서 정보 읽기
    meta_path = item_dir / "meta.json"
    if meta_path.exists():
        meta = json.loads(meta_path.read_text(encoding="utf-8"))
    else:
        meta = {}

    new_item = {
        "no": no.upper(),
        "user_prompt": meta.get("user_prompt", "커스텀 빌드"),
        "tags": meta.get("tags", []),
        "difficulty": meta.get("difficulty", 2),
        "components": meta.get("components", []),
        "category": "Z",
        "category_name": "커스텀 빌드",
        "description": meta.get("user_prompt", "사용자가 AI로 생성한 펌웨어"),
        "firmware_size": len(body),
        "firmware_sha256": fw_sha256,
    }

    # 기존 카탈로그에 추가 (중복 방지)
    _catalog["items"] = [i for i in _catalog["items"] if i["no"] != no.upper()]
    _catalog["items"].append(new_item)
    _catalog["total"] = len(_catalog["items"])

    # 파일 저장
    cat_path = FIRMWARE_DB / "catalog.json"
    cat_path.write_text(json.dumps(_catalog, ensure_ascii=False, indent=2), encoding="utf-8")

    return {"no": no, "firmware_size": len(body), "sha256": fw_sha256, "total": _catalog["total"]}


@app.post("/api/save-custom-meta/{no}")
async def save_custom_meta(no: str, request: Request):
    """커스텀 빌드 메타 정보 저장"""
    item_dir = FIRMWARE_DB / no.upper()
    item_dir.mkdir(parents=True, exist_ok=True)
    body = await request.json()
    meta_path = item_dir / "meta.json"
    meta_path.write_text(json.dumps(body, ensure_ascii=False, indent=2), encoding="utf-8")
    # 코드도 함께 저장
    if "code" in body:
        (item_dir / "code.ino").write_text(body["code"], encoding="utf-8")
    return {"no": no, "saved": True}

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
