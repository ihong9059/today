---
title: n8nUttec vault — UTTEC n8n 자동화 학습+사업화
type: entity
created: 2026-05-16
updated: 2026-06-13 (정체 카드 4장 일괄 흡수 — 트리거 Top10·노드 Top50 학습 자산 + upload-server 권고 + wishket cascade #003 결착 + Telegram polling 표준 ⭐⭐⭐⭐ / broker pull 라우팅 n8n 등록으로 5/17~6/7 정체 해소)
status: ✅ vault foundation v1.0 + 학습 Phase 진행 중 (session-6, Telegram 통합 정착) / broker 자동 pull 가동 (2026-06-13~)
tags: [vault, n8n, automation, multi-agent, n8n-claude, ubuntu, uttecAutomation, 사업화, telegram, polling]
links: [n8n, ai-direction, ai-fanstick, 영업전략, 회사소개, claude-code, revita, telegram, upload-server, tailscale네트워크]
---

> **2026-05-16 신설**: ssh ubuntu의 Mac→Linux 컨버전 PC 위에서 가동 중인 n8n Docker를 영구 자산화 + 학습·사업화 vault로 분리. **myWikiSetup 시나리오 D 두 번째 적용 사례** (5/15 ondevice 합류에 이은 4번째 Claude vault). 분산 호스트(Windows ↔ Linux)에서도 같은 패턴 작동 검증.

# n8nUttec vault — UTTEC n8n 자동화 vault

## 한 줄 정의

**UTTEC의 n8n 자동화 학습 + 워크플로우 실험 + 영업·사업화 자산을 영구 축적하는 vault.** myWiki·revita·onDevice_AI와 multi-agent 비동기 협업.

## 위치 (Ubuntu 호스트, 분산)

| 항목 | 값 |
|---|---|
| 호스트 | Ubuntu 22.04 (Mac→Linux 컨버전, MBP11,4 i7-4770HQ 16GB) |
| 절대 경로 | `/home/uttec/project/n8nUttec/` (5/27 정정 — 기존 stale path `/uttec/n8nUttec/` 폐기) |
| 접속 | `ssh ubuntu` (Tailscale 100.90.158.36 / LAN 192.168.0.7) |
| Claude 식별자 | `n8n-claude` |
| git repo | (예정) ihong9059/n8nUttec (private) |

## 통합 의미

n8n Docker 컨테이너(`~/n8n/`, 5/15 가동)는 **런타임**. 본 vault는 **source-of-truth + 학습 자산 + 사업화 후보 카탈로그**:

| 출처 | 본질 |
|---|---|
| 5/15 megasession Ubuntu n8n 가동 (Docker 2.20.7-exp.0) | n8n 환경 셋업 완료 |
| 5/15 워크플로우 2 chain (Test_Ubuntu_n8n_동작확인 + 1809 chain) | **런타임 only — 박제 부재** (본 vault `workflows/` 박제 대상) |
| 5/15 함정 3건 (heredoc / npm Docker / App Password) | gaps.md 박제 완료 + 본 vault 측에도 cross-link |
| 5/16 사용자 요청 — 학습·자동화·사업화 통합 vault | **본 vault 신설** |

## vault 폴더 구조 (5/16 신설)

```
/home/uttec/project/n8nUttec/       ← Ubuntu, 별도 git repo `ihong9059/n8nUttec` (private)
├── README.md                       진입점
├── CLAUDE.md                       schema + workflow JSON 박제 정책 + multi-agent
├── log.md                          시간순 (학습+워크플로우+흡수 통합)
├── index.md                        카탈로그
│
├── me/skills/strengths/gaps/goals/ai-direction.md  핵심 6 페이지 stub
│
├── entities/                       n8n.md + uttec-automation.md
├── thoughts/2026-Q2/               2026-05-16_n8nUttec-vault-시작.md (사용자 prompt 박제)
├── workflows/                      n8n JSON export source-of-truth
├── 학습/                            학습 노트 (00_n8n-기초.md 부터)
├── raw/                            원본 (junction 가능)
│
├── _inbox/                         multi-agent 통신
│   ├── pending/, processed/
│   ├── PROTOCOL.md (4 Claude 합의 이력)
│   └── SYSTEM_GUIDE.md (4 Claude 빠른 진입)
│
└── .claude/
    ├── hooks/check-inbox.py (SELF_ID="n8n-claude")
    ├── commands/work-start.md, work-end.md
    └── settings.local.json (SessionStart hook)
```

## n8n 가동 환경 (5/15~)

| 항목 | 값 |
|---|---|
| n8n 버전 | 2.20.7-exp.0 (Docker `n8nio/n8n:latest`, Node v24.14.1 컨테이너 내장) |
| Compose | `/home/uttec/n8n/docker-compose.yml` (4GB memory limit) |
| 데이터 volume | `/home/uttec/n8n/data/` (sqlite DB, credential 암호화) |
| 백업 | `/home/uttec/n8n/backups/` + `~/n8n-backups/dot-n8n_pre-docker_*.tar.gz` (5/15) |
| URL | http://100.90.158.36:5678 (Tailscale) / http://192.168.0.7:5678 (LAN) |
| 사용량 (5/15 측정) | 268 MB / 4 GB |
| 가동 시간 (5/16 현재) | 22+ 시간 (5/15부터 지속) |

## 가동 중 워크플로우 (박제 대기)

| 워크플로우 | 상태 | 박제 |
|---|---|---|
| Test_Ubuntu_n8n_동작확인 | Schedule 12시간 가동 | ⬜ (다음 work-end 시 export 박제) |
| chain 2 — Manual 1809 → Gmail | Manual Trigger | ⬜ |

## 4 Claude 시스템 (5/16~)

```
mywiki-claude (today/myWiki, Windows)         ← 학습·도구·범 사업 허브
├── revita-claude (revitaProject, Windows)    ← REVITA 제품
├── ondevice-claude (/todo/onDevice_AI, Win)  ← AI FanStick + Stage 4
└── n8n-claude (Ubuntu /project/n8nUttec)    ⭐ 본 vault (5/16 신규)
```

n8nUttec ↔ myWiki 흡수 패턴:
- n8n-claude 새 함정 발견 → mywiki 인계 카드 → gaps.md § 자동화 함정 패턴 갱신
- n8n-claude 영업 자동화 매칭 → mywiki 카드 → thoughts/ + 영업전략.md
- n8n-claude 강의 자산 후보 → mywiki 카드 → 호오컨설팅·인프런·강사양성 자료 등재

## 사업 자산화 (UTTEC 자동화 사업 라인 신규)

본 vault는 **UTTEC AI 3대 사업 라인의 4번째 보조 라인** 후보:

| 사업 라인 | 본 vault와의 관계 |
|---|---|
| 1순위 AI 교육 | 본 vault 사례 → 교육 콘텐츠 가공 |
| 2순위 스마트팩토리 | 본 vault 자동화 일부 → smartFactory 운영 자산 |
| 3순위 AI 소형 제품 (Stage 4) | 본 vault Stage 4 영업 자동화 → ondevice-claude 협업 |
| **4순위 자동화 사업 라인 (신규, 5/16~)** | **본 vault 자체가 사업 라인 — 강의·컨설팅 deliverable** |

## 5/16 신설 동기 (사용자 prompt 박제)

원본 사용자 요청:
> "ssh ubuntu에 접속하면 mac hardware에 ubuntu가 설치된 pc가 있고, 그곳에 n8n이 setup되어있읍니다. 그리고 /uttec/n8nUttec folder가 있어요, 그곳에 새로운 work flow들을 만들면서 n8n을 공부하고, 더 나은 자동화 work flow를 생성하여 전체적으로 uttec의 영업및 사업화에 기여할려고 합니다. 그곳에 wiki를 만들어 진행사항을 다른 agent들과 같이 myWiki와 협업할려고 합니다."

→ **3가지 가치 동시 충족**: 학습 + 영업 기여 + 사업화 → 한 vault에서 통합 추적이 일관성·cross-link 단순화에 유리. revita / onDevice 패턴 적용.

## 진행 상태

| Phase | 단계 | 상태 |
|:-:|---|:-:|
| 0 | vault 셋업 + 4 Claude 시스템 확장 | ✅ (5/16) |
| 1 | n8n 기초 학습 + 첫 자동화 사례 | ✅ (학습 00~03 + 06 + 09, session-6 기준) |
| 2 | Expression DSL + Webhook | 🔄 진행 — webhook은 Tailscale 한계로 **Polling 표준 대체** (6/7 결정) |
| 3 | DB 양방향 sync (Notion 마이그레이션) | ⬜ (6월) |
| 4 | AI 노드 + 위시캣 자동 분석 | ⬜ (6월 말~) |
| 5 | 사업화 (강의·컨설팅·custom node) | ⬜ (7월~) |

## 2026-06-13 흡수 — 정체 카드 4장 일괄 (5/18~6/7 발신분, broker pull 누락 해소)

> n8nUttec `pending_outbound/`에 5/17부터 카드 5장 정체 발견 (broker pull 라우팅에 n8n 미등록).
> `pull-multi-agent-outbound.py`에 n8n 등록 (outbound=`_inbox/pending_outbound/`, 발송후=`_inbox/sent/`) → 이후 자동 sync.

### A. 학습 자산 — 트리거 Top 10 + 노드 Top 50 (5/18 카드, 강의·컨설팅 reference ★★★)

- **학습/02 트리거 Top 10**: 109개 trigger 중 선별 (Manual / Schedule / Webhook / Form / Gmail / Telegram / Slack / Execute Workflow / Email IMAP / Error) — 각 노드ID + 핵심 파라미터 + UTTEC 사업 매칭 + 함정. HTML판 (사이드바·검색).
- **학습/03 노드 Top 50**: 817개 중 chain 핵심 50 (7 카테고리), ★★★ 필수 15 심층 (Set·HTTP·IF·Switch·Merge·Code·Gmail·Telegram·Sheets·Notion·OpenAI·Anthropic·Agent·Drive·Postgres). HTML판 (카드 그리드 + 필터).
- **흡수 형태 = 요약 + link** (카드 권고 옵션 2+1 채택): 전체 자료는 n8nUttec vault가 단일 source — GitHub `ihong9059/n8nUttec` (private) / `학습/02·03_*.md|.html`
- 강의 매칭: 호오컨설팅·인프런·강사양성 Day 5 reference + 1인 기업 컨설팅 deliverable

### B. Telegram 통합 + Tailscale-only Polling 표준 (6/7 카드, session-6 ⭐⭐⭐⭐)

- **가동 workflow**: `telegram_to_gmail_polling.json` (Schedule 1분 + getUpdates + staticData + 첫 실행 가드) ★★★★ / `tailscale_online_to_telegram.json` (호스트 HTTP bridge 9876 우회)
- **실패 자산**: `telegram_to_gmail.json` — Telegram Trigger(webhook)는 Tailscale 사설 IP + HTTP 환경에서 publish 거절 (학습 사례로 박제)
- **tailscale_bridge.py 패턴**: n8n Docker 컨테이너에 호스트 CLI 부재 → 호스트 측 HTTP bridge (`http://172.17.0.1:9876/`) = **컨테이너 호스트 격리 한계 우회 표준** (rsync·git·ssh 등 동일 패턴 확장 가능)
- **Polling 표준** ⭐⭐⭐ → 상세는 [[telegram]] / [[tailscale네트워크]] § webhook 한계 / [[gaps]] § n8n 함정 #10·#11 / thought [[2026-06-13_tailscale-only-polling-표준-n8n-cascade]]
- 사업 매칭: 본 표준 = uttec-automation Tier 1 전체 기반 패턴 + "안 망가지는 자동화" 강의 챕터 후보 ★★★★

### C. 위시캣 cron cascade 결착 (6/2 done 카드)

- mywiki #003 (외주 필터 cron 09:00 권고, 5/27 발신) → n8n-claude 6/2 5단계 흡수 완료 = **cascade 3차 사이클 결착** (wishket #002 → mywiki → n8n)
- 구현 일정: n8n 측 Phase 2~3 도입 (학습 06~09 완료 후). 분담 = wishket-claude 정밀 catch-up (비정기) / n8n-claude 매일 09:00 cron
- ID 채번 패턴 검증 계획: 외주 풀 첫 페이지 ID 시계열 1주~1개월 박제 → 가설 확정 시 myWiki 인계

### D. upload-server 9-vault 공통 도구 권고 (5/27 카드) → [[upload-server]] entity 신설

## 관련 페이지

- [[n8n]] — n8n 도구 자체 entity (별도 신설 검토 — 현재 본 entity와 중복 가능)
- [[ai-fanstick]] — Stage 4 영업 자동화 협업 후보
- [[uttec-stage-package]] — Stage 패키지 견적 자동화 후보
- [[위시캣활동]] — 위시캣 알림·지원서 자동화 대상
- [[영업전략]] — n8n으로 자동화할 영업 흐름
- [[호오컨설팅]] / [[강사양성_파일럿]] — 사업화 자산 후보
- [[ai-direction]] § 판단 로그 2026-05-16 — 본 vault 신설 결정
- [[revita]] — vault 분리 패턴 원형
- [[onDevice-ai]] — 시나리오 D 첫 사례 (본 사례의 직전 검증)
- 셋업 패키지: `today/obsidian/myWikiSetup/EXAMPLES_n8nUttec.md` ⭐ 본 vault 셋업 사례

## 메타

| 항목 | 값 |
|---|---|
| vault 시작일 | 2026-05-16 |
| 호스트 | Ubuntu 22.04 (분산, ssh ubuntu) |
| 셋업 패키지 | obsidian/myWikiSetup v1.0 (시나리오 D 두 번째 적용) |
| Claude 식별자 | n8n-claude |
| 초기 commit | 6f17aa3 — 22 files, 1588 insertions (5/16 07:23) |
| 첫 entity | n8n + uttec-automation (vault 측) |
| 첫 thought | 2026-05-16_n8nUttec-vault-시작.md (사용자 prompt 박제) |
