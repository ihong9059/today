---
name: factory-rpi4 호스트 + uttec-factory vault
description: factory-rpi4 (Tailscale 100.109.84.79 / LAN 192.168.0.23) = UTTEC Shield AI 공장자동화 교육용 호스트, uttec-factory vault (13th) 운영지. shield-rpi4와 다른 hardware.
type: reference
originSessionId: 79c08776-ba5b-46d3-a9fd-cea60372b44b
---
- **별칭**: `factory-rpi4`
- **Tailscale**: 100.109.84.79
- **LAN IP**: 192.168.0.23 (eth0, DHCP)
- **계정**: `uttec` / hostname `uttec` (RPi4)
- **SSH**: 키 등록 완료 (lenovo PC `~/.ssh/id_ed25519.pub`) → `ssh uttec@100.109.84.79` 무인 접속
- **vault**: `/home/uttec/project/uttec-factory/` (5/26 신설, 13th multi-agent vault, 25MB)
  - 6 하위 폴더: 회로도 / 구현 / 교육자료 / 매뉴얼 / 영업 / 작업보고서
  - `.claude/{hooks, skills/{work-start, work-end, vault-start, vault-end}}` (shield 패턴 미러)
  - `_inbox/{pending, processed, outbound}` + `PROTOCOL.md` + `check-inbox.py` SELF_ID="uttec-factory-claude"
- **hardware**: UTTEC Shield AI 공장자동화 교육용 9 컴포넌트 (OLED + LED 3색 + WS2812 + 부저 + 스피커 + 스위치 + AHT20 + LoRa E22-900T30D) + 회로도 V1.0
- **5계열 자산**: 8일 교육 + 강사양성 Day 5 모듈 + 영업 9 문서

## shield A vs B 분리 (자주 혼동, 5/26 박제) ⭐

| 별칭 | Tailscale | LAN | hardware | vault |
|---|---|---|---|---|
| **factory-rpi4** | 100.109.84.79 | 192.168.0.23 | **shield B** (UTTEC Shield AI 공장자동화, E22-900T30D + 9 컴포넌트) | uttec-factory (13th) |
| **shield-rpi4** | 100.110.51.14 | 192.168.0.3 | **shield A** (E32-433 LoRa + RS485/422/MESH) | shield (5/16 합류) |

5/26 오전 "shield-claude SSH 끊김" 진단 = 실제 정상, shield-rpi4 LAN IP만 192.168.0.51 → 192.168.0.3 DHCP 변경. 두 RPi4 hardware 분리 명확화.

## broker 자동화

본 호스트는 5/26 야간 broker 양방향 자동화 첫 진화 대상 — `today/.claude/hooks/{pull,push}-multi-agent-{outbound,pending}.py` 라우팅 활성. 사용자 수동 broker 0건.
