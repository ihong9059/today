---
name: uttec-search vault 신설 (10th vault, 2026-05-23)
description: search 9th vault 의 cross-platform 첫 fork. Mac/Ubuntu (uttecMac) 에 ~/uttec-search/ 로 설치. uttec-vault 비즈니스 hub 검색용. backend 8891 / frontend 8890.
type: project
---

uttec-search vault 신설 (2026-05-23 야간 4차).

**Why**: search vault 9th (Windows) 의 cross-platform 첫 fork — vault portability 트랙 단기 측정 지표 확보. dogfooding-via-self 모델의 두 번째 케이스 (첫째=myWiki, 둘째=uttec-vault). 외부 회사 적용 prototype 충실도 향상.

**How to apply**:
- 위치: `~/uttec-search/` on uttecMac (Tailscale 100.90.158.36, Ubuntu 22.04, user uttec)
- ssh 별칭: `ssh uttecMac` (또는 `ssh ubuntu` / `ssh mac` — 동일 호스트)
- 포트: backend `8891` / frontend dev `8890` (search 측 8889/8888 과 충돌 회피)
- 인덱싱 대상: `raw/uttec-vault` symlink (= `~/uttec-vault`), SEARCH_DIRS = 7 비즈니스 영역 (Customer/Finance/Marketing/Operations/Product/Sales/Supply) + entities/thoughts
- 메모리: `~/.claude/projects/-home-uttec-uttec-search/memory` → `~/.claude/projects/-home-uttec-uttec-vault/memory` (D3=A, uttec-vault 와 공유)
- venv 도구: **uv 0.11.16** (python3-venv 미설치 + sudo NOPASSWD 없는 환경 우회)
- backend 기동: `cd backend && source .venv/bin/activate && uvicorn app.main:app --reload --port 8891`
- frontend 기동: `cd frontend && npm run dev` (외부 접속 시 `-- --host 0.0.0.0`)
- Claude agent: `uttec-search-claude` (10th 또는 11th, uttec-vault-claude 합류 정합 후 확정)

**검증된 동작 (2026-05-23 야간 4차)**:
- `/api/status` OK: auth_mode=claude-cli-oauth, model=sonnet
- 첫 query 200 OK, model `claude-sonnet-4-6` (G 패치 fix 정상), cost $0.052
- 응답 정확도: uttec-vault 7 영역 + 3 vault 역할 + D'9 운영 사상 모두 추출

**관련 entity**:
- myWiki/second-brain/entities/uttec-search.md
- myWiki/second-brain/entities/vault-portability.md (cross-platform 첫 실증)
- ai-direction.md 판단 로그 (야간 4차)
- log.md (야간 4차)

**미완 작업**:
- skills/SKILL.md (work-start/end/vault-start/end) 4개 PowerShell → bash 변환
- _inbox/PROTOCOL.md 9 → 10 vault 정합화 (mywiki-claude cascade)
- uttec-vault inbox 측 broker 카드 발송 (sibling 합류 통보)
- frontend npm run dev 실행 + 브라우저 동작 확인 (사용자 직접)
