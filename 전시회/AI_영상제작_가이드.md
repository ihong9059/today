# AI 활용 전시회 소개 영상 제작 가이드

## 문서 정보
- **작성일**: 2026-02-09
- **목적**: 60인치 대형 화면용 3분 소개 영상 제작
- **대상**: 스마트 파쇄기 AI 모니터링 시스템

---

## 1. 영상 개요

| 항목 | 내용 |
|------|------|
| **영상 길이** | 3분 (180초) |
| **해상도** | 4K (3840x2160) 또는 Full HD (1920x1080) |
| **화면비율** | 16:9 (60인치 TV 최적화) |
| **프레임레이트** | 30fps 또는 60fps |
| **파일 형식** | MP4 (H.264/H.265) |

---

## 2. 영상 타임라인 (3분 구성)

### 전체 구조

```
[0:00 ~ 0:10]  인트로 (10초)
[0:10 ~ 0:40]  문제 제기 (30초)
[0:40 ~ 1:40]  솔루션 소개 (60초)
[1:40 ~ 2:20]  적용 사례 (40초)
[2:20 ~ 2:40]  성과 강조 (20초)
[2:40 ~ 3:00]  아웃트로 (20초)
```

---

## 3. 섹션별 AI 제작 방법

### 3.1 인트로 (0:00 ~ 0:10) - 10초

**내용**: "파쇄기 과부하, 이제 AI가 예방합니다"

| 요소 | AI 도구 | 프롬프트 예시 |
|------|---------|--------------|
| **배경 영상** | Runway Gen-3, Pika Labs | "Industrial shredder machine running smoothly in a factory, cinematic lighting, 4K quality, blue and orange color grading" |
| **로고 애니메이션** | Canva, CapCut | UTTEC + 한국기계 로고 페이드인 |
| **텍스트** | After Effects, CapCut | 타이틀 텍스트 애니메이션 |
| **배경음악** | Suno AI, AIVA | "Epic corporate technology intro music, 10 seconds, building tension" |
| **나레이션** | ElevenLabs, Typecast | 한국어 남성 전문가 목소리 |

**Runway Gen-3 프롬프트**:
```
A powerful industrial twin-shaft shredder machine operating in a modern factory.
Blue LED lights on the control panel. Steam and metal particles visible.
Cinematic slow motion. Dark background with dramatic lighting.
Professional industrial footage style. 4K resolution.
```

---

### 3.2 문제 제기 (0:10 ~ 0:40) - 30초

**내용**: 파쇄기 고장으로 인한 손실

| 시간 | 화면 | AI 제작 방법 |
|------|------|-------------|
| 0:10~0:17 | 파쇄기 과부하 장면 | Runway: "Industrial shredder overloading, red warning lights flashing, smoke, dramatic" |
| 0:17~0:24 | 생산 라인 정지 | Runway: "Factory production line stopped, workers looking frustrated, dim lighting" |
| 0:24~0:31 | 손실 비용 인포그래픽 | Canva/After Effects: 애니메이션 숫자 카운트업 |
| 0:31~0:40 | 블레이드 마모 클로즈업 | Midjourney + D-ID: 마모된 블레이드 이미지 → 영상화 |

**인포그래픽 데이터**:
```
- 비계획 정지 1회당 손실: ₩500만원 이상
- 연간 평균 다운타임: 200시간
- 긴급 수리 비용: 정기 정비의 3배
```

**Midjourney 프롬프트 (마모 블레이드)**:
```
/imagine prompt: Close-up of worn industrial shredder blades with visible damage and metal fatigue,
comparison with new sharp blade, industrial photography style, high detail, 4K --ar 16:9 --v 6
```

---

### 3.3 솔루션 소개 (0:40 ~ 1:40) - 60초

**내용**: 스마트 파쇄기 모니터링 시스템 4가지 핵심 기능

#### 3.3.1 자동 과부하 보호 (0:40 ~ 0:55) - 15초

| 요소 | AI 도구 | 설명 |
|------|---------|------|
| **애니메이션** | Runway/Pika | 전류 그래프 상승 → 경고 → 자동 감속 시퀀스 |
| **UI 화면** | Figma + 화면 녹화 | 실제 대시보드 데모 영상 |
| **아이콘** | Midjourney | "Flat design icon of electric current sensor with warning symbol" |

**시퀀스 스토리보드**:
```
[0:40] 전류 그래프 정상 (녹색)
[0:45] 전류 급상승 (노란색 → 빨간색)
[0:48] 경고 알림 팝업
[0:50] 자동 감속 (속도계 애니메이션)
[0:53] 역회전 재시도 아이콘
[0:55] 정상 복귀 (녹색)
```

#### 3.3.2 AI 예지정비 (0:55 ~ 1:10) - 15초

| 요소 | AI 도구 | 설명 |
|------|---------|------|
| **진동 분석 화면** | 대시보드 녹화 | FFT 스펙트럼 실시간 화면 |
| **AI 예측 그래프** | After Effects | RUL(잔여수명) 예측 곡선 애니메이션 |
| **3D 베어링** | Runway/Blender | 베어링 내부 마모 시각화 |

**Runway 프롬프트 (베어링 마모)**:
```
3D cutaway view of industrial bearing showing internal wear and damage,
X-ray style visualization, blue and red heat map overlay,
rotating slowly, technical illustration style, 4K
```

#### 3.3.3 데이터 기반 최적화 (1:10 ~ 1:25) - 15초

| 요소 | AI 도구 | 설명 |
|------|---------|------|
| **데이터 시각화** | Canva/After Effects | 재료별 최적 운전 조건 차트 |
| **AI 학습 애니메이션** | Runway | 뉴럴 네트워크 시각화 |
| **에너지 절감 그래프** | After Effects | 20% 절감 애니메이션 |

**인포그래픽 데이터**:
```
재료별 최적 RPM:
- 폐플라스틱: 25 RPM
- 폐금속: 18 RPM
- 폐타이어: 22 RPM
- 폐배터리: 15 RPM (안전 우선)
```

#### 3.3.4 원격 모니터링 (1:25 ~ 1:40) - 15초

| 요소 | AI 도구 | 설명 |
|------|---------|------|
| **스마트폰 화면** | 화면 녹화 | 모바일 대시보드 앱 데모 |
| **알림 팝업** | After Effects | 푸시 알림 애니메이션 |
| **멀티 디바이스** | Canva | PC/태블릿/스마트폰 목업 |

**장면 구성**:
```
[1:25] 사무실에서 PC로 모니터링
[1:30] 이동 중 스마트폰 알림 수신
[1:35] 태블릿으로 상세 분석 확인
[1:40] "언제 어디서나" 텍스트 오버레이
```

---

### 3.4 적용 사례 (1:40 ~ 2:20) - 40초

**내용**: 한국기계엔지니어링 파쇄기 적용 사례

| 시간 | 화면 | AI 제작 방법 |
|------|------|-------------|
| 1:40~1:50 | 이축 파쇄기 전경 | Runway: 실제 파쇄기 영상 또는 AI 생성 |
| 1:50~2:00 | 센서 설치 장면 | 실제 촬영 또는 스톡 영상 + AI 합성 |
| 2:00~2:10 | Before/After 비교 | Split screen 애니메이션 |
| 2:10~2:20 | 고객 인터뷰 (가상) | D-ID 또는 HeyGen으로 아바타 생성 |

**Before/After 데이터**:
```
┌─────────────────┬──────────┬──────────┐
│     항목        │  Before  │  After   │
├─────────────────┼──────────┼──────────┤
│ 월 다운타임     │  40시간  │  12시간  │
│ 긴급 수리       │  월 3회  │  월 0.5회│
│ 에너지 비용     │  100%    │  80%     │
│ 블레이드 교체   │  2개월   │  3개월   │
└─────────────────┴──────────┴──────────┘
```

**HeyGen 아바타 스크립트**:
```
"스마트 모니터링 시스템 도입 후,
갑작스러운 설비 정지가 크게 줄었습니다.
특히 과부하 보호 기능 덕분에
블레이드 수명이 50% 이상 늘어났습니다."
- 한국기계엔지니어링 담당자
```

---

### 3.5 성과 강조 (2:20 ~ 2:40) - 20초

**내용**: 핵심 성과 수치

| 시간 | 화면 | AI 제작 방법 |
|------|------|-------------|
| 2:20~2:27 | "다운타임 70% 감소" | Kinetic typography (After Effects) |
| 2:27~2:33 | "투자회수 4.9개월" | 숫자 카운트업 애니메이션 |
| 2:33~2:40 | "ROI 145%" | 원형 그래프 채워지는 애니메이션 |

**Canva/After Effects 템플릿 키워드**:
```
- "Number counter animation"
- "Kinetic typography template"
- "Infographic animation"
- "Statistics reveal animation"
```

---

### 3.6 아웃트로 (2:40 ~ 3:00) - 20초

**내용**: 연락처 및 부스 안내

| 시간 | 화면 | AI 제작 방법 |
|------|------|-------------|
| 2:40~2:50 | 로고 + 슬로건 | Canva 애니메이션 |
| 2:50~2:55 | QR 코드 (데모 사이트) | QR 생성 + 애니메이션 |
| 2:55~3:00 | "부스 방문을 환영합니다" | 텍스트 페이드아웃 |

**QR 코드 연결**: https://uttec-sensor.duckdns.org/demo/hankookmech/

---

## 4. AI 도구별 사용법

### 4.1 영상 생성 AI

#### Runway Gen-3 Alpha
- **URL**: https://runwayml.com
- **용도**: 텍스트로 영상 생성
- **가격**: $15/월 (Standard), $35/월 (Pro)
- **권장 설정**:
  - Duration: 4초
  - Resolution: 1080p
  - Style: Cinematic

**사용 팁**:
```
1. 프롬프트는 영어로 작성
2. 카메라 움직임 명시 (slow zoom, pan left, static shot)
3. 조명 스타일 명시 (dramatic lighting, soft light)
4. 4초 클립 여러 개 생성 → 편집에서 연결
```

#### Pika Labs
- **URL**: https://pika.art
- **용도**: 이미지를 영상으로 변환
- **가격**: 무료 플랜 있음
- **활용**: Midjourney 이미지 → Pika로 움직임 추가

#### Luma Dream Machine
- **URL**: https://lumalabs.ai/dream-machine
- **용도**: 고품질 영상 생성
- **특징**: 물리적으로 자연스러운 움직임

### 4.2 이미지 생성 AI

#### Midjourney
- **URL**: https://midjourney.com (Discord)
- **용도**: 고품질 정적 이미지 생성
- **권장 파라미터**:
```
--ar 16:9    (영상 비율)
--v 6        (최신 버전)
--q 2        (고품질)
--style raw  (사실적)
```

#### DALL-E 3 (ChatGPT Plus)
- **URL**: https://chat.openai.com
- **용도**: 인포그래픽, 아이콘, 일러스트
- **장점**: 텍스트 포함 이미지 생성 가능

### 4.3 음성 생성 AI

#### ElevenLabs
- **URL**: https://elevenlabs.io
- **용도**: 고품질 나레이션
- **한국어 지원**: O
- **권장 설정**:
```
- Voice: 전문적인 남성/여성 목소리
- Stability: 0.5
- Clarity: 0.75
- Style: 0 (자연스러운 톤)
```

#### Typecast
- **URL**: https://typecast.ai
- **용도**: 한국어 특화 AI 음성
- **장점**: 다양한 한국어 목소리, 감정 표현

### 4.4 음악 생성 AI

#### Suno AI
- **URL**: https://suno.ai
- **용도**: 배경음악 생성
- **프롬프트 예시**:
```
Corporate technology background music,
inspiring and professional,
electronic beats with orchestral elements,
3 minutes, building momentum
```

#### AIVA
- **URL**: https://aiva.ai
- **용도**: 저작권 Free 배경음악
- **장점**: 상업적 사용 라이선스 명확

### 4.5 아바타/가상 인터뷰

#### HeyGen
- **URL**: https://heygen.com
- **용도**: AI 아바타 영상 생성
- **활용**: 고객 인터뷰, 발표자 영상
- **한국어 지원**: O

#### D-ID
- **URL**: https://d-id.com
- **용도**: 사진을 말하는 영상으로
- **활용**: 전문가 코멘트 영상

---

## 5. 편집 워크플로우

### 5.1 권장 편집 도구

| 도구 | 용도 | 난이도 | 가격 |
|------|------|--------|------|
| **CapCut** | 빠른 편집, 자막 | 쉬움 | 무료 |
| **DaVinci Resolve** | 전문 편집, 색보정 | 중간 | 무료 |
| **Adobe Premiere Pro** | 전문 편집 | 어려움 | 유료 |
| **After Effects** | 모션 그래픽 | 어려움 | 유료 |
| **Canva** | 간단한 애니메이션 | 쉬움 | 무료/유료 |

### 5.2 편집 순서

```
1. 나레이션 녹음 (ElevenLabs)
   ↓
2. 나레이션 기준 타임라인 구성
   ↓
3. AI 영상 클립 생성 (Runway, Pika)
   ↓
4. 이미지 생성 (Midjourney)
   ↓
5. 이미지 → 영상 변환 (Pika, D-ID)
   ↓
6. 화면 녹화 (대시보드 데모)
   ↓
7. 편집 및 조립 (CapCut, Premiere)
   ↓
8. 모션 그래픽 추가 (After Effects, Canva)
   ↓
9. 배경음악 삽입 (Suno AI)
   ↓
10. 최종 렌더링 (4K, MP4)
```

### 5.3 파일 관리 구조

```
전시회_영상/
├── 01_나레이션/
│   ├── 인트로_나레이션.mp3
│   ├── 문제제기_나레이션.mp3
│   ├── 솔루션_나레이션.mp3
│   ├── 사례_나레이션.mp3
│   └── 아웃트로_나레이션.mp3
├── 02_AI영상/
│   ├── runway_파쇄기_전경.mp4
│   ├── runway_과부하_장면.mp4
│   ├── pika_베어링_마모.mp4
│   └── ...
├── 03_이미지/
│   ├── midjourney_블레이드.png
│   ├── 인포그래픽_손실비용.png
│   └── ...
├── 04_화면녹화/
│   ├── 대시보드_데모.mp4
│   ├── 모바일앱_데모.mp4
│   └── ...
├── 05_음악/
│   ├── suno_배경음악.mp3
│   └── 효과음/
├── 06_프로젝트/
│   ├── premiere_프로젝트.prproj
│   └── capcut_프로젝트/
└── 07_최종/
    ├── 파쇄기_소개영상_4K.mp4
    └── 파쇄기_소개영상_1080p.mp4
```

---

## 6. 나레이션 스크립트

### 전체 스크립트 (3분)

```
[인트로 - 0:00~0:10]
파쇄기 과부하, 이제 AI가 예방합니다.
UTTEC과 한국기계엔지니어링이 함께합니다.

[문제 제기 - 0:10~0:40]
갑작스러운 파쇄기 정지, 얼마나 잃고 계십니까?
과부하로 인한 비계획 정지, 한 번에 500만원 이상의 손실.
블레이드 마모를 모르고 지나친 품질 저하.
베어링 고장으로 인한 장기 다운타임.
이 모든 문제, 예방할 수 있습니다.

[솔루션 - 0:40~1:40]
스마트 파쇄기 모니터링 시스템을 소개합니다.

첫째, 자동 과부하 보호.
전류와 토크를 실시간으로 감시합니다.
과부하가 감지되면 자동으로 감속하고,
역회전 재시도 후에도 문제가 지속되면 비상 정지합니다.
설비 손상을 원천 차단합니다.

둘째, AI 예지정비.
진동과 온도 패턴을 AI가 분석합니다.
베어링과 블레이드의 마모를 미리 예측하여
계획 정비로 전환할 수 있습니다.

셋째, 데이터 기반 최적화.
재료별 최적 운전 조건을 AI가 학습합니다.
폐플라스틱, 폐금속, 폐배터리,
각각에 맞는 최적의 RPM과 토크를 자동으로 설정합니다.

넷째, 원격 모니터링.
스마트폰과 PC에서 언제 어디서나 확인하세요.
이상 발생 시 즉시 알림을 받을 수 있습니다.

[적용 사례 - 1:40~2:20]
한국기계엔지니어링의 이축 파쇄기에 적용한 결과입니다.
월 다운타임이 40시간에서 12시간으로 줄었습니다.
긴급 수리 횟수는 월 3회에서 0.5회로 감소했습니다.
에너지 비용은 20% 절감되었고,
블레이드 교체 주기는 50% 연장되었습니다.

[성과 강조 - 2:20~2:40]
다운타임 70% 감소.
투자회수 4.9개월.
ROI 145%.
검증된 성과입니다.

[아웃트로 - 2:40~3:00]
UTTEC과 한국기계엔지니어링.
스마트 파쇄기 AI 모니터링 시스템.
QR 코드를 스캔하시면 실시간 데모를 확인하실 수 있습니다.
부스 방문을 환영합니다.
```

---

## 7. 예상 비용

| 항목 | 도구 | 예상 비용 |
|------|------|----------|
| 영상 생성 | Runway Pro (1개월) | $35 (약 45,000원) |
| 이미지 생성 | Midjourney (1개월) | $30 (약 40,000원) |
| 음성 생성 | ElevenLabs (1개월) | $22 (약 30,000원) |
| 음악 생성 | Suno AI (무료) | 0원 |
| 아바타 | HeyGen (필요시) | $24 (약 32,000원) |
| 편집 | CapCut (무료) | 0원 |
| **합계** | | **약 150,000원** |

---

## 8. 제작 일정 (권장)

| 일차 | 작업 | 예상 시간 |
|------|------|----------|
| **Day 1** | 스크립트 확정, 나레이션 생성 | 3시간 |
| **Day 2** | AI 영상 클립 생성 (Runway) | 4시간 |
| **Day 3** | AI 이미지 생성 (Midjourney) | 2시간 |
| **Day 4** | 대시보드 데모 화면 녹화 | 2시간 |
| **Day 5** | 편집 및 모션 그래픽 | 5시간 |
| **Day 6** | 배경음악, 효과음, 최종 조정 | 3시간 |
| **Day 7** | 렌더링 및 검토 | 2시간 |
| **합계** | | **약 21시간 (3일 집중 작업 가능)** |

---

## 9. 체크리스트

### 사전 준비
- [ ] AI 도구 계정 생성 (Runway, Midjourney, ElevenLabs)
- [ ] 스크립트 최종 확정
- [ ] 대시보드 데모 데이터 준비
- [ ] 로고 파일 준비 (PNG, 투명 배경)
- [ ] 참고 영상 수집

### 제작 중
- [ ] 나레이션 생성 완료
- [ ] AI 영상 클립 생성 완료
- [ ] AI 이미지 생성 완료
- [ ] 화면 녹화 완료
- [ ] 편집 완료
- [ ] 배경음악 삽입 완료

### 최종 검토
- [ ] 오탈자 확인
- [ ] 타이밍 확인 (3분 정확히)
- [ ] 음량 밸런스 확인
- [ ] 4K 렌더링 품질 확인
- [ ] 60인치 TV에서 테스트

---

## 10. 참고 링크

### AI 도구
- Runway: https://runwayml.com
- Midjourney: https://midjourney.com
- Pika Labs: https://pika.art
- ElevenLabs: https://elevenlabs.io
- Typecast: https://typecast.ai
- Suno AI: https://suno.ai
- HeyGen: https://heygen.com
- Canva: https://canva.com

### 무료 리소스
- Pexels (스톡 영상): https://pexels.com/videos
- Pixabay (스톡 영상): https://pixabay.com/videos
- Freesound (효과음): https://freesound.org

### 튜토리얼
- Runway 사용법: YouTube "Runway Gen-3 tutorial"
- Midjourney 프롬프트: https://docs.midjourney.com
- CapCut 편집: YouTube "CapCut tutorial"

---

*본 가이드는 2026년 2월 9일 기준으로 작성되었습니다.*
*AI 도구의 기능과 가격은 변경될 수 있습니다.*
