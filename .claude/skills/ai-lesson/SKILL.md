---
name: ai-lesson
description: AI 교육 레슨 동영상 제작. 웹 학습 내용 확인/보강 → 동영상 제작까지 전체 워크플로우. "레슨 비디오 만들어줘", "Level X 작업", "다음 레슨 진행" 요청 시 사용합니다. (project)
---

# AI 교육 레슨 동영상 제작 Skill

## 🎯 핵심 원칙: AI 개념의 연결성 설명

> **가장 중요한 것**: 각 개념이 AI/딥러닝에서 **왜 필요한지**, **다른 개념과 어떻게 연결되는지**를 반드시 설명해야 합니다.

### 왜 연결성이 중요한가?

초심자가 AI를 배울 때 가장 어려운 점:
- "이걸 왜 배워야 하지?"
- "이게 AI랑 무슨 상관이지?"
- "미분/행렬/확률이 왜 필요하지?"

**해결책**: 모든 개념을 설명할 때 반드시 다음을 포함:
1. **이전 개념과의 연결**: "지난 시간에 배운 X를 기반으로..."
2. **AI에서의 역할**: "이 개념은 신경망에서 Y를 할 때 사용됩니다"
3. **다음 개념으로의 연결**: "이것을 이해하면 Z를 배울 수 있습니다"

---

## 📊 AI 학습 로드맵 (개념 연결도)

```
Level 0: Python 기초
    └── NumPy/Matplotlib → 데이터 처리 & 시각화의 기초
                              ↓
Level 1: AI 기초 이론
    ├── 뉴런 → 퍼셉트론 → 다층퍼셉트론(MLP)
    │          (생물학)   (수학적 모델)  (딥러닝의 시작)
    │              ↓           ↓
    └── AND/OR/NOT 게이트 → XOR 문제 → 왜 "다층"이 필요한가?
                              ↓
Level 2: 수학 기초
    ├── 함수/그래프 → 손실 함수의 모양 이해
    ├── 미분 → 경사하강법의 핵심 (어디로 내려갈지)
    ├── 편미분 → 여러 가중치를 동시에 업데이트
    ├── 행렬 → 신경망 연산 = 행렬곱!
    └── 확률/통계 → 출력 해석, 가중치 초기화
                              ↓
Level 3: 딥러닝 핵심
    ├── 손실 함수 → "얼마나 틀렸는가" 측정
    ├── 경사하강법 → "어떻게 고칠지" 방향 결정
    ├── 역전파 → "각 가중치를 얼마나 고칠지" 계산
    └── 활성화 함수 → 비선형성 추가 (XOR 해결의 핵심!)
                              ↓
Level 4+: 실전 모델
    └── CNN, RNN, Transformer...
```

---

## 🔗 Level별 개념 연결성 가이드

### Level 2: 수학 기초 - 연결성 설명 필수!

| 레슨 | 주제 | AI에서의 연결점 | 반드시 설명할 내용 |
|-----|------|---------------|-----------------|
| 2-1 | 함수와 그래프 | 손실 함수 시각화 | "손실 함수의 '골짜기'를 찾는 것이 학습입니다" |
| 2-2 | 미분의 직관 | 경사하강법 | "기울기 = 어느 방향으로 가면 손실이 줄어드는가" |
| 2-3 | 미분 공식/체인룰 | 역전파 | "체인룰 = 역전파의 수학적 기반" |
| 2-4 | 편미분 | 다중 가중치 | "가중치가 100만개면? 각각 편미분!" |
| 2-5 | 벡터/행렬 | 신경망 연산 | "순전파 = 거대한 행렬곱의 연속" |
| 2-6 | 확률 기초 | 분류 문제 출력 | "Softmax 출력 = 확률 분포" |
| 2-7 | 확률 분포 | 가중치 초기화 | "가중치는 정규분포에서 샘플링" |
| 2-8 | 통계 기초 | 데이터 전처리 | "정규화/표준화 = 학습 안정성" |

### 각 씬에서 반드시 포함할 연결 설명:

**인트로 씬:**
```
"지난 시간에 우리는 [이전 개념]을 배웠습니다.
오늘 배울 [현재 개념]은 [이전 개념]을 확장하여
신경망에서 [구체적 역할]을 하는 데 사용됩니다."
```

**핵심 내용 씬:**
```
"이 공식이 왜 중요할까요?
신경망 학습에서 [구체적 상황]을 생각해보세요.
바로 이 [개념]이 [AI에서의 역할]을 가능하게 합니다."
```

**마무리 씬:**
```
"오늘 배운 [현재 개념]은
다음 시간에 배울 [다음 개념]의 기초가 됩니다.
[다음 개념]에서는 이것을 실제로 [어떻게 활용]하는지 배웁니다."
```

---

## 📝 연결성 설명 체크리스트

매 레슨 제작 시 반드시 확인:

- [ ] **WHY**: 이 개념을 왜 배워야 하는지 설명했는가?
- [ ] **WHERE**: AI/딥러닝의 어느 부분에서 사용되는지 명시했는가?
- [ ] **BEFORE**: 이전에 배운 어떤 개념과 연결되는지 언급했는가?
- [ ] **AFTER**: 앞으로 배울 어떤 개념의 기초가 되는지 예고했는가?
- [ ] **EXAMPLE**: 신경망에서의 구체적 사용 예시를 들었는가?

---

## 프로젝트 경로 (필수 확인)

```
Web App:     C:/todo/today/aiStudy/ai-education-web
Video:       C:/todo/today/ai-intro-video
커리큘럼:    ai-education-web/src/data/curriculum.ts
레슨 페이지: ai-education-web/src/app/lesson/[id]/page.tsx
레벨 페이지: ai-education-web/src/app/level/[id]/page.tsx
```

---

## 전체 워크플로우 (7단계)

### 🔴 Step 0: 기존 파일 구조 확인 (필수!)

**새 레슨 작업 전, 반드시 기존 패턴을 확인:**

```bash
# 기존 메타데이터 확인
ls ai-intro-video/out/youtube-metadata/

# 기존 레슨 구조 확인
ls ai-intro-video/src/lessons/Level{X}/

# 기존 Root.tsx import 패턴 확인
head -30 ai-intro-video/src/Root.tsx
```

**일관성 규칙:**
- 메타데이터: `out/youtube-metadata/lesson-X-Y-metadata.md` (Markdown 형식!)
- 레슨 폴더: `src/lessons/Level{X}/Lesson{X}_{Y}/`
- Composition ID: `Lesson{X}-{Y}` (하이픈 사용)

---

### Step 1: 웹 학습 내용 확인 및 보강 ⭐ 가장 중요!

**반드시 먼저 웹 학습 내용을 확인하고, 초심자가 이해할 수 있도록 보강합니다.**

```typescript
// 1. 커리큘럼 확인
// ai-education-web/src/data/curriculum.ts

// 2. 레슨 상세 내용 확인
// ai-education-web/src/app/lesson/[id]/page.tsx
// ai-education-web/src/app/level/[id]/page.tsx
```

**학습 내용 보강 원칙:**
1. 함축적인 내용 → 직관적으로 이해 가능하게 확장
2. **AI에서의 연결점을 반드시 추가** ⭐
3. 초심자 대상이므로 쉬운 용어 사용
4. 구체적인 예시 추가 (신경망에서의 실제 사용 예)
5. 단계별 설명 포함
6. 왜 이것을 배우는지 동기 부여
7. **이전/다음 개념과의 연결성 명시** ⭐

**Level별 테마:**
- Level 0: Python 기초 (파란색 #3b82f6)
- Level 1: AI 기초 이론 (주황색 #f59e0b)
- Level 2: 수학 기초 (보라색 #a855f7)
- Level 3: 딥러닝 핵심 (빨간색 #ef4444)

---

### Step 2: 나레이션 스크립트 작성

```
위치: ai-intro-video/scripts/lesson-X-Y/
파일: scene1.txt ~ sceneN.txt
```

**스크립트 작성 가이드:**
- 씬당 약 60초 분량 (200~250자)
- 한국어 자연어체, 존댓말
- 구조: Intro(연결) → 주제1~N → Outro(다음 예고)
- **웹 학습 내용을 기반으로 작성**
- **반드시 AI 연결점 포함!** ⭐

**인트로 씬 템플릿:**
```
안녕하세요! AI 기초 교육 [Level X]의 [Y]번째 강의입니다.
지난 시간에는 [이전 개념]을 배웠는데요,
오늘은 이것을 바탕으로 [현재 주제]에 대해 알아보겠습니다.
[현재 주제]는 신경망에서 [구체적 역할]을 담당합니다.
```

---

### Step 3: TTS 오디오 생성

```python
# scripts/generate-lesson-X-Y-tts.py
import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-X-Y"
OUTPUT_DIR = "public/audio/lesson-X-Y"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i in range(1, 11):  # scene 개수에 맞게 조정
        script_file = f"{SCRIPT_DIR}/scene{i}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(f"{OUTPUT_DIR}/scene{i}.mp3")
            print(f"Generated scene{i}.mp3")

asyncio.run(generate_audio())
```

**실행:**
```bash
cd C:/todo/today/ai-intro-video
python scripts/generate-lesson-X-Y-tts.py
```

---

### Step 4: 오디오 분석 (프레임 계산)

```python
# scripts/analyze-lesson-X-Y-audio.py
from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-X-Y"

scene_info = []
total_frames = 0
current_start = 0

for i in range(1, 11):  # scene 개수에 맞게
    audio_file = f"{AUDIO_DIR}/scene{i}.mp3"
    if os.path.exists(audio_file):
        audio = MP3(audio_file)
        duration = audio.info.length
        frames = int(duration * FPS)
        scene_info.append({
            'scene': i,
            'duration': frames,
            'start': current_start,
            'seconds': duration
        })
        current_start += frames
        total_frames += frames

print("export const SCENE_TIMINGS = {")
for s in scene_info:
    print(f"  scene{s['scene']}: {{ duration: {s['duration']}, start: {s['start']} }},")
print("};")
print(f"\nexport const LESSON_X_Y_DURATION = {total_frames};")
print(f"// Total: {total_frames/FPS:.2f}초")
```

---

### Step 5: 씬 컴포넌트 개발

```
위치: src/lessons/Level{X}/Lesson{X}_{Y}/
구조:
├── Scene1_Intro.tsx          # 연결성 설명 포함!
├── Scene2_Topic1.tsx
├── ...
├── SceneN_Outro.tsx          # 다음 주제 연결!
├── Lesson{X}_{Y}Video.tsx
├── Lesson{X}_{Y}Thumbnail.tsx
└── index.ts
```

**씬 컴포넌트 기본 구조:**
```tsx
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

interface Props {
  startFrame: number;
}

export const Scene1_Intro: React.FC<Props> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[900] }}>
      <Audio src={staticFile("audio/lesson-X-Y/scene1.mp3")} />
      {/* 컨텐츠 */}
    </AbsoluteFill>
  );
};
```

---

### Step 6: Root.tsx 등록

```tsx
// src/Root.tsx
import { Lesson{X}_{Y}Video, LESSON_{X}_{Y}_DURATION, Lesson{X}_{Y}Thumbnail } from "./lessons/Level{X}/Lesson{X}_{Y}";

// Composition 추가 (id에 하이픈 사용!)
<Composition
  id="Lesson{X}-{Y}"
  component={Lesson{X}_{Y}Video}
  durationInFrames={LESSON_{X}_{Y}_DURATION}
  fps={30}
  width={1920}
  height={1080}
/>
<Composition
  id="Lesson{X}-{Y}Thumbnail"
  component={Lesson{X}_{Y}Thumbnail}
  durationInFrames={1}
  fps={30}
  width={1280}
  height={720}
/>
```

---

### Step 7: 렌더링 및 메타데이터

**렌더링:**
```bash
cd C:/todo/today/ai-intro-video

# 비디오 (백그라운드)
npx remotion render "Lesson{X}-{Y}" out/lessons/level-{X}/lesson-{X}-{Y}.mp4 &

# 썸네일
npx remotion still "Lesson{X}-{Y}Thumbnail" out/lessons/level-{X}/lesson-{X}-{Y}-thumbnail.png
```

**메타데이터 (Markdown 형식!):**
```
위치: out/youtube-metadata/lesson-X-Y-metadata.md
```

---

## Level별 커리큘럼

### Level 0: Python 기초 (완료)
- 0-1: Python 환경 설정
- 0-2: 변수와 자료형
- 0-3: 조건문과 반복문
- 0-4: 함수
- 0-5: NumPy 기초 → **AI 데이터 처리의 기초**
- 0-6: Matplotlib 기초 → **학습 과정 시각화**

### Level 1: AI 기초 이론 (완료)
- 1-1: AI란 무엇인가? → **전체 그림 이해**
- 1-2: 뉴런에서 퍼셉트론으로 → **생물학→수학 연결**
- 1-3: 퍼셉트론 구조 → **기본 연산 단위**
- 1-4: 퍼셉트론 학습 → **가중치 업데이트 개념**
- 1-5: AND, OR, NOT 게이트 → **논리 연산 구현**
- 1-6: XOR 문제와 한계 → **왜 "다층"이 필요한가?**
- 1-7: 다층 퍼셉트론 → **딥러닝의 시작**

### Level 2: 수학 기초 (진행중)
- 2-1: 함수와 그래프 → **손실 함수 시각화**
- 2-2: 미분의 직관적 이해 → **기울기 = 방향**
- 2-3: 미분 공식 (체인룰) → **역전파의 수학적 기반**
- 2-4: 편미분 → **다중 가중치 동시 업데이트**
- 2-5: 벡터와 행렬 → **신경망 = 행렬곱**
- 2-6: 확률 기초 → **분류 출력 해석**
- 2-7: 확률 분포 → **가중치 초기화**
- 2-8: 통계 기초 → **데이터 전처리**

### Level 3: 딥러닝 핵심 (예정)
- 3-1: 손실 함수 → **얼마나 틀렸는가**
- 3-2: 경사하강법 기본 → **어떻게 고칠지**
- 3-3: 경사하강법 변형 → **더 빠르게 고치기**
- 3-4: 순전파 → **입력→출력 계산**
- 3-5: 역전파 이론 → **오차 전파**
- 3-6: 역전파 구현 → **실제 코드로**
- 3-7: 활성화 함수 → **비선형성 = XOR 해결!**

---

## 스타일 가이드

### 색상 (styles.ts)
```typescript
colors = {
  gray: { 300, 400, 600, 700, 800, 900 },
  white: "#ffffff",
  primary: { 500: "#3b82f6" },
  level: {
    0: "#3b82f6",  // 파란색
    1: "#f59e0b",  // 주황색
    2: "#a855f7",  // 보라색
    3: "#ef4444",  // 빨간색
  },
}
```

### 애니메이션 패턴
```typescript
// Fade in
opacity: interpolate(frame, [delay, delay + 20], [0, 1], { extrapolateRight: "clamp" })

// Slide up
transform: `translateY(${interpolate(frame, [delay, delay + 20], [30, 0])}px)`

// Scale bounce (spring)
transform: `scale(${spring({ frame, fps: 30 })})`
```

---

## 주의사항

1. **기존 패턴 확인 필수**: 새 작업 전 반드시 기존 파일 형식/위치 확인
2. **메타데이터 형식**: `.md` 파일 (JSON 아님!)
3. **Composition ID**: 하이픈 사용 (`Lesson1-7`, not `Lesson1_7`)
4. **웹 내용 먼저**: 동영상 제작 전 웹 학습 내용 확인/보강
5. **초심자 대상**: 쉬운 설명, 구체적 예시, 단계별 진행
6. **연결성 필수** ⭐: 모든 개념은 AI에서의 역할과 다른 개념과의 관계를 반드시 설명!

---

## 🎬 Outro 필수 요소 (추가됨)

**모든 영상의 Outro에 반드시 포함해야 하는 3가지:**

### 1. 다음 개념 연결
```
"오늘 배운 [현재 개념]은
다음 시간에 배울 [다음 개념]의 기초가 됩니다.
[다음 개념]에서는 이것을 실제로 [어떻게 활용]하는지 배웁니다."
```

### 2. 웹사이트 안내 (필수!)
```
"더 자세한 학습 자료와 코드 예제는
영상 설명란의 웹사이트 링크에서 확인하실 수 있습니다."
```

### 3. 구독/좋아요 요청 (필수!)
```
"이 영상이 도움이 되셨다면
구독과 좋아요 부탁드립니다.
다음 강의에서 만나요!"
```

**Outro 스크립트 예시 (통합):**
```
오늘 배운 함수와 그래프는 다음 시간에 배울 미분의 기초가 됩니다.
미분에서는 이것을 실제로 기울기를 구하는 데 활용하는지 배웁니다.

더 자세한 학습 자료와 코드 예제는
영상 설명란의 웹사이트 링크에서 확인하실 수 있습니다.

이 영상이 도움이 되셨다면 구독과 좋아요 부탁드립니다.
다음 강의에서 만나요!
```
