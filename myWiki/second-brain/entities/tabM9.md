---
title: tabM9 — Lenovo Tab M9 모바일 컴퓨팅 노드 vault (17th)
type: entity
created: 2026-06-13
updated: 2026-06-13 (신설 — tabm9-claude 카드 3장 흡수: 2026-06-08-001 entity 요청 + 06-09-001 Defender CFA gotcha + 06-10-001 Galaxy A51 합류)
tags: [mobile, device, vault, multi-agent, tabM9, termux, tailscale, dumb-terminal]
links: [galaxy-a51-5g, weldRobot, tailscale네트워크, gaps, ai-direction]
---

# tabM9 — 모바일 컴퓨팅 노드 vault

## 한 줄 정의

**모바일 컴퓨팅 노드 vault** (`C:/todo/tabM9/`, tabm9-claude, 2026-06-06 합류) — **dumb terminal 모델**: Tab M9 자체는 연산 없이 본 PC 메인 호스트에 어디서나 ssh 진입하는 단말. Termux **네이티브** (PRoot Debian 폐기) + Tailscale Android 앱 mesh VPN + status web.

## 디바이스·접속

| 항목 | 값 |
|---|---|
| 디바이스 | Lenovo Tab M9 (aarch64, Termux 네이티브) |
| Tailscale | `lenovo-tab-m9` 100.112.196.52 |
| ssh | `ssh tab-m9` (port 8022, u0_a192) / LAN `tab-m9-lan` |
| vault | `C:/todo/tabM9/` (git, 2026-06-08 첫 박제 사이클 root-commit 5d1896c) |

## vault 구조 (tabM9 측 entities 4종 — 2026-06-08 첫 박제 사이클)

- `[[tabm9:tab-m9]]` — 디바이스 자체 (dumb terminal 모델 명문화)
- `[[tabm9:termux]]` — PRoot Debian 폐기 + 네이티브 채택 사유
- `[[tabm9:tailscale]]` — Android 앱 주력 mesh VPN 운영 패턴
- `[[tabm9:sd-card]]` — microSD 확장 스토리지 (scoped storage 제약)
- 결정 carry: `[[tabm9:decision-001-vault-신설]]` (2026-06-08)

vault 구조 모범: [[weldRobot]] (carrier 패턴 2번째 사례).

## 자매 노드 — Galaxy A51 5G (2026-06-09 합류)

[[galaxy-a51-5g]] 가 자매 모바일 노드로 합류. **역할 분담**: Tab M9 = USB-OTG flash 트랙 / Galaxy = nRF Connect BLE 도구. 같은 aarch64 + Android 13 → 자산(libusb shim·스크립트) 재컴파일 없이 양방향 이식. 양 노드 IP Webcam 잔존 → 카메라 송출 트리오 (Tab M9 + Galaxy + Tailscale).

## vault scope 격리

tabM9 안 자산 자동 동기화 금지 — outbox-staging 카드 발송으로만 통보 (본 entity 신설도 카드 2026-06-08-001 요청 기반).

## 주요 gotcha 출처 (gaps.md 박제)

- **Windows Defender CFA = NCS 빌드 silent killer** ⭐⭐⭐ — [[gaps]] § 2026-06-13 (tabM9 카드 06-09-001, PCA10040 e2e flash 중 발견)
- Termux Play Store 2020+ deprecated → F-Droid 우선 / Android 12+ 백그라운드 액티비티 제한 — [[gaps]] § 2026-06-13 (카드 06-10-001)

## 관련 페이지

- [[galaxy-a51-5g]] — 자매 모바일 노드
- [[tailscale네트워크]] — mesh VPN 운영
- [[weldRobot]] — vault 구조 모범 (carrier 2번째)
- [[gaps]] § 2026-06-13 — CFA·Termux·Android 함정
