# QDY30A-B 6개 sensor 교차 basic test 결과

- **테스트 일시**: 2026-05-31 12:13 ~ 12:50 KST
- **환경**: USB-RS485 CH340 동글 (COM44, VID_1A86 PID_7523) + DC 24V 어댑터
- **결선**: Red=+24V / Green=GND / Blue=A+ / Yellow=B- (lot 6개 모두 A/B 스왑 불필요)
- **Modbus 설정**: 9600/8N1, Slave 0x01, FC 0x03 (Read Holding Registers)
- **Sensor 수**: 6 (sensor #0~#5)
- **통신 OK**: **6/6 (100%)** / FAIL: 0

## 1. Config dump (전체 6개 동일)

| Sensor | Slave | Baud | Unit | Decimal | ZeroPoint | RangeFull |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| #0 | 1 | 3 | 17 | 1 | 0 | 3000 |
| #1 | 1 | 3 | 17 | 1 | 0 | 3000 |
| #2 | 1 | 3 | 17 | 1 | 0 | 3000 |
| #3 | 1 | 3 | 17 | 1 | 0 | 3000 |
| #4 | 1 | 3 | 17 | 1 | 0 | 3000 |
| #5 | 1 | 3 | 17 | 1 | 0 | 3000 |

→ **완벽한 lot 일관성** — 6개 모두 동일 factory 설정.

## 2. 공기 중 안정성 (5초 ≈ 22 샘플)

| Sensor | N | Mean | Std | Min | Max | 판정 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| #0 | 1 | 0.0 | — | 0 | 0 | ✅ (single read) |
| #1 | 22 | **0.0** | **0.00** | 0 | 0 | ✅ perfect |
| #2 | 22 | **0.0** | **0.00** | 0 | 0 | ✅ perfect |
| #3 | 22 | **0.0** | **0.00** | 0 | 0 | ✅ perfect |
| #4 | 22 | **0.0** | **0.00** | 0 | 0 | ✅ perfect |
| #5 (1차) | 22 | 2.6 | 1.05 | 0 | 3 | ⏳ settling |
| **#5 (2차)** | 22 | **3.0** | **0.00** | 3 | 3 | ⚠️ stable offset +3 |

### 3. 교차 비교 분석

- ✅ Slave addr 일치 (전부 1)
- ✅ Baud code 일치 (전부 3)
- ✅ Unit 일치 (전부 17 — 비표준값, OEM 인코딩 추정)
- ✅ Decimal 일치 (전부 1)
- ✅ RangeFull 일치 (전부 3000)
- ✅ ZeroPoint 일치 (전부 0 — 공장 출하 보정 없음)

### 4. ⚠️ Outlier — Sensor #5

| 비교 | #0~#4 | #5 |
|---|:-:|:-:|
| Stable air raw | **0** | **3** |
| Std (안정성) | 0 | 0 (안정) |
| 1차 측정 시 변동 | — | mean=2.6 std=1.05 |
| 2차 측정 시 | — | mean=3.0 std=0 |

**해석**:
- 노이즈 아님 (재측정 std=0)
- Settling 후 +3 raw 영점 편이로 고정
- decimal=1 → 표시값 **+0.3** (단위 확정 전이라 cm/mm 모름)
- 사양 0.5% FS × RangeFull 3000 = ±15 raw 허용범위 → **0.1% FS 편차 = 사양 내 정상 양품**
- 보정 가능: register 0x0005 ZeroPoint에 -3 write (Modbus FC 0x06) 또는 펌웨어 측 -3 가산

**판정**: ✅ 사용 가능, 보정 필요. 6/6 양품.

## 5. 박제 함정·관찰사항

1. **A/B 와이어 스왑 0건** — 매뉴얼·커뮤니티가 경고한 lot별 A/B 함정이 본 lot에는 없음. 단일 결선 패턴으로 6개 통일 통신.
2. **공통 GND 3점 (sensor·PSU·동글)** — 미리 적용해 첫 시도부터 통신 OK.
3. **Hot-swap 시 COM 핸들 잔여** — sensor #3 교체 후 PermissionError 발생, 2초 대기 후 정상화. 다음 lot 작업 시 sleep 2s 자동 삽입 권장.
4. **pymodbus 3.13 API 변경** — `slave=` 인자가 `device_id=`로 변경됨 (3.7+ 적용).

## 6. 다음 단계

### Step B: 침수 깊이 매핑 (단위 확정용)
1. PVC 파이프 1.5m 또는 양동이 50cm 환경 준비
2. Sensor #0~#4 중 1개 선택 (zero offset 없는 개체)
3. 0/10/30/50/100/(150) cm 단계별 침수
4. raw 값 변화로 단위 (cm vs mm vs 0.1cm) + 측정 범위 (3m? 다른?) 확정
5. 보정 공식 도출

### Step C: Sensor #5 zero-point 보정
- register 0x0005 에 -3 write (Modbus FC 0x06 또는 0x10)
- 또는 펌웨어 측 sensor별 offset table 박제

### Step D: nRF52832 통합
- MAX485 트랜시버 + UART DE/RE GPIO 회로
- Zephyr Modbus RTU master (또는 자체 CRC16 구현)

## 7. 산출물

| 파일 | 내용 |
|---|---|
| `qdy30a_batch_2026-05-31.csv` | 6개 sensor + 재측정 1건 raw data |
| `qdy30a_batch_report_2026-05-31.md` | 본 보고서 |
| `pc_test/qdy30a_modbus_test.py` | 단발 dump/poll/scan/baud-scan 스크립트 |
| `pc_test/qdy30a_single_measure.py` | non-interactive 단발 측정 (CSV append) |
| `pc_test/qdy30a_batch_test.py` | interactive 6개 일괄 (이번엔 미사용, 추후 활용) |
| `references/QDY30A-B_RS485_사양서.md` | 사양·register map·배선·트러블슈팅 |
