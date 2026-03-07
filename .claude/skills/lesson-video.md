# AI 교육 레슨 동영상 제작 Skill

AI 첫걸음 커리큘럼의 개별 레슨 동영상과 YouTube 자료를 제작합니다.

## 트리거 키워드

- "레슨 동영상 만들어줘"
- "Lesson X-Y 제작"
- "레슨 비디오 제작"
- "다음 레슨 동영상"
- "레슨 영상 작업"

## 제작 워크플로우

### 1. 레슨 내용 확인
```bash
# curriculum.ts에서 해당 레슨 내용 확인
ai-education-web/src/data/curriculum.ts
```
- 레슨 ID (예: "0-1", "1-3", "2-5")
- 레슨 제목
- 레슨 설명
- 상세 내용 (content 필드)

### 2. 스크립트 작성
레슨 내용을 기반으로 씬별 나레이션 스크립트 작성:
```
remotion-project/scripts/lesson-X-Y/scene1_intro.txt
remotion-project/scripts/lesson-X-Y/scene2_*.txt
...
remotion-project/scripts/lesson-X-Y/sceneN_outro.txt
```

**스크립트 작성 원칙**:
- 자연스러운 한국어 구어체
- 한 씬당 15-40초 분량 (4-10문장)
- 기술 용어는 쉽게 풀어서 설명
- 인트로/아웃트로 포함

### 3. TTS 오디오 생성
```python
# remotion-project/scripts/generate-lesson-X-Y-tts.py
VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
```

```bash
cd remotion-project
python scripts/generate-lesson-X-Y-tts.py
```

출력: `public/audio/lesson-X-Y/*.mp3`

### 4. Remotion 비디오 컴포넌트 제작
`remotion-project/src/LessonX_YVideo.tsx` 생성:

**필수 구성요소**:
- GlobalOverlay: UTTEC-Lab 로고 (좌상단) + 교육 사이트 URL (하단)
- AnimatedBackground: 배경 그라데이션 + 움직이는 효과
- Particles: 파티클 효과
- 씬별 컴포넌트 (Scene1Intro, Scene2..., SceneNOutro)

**씬 구성 패턴**:
```tsx
export const SCENE_TIMINGS = {
  scene1_intro: { duration: [프레임수], start: 0 },
  scene2_...: { duration: [프레임수], start: [이전 씬 끝] },
  // ...
};

export const LESSON_X_Y_DURATION = [총 프레임수];
```

### 5. Root.tsx에 등록
```tsx
import { LessonX_YVideo, LESSON_X_Y_DURATION } from "./LessonX_YVideo";
import { LessonX_YThumbnail } from "./LessonX_YThumbnail";

// Composition 추가
<Composition
  id="LessonX-Y"
  component={LessonX_YVideo}
  durationInFrames={LESSON_X_Y_DURATION}
  fps={30}
  width={1920}
  height={1080}
/>
<Still
  id="LessonX-Y-Thumbnail"
  component={LessonX_YThumbnail}
  width={1920}
  height={1080}
/>
```

**중요**: Composition ID에는 underscore(_) 사용 불가! 하이픈(-) 사용

### 6. 렌더링
```bash
cd remotion-project

# 동영상 렌더링
npx remotion render LessonX-Y "out/동영상/Lesson_X-Y_[제목].mp4" --gl=angle

# 썸네일 렌더링
npx remotion still LessonX-Y-Thumbnail "out/썸네일/Lesson_X-Y_thumbnail.png"
```

### 7. YouTube 메타데이터 작성
`remotion-project/out/metadata/Lesson_X-Y_metadata.md`:

```markdown
# YouTube 메타데이터 - Lesson X-Y: [제목]

## 제목 (Title)
[AI 첫걸음 Level X-Y] [제목] | [부제목]

## 설명 (Description)
- 학습 목표
- 타임스탬프
- 학습 체크리스트
- 교육 사이트 링크
- 시리즈 안내
- 해시태그

## 태그 (Tags)
관련 키워드 목록

## 썸네일 요소
- 배경색
- 메인 아이콘/이모지
- 텍스트 구성
```

### 8. 썸네일 제작
`remotion-project/src/LessonX_YThumbnail.tsx`:
- 1920x1080 해상도
- UTTEC-Lab 로고 (좌상단)
- Level 배지 (우상단)
- 메인 아이콘 (중앙 상단)
- 제목 (중앙, 큰 글씨)
- 부제목 (하단)

## 디자인 가이드라인

### 색상 팔레트
```tsx
const colors = {
  primary: "#3b82f6",    // 파란색
  secondary: "#8b5cf6",  // 보라색
  accent: "#f59e0b",     // 주황색
  success: "#10b981",    // 녹색
  danger: "#ef4444",     // 빨간색
  python: "#3776ab",     // Python 색상
  vscode: "#007acc",     // VS Code 색상
  jupyter: "#f37626",    // Jupyter 색상
};
```

### 레벨별 색상
```tsx
const levelColors = {
  0: "#6b7280",  // 회색 (Python 기초)
  1: "#f59e0b",  // 주황 (AI 기초 이론)
  2: "#a855f7",  // 보라 (수학 기초)
  3: "#ef4444",  // 빨강 (딥러닝 핵심)
  4: "#F97316",  // 오렌지 (실전 프로젝트)
  5: "#ec4899",  // 핑크 (CNN & 이미지)
  6: "#14b8a6",  // 청록 (시퀀스 모델)
  7: "#3b82f6",  // 파랑 (Transformer)
  8: "#22c55e",  // 초록 (GPU 프로그래밍)
  9: "#eab308",  // 금색 (종합 프로젝트)
};
```

## 참고 파일

- `remotion-project/src/AIIntroVideo.tsx` - 소개 영상 (참고용)
- `remotion-project/src/Lesson0_1Video.tsx` - 레슨 영상 템플릿
- `remotion-project/src/Lesson0_1Thumbnail.tsx` - 썸네일 템플릿
- `ai-education-web/src/data/curriculum.ts` - 레슨 내용

## 체크리스트

- [ ] 레슨 내용 확인 (curriculum.ts)
- [ ] 씬별 스크립트 작성 (scripts/lesson-X-Y/*.txt)
- [ ] TTS 오디오 생성 (public/audio/lesson-X-Y/*.mp3)
- [ ] 비디오 컴포넌트 제작 (src/LessonX_YVideo.tsx)
- [ ] 썸네일 컴포넌트 제작 (src/LessonX_YThumbnail.tsx)
- [ ] Root.tsx에 등록
- [ ] 동영상 렌더링
- [ ] 썸네일 렌더링
- [ ] 메타데이터 작성

## 출력물

| 항목 | 위치 |
|------|------|
| 동영상 | `out/동영상/Lesson_X-Y_[제목].mp4` |
| 썸네일 | `out/썸네일/Lesson_X-Y_thumbnail.png` |
| 메타데이터 | `out/metadata/Lesson_X-Y_metadata.md` |
