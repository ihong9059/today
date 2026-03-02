---
name: ai-lesson
description: AI 교육 레슨 동영상 제작. 웹 학습 내용 확인/보강 → 동영상 제작까지 전체 워크플로우. "레슨 비디오 만들어줘", "Level X 작업", "다음 레슨 진행" 요청 시 사용합니다. (project)
---

# AI 교육 레슨 동영상 제작 Skill

## 🚀 빠른 실행 가이드

> **"X-Y를 진행해 주세요"** 또는 **"X-Y 비디오 만들어줘"** 요청 시:

아래 7단계를 **순서대로 자동 실행**합니다:

### 📋 실행 순서

```
1. 나레이션 스크립트 작성  → scripts/lesson-X-Y/scene1~N.txt
2. TTS 오디오 생성        → python scripts/generate-lesson-X-Y-tts.py
3. 오디오 분석            → python scripts/analyze-lesson-X-Y-audio.py
4. 씬 컴포넌트 개발       → src/lessons/LevelX/LessonX_Y/*.tsx
5. Root.tsx 등록          → import 및 Composition 추가
6. 렌더링 실행            → npx remotion render/still
7. YouTube 메타데이터     → out/youtube-metadata/lesson-X-Y-metadata.md
```

---

## 📂 프로젝트 경로

```
Video Project:   C:/todo/today/ai-intro-video
Web App:         C:/todo/today/aiStudy/ai-education-web
커리큘럼 데이터: ai-education-web/src/data/curriculum.ts
```

---

## 🎬 Step 1: 나레이션 스크립트 작성

### 1.1 폴더 생성
```bash
mkdir -p C:/todo/today/ai-intro-video/scripts/lesson-X-Y
```

### 1.2 웹 학습 내용 확인
```
파일: ai-education-web/src/data/curriculum.ts
위치: id: "X-Y" 검색 → content 필드 확인
```

### 1.3 씬별 스크립트 작성
**씬 구성 (7개 기준)**:
- `scene1.txt`: 인트로 - 주제 소개, 이전 개념 연결
- `scene2.txt`: 핵심 개념 1
- `scene3.txt`: 핵심 개념 2
- `scene4.txt`: 핵심 개념 3
- `scene5.txt`: 코드 설명/실습
- `scene6.txt`: 학습/실행 결과
- `scene7.txt`: 아웃트로 - 요약, 다음 레슨 예고, 구독 요청

**스크립트 가이드**:
- 씬당 약 30-60초 (150~250자)
- 한국어 자연어체, 존댓말
- AI에서의 연결점 포함 필수

---

## 🔊 Step 2: TTS 오디오 생성

### 2.1 스크립트 파일 생성
```python
# C:/todo/today/ai-intro-video/scripts/generate-lesson-X-Y-tts.py
import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-X-Y"
OUTPUT_DIR = "public/audio/lesson-X-Y"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for i in range(1, 8):  # scene1 ~ scene7
        script_file = f"{SCRIPT_DIR}/scene{i}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(f"{OUTPUT_DIR}/scene{i}.mp3")
            print(f"Generated scene{i}.mp3")

asyncio.run(generate_audio())
```

### 2.2 실행
```bash
cd C:/todo/today/ai-intro-video
python scripts/generate-lesson-X-Y-tts.py
```

---

## 📊 Step 3: 오디오 분석 (프레임 계산)

### 3.1 분석 스크립트 생성
```python
# C:/todo/today/ai-intro-video/scripts/analyze-lesson-X-Y-audio.py
from mutagen.mp3 import MP3
import os

FPS = 30
AUDIO_DIR = "public/audio/lesson-X-Y"

scene_info = []
total_frames = 0
current_start = 0

for i in range(1, 8):
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

### 3.2 실행 및 결과 복사
```bash
cd C:/todo/today/ai-intro-video
python scripts/analyze-lesson-X-Y-audio.py
```

**출력 예시** (LessonX_YVideo.tsx에 복사):
```typescript
export const SCENE_TIMINGS = {
  scene1: { duration: 890, start: 0 },
  scene2: { duration: 868, start: 890 },
  // ...
};
export const LESSON_X_Y_DURATION = 6579;
```

---

## 🎨 Step 4: 씬 컴포넌트 개발

### 4.1 폴더 구조
```
src/lessons/Level{X}/Lesson{X}_{Y}/
├── Scene1_Intro.tsx
├── Scene2_Topic1.tsx
├── Scene3_Topic2.tsx
├── Scene4_Topic3.tsx
├── Scene5_Code.tsx
├── Scene6_Training.tsx
├── Scene7_Outro.tsx
├── Lesson{X}_{Y}Video.tsx
├── Lesson{X}_{Y}Thumbnail.tsx
└── index.ts
```

### 4.2 씬 컴포넌트 템플릿
```tsx
import { AbsoluteFill, Audio, staticFile, useCurrentFrame, interpolate } from "remotion";
import { colors } from "../../../styles";

interface Props {
  startFrame: number;
}

export const Scene1_Intro: React.FC<Props> = ({ startFrame }) => {
  const frame = useCurrentFrame() - startFrame;

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.gray[900] }}>
      <Audio src={staticFile("audio/lesson-X-Y/scene1.mp3")} />

      {/* Level 배지 */}
      <div style={{
        position: "absolute",
        top: 40,
        left: 60,
        backgroundColor: colors.level[X],
        padding: "10px 25px",
        borderRadius: 25,
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
      }}>
        Level X
      </div>

      {/* 메인 타이틀 */}
      <h1 style={{
        fontSize: 72,
        color: colors.white,
        textAlign: "center",
        marginTop: 200,
        opacity: titleOpacity,
      }}>
        주제 제목
      </h1>
    </AbsoluteFill>
  );
};
```

### 4.3 메인 비디오 컴포넌트 템플릿
```tsx
// Lesson{X}_{Y}Video.tsx
import { Sequence, Audio, staticFile } from "remotion";
import { Scene1_Intro } from "./Scene1_Intro";
// ... 나머지 Scene import

export const SCENE_TIMINGS = {
  scene1: { duration: 890, start: 0 },
  scene2: { duration: 868, start: 890 },
  // ... analyze 결과 붙여넣기
};

export const LESSON_X_Y_DURATION = 6579; // analyze 결과

export const LessonX_YVideo: React.FC = () => {
  return (
    <>
      <Sequence from={SCENE_TIMINGS.scene1.start} durationInFrames={SCENE_TIMINGS.scene1.duration}>
        <Scene1_Intro startFrame={SCENE_TIMINGS.scene1.start} />
      </Sequence>
      {/* ... 나머지 Sequence */}
    </>
  );
};
```

### 4.4 index.ts 템플릿
```typescript
export { LessonX_YVideo, LESSON_X_Y_DURATION, SCENE_TIMINGS } from "./Lesson{X}_{Y}Video";
export { LessonX_YThumbnail } from "./Lesson{X}_{Y}Thumbnail";
export { Scene1_Intro } from "./Scene1_Intro";
// ... 나머지 Scene export
```

---

## 📝 Step 5: Root.tsx 등록

### 5.1 import 추가
```tsx
// src/Root.tsx
import { LessonX_YVideo, LESSON_X_Y_DURATION, LessonX_YThumbnail } from "./lessons/Level{X}/Lesson{X}_{Y}";
```

### 5.2 Composition 추가
```tsx
{/* ============ Level X ============ */}
<Composition
  id="LessonX-Y"  // 하이픈 사용!
  component={LessonX_YVideo}
  durationInFrames={LESSON_X_Y_DURATION}
  fps={30}
  width={1920}
  height={1080}
/>
<Composition
  id="LessonX-YThumbnail"
  component={LessonX_YThumbnail}
  durationInFrames={1}
  fps={30}
  width={1280}
  height={720}
/>
```

---

## 🎥 Step 6: 렌더링

### 6.1 비디오 렌더링 (백그라운드)
```bash
cd C:/todo/today/ai-intro-video
npx remotion render "LessonX-Y" out/lessons/level-X/lesson-X-Y.mp4
```

### 6.2 썸네일 렌더링
```bash
npx remotion still "LessonX-YThumbnail" out/lessons/level-X/lesson-X-Y-thumbnail.png
```

---

## 📄 Step 7: YouTube 메타데이터

### 위치
```
C:/todo/today/ai-intro-video/out/youtube-metadata/lesson-X-Y-metadata.md
```

### 템플릿
```markdown
# Lesson X-Y: 레슨 제목

## 제목
[AI 기초] Lesson X-Y: 레슨 제목 | 부제목 | Level X

## 설명
Level X "레벨 부제목"의 Y번째 강의입니다!

[레슨 요약 1-2문장]

---

📚 이번 강의 내용:
0:00 인트로
0:30 주제1
1:00 주제2
...

---

📊 핵심 학습 내용:
✅ 핵심1
✅ 핵심2
...

---

🔥 핵심 코드:

```python
# 코드 예시
```

---

📖 더 자세한 학습 자료:
웹사이트에서 코드 예제와 실습 자료를 확인하세요!

#AI #인공지능 #딥러닝 ...

## 태그
AI, 인공지능, 딥러닝, ...

## 카테고리
교육

## 언어
한국어

## 영상 길이
약 X분 Y초 (N 프레임 @ 30fps)

## 재생목록
AI 기초 교육 시리즈 - Level X: 레벨 부제목
```

---

## 📚 Level별 커리큘럼

### Level 0: Python 기초 (파란색 #3b82f6)
- 0-1 ~ 0-6 ✅

### Level 1: AI 기초 이론 (주황색 #f59e0b)
- 1-1 ~ 1-7 ✅

### Level 2: 수학 기초 (보라색 #a855f7)
- 2-1 ~ 2-8 ✅

### Level 3: 딥러닝 핵심 (빨간색 #ef4444)
- 3-1 ~ 3-8 ✅

### Level 4: PyTorch 실전 (오렌지 #F97316)
- 4-1: MNIST 손글씨 분류 ✅
- 4-2: 이미지 분류 CNN
- 4-3: 텍스트 분류
- 4-4: nn.Module 기초
- 4-5: 데이터 로딩
- 4-6: 학습 루프
- 4-7: 모델 저장/로드

### Level 5: CNN & 이미지 처리 (핑크 #ec4899)
- 5-1 ~ 5-7

---

## 🎨 스타일 가이드

### Level별 테마 색상
```typescript
colors.level = {
  0: "#3b82f6",  // 파란색 (Python)
  1: "#f59e0b",  // 주황색 (AI 기초)
  2: "#a855f7",  // 보라색 (수학)
  3: "#ef4444",  // 빨간색 (딥러닝)
  4: "#F97316",  // 오렌지 (PyTorch)
  5: "#ec4899",  // 핑크 (CNN)
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

### TTS 음성
```
Voice: ko-KR-SunHiNeural (한국어 여성)
```

### 비디오 스펙
```
해상도: 1920x1080
FPS: 30
썸네일: 1280x720
```

---

## ⚠️ 주의사항

1. **Composition ID**: 하이픈 사용 (`Lesson4-1`, NOT `Lesson4_1`)
2. **메타데이터 형식**: `.md` 파일 (JSON 아님!)
3. **파일명 패턴**: `lesson-X-Y` (소문자, 하이픈)
4. **클래스명 패턴**: `LessonX_YVideo` (언더스코어)
5. **초심자 대상**: 쉬운 설명, 구체적 예시
6. **AI 연결성**: 각 개념이 AI에서 어떻게 사용되는지 반드시 설명

---

## 🔗 Outro 필수 요소

모든 영상의 마지막 씬에 반드시 포함:

1. **요약**: 오늘 배운 내용 정리
2. **다음 예고**: 다음 레슨과의 연결
3. **웹사이트 안내**: "영상 설명란의 웹사이트 링크에서..."
4. **구독 요청**: "구독과 좋아요 부탁드립니다"

---

## 📋 체크리스트 (레슨 제작 완료 시)

- [ ] 스크립트 7개 씬 작성 완료
- [ ] TTS 오디오 7개 생성 완료
- [ ] 오디오 분석 및 SCENE_TIMINGS 설정
- [ ] 씬 컴포넌트 7개 개발 완료
- [ ] 메인 비디오 컴포넌트 완료
- [ ] 썸네일 컴포넌트 완료
- [ ] index.ts export 완료
- [ ] Root.tsx 등록 완료
- [ ] 비디오 렌더링 완료
- [ ] 썸네일 렌더링 완료
- [ ] YouTube 메타데이터 작성 완료
