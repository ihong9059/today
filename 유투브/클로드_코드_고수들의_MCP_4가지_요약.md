# 클로드 코드 고수들은 이미 쓰고 있는 MCP 4가지 | EP.02

## 영상 정보
- **채널**: Theuxlabs
- **영상 길이**: 25:35
- **URL**: https://www.youtube.com/watch?v=Pbtp17aZ7k4

---

## 핵심 요약

### MCP란?
- **Model Context Protocol**의 약자
- 스마트폰에 앱을 설치하듯, Claude Code에 외부 도구를 연결하는 표준 프로토콜
- MCP를 연결하면 Claude Code가 할 수 있는 일이 크게 확장됨

### 필수 MCP 4가지

| MCP | 주요 기능 | 특징 |
|-----|----------|------|
| **Playwright** | 브라우저 자동화 | 웹페이지 열기, 클릭, 타이핑, 테스트 |
| **Context7** | 최신 공식 문서 제공 | 구버전 코드 생성 방지 |
| **Firecrawl** | 웹 크롤링/스크래핑 | 마크다운/JSON 변환, API키 필요 |
| **Sequential Thinking** | 단계별 추론 강화 | 복잡한 문제 해결력 향상 |

### MCP 설치 방법
1. Claude Code에서 직접 요청: "OOO MCP 설치해줘"
2. 명령어 사용: `claude mcp add [이름] -- npx @패키지명`
3. 설치 후 반드시 재시작 필요 (exit 후 다시 실행)

### 실전 활용 예시
- 여러 MCP 조합하여 **경쟁사 분석** 자동화
- Firecrawl로 데이터 수집 → Sequential Thinking으로 분석 → 엑셀 보고서 생성
- Notion, Figma 등 다른 MCP와 조합하여 프로젝트 관리 가능

---

## 핵심 인사이트

1. **MCP는 Claude Code의 앱스토어**: 필요한 기능을 MCP로 연결하면 무한 확장
2. **최신 문서가 중요한 이유**: AI가 구버전 코드를 생성하는 문제를 Context7로 해결
3. **조합의 힘**: 여러 MCP를 함께 사용하면 복잡한 자동화 워크플로우 구현 가능
4. **수백~수천 개의 MCP 존재**: 자신의 필요에 맞는 것을 찾아 활용하는 것이 핵심
