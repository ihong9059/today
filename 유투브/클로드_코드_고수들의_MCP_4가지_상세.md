# 클로드 코드 고수들은 이미 쓰고 있는 MCP 4가지 | EP.02

## 영상 정보
- **채널**: Theuxlabs
- **영상 길이**: 25:35
- **URL**: https://www.youtube.com/watch?v=Pbtp17aZ7k4

---

## 목차
1. [MCP 개념 및 소개](#1-mcp-개념-및-소개)
2. [MCP 설치 방법](#2-mcp-설치-방법)
3. [필수 MCP 1: Playwright](#3-필수-mcp-1-playwright)
4. [필수 MCP 2: Context7](#4-필수-mcp-2-context7)
5. [필수 MCP 3: Firecrawl](#5-필수-mcp-3-firecrawl)
6. [필수 MCP 4: Sequential Thinking](#6-필수-mcp-4-sequential-thinking)
7. [실전 응용: MCP 조합 활용](#7-실전-응용-mcp-조합-활용)

---

## 1. MCP 개념 및 소개

### MCP란 무엇인가?
- **MCP (Model Context Protocol)**: AI 모델이 외부 도구/서비스와 연결되는 표준 프로토콜
- **스마트폰 비유**:
  - Claude Code = 스마트폰 본체
  - MCP = 앱스토어에서 설치하는 앱들
  - MCP를 연결할수록 Claude Code가 할 수 있는 일이 많아짐

### MCP의 핵심 가치
- 수백~수천 개의 MCP가 존재
- 목적에 맞는 MCP를 선택하여 연결
- 여러 MCP를 조합하면 복잡한 자동화 가능

---

## 2. MCP 설치 방법

### 방법 1: Claude Code에 직접 요청
```
"Playwright MCP 설치해줘"
```
- Claude가 자동으로 설치 명령어 실행

### 방법 2: 명령어 직접 입력
```bash
claude mcp add playwright -- npx @playwright/mcp
```

### 중요 사항
- MCP 설치 후 **반드시 재시작** 필요
- `exit` 명령으로 종료 후 다시 `claude` 실행
- 재시작하지 않으면 MCP가 활성화되지 않음

### MCP 관리 명령어
```bash
# MCP 목록 확인
claude mcp list

# MCP 추가
claude mcp add [이름] -- [명령어]

# MCP 삭제
claude mcp remove [이름]
```

---

## 3. 필수 MCP 1: Playwright

### 기능
- **브라우저 자동화** 도구
- 웹페이지 열기, 클릭, 타이핑, 스크롤 등
- 웹 테스트 자동화

### 설치
```bash
claude mcp add playwright -- npx @playwright/mcp
```

### 주요 활용 사례
1. **웹사이트 테스트**: 버튼 클릭, 폼 입력 자동화
2. **스크린샷 캡처**: 웹페이지 상태 저장
3. **웹 자동화**: 반복적인 웹 작업 수행

### 특징
- 실제 브라우저를 제어하는 방식
- 자바스크립트 렌더링 페이지도 처리 가능
- 최신 웹 기술 지원

---

## 4. 필수 MCP 2: Context7

### 문제 상황
- Claude가 학습한 데이터는 과거 시점 기준
- 최신 라이브러리/프레임워크 버전의 코드를 모름
- **구버전 코드를 생성하는 문제** 발생

### 해결책: Context7
- **최신 공식 문서를 실시간으로 가져옴**
- Claude가 항상 최신 API/문법 사용 가능
- "use context7" 키워드로 활성화

### 설치
```bash
claude mcp add context7 -- npx @upstash/context7-mcp
```

### 사용 예시
```
"Next.js 최신 버전으로 앱 만들어줘. use context7"
```

### 지원 라이브러리
- React, Next.js, Vue, Angular 등 주요 프레임워크
- 대부분의 인기 라이브러리 공식 문서 지원

---

## 5. 필수 MCP 3: Firecrawl

### 기능
- **웹 크롤링/스크래핑** 도구
- 웹페이지 내용을 마크다운/JSON으로 변환
- 여러 페이지 동시 크롤링 가능

### 설치
1. [firecrawl.dev](https://firecrawl.dev) 접속
2. 회원가입 후 API 키 발급
3. MCP 설치:
```bash
claude mcp add firecrawl -- npx @anthropic/mcp-firecrawl
```
4. API 키 입력

### 무료 크레딧
- 회원가입 시 **무료 크레딧 제공** (약 2000회 크롤링)
- 개인 사용에는 충분한 양

### 주요 활용 사례
1. **경쟁사 분석**: 여러 사이트 정보 수집
2. **데이터 수집**: 웹에서 구조화된 데이터 추출
3. **콘텐츠 분석**: 블로그, 뉴스 등 텍스트 수집

### Playwright vs Firecrawl
| 구분 | Playwright | Firecrawl |
|------|-----------|-----------|
| 용도 | 브라우저 조작/테스트 | 데이터 추출 |
| 출력 | 스크린샷, 페이지 상태 | 마크다운, JSON |
| 속도 | 상대적 느림 | 빠름 |

---

## 6. 필수 MCP 4: Sequential Thinking

### 문제 상황
- Claude가 빠르게 답변하려다 **성급한 결론**을 내림
- 복잡한 문제에서 단계를 건너뛰는 경우 발생
- 충분한 추론 없이 코드 작성

### 해결책: Sequential Thinking
- Claude가 **단계별로 생각하도록 강제**
- 각 단계를 명시적으로 거침
- 더 정확하고 논리적인 결과 도출

### 설치
```bash
claude mcp add sequential-thinking -- npx @anthropic/mcp-sequential-thinking
```

### 작동 방식
1. 문제 분석 단계
2. 해결 방안 도출 단계
3. 구현 단계
4. 검증 단계

### 주요 활용 사례
1. **복잡한 버그 분석**: 원인 추적 시 단계별 접근
2. **아키텍처 설계**: 체계적인 의사결정
3. **데이터 분석**: 논리적 분석 프로세스

### Sequential Thinking의 장점
- **추론 과정이 투명**: 왜 그런 결론인지 이해 가능
- **오류 감소**: 단계별 검증으로 실수 방지
- **복잡한 작업에 강력**: 여러 요소를 고려해야 할 때

---

## 7. 실전 응용: MCP 조합 활용

### 예시: 경쟁사 강의 분석 자동화

#### 요청 내용
```
1. 교육 플랫폼들(인프런, 패스트캠퍼스, 클래스101, 콜로소, 러닝스푼)에서
   클로드 코드 관련 강의를 크롤링해줘
2. 수집할 정보: 강의명, 가격, 리뷰 수, URL
3. 가격 비교표도 만들어줘
4. 최종 출력은 엑셀로
5. Sequential Thinking으로 분석 진행
```

#### 실행 과정
1. **Firecrawl 발동**: 각 플랫폼 크롤링하여 데이터 수집
2. **CSV 파일 생성**: 수집된 데이터 정리
3. **Sequential Thinking 발동**: 데이터 기반 단계별 분석
4. **결과 출력**:
   - 플랫폼별 강의 목록
   - 가격 비교표 (저가~프리미엄)
   - 경쟁사 강점/약점 분석
   - 시장 빈 포지션 분석

### 기타 MCP 조합 아이디어

| 조합 | 용도 |
|------|------|
| Notion + Sequential Thinking | 프로젝트 관리, 문서 정리 |
| Figma + Sequential Thinking | 체계적인 디자인 작업 |
| Firecrawl + Playwright | 동적 웹사이트 크롤링 |
| Context7 + Sequential Thinking | 최신 기술로 복잡한 앱 개발 |

---

## 주요 팁 정리

### MCP 확인 및 관리
- `/mcp` 입력: 현재 연결된 MCP 목록 확인
- `ESC` 키: MCP 리스트 닫기
- MCP는 상황에 맞게 Claude가 자동 선택

### 권장 설치 순서
1. **Context7** - 기본 필수 (최신 문서 접근)
2. **Sequential Thinking** - 복잡한 작업 시
3. **Playwright** - 웹 테스트/자동화 필요 시
4. **Firecrawl** - 데이터 수집 필요 시

### 주의사항
- MCP 설치 후 **반드시 재시작**
- API 키가 필요한 MCP는 사전 발급 필요
- 너무 많은 MCP 연결 시 응답 시간 증가 가능

---

## 마무리

MCP는 Claude Code를 진정한 AI 파워 유저 도구로 만들어주는 핵심 기능입니다. 스마트폰에 앱을 설치하듯, 필요한 MCP를 연결하면 연결할수록 할 수 있는 일이 많아집니다.

오늘 소개한 4가지 MCP부터 시작해서, 자신의 워크플로우에 맞는 MCP를 찾아 활용해보세요.
