import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# 스마트폰 센서 종류와 설명
sensors = [
    ("Camera", "카메라", "사진/영상 촬영, 이미지 인식"),
    ("Accelerometer", "가속도 센서", "기기 움직임/기울기 감지"),
    ("Gyroscope", "자이로스코프", "회전 속도 측정"),
    ("GPS", "위치 센서", "위도/경도 위치 파악"),
    ("Magnetometer", "지자기 센서", "나침반, 방향 감지"),
    ("Proximity", "근접 센서", "물체 접근 감지 (통화 시 화면 끔)"),
    ("Ambient Light", "조도 센서", "주변 밝기 측정 (자동 밝기)"),
    ("Barometer", "기압 센서", "대기압/고도 측정"),
    ("Microphone", "마이크", "소리 입력, 음성 인식"),
    ("Fingerprint", "지문 센서", "생체 인증"),
]

# 이 앱에서 사용 가능한 센서 표시
available = {
    "Camera": True,
    "Accelerometer": True,
    "GPS": True,
    "Gyroscope": False,
    "Magnetometer": False,
    "Proximity": False,
    "Ambient Light": False,
    "Barometer": False,
    "Microphone": False,
    "Fingerprint": False,
}

print("=" * 50)
print("  스마트폰 센서 안내")
print("=" * 50)
print()
print("[ 이 앱에서 사용 가능한 센서 ]")
print("-" * 50)
for eng, kor, desc in sensors:
    if available.get(eng, False):
        print(f"  ✅ {kor} ({eng})")
        print(f"     → {desc}")
        print()

print()
print("[ 스마트폰에 있지만 이 앱에서 미지원 센서 ]")
print("-" * 50)
for eng, kor, desc in sensors:
    if not available.get(eng, False):
        print(f"  ⬜ {kor} ({eng})")
        print(f"     → {desc}")
        print()

# 시각화: 센서 분류 차트
fig, ax = plt.subplots(1, 1, figsize=(8, 6))

categories = ["Motion\nSensors", "Position\nSensors", "Environment\nSensors", "Biometric\nSensors", "Input\nSensors"]
cat_sensors = [
    ["Accelerometer", "Gyroscope"],
    ["GPS", "Magnetometer"],
    ["Barometer", "Ambient Light", "Proximity"],
    ["Fingerprint"],
    ["Camera", "Microphone"],
]
cat_colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63", "#9C27B0"]

# 각 카테고리별 센서 수
counts = [len(s) for s in cat_sensors]
bars = ax.barh(categories, counts, color=cat_colors, height=0.6, edgecolor='white', linewidth=2)

# 센서 이름 표시
for i, (cat, sensor_list) in enumerate(zip(categories, cat_sensors)):
    label = ", ".join(sensor_list)
    ax.text(counts[i] + 0.1, i, label, va='center', fontsize=9, color='#333333')

ax.set_xlim(0, max(counts) + 3)
ax.set_title('Smartphone Sensor Categories', fontsize=16, fontweight='bold', pad=15)
ax.set_xlabel('Number of Sensors', fontsize=12)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)

# 사용 가능 표시
available_count = sum(1 for v in available.values() if v)
total_count = len(available)
ax.text(0.95, 0.02, f'Available in this app: {available_count}/{total_count}',
        transform=ax.transAxes, ha='right', fontsize=10,
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#E8F5E9', edgecolor='#4CAF50'))

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')

print()
print("=" * 50)
print(f"  총 {total_count}개 센서 중 {available_count}개 사용 가능")
print("  (카메라 / 가속도 센서 / GPS)")
print("=" * 50)