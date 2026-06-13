---
title: Tailscale 장비 네트워크
type: entity
created: 2026-04-19
updated: 2026-06-13 (Tailscale-only 환경 webhook 한계 + Polling 표준 박제 — n8nUttec 6/7 카드 흡수)
tags: [인프라, 네트워크, VPN, 원격, webhook한계, polling]
links: [skills, 사전빌드, 서버인프라, n8n-uttec, telegram]
---

# Tailscale 장비 네트워크

## 한 줄 정의
WireGuard 기반 VPN 메시 네트워크로 10대 장비를 연결. 어디서든 SSH 접근 가능.

## 등록 장비 (10대+)
| 장비 | Tailscale IP | 위치 | 용도 |
|------|-------------|------|------|
| myhome-rpi5 | 100.79.180.64 | 자택 | 서비스 플랫폼 (PM2 8, Python 5, Docker 3) |
| office-rpi4 | 100.72.216.93 | 사무실 | 임베디드 개발 |
| revita-rpi4 | 100.73.114.75 | 사무실 | REVITA 테스트 (Zephyr) |
| home-odroidc2 | 100.89.56.69 | 자택 | 리소스 모니터 |
| DigitalOcean | 100.94.160.121 | 클라우드 | 운영 허브 |
| Jetson Nano (uttec) | 100.108.162.50 | 사무실 | CUDA/AI 추론 |
| lenovo-tab | Android/Termux | 이동 | 모바일 접속 |
| office-dell | Windows | 사무실 | 개발 PC |
| macbookpro | Mac | 이동 | 개발/이동 |
| myhome-lenovo | Windows | 자택 | 메인 개발 PC |

- **계정**: ihong9059@gmail.com
- **공인 IP 폴백**: 자택 121.137.66.41, 사무실 221.163.229.213
- **공통 계정**: uttec/uttec

## Tailscale-only 환경의 구조적 한계 — 외부 webhook 불가 (2026-06-13 박제) ⭐⭐⭐

**외부 시스템(Telegram·Slack·Stripe·GitHub 등)의 webhook은 HTTPS + public 도달 가능 URL을 요구** → Tailscale 사설 IP(100.x) + HTTP 환경에서는 등록 자체가 거절된다 (Telegram setWebhook 거절 실증, n8nUttec 2026-06-07).

**표준 대응 = Polling 직접 구현** (n8n: Schedule + HTTP Request + staticData + isFirstRun 가드):
- 적용 가능: Telegram·Slack·Discord·Gmail·Notion·GitHub (API polling 제공 시스템)
- 불가/부분: Stripe 등 webhook-only 이벤트 → cloudflared tunnel / public 인스턴스 분리 (Phase 4 검토)
- 1인 기업·소규모 팀(공유기·HTTPS 인증서 부담 없음) 공통 패턴 → **UTTEC 컨설팅 deliverable 자산** ★★★★
- 상세: [[2026-06-13_tailscale-only-polling-표준-n8n-cascade]] / 원본 `n8nUttec/학습/09`

부수 패턴: Docker 컨테이너(n8n 등)에서 호스트 CLI(tailscale·git 등) 접근 불가 → **호스트 측 HTTP bridge** (`http://172.17.0.1:<port>/`) 표준 우회 (`n8nUttec/scripts/tailscale_bridge.py`).

## 관련 페이지
- [[서버인프라]]: 전체 인프라 구성
- [[skills]]: SSH, Tailscale 기술
- [[사전빌드]]: 원격 빌드 서버 접근
- [[n8n-uttec]] / [[telegram]]: Polling 표준 적용 사례
