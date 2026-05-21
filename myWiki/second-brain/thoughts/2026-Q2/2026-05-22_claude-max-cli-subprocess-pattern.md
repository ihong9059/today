---
title: Claude Max CLI subprocess 패턴 — backend 인증 단순화
type: thought
created: 2026-05-22
updated: 2026-05-22
tags: [매칭패턴, Claude-Max, CLI, backend, 인증, 패턴, 재사용]
links: [search, onDevice-ai, ai-fanstick, uttec-homepage, n8n-uttec, ai-direction, gaps]
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

## 관련 페이지

- [[search]] — 원천 사례
- [[onDevice-ai]] — 향후 검증 결과 web 노출 시 본 패턴 활용 후보
- [[n8n-uttec]] — workflow 안에서 subprocess 활용 후보
- [[uttec-homepage]] — Phase F-3 이후 인터랙티브 backend
- [[gaps]] § "search vault 셋업 함정" — 함정 박제
- [[ai-direction]] § 판단 로그 2026-05-21 — decision
