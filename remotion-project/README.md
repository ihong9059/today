# Remotion Video Project

React 기반 프로그래매틱 영상 제작 프로젝트. [Remotion](https://www.remotion.dev/) 프레임워크를 사용하여 AI 교육 강의, 회사 소개, 제안서 등 다양한 영상을 코드로 생성한다.

## 기술 스택

- **Remotion** v4.0 - React 기반 영상 렌더링 프레임워크
- **React** v19 / **TypeScript** v5
- **Python** - TTS 음성 생성 및 이미지 다운로드 보조 스크립트

## 폴더 구조

```
remotion-project/
├── src/                    # 소스 코드 (171개 파일)
│   ├── Root.tsx            # Remotion 루트 - 모든 Composition 등록
│   ├── index.ts            # 진입점 (registerRoot)
│   ├── Composition.tsx     # 기본 데모 컴포지션
│   ├── Lesson*Video.tsx    # AI 교육 강의 영상 (Level 0~9, 각 6~8개 레슨)
│   ├── Lesson*Thumbnail.tsx # 각 레슨 썸네일 (Still)
│   ├── AIIntroVideo.tsx    # AI 첫걸음 소개 영상
│   ├── AIQualityVideo.tsx  # AI 품질관리 영상 (KO)
│   ├── AIQualityVideoEN.tsx # AI 품질관리 영상 (EN)
│   ├── BleOtaPitchVideo.tsx # BLE OTA 피치 영상
│   ├── PrebuildPitchVideo.tsx # 사전빌드 피치 영상
│   ├── XerixProposalVideo*.tsx # Xerix 제안서 영상 (KO/EN)
│   ├── UttecVideo*.tsx     # UTTEC 회사소개 영상 (KO/EN)
│   ├── FritschVideo*.tsx   # Fritsch 영상 (KO/EN)
│   ├── DumulmeoriTravel.tsx # 두물머리 여행 영상
│   ├── EconomyNews.tsx     # 경제 뉴스 영상
│   ├── WallRobotVideo.tsx  # 벽면 로봇 영상
│   ├── SmartFactoryVideo.tsx # 스마트팩토리 영상
│   ├── TurboMillVideo.tsx  # 터보밀 영상
│   └── ...
├── public/
│   ├── audio/              # 내레이션 오디오 (레슨별, 프로젝트별)
│   ├── images/             # 정적 이미지 리소스
│   └── improvement/        # 개선 관련 오디오
├── out/                    # 렌더링된 영상 출력
│   ├── Level_0/ ~ Level_9/ # AI 교육 레슨별 MP4
│   ├── Intro/              # 소개 영상
│   ├── AIQualityVideo/     # AI 품질관리
│   ├── uttec/              # UTTEC 소개 (KO/EN)
│   ├── BleOtaPitch/        # BLE OTA 피치
│   └── *.mp4               # 기타 렌더링 결과물
├── generate_voice.py       # TTS 음성 생성 스크립트
├── generate_dumulmeori_voice.py
├── generate_turbomill_voice.py
├── download_images.py      # 이미지 다운로드 스크립트
├── package.json
└── tsconfig.json
```

## 영상 종류

| 카테고리 | 설명 | 수량 |
|---------|------|------|
| AI 교육 강의 | Level 0~9 단계별 AI 학습 영상 + 썸네일 | ~70개 레슨 |
| 회사 소개 | UTTEC, Xerix 제안서 (한/영) | 4개 |
| 제품/기술 | BLE OTA, 사전빌드 피치, 터보밀, 스마트팩토리 등 | 6개+ |
| 기타 | 두물머리 여행, 경제뉴스 등 | 2개+ |

## 실행 방법

```bash
# 의존성 설치
npm install

# Remotion Studio (브라우저에서 미리보기)
npm start

# 영상 렌더링 (기본)
npm run build

# 특정 Composition 렌더링
npx remotion render <CompositionId> out/<filename>.mp4
```

## 음성 생성

Python 스크립트로 TTS 내레이션을 생성하여 `public/audio/` 에 저장한 후 영상에 삽입한다.

```bash
python generate_voice.py
```
