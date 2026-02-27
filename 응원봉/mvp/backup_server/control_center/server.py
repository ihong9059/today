"""
AI FanStick 본부 관제 서버
- WebSocket을 통한 실시간 디바이스 연결 관리
- 추첨 시스템
- 전체/개별 명령 전송
"""

from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Dict, List, Optional
import uvicorn
import json
import random
import asyncio
from datetime import datetime
import os

app = FastAPI(
    title="AI FanStick Control Center",
    description="콘서트 응원봉 본부 관제 시스템",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===== 연결된 디바이스 관리 =====

class DeviceManager:
    def __init__(self):
        self.devices: Dict[str, dict] = {}  # device_id -> info
        self.websockets: Dict[str, WebSocket] = {}  # device_id -> websocket
        self.winners: List[str] = []  # 당첨자 목록

    def register(self, device_id: str, info: dict, websocket: WebSocket):
        """디바이스 등록 (재연결 시 기존 정보 업데이트)"""
        # 기존 WebSocket이 있으면 닫기
        if device_id in self.websockets:
            try:
                old_ws = self.websockets[device_id]
                # 기존 연결은 무시 (새 연결로 대체)
            except:
                pass

        self.devices[device_id] = {
            **info,
            "connected_at": datetime.now().isoformat(),
            "status": "connected"
        }
        self.websockets[device_id] = websocket

    def unregister(self, device_id: str):
        """디바이스 해제"""
        if device_id in self.devices:
            self.devices[device_id]["status"] = "disconnected"
        if device_id in self.websockets:
            del self.websockets[device_id]

    def get_connected_count(self) -> int:
        return len(self.websockets)

    def get_all_devices(self) -> List[dict]:
        return [
            {"id": did, **info, "online": did in self.websockets}
            for did, info in self.devices.items()
        ]

    async def broadcast(self, message: dict):
        """모든 연결된 디바이스에 메시지 전송"""
        disconnected = []
        for device_id, ws in self.websockets.items():
            try:
                await ws.send_json(message)
            except:
                disconnected.append(device_id)

        # 연결 끊긴 디바이스 정리
        for device_id in disconnected:
            self.unregister(device_id)

    async def send_to_device(self, device_id: str, message: dict) -> bool:
        """특정 디바이스에 메시지 전송"""
        if device_id in self.websockets:
            try:
                await self.websockets[device_id].send_json(message)
                return True
            except:
                self.unregister(device_id)
        return False

    def lottery(self, count: int = 1, ble_only: bool = False) -> List[str]:
        """추첨 - 연결된 디바이스 중 랜덤 선택

        Args:
            count: 추첨 인원
            ble_only: True면 BLE 연결된 응원봉만 대상으로 함
        """
        if ble_only:
            # BLE 연결된 디바이스만 선택
            connected_ids = [
                did for did in self.websockets.keys()
                if self.devices.get(did, {}).get("ble_connected", False)
            ]
        else:
            # admin 제외, fanstick 타입만 선택
            connected_ids = [
                did for did in self.websockets.keys()
                if self.devices.get(did, {}).get("type") == "fanstick"
            ]

        if not connected_ids:
            return []

        count = min(count, len(connected_ids))
        winners = random.sample(connected_ids, count)
        self.winners.extend(winners)
        return winners

    def get_ble_connected_count(self) -> int:
        """BLE 연결된 디바이스 수"""
        return sum(
            1 for did in self.websockets.keys()
            if self.devices.get(did, {}).get("ble_connected", False)
        )


device_manager = DeviceManager()


# ===== WebSocket 엔드포인트 =====

@app.websocket("/ws/{device_id}")
async def websocket_endpoint(websocket: WebSocket, device_id: str):
    await websocket.accept()

    # 디바이스 정보 수신 대기
    try:
        init_data = await websocket.receive_json()
        device_manager.register(device_id, init_data, websocket)

        # 연결 확인 메시지
        await websocket.send_json({
            "type": "connected",
            "message": f"본부에 연결되었습니다. ID: {device_id}",
            "device_count": device_manager.get_connected_count()
        })

        # 관리자에게 새 연결 알림 (브로드캐스트)
        await device_manager.broadcast({
            "type": "device_joined",
            "device_id": device_id,
            "device_count": device_manager.get_connected_count()
        })

        # 메시지 수신 루프
        while True:
            data = await websocket.receive_json()

            # 디바이스로부터의 반응 처리
            if data.get("type") == "reaction":
                # 반응 이벤트 브로드캐스트 (관리자 화면에 표시)
                await device_manager.broadcast({
                    "type": "device_reaction",
                    "device_id": device_id,
                    "reaction": data.get("reaction"),
                    "timestamp": datetime.now().isoformat()
                })
            elif data.get("type") == "heartbeat":
                # 하트비트 응답
                await websocket.send_json({"type": "heartbeat_ack"})

    except WebSocketDisconnect:
        device_manager.unregister(device_id)
        await device_manager.broadcast({
            "type": "device_left",
            "device_id": device_id,
            "device_count": device_manager.get_connected_count()
        })


# ===== REST API 엔드포인트 =====

class CommandRequest(BaseModel):
    command: str  # "led", "melody", "message"
    params: dict


@app.get("/", response_class=HTMLResponse)
async def root():
    """루트 접속 시 관리자 페이지로 이동"""
    return await admin_page()


@app.get("/api/devices")
async def get_devices():
    """연결된 디바이스 목록"""
    return {
        "total": len(device_manager.devices),
        "connected": device_manager.get_connected_count(),
        "ble_connected": device_manager.get_ble_connected_count(),
        "devices": device_manager.get_all_devices()
    }


class LotteryRequest(BaseModel):
    count: int = 1
    ble_only: bool = False  # MVP에서는 BLE 없이도 추첨 가능


@app.post("/api/lottery")
async def run_lottery(request: LotteryRequest):
    """추첨 실행 - BLE 연결 또는 전체 디바이스 대상"""
    if request.ble_only:
        ble_count = device_manager.get_ble_connected_count()
        if ble_count == 0:
            raise HTTPException(
                status_code=400,
                detail=f"BLE 연결된 응원봉이 없습니다. (전체 연결: {device_manager.get_connected_count()}명)"
            )

    # admin 제외한 fanstick 디바이스만 추첨 대상
    connected_count = len([
        did for did in device_manager.websockets.keys()
        if device_manager.devices.get(did, {}).get("type") == "fanstick"
    ])
    if connected_count == 0:
        raise HTTPException(
            status_code=400,
            detail=f"추첨 대상 디바이스가 없습니다. (전체 연결: {device_manager.get_connected_count()}명)"
        )

    winners = device_manager.lottery(request.count, ble_only=request.ble_only)

    if not winners:
        raise HTTPException(status_code=400, detail="추첨 대상이 없습니다.")

    # 당첨자에게 알림 전송
    for winner_id in winners:
        await device_manager.send_to_device(winner_id, {
            "type": "winner",
            "message": "축하합니다! 당첨되셨습니다!",
            "led": {"r": 255, "g": 215, "b": 0, "pattern": "rainbow"},
            "melody": "winner"
        })

    # 당첨자 이름 가져오기 (응원봉 이름 우선)
    winner_names = []
    for w in winners:
        device_info = device_manager.devices.get(w, {})
        name = device_info.get("ble_name") or device_info.get("name") or w[:8]
        winner_names.append(name)

    # 전체에 당첨 발표
    await device_manager.broadcast({
        "type": "lottery_result",
        "winners": winner_names,
        "count": len(winners)
    })

    return {
        "success": True,
        "winners": winners,
        "winner_names": winner_names,
        "message": f"{len(winners)}명이 당첨되었습니다!"
    }


@app.post("/api/broadcast/led")
async def broadcast_led(r: int = 255, g: int = 0, b: int = 0, pattern: str = "solid"):
    """전체 LED 색상 변경"""
    await device_manager.broadcast({
        "type": "led_command",
        "led": {"r": r, "g": g, "b": b, "pattern": pattern}
    })
    return {"success": True, "message": f"LED 명령 전송: RGB({r},{g},{b}) {pattern}"}


@app.post("/api/broadcast/melody")
async def broadcast_melody(melody: str = "ack"):
    """전체 멜로디 재생"""
    await device_manager.broadcast({
        "type": "melody_command",
        "melody": melody
    })
    return {"success": True, "message": f"멜로디 명령 전송: {melody}"}


@app.post("/api/broadcast/message")
async def broadcast_message(message: str):
    """전체 메시지 전송"""
    await device_manager.broadcast({
        "type": "display_message",
        "message": message,
        "timestamp": datetime.now().isoformat()
    })
    return {"success": True, "message": f"메시지 전송: {message}"}


@app.post("/api/device/{device_id}/command")
async def send_device_command(device_id: str, request: CommandRequest):
    """특정 디바이스에 명령 전송"""
    success = await device_manager.send_to_device(device_id, {
        "type": f"{request.command}_command",
        **request.params
    })

    if not success:
        raise HTTPException(status_code=404, detail="디바이스를 찾을 수 없거나 연결이 끊어졌습니다.")

    return {"success": True, "message": f"명령 전송 완료: {device_id}"}


@app.get("/api/winners")
async def get_winners():
    """당첨자 목록"""
    return {
        "winners": device_manager.winners,
        "total": len(device_manager.winners)
    }


@app.delete("/api/winners")
async def clear_winners():
    """당첨자 목록 초기화"""
    device_manager.winners = []
    return {"success": True, "message": "당첨자 목록이 초기화되었습니다."}


@app.delete("/api/devices")
async def clear_devices():
    """디바이스 목록 초기화 (오프라인 디바이스만)"""
    # 연결 끊긴 디바이스만 제거
    offline_devices = [
        did for did in list(device_manager.devices.keys())
        if did not in device_manager.websockets
    ]
    for did in offline_devices:
        del device_manager.devices[did]

    return {
        "success": True,
        "removed": len(offline_devices),
        "message": f"{len(offline_devices)}개 오프라인 디바이스 제거됨"
    }


@app.delete("/api/devices/all")
async def clear_all_devices():
    """모든 디바이스 목록 초기화"""
    count = len(device_manager.devices)
    device_manager.devices = {}
    device_manager.websockets = {}
    device_manager.winners = []
    return {
        "success": True,
        "removed": count,
        "message": f"모든 디바이스({count}개) 초기화됨"
    }


# ===== 관리자 페이지 =====

@app.get("/admin", response_class=HTMLResponse)
async def admin_page():
    """관리자 대시보드 페이지"""
    html_path = os.path.join(os.path.dirname(__file__), "admin.html")
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            return f.read()
    return "<h1>Admin page not found. Please create admin.html</h1>"


# ===== 서버 실행 =====

if __name__ == "__main__":
    print("=" * 60)
    print("AI FanStick Control Center")
    print("본부 관제 시스템")
    print("=" * 60)
    print("서버: http://0.0.0.0:8090")
    print("관리자 페이지: http://localhost:8090/admin")
    print("API 문서: http://localhost:8090/docs")
    print("=" * 60)

    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8090,
        reload=True
    )
