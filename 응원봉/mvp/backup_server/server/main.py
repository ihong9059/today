"""
AI FanStick MVP - FastAPI 서버
방법1: 로컬DB + 시스템 프롬프트 방식

이 서버는 Android 앱과 통신하며:
1. 사용자 질문을 받아 Gemini API로 처리
2. 콘서트 정보 제공
3. 곡 진행 상태 관리
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional, List
import uvicorn

from prompt_generator import get_concert_data, get_prompt_generator
from gemini_service import get_gemini_service

# FastAPI 앱 생성
app = FastAPI(
    title="AI FanStick MVP Server",
    description="K-POP 콘서트 AI 응원봉 MVP 서버",
    version="1.0.0"
)

# CORS 설정 (Android 앱에서 접근 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 제공 (오디오 등)
import os
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")


# ===== Request/Response 모델 =====

class AskRequest(BaseModel):
    """AI 질문 요청"""
    question: str


class AskResponse(BaseModel):
    """AI 응답"""
    success: bool
    response: str
    led_color: List[int]  # [R, G, B]
    current_song: dict


class SongInfo(BaseModel):
    """곡 정보"""
    order: int
    title: str
    color_name: str
    color_rgb: List[int]
    fan_chant: str
    highlight: str


class ConcertInfo(BaseModel):
    """콘서트 정보"""
    artist: dict
    concert: dict
    setlist: List[dict]
    current_song: dict
    next_song: Optional[dict]
    remaining_songs: int


class StatusResponse(BaseModel):
    """상태 응답"""
    server: str
    current_song_index: int
    current_song: dict
    total_songs: int


# ===== API 엔드포인트 =====

@app.get("/")
async def root():
    """서버 상태 확인"""
    return {
        "name": "AI FanStick MVP Server",
        "version": "1.0.0",
        "status": "running"
    }


@app.post("/api/ask", response_model=AskResponse)
async def ask_ai(request: AskRequest):
    """AI에게 질문

    사용자의 음성을 STT로 변환한 텍스트를 받아
    Gemini API로 처리하고 응답과 LED 색상을 반환합니다.
    """
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="질문이 비어있습니다.")

    try:
        service = get_gemini_service()
        result = await service.ask(request.question)
        return AskResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/concert", response_model=ConcertInfo)
async def get_concert():
    """콘서트 정보 조회

    아티스트, 공연장, 셋리스트, 현재/다음 곡 정보를 반환합니다.
    """
    concert_data = get_concert_data()
    return ConcertInfo(**concert_data.get_concert_info())


@app.post("/api/song/next")
async def next_song():
    """다음 곡으로 이동

    현재 곡 인덱스를 증가시키고 새로운 현재 곡 정보를 반환합니다.
    """
    concert_data = get_concert_data()
    current = concert_data.next_song()
    next_song = concert_data.get_next_song()

    return {
        "success": True,
        "current_song": current,
        "next_song": next_song,
        "message": f"현재 곡: {current['title']}"
    }


@app.post("/api/song/prev")
async def prev_song():
    """이전 곡으로 이동

    현재 곡 인덱스를 감소시키고 새로운 현재 곡 정보를 반환합니다.
    """
    concert_data = get_concert_data()
    current = concert_data.prev_song()
    next_song = concert_data.get_next_song()

    return {
        "success": True,
        "current_song": current,
        "next_song": next_song,
        "message": f"현재 곡: {current['title']}"
    }


@app.post("/api/song/set/{index}")
async def set_song(index: int):
    """특정 곡으로 이동

    Args:
        index: 곡 인덱스 (0부터 시작)
    """
    concert_data = get_concert_data()
    setlist_len = len(concert_data.data["setlist"])

    if index < 0 or index >= setlist_len:
        raise HTTPException(
            status_code=400,
            detail=f"잘못된 인덱스입니다. (0-{setlist_len-1})"
        )

    concert_data.current_song_index = index
    current = concert_data.get_current_song()
    next_song = concert_data.get_next_song()

    return {
        "success": True,
        "current_song": current,
        "next_song": next_song,
        "message": f"현재 곡: {current['title']}"
    }


@app.get("/api/status", response_model=StatusResponse)
async def get_status():
    """서버 상태 조회"""
    concert_data = get_concert_data()

    return StatusResponse(
        server="running",
        current_song_index=concert_data.current_song_index,
        current_song=concert_data.get_current_song(),
        total_songs=len(concert_data.data["setlist"])
    )


@app.get("/api/setlist")
async def get_setlist():
    """셋리스트만 조회"""
    concert_data = get_concert_data()
    return {
        "setlist": concert_data.data["setlist"],
        "current_index": concert_data.current_song_index
    }


@app.get("/api/members")
async def get_members():
    """멤버 정보 조회"""
    concert_data = get_concert_data()
    return {
        "artist": concert_data.data["artist"]["name"],
        "members": concert_data.data["members"]
    }


@app.post("/api/reload")
async def reload_data():
    """데이터 다시 로드

    concert_data.json 파일이 외부에서 수정된 경우 다시 로드합니다.
    """
    concert_data = get_concert_data()
    concert_data.reload()

    return {
        "success": True,
        "message": "데이터가 다시 로드되었습니다.",
        "current_song": concert_data.get_current_song()
    }


@app.get("/api/prompt")
async def get_current_prompt():
    """현재 시스템 프롬프트 확인 (디버그용)"""
    generator = get_prompt_generator()
    return {
        "prompt": generator.generate()
    }


# ===== 서버 실행 =====

if __name__ == "__main__":
    print("=" * 60)
    print("AI FanStick MVP Server")
    print("=" * 60)
    print("서버 시작: http://0.0.0.0:8080")
    print("API 문서: http://localhost:8080/docs")
    print("=" * 60)

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8081,
        reload=True
    )
