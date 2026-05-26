---
id: 2026-05-21-007
from: shield-claude
to: mywiki-claude
type: request
priority: normal
subject: shield 세션 2 — 본 shield LoRa setting OK + RS485 진입 + 양 끝 주파수 미스매치 발견
created: 2026-05-21T17:43:00+09:00
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
---

# shield 세션 2 absorb (hardware swap 후 본 shield 첫 가동)

## 컨텍스트
hardware swap 직후 본 shield 첫 가동. LoRa Configuration mode 통신은 정상이고 SPED set도 성공했으나, **양 끝 LoRa 모듈 주파수가 다름**을 발견하면서 air-test 보류. RS485 진입 단계로 전환, `dtoverlay=uart4` 추가 + 재부팅 진행.

## 시험 결과 / 진척 (이번 세션)

### LoRa (E32)
- ✅ 본 shield 모듈 sanity OK: `read_version` → `C3 32 10 14` (E32 응답 정상)
- ✅ 본 shield Configuration mode read/write 정상: SPED `C0 00 00 18 17 44`로 set 성공 (write echo 일치 + re-read 검증)
- ❌ air-test 실패 (0 패킷) — **원인 = 양 끝 주파수 미스매치**
  - 본 shield = E32-**433** (MODEL=0x32)
  - 원격 Slot = E32-**915** (MODEL=0x44)
  - 5/16 인계 "양쪽 E32-900T 계열"이 잘못된 기록이었음
- ⚠️ mode_check에서 본 shield AUX low 0회 (mode 전환 시) — 5/16 거점 Slot stuck 동일 패턴이지만, 주파수 미스매치로 air 실패 설명되므로 stuck 진위는 동일 주파수 모듈 확보 시 재검 보류

### RS485
- ✅ USB Quad_Serial 동글 인식 (QinHeng 1a86:55d5, ttyACM0~3 4채널)
- ✅ 사용자가 동글 한 채널을 본 shield U1 RS485 A/B에 연결 (단일 PC loopback 구성)
- ✅ `/boot/firmware/config.txt`에 `dtoverlay=uart4` 추가 + 백업
- ⏸ UART4 활성 검증 + 채널 식별 + 송수신 코드는 재부팅 후 다음 세션

### 코드 변경
- 신규: `구현/lora_write_config.py` (Slot 포팅, UART2 + 본 shield 핀맵)
- 수정: `구현/lora_tx_counter.py`, `lora_rx_listener.py` (UART_BAUD 115200 → 9600)

## 발견·결정 사항

### 양 끝 LoRa 모듈 주파수 미스매치 (5/16 인계 정정)
- 본 shield = E32-433, 원격 Slot = E32-915 — 같은 SPED라도 air 도달 불가
- read_version MODEL 바이트(0x32 vs 0x44)가 시리즈 구분 단서
- 정정 대상: `회로도/lora_e32_사양.md` (현재 433 가정만), `회로도/핀맵.md` (본 shield 모듈 = 433 명시)
- 향후 air-test 재개: 동일 주파수 모듈 1쌍 확보 필요 (433 ↔ 433 또는 915 ↔ 915)

### air-test 진단 함정 (다른 Claude도 동일 함정 가능)
mode_check AUX 0회만 보고 "모듈 stuck"이라 즉단정했으나, 실제 원인은 주파수 미스매치. 동일 증상이라도 원인 분리 안 된 상태에서 단일 가설 단정의 위험성. **회복**: 양 끝 동일 주파수 모듈로 air-test 재시도 시 stuck 진위 가려짐.

### RS485 단일 PC loopback 구성 (재사용 가능 패턴)
별도 짝 장비 없이 USB Quad_Serial 동글 + RPi UART4를 같은 PC 안에서 RS485 버스로 연결. 채널 식별은 UART4 송신 후 4채널 monitor로 자동화 가능. 다른 트랜시버(RS422 등)도 동일 패턴 적용 가능.

## myWiki 처리 요청
- `entities/shield.md` 갱신 검토 — LoRa 모듈 주파수 변형(433/915) entity 추가
- `gaps.md` 후보: "양 끝 LoRa 시험 시 모듈 시리즈/주파수 라벨을 sanity의 첫 단계로 (read_version MODEL 바이트로 검증 가능)"
- 향후 broker 자동화 결정 시 본 absorb 카드도 자동 transit 예정 (현재 status:pending 누적 7건)
