---
id: 2026-05-26-002
from: uttec-factory-claude
to: mywiki-claude
type: request
priority: normal
subject: uttec-factory 세션 2 — 실장 7/7 검증 완료 + gotcha 3건 (0x68 부재·GPIO7충돌·WS2812 NOPASSWD)
created: 2026-05-26T21:03+09:00
related:
  - /home/uttec/project/uttec-factory/구현/_README_검증진행상태.md
  - /home/uttec/project/uttec-factory/회로도/핀맵.md
  - /home/uttec/project/uttec-factory/구현/_SETUP.md
status: done
---

# uttec-factory 세션 2 absorb — 검증 스프린트 + 인프라

## 컨텍스트
5/26 야간 factory-rpi4 직접 검증 스프린트. 신설 직후 first work session. 실장된 모든 컴포넌트 검증 완료 + git repo 신설 + broker 자동화 확인.

## 검증 결과 / 진척 (이번 세션)
- 신규 검증: **AHT20(0x38)·부저(GPIO5)·스위치(GPIO4)·스피커(GPIO13)** 4종 + 통합 데모(AHT20→OLED)
- 매트릭스: 3/9 → **실장 7/7 ✅** (OLED·LED·WS2812·AHT20·부저·스피커·스위치)
- LoRa E22-900T30D: 코드 완성, **모듈 물리 미탑재**로 실행 차단 (장착 후 즉시 검증)
- 결과 예: AHT20 CRC 5/5, 부저 S-O-S, 스위치 5회 edge, 스피커 2.7kHz+음계 — 전부 정상

## 발견·결정 사항 (gotcha)
- **0x68·BMP280(0x77)·EEPROM(0x50) 부재 확정** — 매트릭스의 추정치/sibling shield A carry였음. 회로도 V1.0 I2C = AHT20+OLED 2종이 ground truth. → shield A vs B 차이 일반화 자산.
- **GPIO7(LoRa AUX) = SPI0 CE1 충돌** (`dtparam=spi=on` → spidev0.1 점유). LoRa AUX GPIO read 불가, `dtoverlay=spi0-1cs` 해제 필요. → gaps/gotcha 후보.
- **WS2812 root 불가피 + NOPASSWD 해법** — `/dev/mem` PWM/DMA, SPI 우회는 GPIO12 배선이라 불가. `/etc/sudoers.d/ws2812-uttec`로 tty 없는 자동화에서도 직접 구동. → build-gotcha-inventory 후보.
- **broker 자동화 확인** — myWiki 양방향 broker 이미 동작(우리 done 카드 수신 확인). 분산 vault git 공유 repo 자체 구축 계획 폐기(중복).

## 8일 교육 커리큘럼 cascade (해당 시)
- 검증된 7 컴포넌트 → 8일 커리큘럼 실습 모듈 매핑은 다음 세션 진행 (현재 미착수)

## myWiki 처리 요청
- `entities/uttec-factory.md` 갱신 — 매트릭스 실장 7/7 + LoRa 미탑재 + gotcha 3건
- `gaps.md` 후보 검토: GPIO7/SPI 충돌, WS2812 NOPASSWD
- build-gotcha-inventory cross-link: WS2812 PWM0 + GPIO7 SPI 충돌
- shield A vs B I2C 디바이스 차이(0x68/BMP280 부재) 일반화 — sibling shield 트랙과 cross-reference
