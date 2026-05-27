---
name: uttec@192.168.1.20 RPi3 (UTTEC Shield hardware 이전됨)
description: 5/26 신규 셋업한 RPi3 LAN 서버. UTTEC Shield 첫 동작 검증 후 hardware는 factory-rpi4로 이전됨. 본 RPi3는 호스트로만 잔존.
type: reference
originSessionId: 79c08776-ba5b-46d3-a9fd-cea60372b44b
---
- **호스트**: 192.168.1.20 (LAN, RPi3, hostname `uttec`)
- **계정**: `uttec` / 비밀번호 `uttec`
- **OS**: Debian GNU/Linux 13 (trixie) ARM64, kernel 6.12.75+rpt-rpi-v8 (라즈베리파이 OS)
- **호스트명 충돌**: `uttec` 호스트명을 192.168.0.23 (factory-rpi4) + 100.109.84.79 + 본 RPi3 셋이 공유 — **작업 시 IP로 구분 필수**
- **SSH**: lenovo PC `~/.ssh/id_ed25519.pub` 등록됨 → `ssh uttec@192.168.1.20` 무인 접속
- **Claude Code**: `~/.local/bin/claude` (v2.1.150, 2026-05-26 설치). `~/.bashrc`에 PATH 추가
- **설치 방법**: `curl -fsSL https://claude.ai/install.sh | bash` (네이티브, Node 불필요)
- **Tailscale**: 미참여
- **sudo**: password 필요 (NOPASSWD 미설정)

## hardware 이전 (5/26 야간) ⭐

5/26 오전 본 RPi3에서 UTTEC Shield 부분 동작 검증 (OLED + LED 3색 + WS2812 4개) 진행 — 그러나 외출 중 hardware가 **factory-rpi4 (100.109.84.79 / 192.168.0.23)로 이전됨**. 본 RPi3는 현재 hardware 없는 일반 호스트 상태.

UTTEC Shield 잔여 컴포넌트 검증 + 운영은 **factory-rpi4**에서 진행 (`reference_factory_rpi4_uttec_factory.md` 참조).

본 RPi3는 추후 다른 hardware 셋업 또는 백업 호스트 용도.

## 5/26 오전 검증 자산 (참고)

- I2C 활성화 (`dtparam=i2c_arm=on` raspi-config)
- audio dtparam off (WS2812 PWM0 충돌 해결, `feedback_rpi_ws2812_pwm0_audio_conflict.md`)
- `~/{oled_test.py, oled_detect.py, led_test.py, ws2812_test.py}` (회로도 기반 신규 작성)
- `~/ws281x-env/` (venv + rpi-ws281x 5.0.0)
- I2C 4 디바이스 detect: 0x3C OLED / 0x38 AHT20 / 0x68 + 0x77 미상

이 자산은 본 PC `aiHardStudy/중소기업교육/ai공장자동화/shield_test/`에 단일 source 박제됨.
