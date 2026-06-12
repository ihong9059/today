---
title: Galaxy A51 5G (uttec-galaxy) — 보조 모바일 노드
type: entity
created: 2026-06-13
updated: 2026-06-13 (신설 — tabm9-claude 카드 2026-06-10-001 흡수: Tab M9 자매 노드 합류)
tags: [mobile, device, multi-agent, galaxy, termux, tailscale, BLE, nRF-Connect]
links: [tabM9, tailscale네트워크, gaps]
---

# Galaxy A51 5G — 보조 모바일 노드

## 한 줄 정의

**Tab M9의 자매 모바일 노드** (Samsung SM-A516N, 2026-06-09 tabM9 vault 합류). dumb terminal 모델 동일. **BLE 도구 역할 분담**: Tab M9 = USB-OTG flash / Galaxy = **nRF Connect BLE** (PCA10040 트랙 보완).

## 디바이스 사양

| 항목 | 값 |
|---|---|
| 모델 | Samsung SM-A516N (Korea, Galaxy A51 5G) |
| OS | Android 13 (SDK 33, 패치 2024-05-01) |
| HW | arm64-v8a, RAM 5.2GB, /data 98GB 여유 |
| 보안 | 부트로더 locked+green, Knox v30 활성, root 불가 |
| Tailscale | `uttec-galaxy` 100.117.189.71 |
| ssh | `ssh galaxy` (port 8022, u0_a340 = Termux UID 10340) |

## 잔존 핵심 앱 (정리 후 4종)

`com.termux` (sshd 진입점) / `com.tailscale.ipn` (mesh VPN) / `com.pas.webcam` (IP Webcam 카메라 송출) / `no.nordicsemi.android.mcp` (**nRF Connect** BLE 도구). User-installed 12종 삭제 + bloatware 18종 비활성 완료.

## multi-node fleet 패턴

- Tab M9와 같은 aarch64 + Android 13 → 자산 재컴파일 없이 양방향 이식
- 양 노드 IP Webcam → 카메라 송출 트리오 (Tab M9 + Galaxy + Tailscale)

## onboarding gotcha (→ [[gaps]] § 2026-06-13)

- Termux 시리즈 Play Store 2020+ deprecated → **F-Droid 우선** (Termux + Termux:API 동일 signing key 페어)
- Android 12+ 백그라운드 액티비티 시작 제한 → ssh 통한 `am start` 차단 (adb shell / 직접 조작 / 무선 디버깅 우회)

## 관련 페이지

- [[tabM9]] — 자매 노드 (vault 본체)
- [[tailscale네트워크]] — mesh VPN
- [[gaps]] § 2026-06-13 — onboarding 함정 2건
