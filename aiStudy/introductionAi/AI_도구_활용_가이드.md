# AI 도구 활용 완벽 가이드

> 초보자를 위한 AI 도구 사용법 종합 안내서

---

## 목차

1. [Claude AI 활용하기](#1-claude-ai-활용하기)
2. [동영상 만들기](#2-동영상-만들기)
3. [이미지 만들기](#3-이미지-만들기)
4. [보고자료(PPT) 만들기](#4-보고자료ppt-만들기)
5. [음악 만들기](#5-음악-만들기)
6. [업무절차 관리 (Notion)](#6-업무절차-관리-notion)

---

## 1. Claude AI 활용하기

### 1.1 Claude 등급 비교

| 구분 | Free | Pro | Max |
|:----:|:----:|:----:|:----:|
| **월 비용** | 무료 | $20/월 | $100/월 |
| **모델** | Claude 3.5 Sonnet (제한적) | Claude 3.5 Sonnet + Opus | 모든 모델 무제한 |
| **사용량** | 일일 제한 있음 | 5배 더 많은 사용량 | 20배 더 많은 사용량 |
| **파일 업로드** | 제한적 | PDF, 이미지, 코드 등 | 무제한 |
| **프로젝트** | 불가 | 가능 | 가능 |
| **Claude Code (CLI)** | 불가 | 가능 | 가능 |
| **추천 대상** | 가벼운 사용 | 개발자/전문가 | 헤비 유저 |

### 1.2 Claude Code (CLI) 설치 방법

#### 사전 요구사항
- Node.js 18 이상 설치 필요
- Claude Pro 이상 구독 필요

#### 설치 단계

**1단계: Node.js 설치 확인**
```bash
node --version  # v18 이상 확인
npm --version   # npm 확인
```

Node.js가 없다면: https://nodejs.org 에서 다운로드

**2단계: Claude Code 설치**
```bash
npm install -g @anthropic-ai/claude-code
```

**3단계: 인증**
```bash
claude
# 브라우저가 열리면 Claude 계정으로 로그인
# 또는 API 키로 인증: claude --api-key YOUR_KEY
```

**4단계: 사용 시작**
```bash
# 현재 디렉토리에서 Claude Code 시작
claude

# 특정 프로젝트 폴더에서 시작
cd my-project
claude
```

#### 주요 명령어
| 명령어 | 설명 |
|--------|------|
| `/help` | 도움말 보기 |
| `/clear` | 대화 초기화 |
| `/compact` | 컨텍스트 압축 |
| `Ctrl+C` | 현재 작업 중단 |
| `Ctrl+D` | Claude Code 종료 |

### 1.3 Skill이란?

**Skill**은 Claude Code의 기능을 확장하는 사용자 정의 지침서입니다.

#### Skill의 장점
- 반복 작업을 자동화
- 특정 도메인 지식 제공
- 일관된 작업 방식 유지

#### Skill 파일 위치
```
프로젝트폴더/
└── .claude/
    └── skills/
        └── my-skill/
            └── SKILL.md
```

#### Skill 예시 (SKILL.md)
```markdown
# YouTube 요약 Skill

YouTube URL을 입력받아 영상 내용을 요약합니다.

## 사용 방법
1. YouTube URL 제공
2. "요약해줘" 요청

## 출력 형식
- 요약본 (500자 이내)
- 주요 포인트 (5개)
- 타임스탬프 (선택)
```

#### Skill 사용하기
```bash
# Claude Code에서 skill 호출
/skill youtube-summary

# 또는 자동으로 인식되어 사용
```

### 1.4 MCP (Model Context Protocol) 연결

MCP는 Claude Code가 외부 도구/서비스와 통신하는 프로토콜입니다.

#### MCP 설정 파일 위치
```
사용자홈폴더/
└── .claude/
    └── settings.json  # MCP 서버 설정
```

#### 필수 MCP 서버 목록

**1. Notion MCP** - 문서/데이터베이스 관리
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "your-notion-api-key"
      }
    }
  }
}
```

**2. Playwright MCP** - 웹 브라우저 자동화
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    }
  }
}
```

**3. Firecrawl MCP** - 웹 스크래핑
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-api-key"
      }
    }
  }
}
```

**4. Context7 MCP** - 최신 라이브러리 문서 조회
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

#### MCP 설정 전체 예시 (settings.json)
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_xxxx"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    },
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-xxxx"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp-server"]
    }
  }
}
```

#### API 키 발급 방법

| 서비스 | 발급 URL | 비용 |
|--------|----------|------|
| Notion | https://www.notion.so/my-integrations | 무료 |
| Firecrawl | https://firecrawl.dev | 무료 티어 있음 |

---

## 2. 동영상 만들기

### 2.1 추천 도구 조합

| 용도 | 도구 | 특징 |
|------|------|------|
| **영상 생성 AI** | Runway Gen-3 | 텍스트/이미지→영상 |
| **영상 생성 AI** | Pika Labs | 무료, 짧은 클립 |
| **영상 생성 AI** | Sora (OpenAI) | 고품질 (제한적) |
| **코드 기반** | Remotion | React로 영상 제작 |
| **음성 합성** | ElevenLabs | 자연스러운 TTS |
| **음성 합성** | CLOVA Voice | 한국어 특화 |
| **편집** | CapCut | 무료, 쉬운 편집 |
| **편집** | DaVinci Resolve | 전문가용, 무료 |

### 2.2 Remotion으로 교육 영상 만들기 (상세)

Remotion은 React 코드로 영상을 만드는 프레임워크입니다.

#### 설치 및 설정

**1단계: 프로젝트 생성**
```bash
npx create-video@latest my-video
cd my-video
npm install
```

**2단계: 개발 서버 시작**
```bash
npm start
# http://localhost:3000 에서 미리보기
```

**3단계: 영상 구조 이해**
```
my-video/
├── src/
│   ├── Root.tsx          # 모든 영상 등록
│   ├── Composition.tsx   # 개별 영상 컴포넌트
│   └── MyVideo.tsx       # 실제 영상 내용
├── public/
│   └── audio/            # 음성 파일 (mp3)
└── package.json
```

**4단계: 영상 컴포넌트 작성**
```tsx
// src/MyVideo.tsx
import { AbsoluteFill, Audio, Img, useCurrentFrame } from 'remotion';

export const MyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      {/* 배경 음악 */}
      <Audio src="/audio/bgm.mp3" volume={0.3} />

      {/* 나레이션 */}
      <Audio src="/audio/narration.mp3" />

      {/* 제목 (페이드인 효과) */}
      <h1 style={{
        opacity: Math.min(1, frame / 30),
        fontSize: 60,
        color: 'white'
      }}>
        AI 교육 영상
      </h1>

      {/* 이미지 */}
      <Img src="/images/diagram.png" />
    </AbsoluteFill>
  );
};
```

**5단계: 영상 등록 (Root.tsx)**
```tsx
import { Composition } from 'remotion';
import { MyVideo } from './MyVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={30 * 60}  // 60초 (30fps)
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

**6단계: 영상 렌더링**
```bash
# MP4로 출력
npx remotion render src/index.ts MyVideo out/video.mp4
```

### 2.3 TTS(음성 합성) 연결

#### ElevenLabs 사용법

**1. 회원가입**: https://elevenlabs.io

**2. API 키 발급**: Profile → API Keys

**3. Python으로 음성 생성**
```python
from elevenlabs import generate, save

audio = generate(
    text="안녕하세요, AI 교육 영상입니다.",
    voice="Rachel",  # 또는 한국어 음성
    model="eleven_multilingual_v2"
)

save(audio, "narration.mp3")
```

**4. 대량 생성 스크립트**
```python
scripts = [
    "첫 번째 장면 나레이션입니다.",
    "두 번째 장면 설명입니다.",
    "마지막 정리 내용입니다."
]

for i, text in enumerate(scripts):
    audio = generate(text=text, voice="Rachel")
    save(audio, f"scene_{i+1}.mp3")
```

### 2.4 Runway Gen-3로 AI 영상 생성

**1. 가입**: https://runwayml.com

**2. 사용법**:
   - Text to Video: 프롬프트로 영상 생성
   - Image to Video: 이미지를 움직이는 영상으로
   - 무료: 월 125 크레딧

**3. 프롬프트 팁**:
```
좋은 예: "A robot walking through a futuristic city, cinematic lighting, 4K"
나쁜 예: "로봇"
```

---

## 3. 이미지 만들기

### 3.1 추천 AI 이미지 생성 도구

| 도구 | 특징 | 비용 | URL |
|------|------|------|-----|
| **Midjourney** | 최고 품질, 예술적 | $10/월~ | discord.gg/midjourney |
| **DALL-E 3** | ChatGPT 통합 | ChatGPT Plus | chat.openai.com |
| **Stable Diffusion** | 오픈소스, 로컬 실행 | 무료 | stability.ai |
| **Leonardo AI** | 게임/캐릭터 특화 | 무료 티어 | leonardo.ai |
| **Ideogram** | 텍스트 포함 이미지 | 무료 티어 | ideogram.ai |
| **Canva AI** | 디자인 통합 | 무료 티어 | canva.com |

### 3.2 Midjourney 사용법 (상세)

#### 가입 및 설정
1. Discord 계정 생성: https://discord.com
2. Midjourney 서버 가입: https://discord.gg/midjourney
3. 구독: /subscribe 명령어 실행

#### 기본 명령어
```
/imagine prompt: [설명]     # 이미지 생성
/describe                   # 이미지 분석
/blend                      # 이미지 합성
```

#### 프롬프트 작성 공식
```
[주제] + [스타일] + [분위기] + [기술 파라미터]

예시:
/imagine prompt: Korean traditional palace, watercolor painting style,
peaceful morning atmosphere, soft lighting --ar 16:9 --v 6
```

#### 주요 파라미터
| 파라미터 | 설명 | 예시 |
|----------|------|------|
| `--ar` | 비율 | `--ar 16:9`, `--ar 1:1` |
| `--v` | 버전 | `--v 6` (최신) |
| `--q` | 품질 | `--q 2` (고품질) |
| `--style` | 스타일 | `--style raw` |
| `--no` | 제외 | `--no text, watermark` |

### 3.3 DALL-E 3 사용법

ChatGPT Plus 구독 시 사용 가능

**사용 방법**:
1. ChatGPT 접속
2. "이미지 생성해줘: [설명]" 입력
3. 결과 확인 및 수정 요청

**프롬프트 예시**:
```
"미래 도시의 스카이라인을 보여주는 일러스트를 만들어줘.
네온 조명, 사이버펑크 스타일, 16:9 비율"
```

### 3.4 Stable Diffusion 로컬 설치

무료로 무제한 이미지 생성 가능

#### 쉬운 설치 (AUTOMATIC1111)
```bash
# 1. Python 3.10 설치

# 2. Git clone
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui

# 3. 실행 (Windows)
webui-user.bat

# 4. 브라우저에서 접속
# http://localhost:7860
```

#### ComfyUI (고급)
```bash
git clone https://github.com/comfyanonymous/ComfyUI
cd ComfyUI
pip install -r requirements.txt
python main.py
```

---

## 4. 보고자료(PPT) 만들기

### 4.1 AI로 PPT 만드는 방법

#### 추천 도구

| 도구 | 특징 | 비용 |
|------|------|------|
| **Gamma** | AI 프레젠테이션 자동 생성 | 무료 티어 |
| **Beautiful.ai** | 디자인 자동 최적화 | $12/월~ |
| **Canva** | 다양한 템플릿 | 무료 티어 |
| **Claude + python-pptx** | 코드로 생성 | 무료 |

### 4.2 Gamma로 PPT 만들기

**1단계: 가입**
- https://gamma.app 접속
- Google 계정으로 로그인

**2단계: 새 프레젠테이션 생성**
- "Create new" → "Presentation"
- 주제 입력: "AI 기술 소개"

**3단계: AI가 자동으로 구조 생성**
- 개요 검토 및 수정
- "Generate" 클릭

**4단계: 편집 및 내보내기**
- 슬라이드별 내용 수정
- Export → PowerPoint (.pptx)

### 4.3 Python으로 PPT 만들기

```python
from pptx import Presentation
from pptx.util import Inches, Pt

# 프레젠테이션 생성
prs = Presentation()

# 제목 슬라이드
slide_layout = prs.slide_layouts[0]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
subtitle = slide.placeholders[1]

title.text = "AI 활용 가이드"
subtitle.text = "초보자를 위한 안내서"

# 내용 슬라이드
slide_layout = prs.slide_layouts[1]
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
body = slide.placeholders[1]

title.text = "목차"
tf = body.text_frame
tf.text = "1. Claude AI 소개"
p = tf.add_paragraph()
p.text = "2. 동영상 제작"
p = tf.add_paragraph()
p.text = "3. 이미지 생성"

# 저장
prs.save('presentation.pptx')
```

### 4.4 PPT에 음성 포함하기

#### 방법 1: PowerPoint 녹음 기능
1. 슬라이드 쇼 → 슬라이드 쇼 녹화
2. 녹화 시작 → 나레이션 녹음
3. 슬라이드별로 음성 자동 저장

#### 방법 2: AI 음성 삽입
```
1. ElevenLabs로 음성 파일 생성 (mp3)
2. PowerPoint에서:
   - 삽입 → 오디오 → 내 PC의 오디오
   - 오디오 파일 선택
3. 재생 탭에서 설정:
   - "자동으로 시작" 선택
   - "슬라이드 쇼 진행 중 숨기기" 체크
```

### 4.5 PPT에 배경 음악 포함하기

#### 단계별 가이드

**1단계: 배경 음악 준비**
- 저작권 무료 음악 사이트:
  - https://pixabay.com/music
  - https://freesound.org
  - YouTube 오디오 라이브러리

**2단계: PowerPoint에 삽입**
1. 첫 번째 슬라이드 선택
2. 삽입 → 오디오 → 내 PC의 오디오
3. 배경 음악 파일 선택

**3단계: 재생 설정**
1. 오디오 아이콘 클릭
2. 재생 탭 선택
3. 설정:
   - 시작: "자동"
   - "모든 슬라이드에서 재생" 체크
   - "슬라이드 쇼 진행 중 숨기기" 체크
   - 볼륨: 적절히 조절 (배경이므로 낮게)

**4단계: 나레이션과 배경 음악 믹싱**
- 배경 음악 볼륨: 20-30%
- 나레이션 볼륨: 100%
- 또는 Audacity로 미리 믹싱 후 삽입

---

## 5. 음악 만들기

### 5.1 AI 음악 생성 도구

| 도구 | 특징 | 비용 | URL |
|------|------|------|-----|
| **Suno AI** | 가사+보컬 포함 곡 생성 | 무료 티어 | suno.ai |
| **Udio** | 고품질, 다양한 장르 | 무료 티어 | udio.com |
| **AIVA** | 클래식/영화음악 특화 | 무료 티어 | aiva.ai |
| **Soundraw** | BGM/인스트루멘탈 | 무료 티어 | soundraw.io |
| **Mubert** | 실시간 AI 음악 | 무료 티어 | mubert.com |

### 5.2 Suno AI로 대중가요 만들기

#### 가입 및 시작
1. https://suno.ai 접속
2. Discord/Google 계정으로 로그인
3. 무료: 월 50크레딧 (약 10곡)

#### 음악 생성 방법

**방법 1: 간단 생성**
```
1. "Create" 클릭
2. 스타일/장르 입력: "K-pop ballad, emotional, female vocal"
3. "Create" 버튼
```

**방법 2: 가사 직접 입력 (Custom)**
```
1. "Custom Mode" 활성화
2. Lyrics(가사) 입력:

[Verse 1]
새벽빛이 창문을 두드릴 때
나는 너를 떠올려

[Chorus]
너와 함께한 그 순간들이
내 마음속에 영원히

3. Style: "K-pop ballad, piano, emotional"
4. Title: "새벽빛"
5. "Create" 버튼
```

#### 가사 작성 형식
```
[Intro] - 인트로
[Verse] - 벌스 (절)
[Pre-Chorus] - 프리코러스
[Chorus] - 코러스 (후렴)
[Bridge] - 브릿지
[Outro] - 아웃트로
```

### 5.3 장르별 프롬프트 가이드

#### K-POP
```
Style: K-pop, catchy, dance beat, synthesizer, energetic
Tempo: 128 BPM
```

#### 발라드
```
Style: Korean ballad, piano, emotional, soft vocal, orchestral
Tempo: 70-80 BPM
```

#### 힙합/랩
```
Style: Korean hip-hop, trap beat, 808 bass, modern
Tempo: 85-95 BPM
```

#### EDM
```
Style: EDM, progressive house, drop, synth, festival
Tempo: 128-132 BPM
```

#### 재즈
```
Style: Jazz, smooth, saxophone, piano trio, relaxing
Tempo: 90-120 BPM (swing)
```

#### 클래식/오케스트라
```
Style: Orchestral, cinematic, epic, strings, brass
Tempo: 60-100 BPM
```

### 5.4 Udio로 고품질 음악 만들기

**특징**: Suno보다 음질이 좋고 실제 음악에 가까움

#### 사용법
```
1. https://udio.com 접속
2. "Create" 클릭
3. 프롬프트 입력:
   "Emotional Korean ballad with female vocals,
    piano and strings, heartfelt lyrics about memories"
4. Generate 클릭
5. 2개 버전 생성됨 → 마음에 드는 것 선택
6. "Extend" 로 곡 연장 가능
```

### 5.5 저작권 안내

| 도구 | 상업적 사용 | 조건 |
|------|-------------|------|
| Suno 무료 | 불가 | 유료 구독 필요 |
| Suno Pro | 가능 | $8/월 이상 |
| Udio 무료 | 불가 | 유료 구독 필요 |
| AIVA 무료 | 불가 | 저작권 AIVA 소유 |

---

## 6. 업무절차 관리 (Notion)

### 6.1 Notion 시작하기

#### 가입
1. https://notion.so 접속
2. 이메일 또는 Google 계정으로 가입
3. 개인용/팀용 선택

#### 기본 구조
```
워크스페이스
├── 페이지 (문서)
│   ├── 하위 페이지
│   └── 데이터베이스
├── 데이터베이스
│   ├── 테이블 뷰
│   ├── 보드 뷰 (칸반)
│   ├── 캘린더 뷰
│   └── 갤러리 뷰
└── 템플릿
```

### 6.2 업무 관리 템플릿 만들기

#### 프로젝트 관리 데이터베이스

**1단계: 데이터베이스 생성**
```
1. 새 페이지 생성
2. "/table" 입력 → "Table - Full page" 선택
3. 이름: "프로젝트 관리"
```

**2단계: 속성(Properties) 설정**
| 속성 이름 | 타입 | 옵션 |
|-----------|------|------|
| 프로젝트명 | Title | - |
| 상태 | Select | 계획중, 진행중, 완료, 보류 |
| 담당자 | Person | - |
| 마감일 | Date | - |
| 우선순위 | Select | 높음, 중간, 낮음 |
| 진행률 | Number | 0-100% |
| 태그 | Multi-select | 개발, 디자인, 마케팅 |

**3단계: 뷰 추가**
- 보드 뷰: 상태별 칸반 보드
- 캘린더 뷰: 마감일 기준 일정
- 테이블 뷰: 전체 목록

### 6.3 Claude Code에서 Notion 연동

#### MCP 설정 (앞서 설명한 내용)
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_xxxx"
      }
    }
  }
}
```

#### Notion API 키 발급
1. https://www.notion.so/my-integrations
2. "New integration" 클릭
3. 이름 입력, 워크스페이스 선택
4. "Internal Integration Token" 복사

#### 페이지 권한 설정
```
1. 연동할 Notion 페이지 열기
2. 우측 상단 "..." → "연결"
3. 생성한 Integration 선택
```

#### Claude Code에서 사용 예시
```
Claude에게 요청:
"Notion에서 프로젝트 관리 데이터베이스를 검색해서
진행 중인 프로젝트 목록을 보여줘"

"새로운 할일을 Notion에 추가해줘:
- 제목: AI 가이드 문서 작성
- 상태: 진행중
- 마감일: 2024-12-31"
```

### 6.4 업무 절차 자동화 예시

#### 일일 업무 템플릿
```markdown
# 📅 일일 업무 보고 - {{date}}

## ✅ 오늘 할 일
- [ ]
- [ ]
- [ ]

## 🔄 진행 중
| 작업 | 상태 | 예상 완료 |
|------|------|----------|
|      |      |          |

## ✔️ 완료
-

## 📝 메모
```

#### 주간 회의 템플릿
```markdown
# 📊 주간 회의 - {{date_range}}

## 참석자
-

## 지난주 리뷰
### 완료 항목
-

### 미완료 항목
-

## 이번주 계획
| 담당자 | 작업 | 목표일 |
|--------|------|--------|
|        |      |        |

## 논의 사항
-

## Action Items
- [ ]
```

---

## 부록: 유용한 링크 모음

### AI 도구
| 카테고리 | 도구 | URL |
|----------|------|-----|
| 대화형 AI | Claude | https://claude.ai |
| 대화형 AI | ChatGPT | https://chat.openai.com |
| 이미지 생성 | Midjourney | https://midjourney.com |
| 이미지 생성 | DALL-E | https://openai.com/dall-e |
| 영상 생성 | Runway | https://runwayml.com |
| 음악 생성 | Suno | https://suno.ai |
| 음성 합성 | ElevenLabs | https://elevenlabs.io |
| 문서 관리 | Notion | https://notion.so |
| PPT 생성 | Gamma | https://gamma.app |

### 무료 리소스
| 유형 | 사이트 | URL |
|------|--------|-----|
| 음악 | Pixabay Music | https://pixabay.com/music |
| 음악 | Free Music Archive | https://freemusicarchive.org |
| 이미지 | Unsplash | https://unsplash.com |
| 아이콘 | Flaticon | https://flaticon.com |
| 폰트 | Google Fonts | https://fonts.google.com |

---

> **문서 버전**: 1.0
> **작성일**: 2026-03-23
> **작성**: Claude Code
