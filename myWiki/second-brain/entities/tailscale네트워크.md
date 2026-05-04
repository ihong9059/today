---
title: Tailscale 장비 네트워크
type: entity
created: 2026-04-19
updated: 2026-04-22
tags: [인프라, 네트워크, VPN, 원격]
links: [skills, 사전빌드, 서버인프라]
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

## 관련 페이지
- [[서버인프라]]: 전체 인프라 구성
- [[skills]]: SSH, Tailscale 기술
- [[사전빌드]]: 원격 빌드 서버 접근
