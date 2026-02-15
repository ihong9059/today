---
name: claude-news
description: Claude Code 새 기능 및 업데이트 확인. "클로드 새 기능", "Claude Code 업데이트", "새로운 기능 뭐있어" 요청 시 사용
---

# Claude Code 새 기능 알림 Skill

Claude Code의 최신 기능, 업데이트, 실험적 기능을 확인하고 알려줍니다.

## 트리거 키워드

- "클로드 새 기능"
- "Claude Code 업데이트"
- "새로운 기능 뭐있어"
- "클로드 코드 뉴스"
- "최신 기능 알려줘"

## 실행 절차

### 1. 공식 문서 조회

Task 도구를 사용하여 claude-code-guide 에이전트로 최신 정보 조회:

```
Task tool 사용:
- subagent_type: "claude-code-guide"
- prompt: "Claude Code의 최신 기능, 새로운 기능, 실험적 기능, 최근 업데이트 내용을 조사해주세요. 다음 항목을 포함해주세요:
  1. 최근 추가된 새 기능
  2. 실험적(Experimental) 기능 목록
  3. 베타 기능
  4. 주요 업데이트 내역
  각 기능별로 활성화 방법과 사용법도 함께 알려주세요."
```

### 2. 조사 항목

#### 핵심 기능 영역
- **Agent Teams**: 멀티 에이전트 협업
- **Subagents**: 서브 에이전트 기능
- **MCP (Model Context Protocol)**: 외부 서비스 연동
- **Hooks**: 이벤트 기반 자동화
- **Skills**: 커스텀 스킬 시스템
- **Slash Commands**: 사용자 정의 명령어

#### 실험적 기능
- 환경 변수로 활성화되는 기능들
- settings.json에서 설정하는 기능들

#### 최근 업데이트
- 버전별 변경사항
- 새로 추가된 도구들

### 3. 결과 보고 형식

```markdown
## Claude Code 새 기능 및 업데이트

### 🆕 최신 기능

| 기능명 | 설명 | 상태 | 활성화 방법 |
|--------|------|------|------------|
| ... | ... | 정식/베타/실험 | ... |

### 🧪 실험적 기능 (Experimental)

| 기능명 | 설명 | 활성화 방법 |
|--------|------|------------|
| Agent Teams | 멀티 에이전트 협업 | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| ... | ... | ... |

### 🔧 주요 설정 옵션

| 설정 | 위치 | 설명 |
|------|------|------|
| ... | settings.json | ... |

### 📝 사용 예시

[각 기능별 간단한 사용 예시]

### 🔗 참고 링크

- 공식 문서: https://docs.anthropic.com/claude-code
- GitHub: https://github.com/anthropics/claude-code
```

### 4. 추가 정보 제공

사용자가 특정 기능에 관심을 보이면:
- 해당 기능의 상세 사용법 안내
- 활성화 방법 단계별 설명
- 주의사항 및 제한사항 안내

## 정보 소스

1. **claude-code-guide 에이전트**: 공식 문서 기반 정확한 정보
2. **웹 검색**: 최신 업데이트 뉴스 (필요시)
3. **GitHub 릴리스**: 버전별 변경사항

## 업데이트 주기

- 사용자 요청 시 실시간 조회
- 공식 문서 기반으로 최신 정보 제공

## 참고

이 스킬은 claude-code-guide 서브에이전트를 활용하여 공식 문서에서 정확한 정보를 가져옵니다.
웹 검색 결과보다 공식 문서 정보를 우선합니다.
