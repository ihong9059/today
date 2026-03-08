---
name: ai-lesson
description: AI 교육 레슨 동영상 제작. 웹 학습 내용 확인/보강 → 동영상 제작까지 전체 워크플로우. "레슨 비디오 만들어줘", "Level X 작업", "다음 레슨 진행" 요청 시 사용합니다. (project)
---

# AI 교육 레슨 동영상 제작 Skill

## 빠른 실행 가이드

> **"X-Y를 진행해 주세요"** 또는 **"X-Y 비디오 만들어줘"** 요청 시:

아래 7단계를 **순서대로 자동 실행**합니다:

### 실행 순서

```
1. 나레이션 스크립트 작성  → scripts/lesson-X-Y/sceneN_name.txt
2. TTS 오디오 생성        → python scripts/lesson-X-Y/generate-tts.py
3. 오디오 분석            → 직접 계산 또는 스크립트
4. 비디오 컴포넌트 개발   → src/LessonX_YVideo.tsx
5. Root.tsx 등록          → import 및 Composition 추가
6. 렌더링 실행            → npx remotion render --concurrency=4
7. YouTube 메타데이터     → out/Lesson_X-Y/metadata.md
```

---

## 프로젝트 경로

```
Video Project:   C:/todo/today/remotion-project
Web App:         C:/todo/today/ai-education-web
커리큘럼 데이터: ai-education-web/src/data/curriculum.ts
```

---

## 폴더 구조

### Scripts (나레이션 + TTS)
```
remotion-project/scripts/lesson-X-Y/
├── scene1_intro.txt
├── scene2_topic1.txt
├── ...
└── generate-tts.py
```

### Audio (생성된 MP3)
```
remotion-project/public/audio/lesson-X-Y/
├── scene1_intro.mp3
├── scene2_topic1.mp3
├── ...
```

### Output (렌더링 결과)
```
remotion-project/out/
├── Intro/
├── Lesson_0-1/
├── Lesson_X-Y/
│   ├── video.mp4
│   ├── thumbnail.png
│   └── metadata.md
```

---

## 주요 단계

### Step 1: 나레이션 스크립트 작성
- 폴더: `scripts/lesson-X-Y/`
- 파일: `scene1_intro.txt`, `scene2_topic1.txt`, ...

### Step 2: TTS 오디오 생성
```bash
cd C:/todo/today/remotion-project
python scripts/lesson-X-Y/generate-tts.py
```
- 음성: ko-KR-SunHiNeural

### Step 3: 오디오 분석
- mutagen.mp3로 각 오디오 길이를 프레임으로 계산 (30fps)

### Step 4: 비디오 컴포넌트 개발
- 파일: `src/LessonX_YVideo.tsx`

### Step 5: Root.tsx 등록
```tsx
import { LessonX_YVideo, LESSON_X_Y_DURATION } from "./LessonX_YVideo";
```

### Step 6: 렌더링 (CPU 과부하 방지)
```bash
npx remotion render "LessonX-Y" out/Lesson_X-Y/video.mp4 --concurrency=4
npx remotion still "LessonX-Y-Thumbnail" out/Lesson_X-Y/thumbnail.png
```

### Step 7: YouTube 메타데이터
- 위치: `out/Lesson_X-Y/metadata.md`

---

## 주의사항

1. **Composition ID**: 하이픈 사용 (`Lesson4-1`, NOT `Lesson4_1`)
2. **렌더링 시 CPU 과부하 방지**: `--concurrency=4` 옵션 사용
3. **출력 폴더**: `out/Lesson_X-Y/` (video.mp4, thumbnail.png, metadata.md)
4. **비디오 스펙**: 1920x1080, 30fps

---

## 체크리스트

- [ ] 스크립트 작성 (scripts/lesson-X-Y/)
- [ ] TTS 오디오 생성 (public/audio/lesson-X-Y/)
- [ ] 비디오 컴포넌트 (src/LessonX_YVideo.tsx)
- [ ] Root.tsx 등록
- [ ] 렌더링 (out/Lesson_X-Y/)
- [ ] 메타데이터 작성
