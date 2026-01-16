# UTTEC 스마트팩토리 데모 사이트 개발 세션 컨텍스트

> 이 문서를 새 세션 시작 시 Claude에게 전달하면 이전 작업을 이어서 진행할 수 있습니다.

---

## 프로젝트 개요

**프로젝트명:** UTTEC 스마트팩토리 데모 사이트
**목적:** 다양한 제조업체를 위한 AI 기반 예지정비(PdM) 시스템 데모 페이지 제작
**서버:** http://3.36.86.100:5000 (AWS EC2)

---

## 서버 접속 정보

```bash
# SSH 접속
ssh -i /Users/maeg/todo/today/uttec-first-ec2.pem ec2-user@3.36.86.100

# 서버 내 프로젝트 경로
~/sensor-monitor/public/demo/
```

---

## 로컬 프로젝트 구조

```
/Users/maeg/todo/today/SensorMonitor/
├── server/
│   └── public/
│       └── demo/
│           ├── hankook/      # 한국분체시스템 (HKPS)
│           ├── hankookmech/  # 한국기계엔지니어링
│           ├── kunileng/     # 건일이엔지
│           ├── mmco/         # 광산기공
│           ├── dhcrusher/    # 대흥크러셔
│           ├── dongwon/      # 동원분체산업
│           └── kpsm/         # 한국분체기계
└── SESSION_CONTEXT.md        # 이 파일
```

---

## 현재 운영 중인 데모 사이트 (총 7개)

| # | 업체명 | 폴더명 | 테마색상 | 주요 설비 |
|---|--------|--------|----------|-----------|
| 1 | 한국분체시스템 | hankook | 그린 #2e7d32 | 볼밀, 제트밀, 분급기, 건조기, 혼합기 |
| 2 | 한국기계엔지니어링 | hankookmech | 블루 #1565c0 | 이축 파쇄기, 해머 분쇄기, 핀밀 |
| 3 | 건일이엔지 | kunileng | 오렌지 #e65100 | NCT 펀칭, 레이저 절단, CNC 절곡, 용접 |
| 4 | 광산기공 | mmco | 틸 #1a9f7a | 임팩트크러셔, 진동스크린, 컨베이어, 필터프레스 |
| 5 | 대흥크러셔 | dhcrusher | 딥오렌지 #bf360c | 대형 분쇄기, 파쇄기, 소형 분쇄기, 재생압출기 |
| 6 | 동원분체산업 | dongwon | 퍼플 #7c3aed | Pin Mill, Hammer Mill, Roll Mill, 파쇄기, 혼합기 |
| 7 | 한국분체기계 | kpsm | 인디고 #1a237e | Air Jet Mill, ACM, Turbo Mill, 혼합기, 집진기 |

---

## 각 데모 사이트 페이지 구성

각 업체 폴더는 동일한 4개 파일로 구성:

```
업체폴더/
├── index.html        # 메인 페이지 (AI 적용 분야 소개)
├── system.html       # 시스템 구성 (센서 구조, 4-Layer 아키텍처)
├── monitor.html      # 실시간 모니터링 (3D 설비, 센서 현황, 트렌드 차트)
├── about.html        # UTTEC 소개
└── favicon.svg       # 파비콘 (업체별 테마 색상)
```

---

## 기술 스택

### Frontend
- **3D 시각화:** Three.js (r128)
- **차트:** Chart.js
- **폰트:** Noto Sans KR (Google Fonts)
- **스타일:** 순수 CSS (Tailwind 미사용)

### 실시간 통신
- **WebSocket:** 스마트폰 자세 데이터 수신
- **프로토콜:** ws://서버주소:5000

### 주요 기능
1. **3D 설비 모델링:** Three.js로 설비 형상 구현
2. **스마트폰 연동:** WebSocket으로 자세 데이터 수신 → 3D 모델 회전
3. **센서 시뮬레이션:** 정상/이상 시나리오별 센서값 변화
4. **트렌드 차트:** 60초간 센서값 히스토리 시각화
5. **알림 시스템:** 시나리오별 경고/위험 알림

---

## Git 워크플로우

```bash
# 1. 변경사항 확인
git status

# 2. 스테이징
git add 파일경로

# 3. 커밋 (한글 메시지 + Co-Author)
git commit -m "$(cat <<'EOF'
커밋 메시지

상세 설명

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"

# 4. 푸시
git push

# 5. EC2 배포
scp -i /Users/maeg/todo/today/uttec-first-ec2.pem 로컬파일 ec2-user@3.36.86.100:~/sensor-monitor/public/demo/폴더명/
```

---

## monitor.html 핵심 기능 구현 패턴

### 1. 스마트폰 연동 UI (nav-right)

```html
<div class="nav-right">
    <span class="live-badge">LIVE</span>
    <div class="phone-control">
        <label for="phoneToggle">스마트폰 연동</label>
        <input type="checkbox" id="phoneToggle" class="phone-toggle" onchange="togglePhoneConnection()">
    </div>
    <div class="connection-status">
        <div class="connection-dot" id="connectionDot"></div>
        <span id="connectionText">연결 대기</span>
    </div>
</div>
```

### 2. WebSocket 연결

```javascript
function initWebSocket() {
    const wsUrl = `ws://${window.location.host}`;
    ws = new WebSocket(wsUrl);

    ws.onopen = function() {
        updateConnectionStatus(true);
    };

    ws.onmessage = function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'calibrateReset') {
            // 캘리브레이션 리셋 처리
        }
        if (data.type === 'calibratedOrientation') {
            calibratedOrientation = { roll: data.roll, pitch: data.pitch };
        }
    };

    ws.onclose = function() {
        updateConnectionStatus(false);
        setTimeout(initWebSocket, 3000); // 자동 재연결
    };
}

function updateConnectionStatus(connected) {
    const dot = document.getElementById('connectionDot');
    const text = document.getElementById('connectionText');
    dot.classList.toggle('connected', connected);
    text.textContent = connected ? '연결됨' : '연결 대기';
}
```

### 3. 센서 시뮬레이션 (부드러운 변화)

```javascript
let sensorValues = {
    vibration: { current: 2.4, target: 2.4, unit: 'mm/s' },
    temperature: { current: 45, target: 45, unit: '°C' },
    // ...
};

// 100ms마다 현재값을 목표값 방향으로 15%씩 이동
setInterval(() => {
    Object.keys(sensorValues).forEach(key => {
        const sensor = sensorValues[key];
        sensor.current += (sensor.target - sensor.current) * 0.15;
    });
    updateSensorDisplay();
}, 100);

// 2초마다 새 목표값 생성
setInterval(generateTargetValues, 2000);
```

### 4. 트렌드 차트 (Chart.js)

```javascript
let trendChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: '진동', borderColor: '#4caf50', data: [] },
            { label: '온도', borderColor: '#ff9800', data: [], yAxisID: 'y1' },
            // ...
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        // ...
    }
});

// 1초마다 차트 업데이트 (최대 60개 데이터포인트)
setInterval(updateTrendChart, 1000);
```

---

## 새 데모 사이트 추가 절차

1. **제안서 파일 확인:** `/Users/maeg/todo/today/공장자동화/업체/` 에서 해당 업체 제안서 확인

2. **기존 사이트 복사:** 가장 유사한 업체 폴더 복사
   ```bash
   cp -r server/public/demo/kpsm server/public/demo/새업체폴더
   ```

3. **파일 수정:**
   - 업체명, 로고, 테마 색상 변경
   - 설비 목록 및 3D 모델 수정
   - 센서 구성 및 AI 적용 분야 수정

4. **EC2 배포:**
   ```bash
   scp -i /Users/maeg/todo/today/uttec-first-ec2.pem -r server/public/demo/새업체폴더 ec2-user@3.36.86.100:~/sensor-monitor/public/demo/
   ```

5. **데모사이트_링크.md 업데이트:**
   `/Users/maeg/todo/today/공장자동화/데모사이트_링크.md` 에 새 사이트 정보 추가

---

## 자주 발생하는 작업

### 스마트폰 연결 안됨 문제
- `initWebSocket()` 호출 확인 (init() 함수 내)
- `calibratedOrientation` 메시지 핸들러 확인
- 자동 재연결 로직 확인 (3초 후 재시도)

### 센서값이 갑자기 변함
- 현재값→목표값 보간(lerp) 적용 (15% 씩 이동)
- 100ms 간격 업데이트

### 그래프가 표시 안됨
- Chart.js CDN 로드 확인
- canvas 요소 id 확인
- initTrendChart() 호출 확인

---

## 참고 파일 경로

| 파일 | 경로 |
|------|------|
| 데모 사이트 링크 목록 | `/Users/maeg/todo/today/공장자동화/데모사이트_링크.md` |
| 업체별 제안서 | `/Users/maeg/todo/today/공장자동화/업체/` |
| SSH 키 | `/Users/maeg/todo/today/uttec-first-ec2.pem` |
| 로컬 데모 폴더 | `/Users/maeg/todo/today/SensorMonitor/server/public/demo/` |

---

## 다음 세션에서 작업 시작 방법

새 세션에서 다음과 같이 시작하세요:

```
이 파일을 읽어주세요: /Users/maeg/todo/today/SensorMonitor/SESSION_CONTEXT.md

그리고 [원하는 작업]을 해주세요.
```

예시:
- "새로운 업체 '삼성엔지니어링' 데모 사이트를 만들어주세요"
- "dongwon 모니터 페이지에 새로운 시나리오를 추가해주세요"
- "모든 사이트의 favicon을 업데이트해주세요"

---

*최종 업데이트: 2026-01-15*
