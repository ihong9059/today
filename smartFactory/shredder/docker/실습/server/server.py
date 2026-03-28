"""
온도 분석 서버 (FastAPI)
- 센서 데이터를 받아서 분석
- 온도 기준으로 상태 판정 (정상/주의/경고/위험)
- REST API로 현재 상태와 이력 제공
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import deque

app = FastAPI(title="온도 모니터링 분석 서버")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

history = deque(maxlen=100)
current_status = {"status": "대기", "temperature": 0, "message": "데이터 없음"}


class SensorData(BaseModel):
    sensor_id: str
    temperature: float
    timestamp: str
    count: int


def analyze_temperature(temp: float) -> dict:
    if temp < 20:
        return {"status": "정상", "level": 0, "message": f"저온 {temp}°C — 정상 범위"}
    elif temp < 35:
        return {"status": "정상", "level": 0, "message": f"{temp}°C — 정상 운전"}
    elif temp < 45:
        return {"status": "주의", "level": 1, "message": f"{temp}°C — 모니터링 강화 필요"}
    elif temp < 55:
        return {"status": "경고", "level": 2, "message": f"{temp}°C — 정비 계획 수립 권고"}
    else:
        return {"status": "위험", "level": 3, "message": f"{temp}°C — 즉시 점검 필요!"}


@app.get("/")
def root():
    return {"service": "온도 모니터링 분석 서버", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/data")
def receive_data(data: SensorData):
    result = analyze_temperature(data.temperature)

    record = {
        "sensor_id": data.sensor_id,
        "temperature": data.temperature,
        "timestamp": data.timestamp,
        "count": data.count,
        **result
    }

    history.append(record)
    current_status.update(record)

    return result


@app.get("/current")
def get_current():
    return current_status


@app.get("/history")
def get_history():
    return list(history)
