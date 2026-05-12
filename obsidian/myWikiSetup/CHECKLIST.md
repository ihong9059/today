# 셋업 검증 체크리스트 — 30개 항목

> 본 패키지로 셋업 후 정상 작동 여부를 30개 항목으로 자가 검증.

## Phase 1 — 단일 위키 본체

### 1.1 디렉토리 구조
- [ ] `{{WIKI_PATH}}/` 존재
- [ ] `{{WIKI_PATH}}/entities/` 존재
- [ ] `{{WIKI_PATH}}/thoughts/{{CURRENT_QUARTER}}/` 존재
- [ ] `{{WIKI_PATH}}/raw/` 존재 (junction 또는 빈 폴더)

### 1.2 핵심 파일
- [ ] `CLAUDE.md` 존재 + 모든 `{{변수}}` 치환 완료 (남은 `{{` 0개)
- [ ] `log.md` 존재 + frontmatter 있음 + 첫 setup 항목 포함
- [ ] `index.md` 존재 + 핵심 페이지 6개 등재 (me, skills, strengths, gaps, goals, ai-direction)
- [ ] `thoughts/README.md` 존재 + 분기 정책 설명

### 1.3 핵심 페이지
- [ ] `me.md` 존재 + 본인·운영자 정체성 작성
- [ ] `skills.md` 존재 + 최소 5개 스킬 등재
- [ ] `strengths.md` / `gaps.md` / `goals.md` / `ai-direction.md` 각각 frontmatter + 본문
- [ ] `entities/{{COMPANY_NAME}}.md` 첫 entity 작성

## Phase 2 — Multi-Agent _inbox (선택, 권장)

### 2.1 디렉토리 + 파일
- [ ] `_inbox/pending/` 존재 (빈 폴더)
- [ ] `_inbox/processed/` 존재 (빈 폴더)
- [ ] `_inbox/PROTOCOL.md` 존재 + `{{변수}}` 치환 완료
- [ ] `_inbox/SYSTEM_GUIDE.md` 존재 + `{{변수}}` 치환 완료

### 2.2 상대 프로젝트 측 (양쪽 동일)
- [ ] `{{PEER_PATH}}/_inbox/pending/` + `processed/` 존재
- [ ] `{{PEER_PATH}}/_inbox/PROTOCOL.md` 본 위키와 표준 부분 동일

## Phase 3 — SessionStart Hook

### 3.1 Hook 스크립트
- [ ] `.claude/hooks/check-inbox.py` 존재
- [ ] hook 안 `SELF_ID = "{{SELF_CLAUDE_ID}}"` 변경 완료 (template 그대로 X)
- [ ] hook 실행 권한 OK (Linux/Mac: `chmod +x`)

### 3.2 settings.local.json
- [ ] `.claude/settings.local.json` 의 `hooks.SessionStart` 에 `check-inbox.py` 등록됨
- [ ] 기존 설정(mcp 등) 보존됨 (덮어쓰지 않음)

### 3.3 Hook 동작 검증
- [ ] `python3 .claude/hooks/check-inbox.py` 수동 실행 → 빈 출력 (정상, pending 0개)
- [ ] 시험용 카드 1개 작성 후 다시 실행 → JSON 출력 (📬 알림)

## Phase 4 — work-start / work-end 스킬 통합 (선택)

- [ ] work-start SKILL.md § 1-C 추가됨
- [ ] work-end SKILL.md § 5-E, 5-F, 5-G 추가됨
- [ ] 다음 `/work-start` 실행 시 `_inbox/pending/` 점검 단계 작동

## Phase 5 — 첫 사이클 검증

### 5.1 컨텐츠
- [ ] `entities/` 에 최소 1개 entity 작성 + frontmatter + 내부 링크 1개 이상
- [ ] `log.md` 에 첫 항목 (setup 또는 첫 작업 박제)

### 5.2 Phase 2 진행했다면 — 첫 카드 시험
- [ ] 시험 카드 발송 (`{{PEER_PATH}}/_inbox/pending/`)
- [ ] 상대 Claude가 카드 인지 (SessionStart hook 작동 확인)
- [ ] 상대 Claude의 응답 카드가 본 위키 `_inbox/pending/`에 도착

## Phase 6 — 운영 안정성 (셋업 후 1주 이내)

- [ ] 매 세션 시작 시 SessionStart hook 정상 (보고 또는 침묵 둘 다 OK)
- [ ] thought 1개 이상 작성됨 (인사이트 박제 작동 확인)
- [ ] 처리한 카드가 `processed/`로 정확히 이동
- [ ] `log.md` 갱신 흐름 자연스러움

## 흔한 실수 자가 점검

| 실수 | 어떻게 확인 |
|---|---|
| settings.local.json 덮어씀 | 기존 mcp 설정 살아있는지 확인 |
| hook의 SELF_ID 미변경 | `grep SELF_ID .claude/hooks/check-inbox.py` 결과가 template 기본값이면 ❌ |
| PROTOCOL.md 양쪽 다름 | diff 비교 → 합의 이력 § 외 모두 동일해야 OK |
| `_inbox/pending/` 미생성 | hook 실행 시 침묵 (정상으로 보이지만 실제로는 폴더 없음) |
| 처리 카드 processed/ 안 이동 | 다음 세션마다 같은 카드 알림 반복 |
| 카드 frontmatter `to:` 잘못 | hook가 무시 (`to:`가 SELF_ID와 불일치) |

## 통과 기준

| 단계 | 통과 기준 |
|---|---|
| Phase 1 통과 | 1.1~1.3 항목 모두 ✅ |
| Phase 2 통과 (선택) | 2.1~2.2 모두 ✅ |
| Phase 3 통과 | 3.1~3.3 모두 ✅ |
| 시스템 작동 | Phase 1+3 통과 = 단일 위키 OK / Phase 1+2+3 = multi-agent OK |
| 통합 완성 | Phase 4 추가 = 시스템 영구화 |
| 검증 완료 | Phase 5 + 6 통과 = 안정 운영 단계 진입 |

## 점검 결과 박제

CHECKLIST 통과 후 `log.md`에 한 줄 박제 권장:

```
## [{{TODAY}}] verify | myWiki 시스템 셋업 검증 완료 — CHECKLIST 30/30

- Phase 1~3 통과 + Phase 4 통합 + Phase 5 첫 사이클 검증
- 다음: 일상 운영 시작
```
