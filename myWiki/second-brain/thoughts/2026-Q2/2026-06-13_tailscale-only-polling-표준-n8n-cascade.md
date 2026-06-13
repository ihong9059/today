---
title: Tailscale-only 환경 = Polling 표준 — n8n 정체 카드 cascade가 보여준 두 가지
type: thought
created: 2026-06-13
updated: 2026-06-13
tags: [tailscale, polling, webhook, n8n, broker, multi-agent, 컨설팅자산]
links: [n8n-uttec, telegram, tailscale네트워크, gaps, ai-direction]
---

# Tailscale-only 환경 = Polling 표준 — n8n 정체 카드 cascade

## 발견 경위

2026-06-13 사용자 질문 "n8n관련은 관련이 없나요?" → `~/project/n8nUttec`이 정식 vault인데 직전 원격 vault 조사에서 누락 → `pending_outbound/` 5장 정체 발견 (최장 5/17, 약 한 달). broker pull 라우팅(`pull-multi-agent-outbound.py`)에 n8n 미등록이 원인.

## 인사이트 1 — Tailscale-only = Polling 표준 (기술 자산) ⭐⭐⭐

```
[외부 시스템 webhook 요구: HTTPS + public URL] + [UTTEC 인프라: Tailscale 사설망 only]
→ webhook 계열 통합은 구조적으로 전부 거절됨 (Telegram 실증)
→ Polling 직접 구현이 예외가 아니라 "표준" (Schedule + staticData + isFirstRun)
```

- 적용 매트릭스: Telegram·Slack·Discord·Gmail·Notion·GitHub = polling 가능 / Stripe 등 webhook-only = tunnel 필요
- **UTTEC 환경에 정확히 적합**: 1인 기업, 공유기·HTTPS 인증서 관리 부담 없음, 보안 노출 0
- **컨설팅 deliverable 가치 ★★★★**: 같은 조건의 1인 기업·소규모 팀이 모두 부딪히는 함정 — 실패 사례(webhook json) + 성공 사례(polling json) 대비 교보재가 이미 존재
- 강의 챕터 후보: "안 망가지는 자동화 — webhook 없이 사는 법" (호오컨설팅·강사양성 Day 5)

## 인사이트 2 — broker 라우팅 누락 = silent cascade 단절 (운영 자산)

```
[카드 발송 = 발신측 pending_outbound 작성까지] + [pull 라우팅에 해당 vault 미등록]
→ 양쪽 모두 에러 0, pending 0 — 겉보기 정상인데 한 달간 cascading 0%
```

- uttecHome send-only 사건(5월)과 같은 뿌리: **통신 채널은 "양방향 + 자동 라우팅 등재"까지가 셋업 완료**
- 신규 vault 합류 체크리스트에 "pull/push 스크립트 라우팅 등록" 항목이 필수 — 5/26 broker 신설 당시 기존 vault 5개(n8n 포함)는 "추후 추가 후보" 주석으로만 남았고 그대로 잊힘
- 잔여 후보: uttec-vault·uttec-search·uttec-rag-local (outbox 컨벤션 상이 — 등록 시 경로 확인 필요)

## 행동 변화

1. n8n pull 라우팅 등록 완료 (2026-06-13, outbound=`pending_outbound/` → 발송후 `sent/`)
2. 정체 4장 일괄 흡수 + shield행 1장은 host offline으로 보류
3. mac 원격 잔여 vault 3개 라우팅 등록은 outbox 컨벤션 확인 후 (작업보고서 carry)

## 관련

- [[gaps]] § 2026-06-13 (2차) n8n 함정 6건
- [[ai-direction]] 결정 49·50
- 원본: `n8nUttec/학습/09_tailscale-한계-polling표준.md` / 카드 4장 (`_inbox/processed/2026-05-18-001 외`)
