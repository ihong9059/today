#!/usr/bin/env python3
"""
gen_catalog_interactive.py
H(센서), I(카메라/소리), J(게임/그래픽) 카테고리 30개 인터랙티브 예시를 생성하여
catalog.json에 추가(append)합니다.
"""

import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CATALOG_PATH = os.path.join(SCRIPT_DIR, "catalog.json")


def build_interactive_items():
    """H, I, J 카테고리 30개 예시 생성"""
    items = []

    # ═══════════════════════════════════════════════════════════
    #  H. 센서 (중급~고급) — 10개
    # ═══════════════════════════════════════════════════════════

    items.append({
        "no": "H01",
        "title": "흔들면 주사위 굴리기",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰의 가속도 센서로 흔들기를 감지하고, 1~6 사이의 랜덤 주사위를 굴립니다. 흔들 때마다 진동과 함께 새로운 숫자가 나타나요!",
        "pythonCode": "# 흔들면 주사위 굴리기\nimport random\n\n# 가속도 센서 읽기\naccel = get_accelerometer()  # x, y, z 값\ntotal = abs(accel.x) + abs(accel.y) + abs(accel.z)\n\n# 흔들기 감지 (가속도 합 > 20)\nif total > 20:\n    dice = random.randint(1, 6)\n    print(f'🎲 주사위: {dice}')\n    vibrate(200)  # 짧은 진동\nelse:\n    print('스마트폰을 흔들어보세요!')",
        "flutterWidget": "dice",
        "steps": [
            "가속도 센서가 자동으로 활성화됩니다",
            "스마트폰을 세게 흔들어보세요",
            "1~6 랜덤 숫자가 나타나고 진동이 울립니다"
        ],
        "concepts": [
            {"term": "가속도 센서", "explanation": "스마트폰이 얼마나 빠르게 움직이는지 X, Y, Z 3방향으로 측정해요."},
            {"term": "random.randint(1, 6)", "explanation": "1부터 6까지 중 하나를 랜덤으로 골라줘요."},
            {"term": "이벤트 감지", "explanation": "가속도 합이 20 이상이면 '흔들었다'고 판단하는 조건이에요."}
        ],
        "quiz": {
            "question": "random.randint(1, 6)은 어떤 숫자를 만드나요?",
            "options": ["0부터 6", "1부터 6", "1부터 5", "0부터 5"],
            "answer": 1,
            "explanation": "randint(1, 6)은 1~6 중 하나를 랜덤 선택해요! 양쪽 끝 숫자가 모두 포함돼요."
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H02",
        "title": "진동 모스부호 SOS",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "진동",
        "type": "sensor",
        "description": "스마트폰 진동 모터로 SOS 모스부호(···---···)를 보냅니다. 짧은 진동은 점(·), 긴 진동은 선(—)으로 표현해요.",
        "pythonCode": "# 모스부호 SOS: ··· --- ···\ndef dot():\n    vibrate(200)   # 짧은 진동 0.2초\n    sleep(200)     # 대기\n\ndef dash():\n    vibrate(600)   # 긴 진동 0.6초\n    sleep(200)     # 대기\n\nprint('SOS 전송 시작!')\n# S: ···\ndot(); dot(); dot()\nsleep(400)  # 글자 간격\n# O: ---\ndash(); dash(); dash()\nsleep(400)\n# S: ···\ndot(); dot(); dot()\nprint('SOS 전송 완료!')",
        "flutterWidget": "sos",
        "steps": [
            "SOS 전송 버튼을 누릅니다",
            "S(···): 짧은 진동 3번 → O(---): 긴 진동 3번",
            "마지막 S(···): 짧은 진동 3번으로 완료"
        ],
        "concepts": [
            {"term": "모스부호", "explanation": "짧은(·)과 긴(—) 신호의 조합으로 글자를 표현해요. SOS는 국제 구조 신호!"},
            {"term": "함수 정의", "explanation": "def dot(), def dash()처럼 반복 동작에 이름을 붙여 재사용해요."},
            {"term": "vibrate(ms)", "explanation": "진동 모터를 ms(밀리초) 동안 작동시켜요. 200ms = 0.2초."}
        ],
        "quiz": {
            "question": "모스부호에서 SOS는?",
            "options": ["--- ··· ---", "··· --- ···", "··· ··· ···", "--- --- ---"],
            "answer": 1,
            "explanation": "S는 짧게 3번(···), O는 길게 3번(---). 합치면 ··· --- ···!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H03",
        "title": "만보기 걸음 수 세기",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "가속도 센서로 걸음을 감지하는 만보기를 만듭니다. 일정 크기 이상의 가속도 변화가 감지되면 한 걸음으로 카운트해요.",
        "pythonCode": "# 만보기 - 걸음 수 세기\nsteps = 0\nlast_magnitude = 0\nthreshold = 12  # 걸음 감지 기준값\n\ndef on_accel(x, y, z):\n    global steps, last_magnitude\n    magnitude = (x**2 + y**2 + z**2) ** 0.5\n    \n    # 가속도 변화가 기준값 이상이면 한 걸음\n    if abs(magnitude - last_magnitude) > threshold:\n        steps += 1\n        print(f'걸음 수: {steps}')\n        vibrate(50)  # 짧은 피드백\n    \n    last_magnitude = magnitude\n\nprint('만보기 시작! 걸어보세요.')",
        "flutterWidget": "pedometer",
        "steps": [
            "만보기가 시작되면 가속도 센서가 활성화됩니다",
            "스마트폰을 들고 걸어보세요",
            "걸음이 감지될 때마다 숫자가 올라갑니다"
        ],
        "concepts": [
            {"term": "magnitude (크기)", "explanation": "x²+y²+z²의 제곱근으로 전체 가속도 크기를 구해요."},
            {"term": "threshold (기준값)", "explanation": "이 값보다 큰 변화만 걸음으로 인정해요. 너무 작으면 오감지!"},
            {"term": "global 변수", "explanation": "함수 안에서 바깥 변수를 수정하려면 global 키워드가 필요해요."}
        ],
        "quiz": {
            "question": "만보기에서 threshold가 너무 낮으면?",
            "options": ["걸음을 못 셈", "걸음을 너무 많이 셈", "배터리 절약", "화면이 꺼짐"],
            "answer": 1,
            "explanation": "기준값이 너무 낮으면 작은 움직임도 걸음으로 인식해서 실제보다 많이 세요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H04",
        "title": "수평계 기울기 측정",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "가속도 센서의 X, Y 값을 이용해 수평계를 만듭니다. 기포가 중앙에 오면 수평이에요!",
        "pythonCode": "# 수평계 - 기울기 측정\nimport math\n\ndef on_accel(x, y, z):\n    # X, Y 기울기를 각도로 변환\n    angle_x = math.atan2(x, z) * 180 / math.pi\n    angle_y = math.atan2(y, z) * 180 / math.pi\n    \n    print(f'X 기울기: {angle_x:.1f}°')\n    print(f'Y 기울기: {angle_y:.1f}°')\n    \n    if abs(angle_x) < 3 and abs(angle_y) < 3:\n        print('✅ 수평입니다!')\n    else:\n        print('⚠️ 기울어져 있어요')\n\nprint('스마트폰을 평평한 곳에 놓아보세요')",
        "flutterWidget": "level",
        "steps": [
            "스마트폰을 평평한 곳에 놓아보세요",
            "초록 원(기포)이 중앙에 오면 수평입니다",
            "기울이면 기포가 기울기 방향으로 이동합니다"
        ],
        "concepts": [
            {"term": "atan2()", "explanation": "가속도 값을 각도(°)로 변환하는 삼각함수예요."},
            {"term": "수평 판정", "explanation": "X, Y 기울기가 모두 3° 이내면 수평으로 판단해요."},
            {"term": "실시간 센서", "explanation": "센서 값이 계속 변하므로 화면도 실시간으로 업데이트돼요."}
        ],
        "quiz": {
            "question": "수평계에서 기포가 중앙에 있으면?",
            "options": ["기울어진 상태", "수평 상태", "센서 고장", "배터리 부족"],
            "answer": 1,
            "explanation": "기포가 중앙 = X, Y 기울기가 거의 0° = 수평이에요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H05",
        "title": "흔들어서 색상 바꾸기",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 흔들 때마다 배경 색상이 랜덤으로 바뀝니다. 현재 색상의 HEX 코드도 함께 표시해요!",
        "pythonCode": "# 흔들어서 색상 바꾸기\nimport random\n\ndef random_color():\n    r = random.randint(0, 255)\n    g = random.randint(0, 255)\n    b = random.randint(0, 255)\n    return f'#{r:02X}{g:02X}{b:02X}'\n\ndef on_shake():\n    color = random_color()\n    set_background(color)\n    print(f'새 색상: {color}')\n    vibrate(100)\n\naccel = get_accelerometer()\nif accel.total > 20:\n    on_shake()",
        "flutterWidget": "shakeColor",
        "steps": [
            "화면에 현재 색상이 표시됩니다",
            "스마트폰을 흔들면 랜덤 색상으로 바뀝니다",
            "HEX 코드(예: #FF5733)가 함께 표시됩니다"
        ],
        "concepts": [
            {"term": "HEX 색상코드", "explanation": "#RRGGBB 형식으로 빨강, 초록, 파랑 각각 00~FF(0~255)로 색을 표현해요."},
            {"term": "f-string 포매팅", "explanation": "{r:02X}는 숫자를 2자리 16진수 대문자로 변환해요."},
            {"term": "RGB", "explanation": "Red, Green, Blue 3가지 빛을 섞어 모든 색상을 만들 수 있어요."}
        ],
        "quiz": {
            "question": "#FF0000은 무슨 색인가요?",
            "options": ["파랑", "빨강", "초록", "노랑"],
            "answer": 1,
            "explanation": "FF0000에서 R=FF(255), G=00, B=00이므로 빨강 100%!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H06",
        "title": "기울기 방향 표시기",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰 기울기에 따라 화살표가 기울기 방향을 가리킵니다. 8방향(상하좌우+대각선)을 표시해요.",
        "pythonCode": "# 기울기 방향 표시기\nimport math\n\ndef get_direction(x, y):\n    # 기울기가 작으면 중립\n    if abs(x) < 2 and abs(y) < 2:\n        return '● 수평'\n    \n    # 각도로 방향 계산\n    angle = math.atan2(y, x) * 180 / math.pi\n    directions = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘']\n    idx = round(angle / 45) % 8\n    return directions[idx]\n\naccel = get_accelerometer()\narrow = get_direction(accel.x, accel.y)\nprint(f'방향: {arrow}')",
        "flutterWidget": "tiltArrow",
        "steps": [
            "스마트폰을 평평하게 들어주세요",
            "기울이면 화살표가 기울기 방향을 가리킵니다",
            "기울기 각도도 함께 표시됩니다"
        ],
        "concepts": [
            {"term": "atan2(y, x)", "explanation": "X, Y 좌표를 각도로 변환해요. 결과는 라디안이에요."},
            {"term": "8방향 판별", "explanation": "360°를 8등분(45°씩)하여 ↑↗→↘↓↙←↖을 결정해요."},
            {"term": "라디안→도", "explanation": "라디안 × 180/π = 도(degree). π ≈ 3.14159"}
        ],
        "quiz": {
            "question": "360°를 8등분하면 한 방향은 몇 도?",
            "options": ["30°", "45°", "60°", "90°"],
            "answer": 1,
            "explanation": "360 ÷ 8 = 45°! 각 방향이 45°씩 차지해요."
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H07",
        "title": "진동 패턴 만들기",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "진동",
        "type": "sensor",
        "description": "점(·)과 선(—) 버튼으로 나만의 진동 패턴을 만들고 재생합니다. 모스부호처럼 진동으로 메시지를 만들어보세요!",
        "pythonCode": "# 진동 패턴 만들기\npattern = []  # 진동 시간 리스트\n\ndef add_dot():\n    pattern.append(200)   # 짧은 진동\n    pattern.append(200)   # 대기\n    print(f'패턴: {\"·\" * len(pattern)//2}')\n\ndef add_dash():\n    pattern.append(600)   # 긴 진동\n    pattern.append(200)   # 대기\n    print(f'패턴에 — 추가')\n\ndef play_pattern():\n    for i, ms in enumerate(pattern):\n        if i % 2 == 0:  # 짝수 인덱스 = 진동\n            vibrate(ms)\n        sleep(ms)        # 대기\n    print('패턴 재생 완료!')\n\nprint('점(·)과 선(—)으로 패턴을 만드세요')",
        "flutterWidget": "vibePattern",
        "steps": [
            "점(·) 또는 선(—) 버튼을 눌러 패턴을 추가합니다",
            "재생 버튼을 누르면 만든 패턴대로 진동합니다",
            "초기화 버튼으로 패턴을 지울 수 있습니다"
        ],
        "concepts": [
            {"term": "리스트 (List)", "explanation": "여러 데이터를 순서대로 담는 자료구조예요. pattern = [200, 200, 600, 200]"},
            {"term": "append()", "explanation": "리스트 끝에 새 항목을 추가하는 메서드예요."},
            {"term": "인덱스 (index)", "explanation": "리스트에서 몇 번째인지 나타내요. 0부터 시작! pattern[0]이 첫 번째."}
        ],
        "quiz": {
            "question": "pattern.append(200)은 무엇을 하나요?",
            "options": ["200을 삭제", "리스트 끝에 200 추가", "200번 반복", "200으로 초기화"],
            "answer": 1,
            "explanation": "append()는 리스트의 맨 뒤에 새 값을 추가하는 메서드예요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H08",
        "title": "흔들기 카운터",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 흔든 횟수를 세는 카운터입니다. 누적 횟수와 함께 리셋 기능도 있어요.",
        "pythonCode": "# 흔들기 카운터\nshake_count = 0\nlast_shake_time = 0\n\ndef on_accel(x, y, z):\n    global shake_count, last_shake_time\n    total = abs(x) + abs(y) + abs(z)\n    now = current_time_ms()\n    \n    # 1초 간격으로 흔들기 감지\n    if total > 20 and now - last_shake_time > 1000:\n        shake_count += 1\n        last_shake_time = now\n        print(f'흔들기 횟수: {shake_count}')\n        vibrate(100)\n\ndef reset():\n    global shake_count\n    shake_count = 0\n    print('카운터 초기화!')\n\nprint('흔들어서 카운트를 올리세요!')",
        "flutterWidget": "shakeCount",
        "steps": [
            "스마트폰을 흔들면 카운트가 올라갑니다",
            "흔들기 사이 1초 간격이 있어야 감지됩니다",
            "리셋 버튼으로 0으로 초기화할 수 있습니다"
        ],
        "concepts": [
            {"term": "카운터 변수", "explanation": "값을 1씩 증가시키는 변수. shake_count += 1"},
            {"term": "쿨다운 (cooldown)", "explanation": "1초 간격을 두어 한 번 흔들기가 여러 번 감지되는 것을 방지해요."},
            {"term": "abs() 절대값", "explanation": "음수를 양수로 바꿔요. abs(-5) = 5. 방향 상관없이 크기만 비교!"}
        ],
        "quiz": {
            "question": "abs(-7) + abs(3)의 결과는?",
            "options": ["4", "-4", "10", "-10"],
            "answer": 2,
            "explanation": "abs(-7) = 7, abs(3) = 3이므로 7 + 3 = 10!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H09",
        "title": "기울기로 슬라이더 제어",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "고급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 좌우로 기울여 슬라이더 값(0~100)을 제어합니다. 기울기 센서로 UI를 조작하는 방법을 배워요!",
        "pythonCode": "# 기울기로 슬라이더 제어\nslider_value = 50  # 초기값 중앙\n\ndef on_accel(x, y, z):\n    global slider_value\n    # X축 기울기를 슬라이더 값으로 변환\n    # x: -10 ~ +10 → 0 ~ 100\n    slider_value = int((x + 10) / 20 * 100)\n    slider_value = max(0, min(100, slider_value))  # 범위 제한\n    \n    bar = '█' * (slider_value // 5) + '░' * (20 - slider_value // 5)\n    print(f'[{bar}] {slider_value}%')\n\nprint('좌우로 기울여서 값을 조절하세요')",
        "flutterWidget": "tiltSlider",
        "steps": [
            "스마트폰을 수평으로 잡으세요 (50%)",
            "왼쪽으로 기울이면 값이 줄어듭니다",
            "오른쪽으로 기울이면 값이 늘어납니다"
        ],
        "concepts": [
            {"term": "값 매핑", "explanation": "센서 범위(-10~+10)를 슬라이더 범위(0~100)로 변환하는 기법이에요."},
            {"term": "clamp (범위 제한)", "explanation": "max(0, min(100, v))으로 값이 0~100 밖으로 나가지 않게 해요."},
            {"term": "시각적 피드백", "explanation": "█과 ░로 막대그래프를 만들어 값을 직관적으로 표시해요."}
        ],
        "quiz": {
            "question": "max(0, min(100, 150))의 결과는?",
            "options": ["0", "100", "150", "-50"],
            "answer": 1,
            "explanation": "min(100, 150) = 100, max(0, 100) = 100. 150이 100으로 제한돼요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "H10",
        "title": "움직임 감지 알람",
        "category": "H",
        "categoryName": "센서",
        "difficulty": "고급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 놓아둔 뒤 누가 움직이면 알람이 울립니다. 보안 알람처럼 동작해요!",
        "pythonCode": "# 움직임 감지 알람\narmed = False\nbase_x, base_y, base_z = 0, 0, 0\nalarm_threshold = 3  # 민감도\n\ndef arm_alarm():\n    global armed, base_x, base_y, base_z\n    accel = get_accelerometer()\n    base_x, base_y, base_z = accel.x, accel.y, accel.z\n    armed = True\n    print('⚠️ 알람 설정! 5초 후 감지 시작...')\n    sleep(5000)\n    print('🔒 감지 중...')\n\ndef check_motion(x, y, z):\n    if not armed:\n        return\n    dx = abs(x - base_x)\n    dy = abs(y - base_y)\n    dz = abs(z - base_z)\n    if dx + dy + dz > alarm_threshold:\n        print('🚨 움직임 감지! 알람!')\n        vibrate(1000)\n\nprint('알람 설정 버튼을 누르세요')",
        "flutterWidget": "motionAlarm",
        "steps": [
            "알람 설정 버튼을 누릅니다",
            "5초 대기 후 감지가 시작됩니다",
            "스마트폰이 움직이면 알람과 진동이 울립니다"
        ],
        "concepts": [
            {"term": "기준값 저장", "explanation": "알람 설정 시 현재 가속도를 기준으로 저장하고, 이후 변화를 감지해요."},
            {"term": "민감도 (threshold)", "explanation": "alarm_threshold 값을 조절해서 감지 민감도를 변경할 수 있어요."},
            {"term": "상태 관리", "explanation": "armed 변수로 알람이 켜진/꺼진 상태를 관리해요."}
        ],
        "quiz": {
            "question": "움직임 감지의 원리는?",
            "options": ["GPS 위치 변화", "가속도 기준값과 현재값 차이", "소리 감지", "온도 변화"],
            "answer": 1,
            "explanation": "설정 시 가속도를 저장하고, 현재 가속도와의 차이가 크면 '움직였다'고 판단해요!"
        },
        "expectedOutput": None
    })

    # ═══════════════════════════════════════════════════════════
    #  I. 카메라/소리 (중급~고급) — 10개
    # ═══════════════════════════════════════════════════════════

    items.append({
        "no": "I01",
        "title": "카메라로 사진 찍기",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "카메라",
        "type": "camera",
        "description": "스마트폰 카메라를 프로그래밍으로 제어하여 사진을 찍고 화면에 표시합니다. 파일 크기도 함께 확인해요!",
        "pythonCode": "# 카메라로 사진 찍기\nfrom camera import Camera\n\ncam = Camera()\ncam.open()          # 카메라 열기\n\nphoto = cam.capture()   # 사진 촬영\nshow_image(photo)       # 화면에 표시\n\nprint(f'사진 크기: {photo.size}KB')\nprint('촬영 완료!')",
        "flutterWidget": "camera",
        "steps": [
            "촬영 버튼을 누르면 카메라가 열립니다",
            "사진을 찍으면 앱으로 돌아옵니다",
            "사진이 표시되고 파일 크기가 나타납니다"
        ],
        "concepts": [
            {"term": "카메라 API", "explanation": "프로그램으로 카메라를 열기/촬영/닫기 할 수 있어요."},
            {"term": "권한 (Permission)", "explanation": "개인정보 보호를 위해 카메라 사용 시 사용자 허락이 필요해요."},
            {"term": "이미지 파일", "explanation": "촬영 사진은 JPEG로 저장돼요. 1KB = 1024바이트."}
        ],
        "quiz": {
            "question": "카메라 사용에 허용이 필요한 이유는?",
            "options": ["배터리 때문", "개인정보 보호", "인터넷 필요", "화면 크기"],
            "answer": 1,
            "explanation": "앱이 몰래 카메라를 켜지 못하도록 반드시 사용자 허용이 필요해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I02",
        "title": "손전등 켜기/끄기",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "플래시",
        "type": "sensor",
        "description": "스마트폰 후면 플래시 LED를 켜고 끄는 손전등 앱을 만듭니다. 토글 버튼으로 간편하게 제어해요.",
        "pythonCode": "# 손전등 켜기/끄기\nflash_on = False\n\ndef toggle_flash():\n    global flash_on\n    flash_on = not flash_on  # True↔False 전환\n    \n    if flash_on:\n        set_torch(True)   # 플래시 켜기\n        print('🔦 손전등 ON')\n    else:\n        set_torch(False)  # 플래시 끄기\n        print('손전등 OFF')\n\nprint('버튼을 눌러 손전등을 켜세요')",
        "flutterWidget": "flashlight",
        "steps": [
            "손전등 버튼을 누릅니다",
            "후면 플래시 LED가 켜집니다",
            "다시 누르면 꺼집니다 (토글)"
        ],
        "concepts": [
            {"term": "토글 (Toggle)", "explanation": "not 연산자로 True↔False를 전환하는 패턴이에요."},
            {"term": "불리언 (Boolean)", "explanation": "True(참) 또는 False(거짓) 두 가지 값만 가지는 자료형이에요."},
            {"term": "하드웨어 제어", "explanation": "코드로 LED, 모터 등 하드웨어를 직접 제어할 수 있어요."}
        ],
        "quiz": {
            "question": "not True의 결과는?",
            "options": ["True", "False", "None", "오류"],
            "answer": 1,
            "explanation": "not은 True를 False로, False를 True로 뒤집어요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I03",
        "title": "셀카 찍기 전면 카메라",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "카메라",
        "type": "camera",
        "description": "전면(셀카) 카메라를 사용하여 셀카를 찍습니다. 후면 카메라와 전면 카메라의 차이를 배워요.",
        "pythonCode": "# 셀카 찍기 - 전면 카메라\nfrom camera import Camera\n\ncam = Camera(facing='front')  # 전면 카메라 선택\ncam.open()\n\nphoto = cam.capture()\nshow_image(photo)\n\nprint('셀카 촬영 완료!')\nprint(f'크기: {photo.width}x{photo.height}')",
        "flutterWidget": "selfie",
        "steps": [
            "셀카 버튼을 누르면 전면 카메라가 열립니다",
            "얼굴을 맞추고 촬영합니다",
            "찍은 셀카가 화면에 표시됩니다"
        ],
        "concepts": [
            {"term": "전면/후면 카메라", "explanation": "facing='front'는 셀카, 'rear'는 후면 카메라를 선택해요."},
            {"term": "해상도", "explanation": "width × height로 사진의 크기(픽셀 수)를 나타내요."},
            {"term": "매개변수", "explanation": "Camera(facing='front')처럼 함수에 설정값을 전달하는 거예요."}
        ],
        "quiz": {
            "question": "전면 카메라는 주로 무엇에 사용하나요?",
            "options": ["풍경 촬영", "셀카/화상통화", "현미경", "야간 촬영"],
            "answer": 1,
            "explanation": "전면 카메라는 사용자 자신을 찍는 셀카나 화상통화에 사용해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I04",
        "title": "사진 갤러리에서 선택",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "갤러리",
        "type": "camera",
        "description": "스마트폰 갤러리에서 기존 사진을 선택하여 앱에 불러옵니다. 파일 선택기 사용법을 배워요.",
        "pythonCode": "# 갤러리에서 사진 선택\nfrom gallery import Gallery\n\ngallery = Gallery()\nphoto = gallery.pick_image()  # 사진 선택\n\nif photo is not None:\n    show_image(photo)\n    print(f'선택한 파일: {photo.name}')\n    print(f'크기: {photo.size}KB')\nelse:\n    print('사진을 선택하지 않았습니다')",
        "flutterWidget": "gallery",
        "steps": [
            "갤러리 버튼을 누릅니다",
            "사진 목록에서 원하는 사진을 선택합니다",
            "선택한 사진이 앱 화면에 표시됩니다"
        ],
        "concepts": [
            {"term": "갤러리 접근", "explanation": "저장된 사진을 앱에서 불러오려면 저장소 접근 권한이 필요해요."},
            {"term": "None 체크", "explanation": "사용자가 취소하면 None이 반환돼요. if photo is not None으로 확인!"},
            {"term": "파일 선택기", "explanation": "OS가 제공하는 파일/사진 선택 화면이에요."}
        ],
        "quiz": {
            "question": "gallery.pick_image()에서 취소하면 반환값은?",
            "options": ["빈 이미지", "오류 발생", "None", "False"],
            "answer": 2,
            "explanation": "사용자가 취소하면 None이 반환돼요. 항상 None 체크를 해야 해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I05",
        "title": "타이머 카메라 3초 후 촬영",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "카메라",
        "type": "camera",
        "description": "3초 카운트다운 후 자동으로 사진을 촬영합니다. 타이머와 카메라를 결합하는 방법을 배워요!",
        "pythonCode": "# 타이머 카메라 - 3초 후 촬영\nfrom camera import Camera\nimport time\n\ncam = Camera()\ncam.open()\n\n# 3초 카운트다운\nfor i in range(3, 0, -1):\n    print(f'{i}...')\n    time.sleep(1)\n\nprint('찰칵! 📸')\nphoto = cam.capture()\nshow_image(photo)\nvibrate(200)\nprint('촬영 완료!')",
        "flutterWidget": "timerCam",
        "steps": [
            "타이머 촬영 버튼을 누릅니다",
            "3, 2, 1 카운트다운이 시작됩니다",
            "0이 되면 자동으로 사진이 촬영됩니다"
        ],
        "concepts": [
            {"term": "range(3, 0, -1)", "explanation": "3, 2, 1 역순으로 숫자를 만들어요. -1은 감소 폭!"},
            {"term": "time.sleep(1)", "explanation": "1초 동안 대기하는 명령. 카운트다운에 활용!"},
            {"term": "자동화", "explanation": "타이머 + 촬영을 코드로 결합해서 자동 촬영을 구현해요."}
        ],
        "quiz": {
            "question": "range(3, 0, -1)이 만드는 숫자는?",
            "options": ["0, 1, 2, 3", "3, 2, 1", "3, 2, 1, 0", "1, 2, 3"],
            "answer": 1,
            "explanation": "range(3, 0, -1)은 3부터 시작해서 0 직전까지 -1씩 감소: 3, 2, 1!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I06",
        "title": "연속 촬영 버스트",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "고급",
        "hardware": "카메라",
        "type": "camera",
        "description": "버스트 모드로 연속 3장을 빠르게 촬영합니다. 반복문을 활용한 연속 동작을 배워요!",
        "pythonCode": "# 연속 촬영 (버스트 모드)\nfrom camera import Camera\n\ncam = Camera()\ncam.open()\nphotos = []  # 사진 저장 리스트\n\nfor i in range(3):\n    photo = cam.capture()\n    photos.append(photo)\n    print(f'사진 {i+1}/3 촬영!')\n    vibrate(50)\n    sleep(300)  # 0.3초 간격\n\nprint(f'총 {len(photos)}장 촬영 완료!')\nfor p in photos:\n    show_image(p)",
        "flutterWidget": "burstCam",
        "steps": [
            "버스트 촬영 버튼을 누릅니다",
            "자동으로 3장이 연속 촬영됩니다",
            "촬영된 사진들이 나란히 표시됩니다"
        ],
        "concepts": [
            {"term": "리스트에 저장", "explanation": "photos.append(photo)로 촬영한 사진을 리스트에 추가해요."},
            {"term": "연속 동작", "explanation": "for문으로 같은 동작(촬영)을 여러 번 반복해요."},
            {"term": "len()", "explanation": "리스트에 몇 개의 항목이 있는지 알려주는 함수예요."}
        ],
        "quiz": {
            "question": "photos = []; photos.append('a'); len(photos)는?",
            "options": ["0", "1", "2", "오류"],
            "answer": 1,
            "explanation": "빈 리스트에 'a' 하나를 추가했으니 len(photos) = 1!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I07",
        "title": "촬영 후 필터 효과",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "고급",
        "hardware": "카메라",
        "type": "camera",
        "description": "사진을 촬영한 후 흑백, 세피아, 반전 등의 필터 효과를 적용합니다. 이미지 처리의 기초를 배워요!",
        "pythonCode": "# 촬영 후 필터 효과\nfrom camera import Camera\nfrom image import Filter\n\ncam = Camera()\nphoto = cam.capture()\n\n# 필터 종류\ngrayscale = Filter.grayscale(photo)  # 흑백\nsepia = Filter.sepia(photo)          # 세피아 (빈티지)\ninverted = Filter.invert(photo)       # 색상 반전\n\nshow_image(grayscale)\nprint('흑백 필터: 모든 색을 회색 계열로')\nprint('세피아 필터: 따뜻한 빈티지 느낌')\nprint('반전 필터: 모든 색을 정반대로')",
        "flutterWidget": "photoFilter",
        "steps": [
            "먼저 사진을 촬영합니다",
            "흑백/세피아/반전 필터를 선택합니다",
            "필터가 적용된 결과를 확인합니다"
        ],
        "concepts": [
            {"term": "색상 매트릭스", "explanation": "RGB 값을 수학적으로 변환해서 필터 효과를 만들어요."},
            {"term": "흑백 변환", "explanation": "R, G, B를 평균내서 하나의 밝기 값으로 바꿔요."},
            {"term": "세피아 톤", "explanation": "흑백에 따뜻한 갈색 톤을 더해서 빈티지 느낌을 만들어요."}
        ],
        "quiz": {
            "question": "흑백 필터의 원리는?",
            "options": ["R값만 사용", "RGB 평균으로 밝기 계산", "파란색만 남기기", "대비 높이기"],
            "answer": 1,
            "explanation": "RGB 세 값의 가중 평균을 구해서 하나의 밝기(Gray) 값으로 변환해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I08",
        "title": "QR코드 표시하기",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "화면",
        "type": "canvas",
        "description": "텍스트를 입력하면 QR코드 형태의 패턴을 화면에 그립니다. CustomPaint로 격자 패턴을 그리는 방법을 배워요.",
        "pythonCode": "# QR코드 패턴 표시하기\nfrom graphics import Canvas\nimport hashlib\n\ndef text_to_pattern(text, size=8):\n    # 텍스트를 해시값으로 변환하여 패턴 생성\n    h = hashlib.md5(text.encode()).hexdigest()\n    pattern = []\n    for i in range(size):\n        row = []\n        for j in range(size):\n            idx = (i * size + j) % len(h)\n            row.append(int(h[idx], 16) > 7)\n        pattern.append(row)\n    return pattern\n\ntext = 'Hello UTTEC!'\npattern = text_to_pattern(text)\ndraw_qr(pattern)\nprint(f'패턴 생성: {text}')",
        "flutterWidget": "qrDisplay",
        "steps": [
            "텍스트 입력 필드에 원하는 문자를 입력합니다",
            "생성 버튼을 누르면 QR 패턴이 그려집니다",
            "텍스트가 다르면 다른 패턴이 만들어집니다"
        ],
        "concepts": [
            {"term": "해시 함수", "explanation": "입력을 고정 길이 문자열로 변환해요. 같은 입력 = 같은 출력!"},
            {"term": "2차원 배열", "explanation": "행과 열로 이루어진 격자 데이터. pattern[행][열]로 접근해요."},
            {"term": "CustomPaint", "explanation": "Flutter에서 자유롭게 도형을 그릴 수 있는 위젯이에요."}
        ],
        "quiz": {
            "question": "같은 텍스트로 해시 함수를 두 번 실행하면?",
            "options": ["다른 결과", "같은 결과", "오류 발생", "랜덤 결과"],
            "answer": 1,
            "explanation": "해시 함수는 같은 입력에 항상 같은 결과를 반환해요! (결정적 함수)"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I09",
        "title": "색상 선택기",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "고급",
        "hardware": "화면",
        "type": "canvas",
        "description": "HSV 색상환에서 원하는 색상을 터치로 선택합니다. 색상의 Hue(색조), Saturation(채도), Value(명도)를 배워요.",
        "pythonCode": "# HSV 색상 선택기\nimport math\n\ndef hsv_to_rgb(h, s, v):\n    # H: 0~360, S: 0~1, V: 0~1\n    c = v * s\n    x = c * (1 - abs((h / 60) % 2 - 1))\n    m = v - c\n    \n    if h < 60: r, g, b = c, x, 0\n    elif h < 120: r, g, b = x, c, 0\n    elif h < 180: r, g, b = 0, c, x\n    elif h < 240: r, g, b = 0, x, c\n    elif h < 300: r, g, b = x, 0, c\n    else: r, g, b = c, 0, x\n    \n    return int((r+m)*255), int((g+m)*255), int((b+m)*255)\n\n# 터치 좌표 → 색상\ncolor = hsv_to_rgb(180, 0.8, 1.0)\nprint(f'선택한 색: RGB{color}')",
        "flutterWidget": "colorPicker",
        "steps": [
            "색상환(원형 그래디언트)이 표시됩니다",
            "원하는 위치를 터치하면 색상이 선택됩니다",
            "선택한 색상의 RGB/HEX 값이 표시됩니다"
        ],
        "concepts": [
            {"term": "HSV 색상 모델", "explanation": "Hue(색조 0~360°), Saturation(채도), Value(명도)로 색을 표현해요."},
            {"term": "색상환", "explanation": "360°로 모든 색을 원형으로 배치한 거예요. 0°=빨강, 120°=초록, 240°=파랑."},
            {"term": "좌표→색상 변환", "explanation": "터치 좌표에서 각도(Hue)와 거리(Saturation)를 계산해요."}
        ],
        "quiz": {
            "question": "HSV에서 H=0, S=1, V=1은 무슨 색?",
            "options": ["검정", "하양", "빨강", "파랑"],
            "answer": 2,
            "explanation": "H=0°는 빨강, S=1은 최대 채도, V=1은 최대 밝기 = 순수한 빨강!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "I10",
        "title": "디지털 시계",
        "category": "I",
        "categoryName": "카메라/소리",
        "difficulty": "중급",
        "hardware": "화면",
        "type": "canvas",
        "description": "큰 디지털 시계를 화면에 표시합니다. 매초 업데이트되며 날짜도 함께 표시해요.",
        "pythonCode": "# 디지털 시계\nfrom datetime import datetime\nimport time\n\nwhile True:\n    now = datetime.now()\n    time_str = now.strftime('%H:%M:%S')\n    date_str = now.strftime('%Y년 %m월 %d일')\n    \n    clear_screen()\n    print(f'┌──────────────┐')\n    print(f'│   {time_str}   │')\n    print(f'│  {date_str} │')\n    print(f'└──────────────┘')\n    \n    time.sleep(1)  # 1초마다 갱신",
        "flutterWidget": "digitalClock",
        "steps": [
            "큰 디지털 시계가 화면에 표시됩니다",
            "매초 자동으로 시간이 업데이트됩니다",
            "날짜와 요일도 함께 표시됩니다"
        ],
        "concepts": [
            {"term": "strftime()", "explanation": "'%H:%M:%S'로 시:분:초 형식을 지정해요."},
            {"term": "Timer (타이머)", "explanation": "일정 간격(1초)마다 코드를 반복 실행하는 도구예요."},
            {"term": "실시간 갱신", "explanation": "while True + sleep(1)로 매초 화면을 다시 그려요."}
        ],
        "quiz": {
            "question": "strftime('%H:%M')에서 %H는?",
            "options": ["분", "초", "시(24시간)", "시(12시간)"],
            "answer": 2,
            "explanation": "%H는 24시간 형식의 시간(00~23)이에요. 12시간은 %I!"
        },
        "expectedOutput": None
    })

    # ═══════════════════════════════════════════════════════════
    #  J. 게임/그래픽 (고급) — 10개
    # ═══════════════════════════════════════════════════════════

    items.append({
        "no": "J01",
        "title": "기울기로 공 굴리기",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "중급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 기울여서 빨간 공을 움직이고 노란 목표물을 잡는 게임! 센서 데이터로 게임을 만드는 방법을 배워요.",
        "pythonCode": "# 기울기로 공 굴리기 게임\nfrom sensor import Accelerometer\n\nball_x, ball_y = 150, 150\ntarget_x, target_y = random_pos()\nscore = 0\n\ndef update(accel):\n    global ball_x, ball_y, score\n    # 기울기 → 공 이동\n    ball_x += -accel.x * 1.5\n    ball_y += accel.y * 1.5\n    ball_x = clamp(ball_x, 12, 288)\n    ball_y = clamp(ball_y, 12, 288)\n    \n    # 충돌 감지\n    if distance(ball, target) < 22:\n        score += 1\n        vibrate(100)\n        new_target()",
        "flutterWidget": "ball",
        "steps": [
            "스마트폰을 평평하게 들어주세요",
            "기울이면 빨간 공이 움직입니다",
            "노란 목표물에 닿으면 점수 UP + 진동"
        ],
        "concepts": [
            {"term": "가속도→이동", "explanation": "센서 값에 속도 계수(1.5)를 곱해서 공의 이동 거리를 결정해요."},
            {"term": "clamp (범위 제한)", "explanation": "공이 화면 밖으로 나가지 않도록 위치를 제한해요."},
            {"term": "충돌 감지", "explanation": "두 점 사이 거리가 일정 이하면 '부딪혔다'고 판단해요."}
        ],
        "quiz": {
            "question": "공이 화면 밖으로 안 나가게 하려면?",
            "options": ["공을 멈춘다", "위치를 범위로 제한한다", "센서를 끈다", "화면을 키운다"],
            "answer": 1,
            "explanation": "clamp(ball_x, 12, 288)처럼 위치를 최소~최대 범위로 제한해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J02",
        "title": "반응속도 테스트",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치",
        "type": "canvas",
        "description": "화면이 초록색으로 바뀌면 최대한 빨리 터치! 반응 속도를 밀리초(ms) 단위로 측정합니다.",
        "pythonCode": "# 반응속도 테스트\nimport time\nimport random\n\nprint('빨간 화면이 초록으로 바뀌면 터치하세요!')\n\n# 랜덤 대기 (2~5초)\nwait_time = random.uniform(2, 5)\ntime.sleep(wait_time)\n\nprint('지금! 터치하세요!')\nstart = time.time()\n\n# 사용자 터치 대기\nwait_for_touch()\nend = time.time()\n\nreaction_ms = int((end - start) * 1000)\nprint(f'반응 속도: {reaction_ms}ms')\n\nif reaction_ms < 200:\n    print('⚡ 번개 같은 반응!')\nelif reaction_ms < 400:\n    print('👍 좋은 반응!')\nelse:\n    print('🐢 조금 느려요, 다시 도전!')",
        "flutterWidget": "reactionTest",
        "steps": [
            "시작 버튼을 누르고 빨간 화면을 기다립니다",
            "화면이 초록색으로 바뀌면 즉시 터치합니다",
            "반응 속도가 밀리초(ms) 단위로 표시됩니다"
        ],
        "concepts": [
            {"term": "time.time()", "explanation": "현재 시각을 초 단위 소수점으로 반환해요. 시간 차이를 잴 수 있어요."},
            {"term": "random.uniform(2, 5)", "explanation": "2.0~5.0 사이의 랜덤 소수를 만들어요. 예측 불가능한 대기 시간!"},
            {"term": "밀리초 (ms)", "explanation": "1초 = 1000ms. 사람의 평균 반응속도는 약 250ms예요."}
        ],
        "quiz": {
            "question": "사람의 평균 시각 반응속도는 약?",
            "options": ["50ms", "250ms", "1000ms", "5000ms"],
            "answer": 1,
            "explanation": "평균적으로 약 200~300ms (0.2~0.3초)예요. 200ms 이하는 매우 빨라요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J03",
        "title": "두더지 잡기",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치",
        "type": "canvas",
        "description": "랜덤 위치에 나타나는 두더지(원)를 터치해서 잡는 게임! 시간 제한 내에 최대한 많이 잡아보세요.",
        "pythonCode": "# 두더지 잡기 게임\nimport random\nimport time\n\nscore = 0\nmisses = 0\ngame_time = 30  # 30초 제한\n\ndef spawn_mole():\n    x = random.randint(30, 270)\n    y = random.randint(30, 270)\n    return x, y\n\ndef on_tap(tap_x, tap_y, mole_x, mole_y):\n    global score, misses\n    dist = ((tap_x - mole_x)**2 + (tap_y - mole_y)**2) ** 0.5\n    if dist < 30:  # 두더지 크기\n        score += 1\n        vibrate(50)\n        print(f'잡았다! 점수: {score}')\n    else:\n        misses += 1\n        print(f'놓쳤어요! 실패: {misses}')\n\nprint('두더지를 잡으세요! (30초)')",
        "flutterWidget": "whackMole",
        "steps": [
            "시작하면 랜덤 위치에 두더지(원)가 나타납니다",
            "두더지를 정확히 터치하면 점수를 얻습니다",
            "놓치면 실패 카운트가 올라갑니다"
        ],
        "concepts": [
            {"term": "랜덤 좌표", "explanation": "random.randint()로 두더지가 매번 다른 위치에 나타나요."},
            {"term": "터치 판정", "explanation": "터치 좌표와 두더지 중심의 거리가 30 이내면 '잡은 것'으로 판정해요."},
            {"term": "게임 루프", "explanation": "생성→터치→판정→새 생성을 반복하는 게임의 핵심 구조예요."}
        ],
        "quiz": {
            "question": "두더지를 '잡았다'고 판정하는 기준은?",
            "options": ["화면 아무데나 터치", "터치와 두더지 거리 < 30", "정확히 중심 터치", "더블 터치"],
            "answer": 1,
            "explanation": "터치 좌표와 두더지 중심 사이의 거리가 30 이내면 잡은 것으로 판정해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J04",
        "title": "기억력 게임 색순서",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치+진동",
        "type": "canvas",
        "description": "Simon Says 게임! 4가지 색상의 순서를 기억하고 따라 누르세요. 라운드가 올라갈수록 순서가 길어져요.",
        "pythonCode": "# 기억력 게임 (Simon Says)\nimport random\n\ncolors = ['빨강', '초록', '파랑', '노랑']\nsequence = []  # 색 순서\nplayer_input = []\nround_num = 1\n\ndef next_round():\n    global round_num\n    new_color = random.choice(colors)\n    sequence.append(new_color)\n    print(f'라운드 {round_num}: 순서를 기억하세요!')\n    for c in sequence:\n        show_color(c)\n        sleep(500)\n    round_num += 1\n\ndef check_input(color):\n    idx = len(player_input)\n    player_input.append(color)\n    if color != sequence[idx]:\n        print(f'틀렸어요! {round_num-1}라운드 기록')\n        return False\n    if len(player_input) == len(sequence):\n        print('정답! 다음 라운드!')\n        player_input.clear()\n        next_round()\n    return True",
        "flutterWidget": "simonSays",
        "steps": [
            "컴퓨터가 색 순서를 보여줍니다",
            "같은 순서대로 색 버튼을 누릅니다",
            "맞으면 다음 라운드(순서 +1), 틀리면 게임 오버"
        ],
        "concepts": [
            {"term": "리스트로 순서 관리", "explanation": "sequence 리스트에 색 순서를 저장하고 하나씩 추가해요."},
            {"term": "random.choice()", "explanation": "리스트에서 랜덤으로 하나를 골라요. 매 라운드 새 색상 추가!"},
            {"term": "입력 검증", "explanation": "플레이어 입력을 정답 순서와 하나씩 비교해요."}
        ],
        "quiz": {
            "question": "random.choice(['빨강','파랑','초록'])은?",
            "options": ["항상 빨강", "셋 중 랜덤 하나", "리스트 전체 반환", "오류"],
            "answer": 1,
            "explanation": "choice()는 리스트에서 무작위로 하나를 골라 반환해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J05",
        "title": "틱택토 삼목",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치",
        "type": "canvas",
        "description": "3x3 격자에서 X와 O를 번갈아 놓는 틱택토 게임! 가로, 세로, 대각선으로 3개를 먼저 놓으면 승리!",
        "pythonCode": "# 틱택토 (삼목) 게임\nboard = [[' ']*3 for _ in range(3)]  # 3x3 빈 판\ncurrent = 'X'  # X가 먼저\n\ndef place(row, col):\n    global current\n    if board[row][col] != ' ':\n        print('이미 놓여있어요!')\n        return\n    board[row][col] = current\n    \n    if check_win(current):\n        print(f'{current} 승리!')\n    elif is_full():\n        print('무승부!')\n    else:\n        current = 'O' if current == 'X' else 'X'\n        print(f'{current}의 차례')\n\ndef check_win(player):\n    # 가로, 세로, 대각선 검사\n    for i in range(3):\n        if all(board[i][j] == player for j in range(3)): return True\n        if all(board[j][i] == player for j in range(3)): return True\n    if all(board[i][i] == player for i in range(3)): return True\n    if all(board[i][2-i] == player for i in range(3)): return True\n    return False",
        "flutterWidget": "ticTacToe",
        "steps": [
            "3x3 격자가 표시됩니다",
            "빈 칸을 터치하면 X 또는 O가 놓입니다",
            "가로/세로/대각선으로 3개 연속이면 승리!"
        ],
        "concepts": [
            {"term": "2차원 리스트", "explanation": "board[행][열]로 3x3 격자를 표현해요."},
            {"term": "승리 조건 검사", "explanation": "가로 3줄, 세로 3줄, 대각선 2줄 = 총 8가지 경우를 검사해요."},
            {"term": "턴 전환", "explanation": "'X' if current == 'O' else 'O'로 교대해요."}
        ],
        "quiz": {
            "question": "틱택토에서 확인해야 할 승리 경우의 수는?",
            "options": ["3가지", "6가지", "8가지", "9가지"],
            "answer": 2,
            "explanation": "가로 3줄 + 세로 3줄 + 대각선 2줄 = 총 8가지!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J06",
        "title": "숫자 퍼즐 15퍼즐",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치",
        "type": "canvas",
        "description": "4x4 격자에서 숫자 1~15를 순서대로 정렬하는 슬라이드 퍼즐. 빈 칸 옆의 숫자를 터치하면 이동합니다.",
        "pythonCode": "# 15 퍼즐 (슬라이드 퍼즐)\nimport random\n\n# 4x4 보드 (0 = 빈 칸)\nboard = list(range(1, 16)) + [0]\nrandom.shuffle(board)  # 섞기\n\ndef move(pos):\n    empty = board.index(0)\n    # 인접한 위치인지 확인\n    row_e, col_e = empty // 4, empty % 4\n    row_p, col_p = pos // 4, pos % 4\n    \n    if abs(row_e - row_p) + abs(col_e - col_p) == 1:\n        board[empty], board[pos] = board[pos], board[empty]\n        print(f'이동: {board[empty]}')\n        if is_solved():\n            print('축하합니다! 퍼즐 완성!')\n\ndef is_solved():\n    return board == list(range(1, 16)) + [0]\n\nprint_board()",
        "flutterWidget": "slidePuzzle",
        "steps": [
            "섞인 숫자 퍼즐이 표시됩니다",
            "빈 칸 옆 숫자를 터치하면 이동합니다",
            "1~15를 순서대로 정렬하면 완성!"
        ],
        "concepts": [
            {"term": "1차원↔2차원 변환", "explanation": "pos // 4 = 행, pos % 4 = 열. 1차원 인덱스를 2차원 좌표로!"},
            {"term": "맨해튼 거리", "explanation": "|행차이| + |열차이| = 1이면 인접한 칸이에요."},
            {"term": "swap (교환)", "explanation": "a, b = b, a로 두 값을 한 줄에 교환할 수 있어요."}
        ],
        "quiz": {
            "question": "인덱스 7을 4x4 격자의 좌표로 바꾸면?",
            "options": ["(1, 2)", "(1, 3)", "(2, 0)", "(0, 7)"],
            "answer": 1,
            "explanation": "7 // 4 = 1 (행), 7 % 4 = 3 (열) → (1, 3)!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J07",
        "title": "스네이크 게임",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "스와이프",
        "type": "canvas",
        "description": "클래식 스네이크 게임! 스와이프로 방향을 바꾸고, 먹이를 먹으면 뱀이 길어집니다. 벽이나 자기 몸에 부딪히면 게임 오버!",
        "pythonCode": "# 스네이크 게임\nimport random\n\n# 10x10 격자\nsnake = [(5, 5)]  # 뱀 몸통 (머리가 [0])\ndirection = (0, -1)  # 초기 방향: 위\nfood = (random.randint(0,9), random.randint(0,9))\nscore = 0\n\ndef update():\n    global score, food\n    head = snake[0]\n    new_head = (head[0] + direction[0], head[1] + direction[1])\n    \n    # 벽/자기 몸 충돌 검사\n    if (new_head[0] < 0 or new_head[0] >= 10 or\n        new_head[1] < 0 or new_head[1] >= 10 or\n        new_head in snake):\n        print(f'게임 오버! 점수: {score}')\n        return\n    \n    snake.insert(0, new_head)  # 머리 이동\n    if new_head == food:\n        score += 1\n        food = spawn_food()  # 새 먹이\n    else:\n        snake.pop()  # 꼬리 제거\n\ndef on_swipe(dir):\n    global direction\n    direction = dir",
        "flutterWidget": "snake",
        "steps": [
            "초록색 뱀이 자동으로 이동합니다",
            "스와이프로 이동 방향을 바꿉니다",
            "빨간 먹이를 먹으면 길어지고, 벽/몸 충돌 시 게임 오버"
        ],
        "concepts": [
            {"term": "리스트로 뱀 표현", "explanation": "snake 리스트의 각 항목이 뱀의 한 칸. [0]이 머리!"},
            {"term": "insert(0, x) + pop()", "explanation": "머리에 추가하고 꼬리를 제거하면 이동 효과! 먹이 먹으면 pop() 생략."},
            {"term": "충돌 감지", "explanation": "머리 좌표가 벽 밖이거나 뱀 몸에 있으면 게임 오버!"}
        ],
        "quiz": {
            "question": "뱀이 먹이를 먹으면 어떻게 길어지나요?",
            "options": ["머리만 추가", "꼬리 제거 안 함", "뱀 2개로 분리", "새 뱀 생성"],
            "answer": 1,
            "explanation": "보통은 머리 추가 + 꼬리 제거지만, 먹이 먹으면 꼬리 제거를 안 해서 길어져요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J08",
        "title": "타이핑 게임",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "키보드",
        "type": "canvas",
        "description": "화면 위에서 떨어지는 단어를 타이핑하여 파괴하는 게임! 바닥에 닿기 전에 빠르게 입력하세요.",
        "pythonCode": "# 타이핑 게임 - 떨어지는 단어\nimport random\n\nwords_db = ['python', 'code', 'game', 'hello', 'world',\n            'loop', 'list', 'fun', 'app', 'data']\n\nfalling_words = []  # (단어, x좌표, y좌표)\nscore = 0\n\ndef spawn_word():\n    word = random.choice(words_db)\n    x = random.randint(20, 280)\n    falling_words.append([word, x, 0])\n\ndef on_type(typed):\n    global score\n    for w in falling_words:\n        if w[0] == typed:\n            falling_words.remove(w)\n            score += 1\n            print(f'파괴! 점수: {score}')\n            return\n    print('해당 단어가 없어요!')\n\ndef update():\n    for w in falling_words:\n        w[2] += 2  # y좌표 증가 (떨어짐)\n        if w[2] > 300:\n            print(f'게임 오버! 점수: {score}')",
        "flutterWidget": "typingGame",
        "steps": [
            "화면 위에서 단어가 떨어집니다",
            "입력창에 보이는 단어를 빠르게 타이핑합니다",
            "맞추면 단어가 사라지고 점수 UP!"
        ],
        "concepts": [
            {"term": "리스트 관리", "explanation": "falling_words에 새 단어를 추가하고, 맞추면 remove()로 제거해요."},
            {"term": "문자열 비교", "explanation": "typed == word로 입력한 문자와 떨어지는 단어를 비교해요."},
            {"term": "게임 타이머", "explanation": "일정 간격으로 update()를 호출해 단어를 아래로 이동시켜요."}
        ],
        "quiz": {
            "question": "falling_words.remove(w)는 무엇을 하나요?",
            "options": ["모든 단어 삭제", "해당 단어 삭제", "단어 추가", "단어 정렬"],
            "answer": 1,
            "explanation": "remove(w)는 리스트에서 해당 항목 w를 찾아 제거해요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J09",
        "title": "그림 그리기 터치 드로잉",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "터치",
        "type": "canvas",
        "description": "손가락으로 화면에 자유롭게 그림을 그립니다. 색상과 굵기를 선택할 수 있어요!",
        "pythonCode": "# 터치 드로잉\nfrom graphics import Canvas\n\ncanvas = Canvas(300, 300)\ncolor = 'white'\nbrush_size = 3\npoints = []  # 터치 경로\n\ndef on_touch_move(x, y):\n    points.append((x, y, color, brush_size))\n    if len(points) > 1:\n        prev = points[-2]\n        canvas.draw_line(prev[0], prev[1], x, y,\n                        color=color, width=brush_size)\n\ndef set_color(c):\n    global color\n    color = c\n    print(f'색상: {c}')\n\ndef clear_canvas():\n    points.clear()\n    canvas.clear()\n    print('캔버스 초기화!')\n\nprint('화면에 손가락으로 그림을 그려보세요!')",
        "flutterWidget": "drawing",
        "steps": [
            "화면을 손가락으로 드래그하면 선이 그려집니다",
            "아래 색상 버튼으로 그리기 색을 바꿉니다",
            "지우기 버튼으로 캔버스를 초기화합니다"
        ],
        "concepts": [
            {"term": "터치 이벤트", "explanation": "on_touch_move()로 손가락 이동을 실시간으로 감지해요."},
            {"term": "좌표 기록", "explanation": "터치 경로를 리스트에 저장해서 선을 이어 그려요."},
            {"term": "Canvas API", "explanation": "draw_line()으로 두 점 사이에 선을 그릴 수 있어요."}
        ],
        "quiz": {
            "question": "부드러운 선을 그리려면?",
            "options": ["점을 하나만 찍기", "이전 좌표와 현재 좌표를 선으로 연결", "원을 그리기", "사각형을 그리기"],
            "answer": 1,
            "explanation": "이전 터치 좌표와 현재 좌표를 선(draw_line)으로 이으면 부드러운 선이 돼요!"
        },
        "expectedOutput": None
    })

    items.append({
        "no": "J10",
        "title": "기울기 미로 탈출",
        "category": "J",
        "categoryName": "게임",
        "difficulty": "고급",
        "hardware": "가속도",
        "type": "sensor",
        "description": "스마트폰을 기울여서 공을 움직이고, 벽을 피해 미로를 탈출하세요! 벽에 부딪히면 진동이 울립니다.",
        "pythonCode": "# 기울기 미로 탈출\nfrom sensor import Accelerometer\n\n# 미로 벽 정의 (x1, y1, x2, y2)\nwalls = [\n    (50, 0, 50, 200),\n    (100, 100, 100, 300),\n    (150, 0, 150, 200),\n    (200, 100, 200, 300),\n    (250, 0, 250, 200),\n]\nball_x, ball_y = 25, 25\ngoal_x, goal_y = 275, 275\n\ndef update(accel):\n    global ball_x, ball_y\n    new_x = ball_x + -accel.x * 1.0\n    new_y = ball_y + accel.y * 1.0\n    \n    # 벽 충돌 검사\n    if not hits_wall(new_x, new_y):\n        ball_x, ball_y = new_x, new_y\n    else:\n        vibrate(100)  # 벽에 부딪힘!\n    \n    # 골 도달\n    if distance((ball_x, ball_y), (goal_x, goal_y)) < 15:\n        print('🎉 미로 탈출 성공!')\n        vibrate(500)",
        "flutterWidget": "maze",
        "steps": [
            "미로와 빨간 공, 초록 출구가 표시됩니다",
            "스마트폰을 기울여서 공을 움직입니다",
            "벽을 피해 초록 출구에 도달하면 클리어!"
        ],
        "concepts": [
            {"term": "벽 충돌", "explanation": "이동할 위치가 벽과 겹치면 이동을 막아요."},
            {"term": "미로 데이터", "explanation": "벽의 시작점(x1,y1)과 끝점(x2,y2)을 리스트로 저장해요."},
            {"term": "게임 물리", "explanation": "센서→이동→충돌검사→화면갱신의 반복이 게임 물리엔진이에요."}
        ],
        "quiz": {
            "question": "미로에서 벽에 부딪히면?",
            "options": ["관통한다", "이동이 취소된다", "게임 오버", "벽이 사라진다"],
            "answer": 1,
            "explanation": "벽에 부딪히면 이동을 취소(원래 위치 유지)하고 진동으로 피드백을 줘요!"
        },
        "expectedOutput": None
    })

    return items


def main():
    # 기존 catalog.json 로드
    if os.path.exists(CATALOG_PATH):
        with open(CATALOG_PATH, "r", encoding="utf-8") as f:
            catalog = json.load(f)
    else:
        catalog = {"version": "1.0", "total": 0, "items": []}

    # 기존 H, I, J 카테고리 항목 제거 (중복 방지)
    existing_nos = {item["no"] for item in catalog["items"]}
    new_items = build_interactive_items()
    items_to_add = [item for item in new_items if item["no"] not in existing_nos]

    if not items_to_add:
        print("이미 모든 H, I, J 예시가 catalog.json에 존재합니다.")
        # 덮어쓰기 모드: 기존 H/I/J를 교체
        catalog["items"] = [
            item for item in catalog["items"]
            if not item["no"].startswith(("H", "I", "J"))
        ]
        items_to_add = new_items
        print("기존 H, I, J 항목을 교체합니다.")

    catalog["items"].extend(items_to_add)
    catalog["total"] = len(catalog["items"])

    # 번호 순으로 정렬
    catalog["items"].sort(key=lambda x: x["no"])

    # 저장
    with open(CATALOG_PATH, "w", encoding="utf-8") as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)

    print(f"catalog.json 업데이트 완료!")
    print(f"  - 추가된 예시: {len(items_to_add)}개")
    print(f"  - 전체 예시: {catalog['total']}개")

    # 카테고리별 통계
    cats = {}
    for item in catalog["items"]:
        cat = item.get("category", item["no"][0])
        cats[cat] = cats.get(cat, 0) + 1
    for cat, count in sorted(cats.items()):
        print(f"  - {cat}: {count}개")


if __name__ == "__main__":
    main()
