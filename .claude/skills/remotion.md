# Remotion Skill

Remotion을 사용하여 React 기반 동영상을 제작합니다.

## 프로젝트 위치

`C:\todo\today\remotion-project`

## 작업 순서 (중요!)

1. **Studio에서 미리보기** - 먼저 웹에서 확인
2. **사용자 확정** - 수정 사항 반영
3. **렌더링** - 확정 후에만 렌더링 (시간 절약)

## 사용 가능한 명령어

```bash
cd C:\todo\today\remotion-project

# 1. Studio 실행 (미리보기 및 편집) - 먼저 실행!
npm start
# http://localhost:3000 또는 3001에서 확인

# 2. 사용자 확정 후 렌더링
npx remotion render [CompositionID] out/[파일명].mp4

# 특정 설정으로 렌더링
npx remotion render MyComp out/video.mp4 --codec h264
npx remotion render MyComp out/video.webm --codec vp8
npx remotion render MyComp out/video.gif --codec gif
```

## TTS 음성 생성 (Edge TTS)

```bash
# 한국어 여성 음성: ko-KR-SunHiNeural
# 한국어 남성 음성: ko-KR-InJoonNeural, ko-KR-HyunsuNeural
python generate_voice.py
```

## 프로젝트 구조

```
remotion-project/
├── src/
│   ├── index.ts        # 진입점 (registerRoot)
│   ├── Root.tsx        # Composition 정의
│   └── Composition.tsx # 비디오 컴포넌트
├── package.json
└── tsconfig.json
```

## 주요 개념

- **Composition**: 비디오 단위 (해상도, FPS, 길이 정의)
- **useCurrentFrame()**: 현재 프레임 번호
- **useVideoConfig()**: fps, width, height, durationInFrames
- **interpolate()**: 프레임에 따른 값 보간 (애니메이션)

## 애니메이션 예시

```tsx
import { useCurrentFrame, interpolate } from "remotion";

const frame = useCurrentFrame();

// Fade in (0~30프레임)
const opacity = interpolate(frame, [0, 30], [0, 1]);

// Rotation (전체 프레임 동안 360도 회전)
const rotation = interpolate(frame, [0, 150], [0, 360]);

// Scale
const scale = interpolate(frame, [0, 30], [0.5, 1]);
```

## 트리거 키워드

- "remotion 동영상 만들어줘"
- "동영상 렌더링"
- "remotion studio 실행"
- "비디오 제작"
