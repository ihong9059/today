---
title: Claude Max CLI subprocess 패턴 — backend 인증 단순화 (+ WebSocket + --resume 세션 모델 후속)
type: thought
created: 2026-05-22
updated: 2026-05-22 (Phase 2 후속 — WebSocket + --resume + 70/80% 자동 핸드오프 세션 모델 추가, multi-turn backend 일반화)
tags: [매칭패턴, Claude-Max, CLI, backend, 인증, 패턴, 재사용, WebSocket, --resume, 세션모델, 핸드오프, multi-turn]
links: [search, onDevice-ai, ai-fanstick, uttec-homepage, n8n-uttec, ai-direction, gaps, 위시캣활동, 강사양성_파일럿]
---

# Claude Max CLI subprocess 패턴 — backend 인증 단순화

> 사건: 2026-05-21 search vault Phase 1 MVP 구현 중 Anthropic SDK + API 키 방식 → `claude --print` subprocess (Max OAuth) 방식으로 전환.

## 발견 경위

1. 초기: backend FastAPI 에 `anthropic` SDK 사용 → `sk-ant-api03-...` 키 필요
2. 사용자 지적: "Claude Max 사용 중인데 별도 API 키 발급 부담"
3. 전환: `subprocess.run(["claude", "--print", ...])` 패턴
4. 검증: HTTP 200, 26초, sonnet-4-6, $0.015 (Max 구독 커버)

## 패턴 정의

```python
import subprocess
import json
import shutil

cmd = [
    shutil.which("claude"),
    "--print",
    "--tools", "",                          # 빌트인 툴 비활성 (검색 backend 는 도구 불요)
    "--disable-slash-commands",             # 사용자 슬래시 명령 차단
    "--no-session-persistence",             # 세션 저장 안 함 (디스크 노이즈 0)
    "--strict-mcp-config",                  # 사용자 MCP 서버 (Calendar 등) 차단
    "--setting-sources", "project",         # global CLAUDE.md / memory 차단
    "--output-format", "json",              # token / cost / session_id 파싱
    "--model", "sonnet",                    # alias: opus | sonnet | haiku
    "--system-prompt", SYSTEM_PROMPT,       # 기본 시스템 프롬프트 대체
]

result = subprocess.run(cmd, input=user_msg, capture_output=True, text=True, encoding="utf-8", timeout=180)
data = json.loads(result.stdout)
answer = data["result"]
tokens = data["usage"]
cost = data["total_cost_usd"]  # Max 구독자에게는 정보값 (실제 billing 0)
```

## 장점 (vs Anthropic SDK + API 키)

| 항목 | API 키 방식 | CLI subprocess 방식 |
|---|---|---|
| 인증 | `sk-ant-api03-...` 별도 발급 | Max OAuth 그대로 활용 |
| 비용 | pay-per-token | Max 구독 (정액) |
| 키 관리 | `.env` 파일 + 시크릿 차단 + UI 입력 모달 등 부담 | 없음 (CLI 가 자체 관리) |
| 응답 형식 | SDK 객체 | JSON (직접 파싱) |
| prompt cache | 코드로 명시 관리 | CLI 가 자동 (system_prompt 동일 시 자동 hit) |
| MCP / hooks 차단 | 해당 없음 (SDK 직접) | 플래그 명시 필요 (`--strict-mcp-config` 등) |
| 의존성 | `anthropic` pip package | `claude` CLI npm install |

## 함정 (fabricate 사고 박제)

`--strict-mcp-config` 누락 시 사용자 ~/.claude.json 의 MCP 서버 (Google Calendar 등) 가 자동 로드. 모델이 위키에 답 없는 질의 ("오늘 할일") 에 **Calendar 인증 안내 fabricate** (실제 사고 2026-05-21 발생, [[search]] § Phase 1 fabricate 차단 항목 참조).

차단 3축 (모두 필수):
1. `--strict-mcp-config` (no `--mcp-config`) — MCP 서버 0개
2. `--setting-sources project` — user level CLAUDE.md/skills 차단
3. system prompt 에 "외부 도구·인증 언급 금지" 명시

## 재사용 가능 vault (다른 backend 도 동일 패턴 적용 가능)

| vault / backend | 적용 가능성 | 비고 |
|---|---|---|
| **search/backend** (Phase 1 ✅) | 적용 완료 | 본 패턴의 원천 사례 |
| **n8n-uttec** (Function 노드 또는 외부 worker) | ✅ 적용 가능 | n8n workflow 안에서 자동화 prompt 발사 |
| **uttecHome backend** (Phase F-3 이후) | ✅ 적용 가능 | 회사 홈페이지의 인터랙티브 검색·챗봇 backend |
| **위시캣 자동 매칭** (wishket-claude 후속) | ✅ 적용 가능 | n8n 자동검색 → CLI subprocess 로 매칭 분석 |
| **REVITA web** (배포 전, 미래) | ✅ 적용 가능 | REVITA 제품 데모 backend |
| **강사양성 LMS** (미래) | ✅ 적용 가능 | 수강생 Q&A backend |

→ **UTTEC 내부 backend 표준 패턴 1순위** 후보. Claude API 키 발급·관리 부담 0 + Max 구독으로 정액 비용 + 사용자 환경과 동일 인증.

## 영업·강의 자산화 가치

### 위시캣 영업 (사업 트랙)

클라이언트 프로젝트에 "AI 챗봇 / 검색 / 자동화 backend" 요청 시 본 패턴 제안:
- 비용: 클라이언트 Claude Max 구독 ($20/월) 또는 UTTEC 대행
- 인프라: 별도 API 키·시크릿 관리 없이 단순화
- UTTEC 자산: 본 패턴 검증된 search backend 코드 (FastAPI + 한국어 system prompt + fabricate 차단)

### 강사양성 파일럿 (교육 트랙)

obsidian 강의 시리즈 Day 6~7 "Claude API backend 패턴" 모듈:
- 비교: 직접 Anthropic SDK + 키 / CLI subprocess + OAuth
- 실습: 본 search vault 코드 미러
- 메시지: "사용자가 이미 가진 인프라 활용 — 추가 발급 부담 0"

### uttecHome (영업 트랙)

회사 홈페이지 `entities/tech/ai.md` 에 "Claude Max CLI subprocess 패턴 검증" 박제 — UTTEC 차별화.

## 박제 위치

- [[search]] § "Phase 1" — 본 패턴의 원천 적용 사례
- [[gaps]] § "search vault 셋업 함정 (B)(C)" — fabricate 차단 + key vs OAuth
- [[ai-direction]] 판단 로그 2026-05-21 — "Anthropic SDK API key 폐기 → CLI subprocess 패턴"
- 본 thought — 일반화 + 재사용 가능 vault 매핑

---

## Phase 2 후속 (2026-05-22 야간) — WebSocket + `--resume` 세션 모델 ⭐⭐

> search vault Phase 2 (5/22, 셋업·완성 같은 날). single-query API 의 follow-up 불가 문제 (사용자가 "1, 2, 3, 4 중 어떤 것?" 답변 불가능) 해결 → multi-turn backend 일반화 패턴.

### 1. 핵심 결정 5건 (D1~D5)

| # | 결정 | 내용 |
|:-:|---|---|
| D1 | 통신 | **WebSocket** (`/ws/chat`) — HTTP 폴링 대비 latency 우위 + push 지원 |
| D2 | 저장 | 메모리 dict (lifespan-scoped) — Redis 등 외부 의존 0, 단일 instance 검증 단계 적합 |
| D3 | Claude 연속 | CLI **`--resume <session_id>`** 활용 — Claude session 안에 history·system_prompt 자동 박제 (input_tokens 거의 0, cache 100% 활용 = 매우 저렴) |
| D4 | 측정 | `last_input` + `last_cache_read` + `last_cache_creation` 추적 → 70/80% 임계값 판정 정확도 확보 |
| D5 | 핸드오프 | 70% 도달 → 커스텀 요약 → 80% 도달 → 새 session preamble 로 자동 전환 → multi-day 대화 가능 |

### 2. 핵심 함정 — `--resume` + 긴 `--system-prompt` fork

```python
# ❌ 잘못 — 긴 prompt + resume → CLI fork → 새 session_id → history 끊김
subprocess.run([
    "claude", "--print",
    "--resume", session_id,
    "--system-prompt", LONG_PROMPT_1334_chars,  # ← 함정
    ...
])

# ✅ 올바름 — 첫 호출에만 system_prompt 전달, 후속은 생략
if claude_session_id is None:
    # First call
    cmd = ["claude", "--print", "--system-prompt", LONG_PROMPT, "--output-format", "json", ...]
    result = subprocess.run(cmd, input=user_msg, ...)
    data = json.loads(result.stdout)
    session_id = data["session_id"]   # 박제
else:
    # Follow-up call — Claude session 안에 system_prompt 자동 적용
    cmd = ["claude", "--print", "--resume", claude_session_id, "--output-format", "json", ...]
    result = subprocess.run(cmd, input=user_msg, ...)
```

→ 자세한 함정 박제: [[gaps]] § "Claude CLI `--resume` + 긴 `--system-prompt` fork 함정".

### 3. 핸드오프 자동화 (70/80% 임계값)

```
대화 진행 → last_input + last_cache_read + last_cache_creation 누적
        ↓
70% 도달 → 커스텀 요약 prompt 발사 ("이 대화의 핵심을 N자 안에 정리해")
        ↓
80% 도달 → 새 Claude session 시작 + 요약 preamble + 새 user 질의
        ↓
audit 박제: 작업보고서/handoffs/<YYYY-MM-DD>_<sid_prefix>.md
        ↓
대화 continuity 유지 (사용자 시야에서는 한 대화)
```

### 4. 구성 요소 정리 (재사용 vault 진입 시 모듈)

- **WebSocket endpoint** (FastAPI Starlette)
- **SessionRegistry** (in-memory dict, `asyncio.Lock`)
- **ConversationSession dataclass** (`claude_session_id`, `history`, `last_input`, `last_cache_read`, `last_cache_creation`, `status`)
- **70/80% 임계값 + 자동 핸드오프** (요약 → 새 session preamble)
- **Frontend WS hook + conversation view + token gauge + handoff toast**
- **자동 재연결** (exponential backoff)

### 5. 재사용 vault 6 후보 (multi-turn Claude backend 모두)

| vault | 적용 시나리오 |
|---|---|
| **uttecHome** | UTTEC 사이트 챗봇 — 회사 소개·제품 질문 multi-turn |
| **lemonLabs** | 4 트랙 도구 (Bridge·Mentor·Daily·Strategy) 각각 챗봇 |
| **revitaProject** | 제품 사용 가이드 챗봇 |
| **n8nUttec** | n8n 워크플로우 trigger 후 Claude 와 대화형 점검 |
| **wishketProject** | 자동매칭 결과 + 사용자 추가 질의 대화 |
| **강사양성 LMS** | 학생-튜터 대화 (Day 5~7 모듈) |

### 6. 영업·강의 자산화 가치 (Phase 2 후속)

#### 위시캣 영업 (사업 트랙)

기존 patterns (#5/#6/#7) 위에 multi-turn 추가:
- "AI 챗봇 multi-turn 대화 + 자동 핸드오프 + audit" 차별화 제안
- backend infra: WebSocket + 메모리 dict (Redis 불요) + Claude Max OAuth 단순화
- UTTEC 자산: 본 search Phase 2 코드 미러 (모듈 6개 재사용)

#### 강사양성 (교육 트랙)

obsidian 강의 시리즈 Day 6~7 "Claude backend 패턴" 모듈 확장:
- Day 6 (기존): 직접 SDK + API 키 vs CLI subprocess + OAuth (Phase 1 패턴)
- **Day 7 (신규)**: single-query → multi-turn WebSocket 세션 모델 (Phase 2 패턴)
- 실습: 본 search vault Phase 0~2 코드 미러
- 메시지: "사용자가 이미 가진 Max 구독 활용 + multi-turn 자동 핸드오프 + 외부 의존 0"

#### uttecHome (영업 트랙)

회사 홈페이지 `entities/tech/ai.md` 에 "Claude Max + WebSocket 세션 model 검증" 박제 — UTTEC 차별화. uttecHome backend 도입 시 본 패턴 1순위 적용.

### 7. 박제 위치 (Phase 2 후속)

- [[search]] § "Phase 2 ⭐ 세부" — 본 패턴의 원천 적용 사례
- [[gaps]] § "Claude CLI `--resume` + 긴 `--system-prompt` fork 함정" — 동반 함정 박제
- [[ai-direction]] 판단 로그 2026-05-22 야간 — "Claude Max CLI 세션 모델 표준 채택"
- 본 thought § Phase 2 후속 — 일반화 + 재사용 vault 6 매핑

### 8. cascade 미래 (재사용 vault 진입 시)

각 vault 가 multi-turn backend 도입하는 순간 본 thought 가 자동 참조됨. 본 thought 가 update 되면 (예: Phase 4 검색 정확도 / Phase 5 배포 검증 시 추가 패턴) cascade 점검 의무.

## 관련 페이지

- [[search]] — 원천 사례
- [[onDevice-ai]] — 향후 검증 결과 web 노출 시 본 패턴 활용 후보
- [[n8n-uttec]] — workflow 안에서 subprocess 활용 후보
- [[uttec-homepage]] — Phase F-3 이후 인터랙티브 backend
- [[gaps]] § "search vault 셋업 함정" — 함정 박제
- [[ai-direction]] § 판단 로그 2026-05-21 — decision
