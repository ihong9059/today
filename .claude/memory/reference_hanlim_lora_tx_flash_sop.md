---
name: reference_hanlim_lora_tx_flash_sop
description: 한림용인CC 수조 TX 보드 E22 LoRa 설정+flash SOP + 보드별 E22 응답 편차
metadata: 
  node_type: memory
  type: reference
  originSessionId: ba7dc0dd-4cba-448a-a400-efd3e4d119d7
---

한림용인CC 고가수조 TX 보드(UTTEC BLE Module nRF52832) hardware test SOP (2026-06-13 박제).

**프로젝트**: `C:\todo\today\project\골프_수조_물관리\` (Tier 2 sub-vault, [[한림용인cc-고가수조]] entity). **망 구성은 2026-06-15(월) 작업으로 이월.**

**보드 1대당 flash 순서**:
1. **E22 LoRa 설정** — `lora_test_tx` flash → POWER reset → USB-VCOM에 `write OK. REG0=60 verified` 확인 (자동으로 REG0=0x60(9600)/REG2=0x48(CH72) write)
2. **생산 펌웨어** — `lora_tx_water_level` flash (level 송신, D-day 6/9 검증본)
- flash 호스트 = PCA10056 (J-Link 683795210) SWD. `nrfjprog -f nrf52 --program <hex> --sectorerase --verify --reset`. APPROTECT(`-90`/UNKNOWN)면 `--recover` 선행. flash 후 외부 동작 없으면 POWER reset 우선 ([[feedback_uttec_ble_module_power_reset]]).

**🚨 보드별 E22 응답 편차 (핵심)**:
- 응답 O → setup이 read+write 성공
- 응답 X (`read fail n=0`) → write **skip** → E22 미설정 → 통신 불가. 원인 = M1(J28 Pin8/P0.19)·E22 TXD(J28 Pin3/P0.13) 결선 또는 모듈 불량. 해법: (A) blind-write 펌웨어 / (B) 결선 점검 / (C) EBYTE PC 소프트웨어. firmware/README.md 트러블슈팅에 기존재.

**E22 목표값**: REG0=0x60(9600+0.3k air), REG1=0x00(30dBm max), REG2=0x48(CH72=922.125MHz Korea). 공장 기본값은 REG0=0xE0(115200)/REG2=0x17(CH23). E22 Config 모드 baud는 9600 고정 ([[feedback_e22_900t_config_baud.md]]).

**빌드 (setup/read 펌웨어는 prebuilt hex 없음)**: 🚨 한글 경로면 cmake crash(3221226505=0xC0000409) → ASCII 경로(`C:\ncs\tmp_*`) 복사 후 빌드. NCS v2.9.2 workspace `C:\ncs\v2.9.2`에서 `nrfutil toolchain-manager launch --chdir C:\ncs\v2.9.2 --ncs-version v2.9.2 -- west build -b nrf52dk_nrf52832 -s <ascii앱> -d <ascii앱>\build -p always`. 준비된 hex: `C:\ncs\tmp_lora_test_tx\...\zephyr.hex`, `C:\ncs\tmp_lora_read_reg\...\zephyr.hex`.

**진단 도구**: `lora_read_reg` flash → POWER reset → USB-VCOM에 `REG0/SPED/air/CH` 디코드 출력 ("값 읽어서 보내는" program).

**월요일 carry**: 망 구성(노선1/노선2 TX·중계기·게이트웨이) + 응답 X 보드 설정법 + 노드 ID 구분(고가수조1=ID1/고가수조2=ID2, build-time #define) + RX(`lora_rx_display`) E22도 9600/CH72 확인.
