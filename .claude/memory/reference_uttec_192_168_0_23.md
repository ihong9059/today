---
name: uttec@192.168.0.23 = factory-rpi4 LAN IP
description: 192.168.0.23은 factory-rpi4 (Tailscale 100.109.84.79)의 LAN IP. UTTEC Shield AI 공장자동화 교육용 RPi4, uttec-factory vault (13th) 운영지. 정체는 `reference_factory_rpi4_uttec_factory.md` 참조.
type: reference
originSessionId: 79c08776-ba5b-46d3-a9fd-cea60372b44b
---
- **호스트**: 192.168.0.23 (LAN, eth0 DHCP)
- **Tailscale 별칭**: `factory-rpi4` (100.109.84.79) — 동일 호스트
- **계정**: `uttec` / hostname `uttec` (RPi4)
- **OS**: Debian GNU/Linux 13 (trixie), aarch64
- **Claude Code**: `~/.local/bin/claude` (v2.1.132, 2026-05-07 설치 — 추후 갱신 필요 시 v2.1.150 패턴 동일)
- **SSH**: lenovo PC `~/.ssh/id_ed25519.pub` 등록됨 → `ssh uttec@192.168.0.23` 무인 접속

## 정체 (5/26 야간 명확화) ⭐

본 호스트 = **shield B (UTTEC Shield AI 공장자동화 교육용)**:
- hardware: E22-900T30D LoRa + 9 컴포넌트 (OLED + LED 3색 + WS2812 + 부저 + 스피커 + 스위치 + AHT20 + LoRa) + 회로도 V1.0
- vault: `/home/uttec/project/uttec-factory/` (5/26 신설, 13th multi-agent)
- 5계열 자산: 8일 교육 + 강사양성 Day 5 모듈 + 영업 9 문서

세부 정보 + shield A(shield-rpi4 100.110.51.14)와의 분리 박제는 `reference_factory_rpi4_uttec_factory.md` 단일 source 참조.

## 작업 권장

본 호스트 작업 시 **Tailscale 별칭 `factory-rpi4` (100.109.84.79) 사용 권장** — LAN 변경 시에도 안정적, multi-agent 카드 라우팅과도 일치.

LAN 직접 접근 (192.168.0.23) = 같은 네트워크에서만 가능, 빠른 ping (1~2ms) 장점.
