---
title: Telegram — UTTEC 자동화 알림 채널
type: entity
created: 2026-06-13
updated: 2026-06-13
tags: [도구, telegram, bot, 알림, n8n, polling, 자동화]
links: [n8n-uttec, tailscale네트워크, gaps, uttec-automation]
---

# Telegram — UTTEC 자동화 알림 채널

## 한 줄 정의

**Bot API 기반 무료 알림·명령 채널.** n8nUttec session-6 (2026-06-07)에서 polling 패턴으로 통합 정착 — UTTEC 영업·장비 알림 채널 1순위 후보. (오늘 할일 #12 "Telegram 봇 시나리오 구현 결단"의 기반 자산)

## 핵심 개념 (n8nUttec 학습/06 요약)

| 항목 | 내용 |
|---|---|
| 가입 | 전화번호 only |
| Bot 생성 | BotFather → token 발급 |
| Chat ID 3종 | private(양수) / group(음수) / channel(-100 prefix) |
| 첫 메시지 함정 | **"chat not found"** — Bot이 사용자 chat 미인식. 사용자가 `/start` 또는 메시지 1줄 선행 필수 |
| parse_mode | Markdown/HTML 선택 시 escape 함정 주의 |

## Polling vs Webhook (UTTEC 환경 결정: Polling 표준)

| 방식 | 요구 조건 | UTTEC (Tailscale only) |
|---|---|:-:|
| Webhook (Telegram Trigger) | HTTPS + public 도달 가능 URL | ❌ setWebhook 거절 ([[gaps]] § n8n 함정 #10) |
| **Polling (getUpdates)** | 없음 — outbound만 | ✅ **표준 채택** (Schedule 1분 + staticData + isFirstRun 가드) |

검증 workflow: `n8nUttec/workflows/telegram_to_gmail_polling.json` ★★★★ 가동 (2026-06-07).
패턴 상세: [[2026-06-13_tailscale-only-polling-표준-n8n-cascade]] / 원본 `n8nUttec/학습/09_tailscale-한계-polling표준.md`

## UTTEC 적용 후보

- 영업 알림: 위시캣 신규 프로젝트 cron 결과 통지 (n8n Tier 1 lane)
- 장비 알림: Tailscale 노드 online/offline (`tailscale_online_to_telegram.json` 가동 중)
- 한림용인CC 수조 임계 알림 (shield MQTT → n8n → Telegram 후보)
- Telegram 봇 시나리오 5건 결단 대기 (작업보고서 todo #12, 사용자)

## 관련 페이지

- [[n8n-uttec]] § B — Telegram 통합 흡수 원본
- [[tailscale네트워크]] § webhook 한계
- [[gaps]] § n8n 함정 #10 (webhook publish 거절) / #11 (staticData Active 한정)
