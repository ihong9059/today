---
title: Tailscale 장비 네트워크
type: entity
created: 2026-04-19
updated: 2026-04-19
tags: [인프라, 네트워크, VPN, 원격]
---

# Tailscale 장비 네트워크

## 한 줄 정의
WireGuard 기반 VPN 메시 네트워크로 10대 장비를 연결. 어디서든 SSH 접근 가능.

## 등록 장비 (10대)
| 장비 | Tailscale IP | 위치 |
|------|-------------|------|
| myhome-rpi5 | 100.79.180.64 | 자택 |
| office-rpi4 | 100.73.114.75 | 사무실 |
| Jetson Nano (uttec) | 100.108.162.50 | 사무실 |
| lenovo-tab | Android/Termux | 이동 |
| office-dell | Windows | 사무실 |
| macbookpro | Mac | 이동 |
| myhome-lenovo | Windows | 자택 |
| + 3대 | - | - |

- **계정**: ihong9059@gmail.com
- **공인 IP 폴백**: 자택 121.137.66.41, 사무실 221.163.229.213
- **공통 계정**: uttec/uttec

## 관련 페이지
- [[서버인프라]]: 전체 인프라 구성
- [[skills]]: SSH, Tailscale 기술
- [[사전빌드]]: 원격 빌드 서버 접근
