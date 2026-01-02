# Python (UTTEC Shield) 교육 코스 분석 보고서

**분석일:** 2025년 1월 1일
**분석 대상:** raspberry_esp32c3 커리큘럼 및 기존 ESP32 코스 비교

---

## 1. 기존 ESP32 코스 (C언어) 분석

### 1.1 레슨 페이지 구조
기존 ESP32 코스(`/course/coding/c-esp32`)는 다음과 같은 구조를 가짐:

```
lessonDataByDay = {
  1: {
    day: 1,
    title: '제목',
    subtitle: '설명',
    videoId: 'YouTube ID',
    goals: [
      {
        id: 1,
        title: '학습 목표',
        description: '설명',
        prompt: 'AI에게 보낼 프롬프트',
        expectedKeywords: ['키워드1', '키워드2'],
        quiz: {
          question: '퀴즈 질문',
          options: ['선택1', '선택2', '선택3', '선택4'],
          correctAnswer: 0,
        },
      },
      // ... 추가 목표들
    ],
    nextLesson: { day: 2, title: '다음 레슨 제목' },
  },
}
```

### 1.2 학습 진행 방식
1. **AI 서비스 선택**: ChatGPT, Claude, Gemini, Copilot 중 선택
2. **프롬프트 복사**: 각 목표별로 제공된 프롬프트를 AI에 입력
3. **포트설명서 참조**: 하드웨어 핀 정보 참조
4. **퀴즈 풀기**: 학습 내용 확인
5. **다음 레슨 진행**

### 1.3 특징
- 하루에 여러 개의 학습 목표(goals) 포함
- 각 목표별로 독립적인 프롬프트 제공
- 퀴즈를 통한 학습 확인
- YouTube 동영상 연동

---

## 2. Python (UTTEC Shield) 커리큘럼 분석

### 2.1 현재 커리큘럼 구조
- **초급 (15일)**: GPIO, 센서, 웹 기초
- **중급 (30일)**: PWM, ESP32 AP, 데이터베이스
- **고급 (45일)**: 실시간 통신, 보안, 클라우드

### 2.2 하드웨어 차이점

| 항목 | ESP32 (C) | UTTEC Shield (Python) |
|------|-----------|----------------------|
| **플랫폼** | ESP32 단독 | Raspberry Pi + ESP32-C3 |
| **언어** | C/Arduino | Python (Flask) |
| **LED 제어** | HIGH=켜짐 | **LOW=켜짐** (Active LOW) |
| **I2C 장치** | 없음 | AHT20, OLED |
| **통신** | 독립형 | RPi↔ESP32 UART |

### 2.3 교육 패턴 권장사항

**방법 1: 기존 ESP32 방식 적용**
- 하루 3개 학습 목표
- 각 목표별 프롬프트 + 퀴즈
- 단일 파일 코드 생성

**방법 2: Python PC 방식 적용 (권장)**
- 하루 1개 프로젝트
- 여러 파일로 분리 (main.py, modules.py, templates/)
- `===== 파일: xxx =====` 구분자 사용

---

## 3. 권장 교육 방식

### 3.1 파일 분리 방식 (Python PC 패턴)

UTTEC Shield는 Flask 웹서버를 사용하므로, 여러 파일로 구성된 프로젝트가 필수:

```
dayXX_project/
├── app.py              # Flask 메인
├── hardware.py         # GPIO/센서 제어
├── templates/
│   └── index.html      # 웹 UI
├── static/
│   ├── style.css
│   └── script.js
└── README.md
```

### 3.2 프롬프트 형식 (권장)

```
[Day X] Python UTTEC Shield - 프로젝트명

프로젝트: 웹으로 LED 제어하기

프로젝트 구조:
dayXX_led_web/
├── app.py              # Flask 서버
├── hardware.py         # GPIO 제어
├── templates/index.html
└── README.md

요구사항:
1. LED 핀: RED(17), YELLOW(27), BLUE(22) - Active LOW
2. Flask 웹서버 포트 5000
3. /api/led/<color>/<state> API 엔드포인트
4. 웹 UI에서 버튼으로 LED ON/OFF

각 파일의 전체 코드를 다음 형식으로 작성:

===== 파일: app.py =====
(코드)
===== 파일 끝 =====

===== 파일: hardware.py =====
(코드)
===== 파일 끝 =====
```

### 3.3 ESP32 방식 vs Python PC 방식 비교

| 항목 | ESP32 방식 | Python PC 방식 (권장) |
|------|-----------|---------------------|
| 목표 수 | 하루 3개 | 하루 1개 프로젝트 |
| 파일 수 | 단일 파일 | 다중 파일 |
| 퀴즈 | 각 목표별 | 없음 (실행으로 확인) |
| 복잡도 | 낮음 | 중간~높음 |
| 적합 대상 | 초보자 | 중급 이상 |

---

## 4. 커리큘럼 수정 권장사항

### 4.1 초급 과정 (Day 1-15)

| Day | 현재 | 수정 권장 |
|-----|------|----------|
| 1 | 환경설정 + LED 켜기 | 환경설정 분리, LED는 Day 2로 |
| 2 | 신호등 만들기 | Day 1에서 분리된 LED 기초 포함 |
| 11-15 | 웹 기초 | Flask 파일 분리 패턴 적용 |

### 4.2 중급 과정 (Day 16-45)

- ESP32-C3 연동 부분 상세화 필요
- Arduino IDE 설정 대신 MicroPython 고려
- 파일 분리 패턴 필수 적용

### 4.3 고급 과정 (Day 46-90)

- WebSocket, MQTT 등 실시간 통신 강화
- 클라우드 연동 예제 업데이트
- 최종 프로젝트 구체화

---

## 5. 구현 방안

### 5.1 Phase 1: 레슨 페이지 생성
- Python PC 패턴의 `lesson_page.tsx` 참고
- 90일 프롬프트 데이터 생성
- 포트설명서 참조 문구 추가

### 5.2 Phase 2: 레벨 페이지 생성
- Python PC 패턴의 `level_page.tsx` 참고
- 초급/중급/고급 탭 구현

### 5.3 Phase 3: courses 페이지 연결
- `/course/coding/python-uttec/[level]` 라우팅
- 이미지 `/images/uttec-shield.jpg` 사용

---

## 6. 결론

**권장 교육 방식**: Python PC 패턴 (여러 파일 분리)

**이유**:
1. Flask 웹 프로젝트는 여러 파일 필수
2. 실무와 유사한 프로젝트 구조 학습
3. `===== 파일: xxx =====` 구분자로 AI 응답 파싱 용이
4. 학습자가 파일 구조를 이해하며 학습

**주의사항**:
- Active LOW 제어 방식 명확히 설명
- RPi ↔ ESP32 UART 통신 프로토콜 표준화
- 포트설명서 항상 참조하도록 안내

---

**작성자**: Claude
**검토 요청**: 커리큘럼 수정 후 웹사이트 적용 진행
