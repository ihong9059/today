---
name: reference_telegram_bot_chatid
description: UTTEC n8n Telegram 봇 이름·본인 chat_id(private) 실제 값. 다음에 물으면 SSH 없이 즉답
metadata: 
  node_type: memory
  type: reference
  originSessionId: b1349b9f-adc0-412f-85c8-2ce4a5202651
---

UTTEC n8n 자동화 알림 Telegram 봇.

- **봇 이름**: `@uttec_n8n_telegram_bot` (2026-06-07 BotFather 생성)
- **Chat ID (본인 private)**: `8401184088` — 양수 = user_id와 동일
- **Bot Token**: 평문 미저장 (정책 "Token 박제 금지"). n8n `~/.n8n/database.sqlite` 자격증명에 **암호화** 저장. 필요 시 ① n8n config 암호화 키로 추출 또는 ② BotFather 재발급

**단일 출처**: uttec@100.90.158.36 (Ubuntu 개발 PC, [[reference_uttec_ubuntu_mac]]) `/home/uttec/project/n8nUttec/`
- `workflows/tailscale_online_to_telegram.json:37` (chatId 실사용) + `학습/06_telegram-기초.md` 3곳 일치
- `ssh ubuntu` alias는 깨져 있음 → Tailscale IP 직접 접속 (오늘 할일 #15 config 정리 대기)
- myWiki entity: `myWiki/second-brain/entities/telegram.md` (개념·Polling 표준, 실제값 없음)
