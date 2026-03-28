"""
온도 센서 시뮬레이터
- 1초마다 가상의 온도 데이터를 생성하여 분석 서버로 전송
- 가끔 이상 온도(고온)를 발생시켜 경고 테스트
"""
import requests
import time
import random
import math
from datetime import datetime

SERVER_URL = "http://server:8000/data"


def generate_temperature():
    base = 25.0
    now = time.time()
    variation = 3.0 * math.sin(now / 30) + random.gauss(0, 0.5)

    # 5% 확률로 이상 고온 발생
    if random.random() < 0.05:
        variation += random.uniform(15, 30)

    return round(base + variation, 1)


def main():
    print("=" * 50)
    print("  온도 센서 시뮬레이터 시작")
    print(f"  전송 대상: {SERVER_URL}")
    print("=" * 50)

    sensor_id = "TEMP-001"
    count = 0

    print("\n서버 연결 대기 중...")
    for i in range(30):
        try:
            requests.get("http://server:8000/health", timeout=2)
            print("서버 연결 성공!\n")
            break
        except:
            time.sleep(1)

    while True:
        count += 1
        temp = generate_temperature()
        timestamp = datetime.now().strftime("%H:%M:%S")

        data = {
            "sensor_id": sensor_id,
            "temperature": temp,
            "timestamp": timestamp,
            "count": count
        }

        try:
            resp = requests.post(SERVER_URL, json=data, timeout=5)
            result = resp.json()

            icons = {"정상": "✅", "주의": "⚠️", "경고": "🔶", "위험": "🚨"}
            icon = icons.get(result.get("status", ""), "❓")

            print(f"  [{timestamp}] #{count:04d} | "
                  f"온도: {temp:5.1f}°C | "
                  f"상태: {icon} {result.get('status', '?')} | "
                  f"메시지: {result.get('message', '')}")
        except Exception as e:
            print(f"  [{timestamp}] #{count:04d} | ⚠️ 전송 실패: {e}")

        time.sleep(1)


if __name__ == "__main__":
    main()
