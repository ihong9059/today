# Claude SDK 사용 사례 — hw-c-edu-platform

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트** | hw-c-edu-platform (하드웨어 C언어 교육 플랫폼) |
| **위치** | uttec@100.79.180.64:/home/uttec/webServer/hw-c-edu-platform/ |
| **기술 스택** | TypeScript + Express + Prisma (백엔드), Next.js (프론트엔드) |
| **AI SDK** | `@anthropic-ai/sdk` (Node.js용 Anthropic 공식 SDK) |
| **모델** | `claude-sonnet-4-20250514` |
| **API 키 관리** | `.env` 파일의 `ANTHROPIC_API_KEY` |

---

## 아키텍처

```
[학생 브라우저]
     │
     ▼
[Next.js 프론트엔드]
     │
     ▼ HTTP POST
[Express 백엔드]
     │
     ├── src/routes/ai.ts        ← API 엔드포인트 (4개)
     │       │
     │       ▼
     ├── src/services/claude.ts  ← Claude SDK 호출 (핵심)
     │       │
     │       ▼
     │   @anthropic-ai/sdk → Claude API
     │
     └── Prisma DB               ← 채팅 기록 저장
```

---

## Claude SDK 초기화

```typescript
// src/services/claude.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

- `.env` 파일에서 API 키를 읽어 클라이언트를 초기화
- 싱글톤 패턴으로 모듈 로드 시 1회만 생성

---

## API 호출 패턴

모든 기능이 동일한 패턴을 사용:

```typescript
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 2000,
  messages: [
    { role: 'user', content: userPrompt }
  ],
  system: systemPrompt    // 기능별로 다른 전문가 역할
});

// 응답에서 텍스트 추출
const textContent = response.content.find(block => block.type === 'text');
return textContent ? textContent.text : '응답을 생성할 수 없습니다.';
```

**핵심 포인트:**
- `system` 파라미터로 AI의 역할/성격을 설정
- `messages`에 사용자 질문을 전달
- `response.content`는 배열이므로 `type === 'text'`인 블록을 찾아 추출

---

## 제공하는 AI 기능 (4가지)

### 1. 코드 설명 (`explainCode`)

| 항목 | 내용 |
|------|------|
| 엔드포인트 | `POST /ai/explain` |
| max_tokens | 2000 |
| system prompt | "하드웨어 프로그래밍 전문 교육자" |

```
입력: C언어 코드 + 언어 + 컨텍스트
출력: 코드 개요, 함수/변수 설명, 동작 원리, 핵심 포인트
```

### 2. 코드 생성 (`generateCode`)

| 항목 | 내용 |
|------|------|
| 엔드포인트 | `POST /ai/generate` |
| max_tokens | 3000 |
| system prompt | "임베디드 시스템 전문 개발자" |

```
입력: 요구사항 설명 + 플랫폼(STM32/Arduino/ESP32) + 카테고리(GPIO/Timer/UART)
출력: 헤더 파일, 초기화 코드, 메인 로직, 한국어 주석
```

### 3. 코드 리뷰 (`reviewCode`)

| 항목 | 내용 |
|------|------|
| 엔드포인트 | `POST /ai/review` |
| max_tokens | 2000 |
| system prompt | "친절한 프로그래밍 튜터" |

```
입력: 학생 코드 + 문제 설명
출력: 잘한 점, 개선점, 버그, 스타일 제안, 추가 학습 권장
```

### 4. 자유 질문 (`answerQuestion`)

| 항목 | 내용 |
|------|------|
| 엔드포인트 | `POST /ai/ask` |
| max_tokens | 2000 |
| system prompt | "하드웨어 프로그래밍 전문 교육자" |

```
입력: 질문 텍스트 + 관련 코드(선택)
출력: 예제 코드 포함 상세 설명
```

---

## 라우트 처리 흐름 (`src/routes/ai.ts`)

모든 엔드포인트가 동일한 패턴:

```typescript
router.post('/explain', authenticate, async (req, res) => {
  // 1. 인증 확인 (authenticate 미들웨어)
  // 2. 입력 검증
  if (!code) return res.status(400).json({ error: '코드를 입력해주세요.' });

  // 3. Claude API 호출
  const explanation = await claudeService.explainCode({ code, language, context });

  // 4. DB에 채팅 기록 저장
  await prisma.aIChat.create({
    data: {
      userId: req.user.id,
      question: `코드 설명 요청:\n${code}`,
      answer: explanation,
      codeContext: code
    }
  });

  // 5. 응답 반환
  res.json({ explanation });
});
```

---

## Python(Anthropic SDK)으로 동일 패턴 구현

위 TypeScript 코드를 Python으로 변환하면:

```python
import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=2000,
    system="당신은 하드웨어 프로그래밍 전문 교육자입니다.",
    messages=[
        {"role": "user", "content": "UART와 SPI의 차이가 뭐예요?"}
    ]
)

print(response.content[0].text)
```

---

## 핵심 요약

| 설계 결정 | 이유 |
|----------|------|
| 기능별 system prompt 분리 | 각 기능에 최적화된 응답 품질 확보 |
| max_tokens 차별화 | 코드 생성(3000)은 설명(2000)보다 길어야 함 |
| DB 채팅 기록 저장 | 학생 학습 이력 추적, 반복 질문 방지 |
| authenticate 미들웨어 | 로그인한 사용자만 AI 기능 사용 (비용 관리) |
| 텍스트 블록 추출 | `response.content`가 배열이므로 안전하게 처리 |
