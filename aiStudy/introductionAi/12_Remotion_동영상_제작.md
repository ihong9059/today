# Remotion으로 동영상 제작하기

## 1. Remotion이란?
- React(JavaScript/TypeScript)로 동영상을 만드는 프레임워크
- 코드로 동영상의 모든 요소(텍스트, 이미지, 애니메이션, 차트 등) 제어
- 프로그래밍 지식이 있으면 반복 작업 자동화 가능
- Claude Code와 결합하면 AI가 동영상 코드를 작성해줌
- 교육 영상, 프레젠테이션 영상, 데이터 시각화 영상에 적합

## 2. 사전 준비
### 2.1 필수 설치
- Node.js 18+ (이미 설치했다면 생략)
- npm 또는 yarn

### 2.2 프로젝트 생성
```bash
npx create-video@latest my-video
cd my-video
npm install
```
- 템플릿 선택: "Hello World" (기본)
- TypeScript 추천

## 3. 프로젝트 구조
```
my-video/
├── src/
│   ├── Root.tsx           # 영상 등록 (Composition 정의)
│   ├── HelloWorld.tsx     # 실제 영상 컴포넌트
│   └── ...
├── public/                # 이미지, 폰트 등 정적 파일
├── package.json
└── remotion.config.ts     # 설정 파일
```

## 4. 기본 사용법

### 4.1 미리보기 실행
```bash
npx remotion studio
```
- 브라우저에서 http://localhost:3000 자동 오픈
- 실시간으로 영상 미리보기 가능
- 타임라인 조작, 프레임별 확인

### 4.2 영상 구조 이해
```tsx
// src/Root.tsx
import { Composition } from 'remotion';
import { MyVideo } from './MyVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={300}  // 10초 (30fps * 10)
      fps={30}                // 초당 30프레임
      width={1920}            // Full HD
      height={1080}
    />
  );
};
```

### 4.3 간단한 영상 만들기
```tsx
// src/MyVideo.tsx
import { useCurrentFrame, AbsoluteFill, spring, useVideoConfig } from 'remotion';

export const MyVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 텍스트 등장 애니메이션
  const opacity = spring({ frame, fps, from: 0, to: 1 });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{
        color: 'white',
        fontSize: 80,
        opacity
      }}>
        AI 교육에 오신 것을 환영합니다!
      </h1>
    </AbsoluteFill>
  );
};
```

### 4.4 씬(장면) 구성
```tsx
import { Sequence } from 'remotion';

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      {/* 0~90프레임 (0~3초): 인트로 */}
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>

      {/* 90~210프레임 (3~7초): 본문 */}
      <Sequence from={90} durationInFrames={120}>
        <MainScene />
      </Sequence>

      {/* 210~300프레임 (7~10초): 아웃트로 */}
      <Sequence from={210} durationInFrames={90}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
```

## 5. 주요 기능

### 5.1 이미지 사용
```tsx
import { Img, staticFile } from 'remotion';

<Img src={staticFile('logo.png')} style={{ width: 200 }} />
```

### 5.2 오디오 추가
```tsx
import { Audio, staticFile } from 'remotion';

<Audio src={staticFile('narration.mp3')} />
```
- TTS(Text-to-Speech) 오디오를 미리 생성해서 사용
- 배경음악도 같은 방식으로 추가

### 5.3 애니메이션
```tsx
import { interpolate, spring } from 'remotion';

// 선형 보간
const opacity = interpolate(frame, [0, 30], [0, 1]);

// 스프링 애니메이션 (자연스러운 움직임)
const scale = spring({ frame, fps, config: { damping: 200 } });
```

### 5.4 자막/캡션
```tsx
const subtitles = [
  { start: 0, end: 90, text: "안녕하세요" },
  { start: 90, end: 180, text: "AI 교육을 시작합니다" },
];

const current = subtitles.find(s => frame >= s.start && frame < s.end);
```

## 6. 영상 렌더링 (출력)

### 6.1 MP4로 렌더링
```bash
npx remotion render src/index.ts MyVideo out/my-video.mp4
```

### 6.2 렌더링 옵션
```bash
# 특정 해상도
npx remotion render src/index.ts MyVideo out/video.mp4 --width=1920 --height=1080

# GIF으로 출력
npx remotion render src/index.ts MyVideo out/video.gif --image-format=png
```

### 6.3 렌더링 시간
- 10초 영상: 약 30초~2분 (PC 성능에 따라)
- GPU 가속 사용 가능

## 7. Claude Code와 Remotion 연동

### 7.1 AI로 영상 제작하기
Claude Code에서 요청하면 Remotion 코드를 자동 생성:
```
"5분짜리 AI 소개 동영상 만들어줘.
 씬 구성: 인트로 → AI란? → 활용 사례 3가지 → 마무리"
```

### 7.2 기존 프로젝트 활용
이 저장소의 remotion-project/ 폴더에 이미 구축된 Remotion 환경 있음:
- 한국어 폰트 설정 완료
- TTS 연동 설정 완료
- 공통 컴포넌트 (타이틀, 자막, 전환 효과 등) 준비됨

## 8. TTS (텍스트 음성 변환) 연동
- Google Cloud TTS, ElevenLabs, 네이버 Clova 등 활용
- 대본을 작성하면 AI가 음성 파일 생성
- 생성된 음성 파일을 Remotion의 Audio 컴포넌트로 연결

## 9. 자주 묻는 질문
- Q: React를 몰라도 되나요? → Claude Code가 코드를 작성해주므로 기본 개념만 이해하면 OK
- Q: 렌더링이 느려요 → concurrency 옵션으로 병렬 처리, 또는 해상도 낮추기
- Q: 한글 폰트가 깨져요 → public/ 폴더에 한글 폰트(.woff2) 추가 후 CSS에서 지정
- Q: 오디오와 영상 싱크가 안 맞아요 → 오디오 길이에 맞춰 durationInFrames 조정

## 10. 다음 단계
- [13_AWS_Cloud_설치.md](13_AWS_Cloud_설치.md) - 24시간 클라우드 서버 만들기
