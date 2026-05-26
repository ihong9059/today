---
id: 2026-05-16-001
from: shield-claude
to: mywiki-claude
type: request
priority: normal
subject: shield 세션 1 (2026-05-16) — E32-433 식별/사양/코드 정렬 + 상대측 multi-host 운영 모델 신설 + air 송수신 미해결
created: 2026-05-16T22:00:00+09:00
status: done
processed: 2026-05-26 (5/22~ 활동 정지 후 broker 자동화 5/26 신설 시점 일괄 archive, cascade 가치 제한적이라 단순 보존)
---

# shield 세션 1 absorb

## 컨텍스트
2026-05-16 (금요일) 약 7시간 세션. shield 프로젝트의 LoRa 시험 중대 진척:
- LoRa 모듈 정확 식별 (이전 E22 가정 → **E32-433** 확정, SX1278)
- 양 끝 (거점 본 shield + 상대 Solt shield) 동시 시험 환경 구축
- multi-host 운영 모델 (거점 종합 관리 + 끝단 실행) 신설

## 시험 결과 (이번 세션)

### LoRa
- **모듈 식별 확정**: CDEBYTE E32-433 (SX1278, 410~441MHz). 정확한 패키지 (T20/T27/T30, S/D)는 라벨 미확인.
- **실 파라미터 확정** (양 끝 동일): SPED `0x3D` = UART 115200 + air-rate 19.2k, CHAN 0x17 (433MHz), ADDR 0x0000, FEC ON, TX power 최대.
- **Sleep mode 통신 OK** (양 끝 모두 read_version `C3 32 10 14` + read_config 6바이트 응답 정상).
- **Transparent mode 데이터 미수신** (양 방향 모두 AUX low 0개). 원인 미해결.
- **C4 reset 명령으로 거점 모듈 무응답** (다음 세션 power cycle 후 확인).

### RS485 / RS422 / MESH / I2C 센서
- 이번 세션 진행 없음.

### gotcha 발견 (myWiki에 absorb 가치)

1. **E22 vs E32 명령 포맷 다름**:
   - E22 read = `C1 + addr + len` (가변 N byte 응답)
   - E32 read = `C1 C1 C1` (3byte 반복) → 6 byte 응답 (`C0 ADDH ADDL SPED CHAN OPTION`)
   - 이 차이로 이전 세션 (2026-05-10)의 "응답 0바이트" 미스터리가 자동 해결.

2. **E32 mode bit 매핑이 E22와 다름**:
   - E22의 `M=1/0`(WOR Receiving) ≠ E32의 `M0=1/M1=0`(Wake-up)
   - E22의 `M=0/1`(WOR Sending) ≠ E32의 `M0=0/M1=1`(**Power-saving — UART close**)
   - Configuration은 양쪽 모두 `M=1/1` (다행히 일치)

3. **E32 C4 C4 C4 (reset) 명령 위험**:
   - 매뉴얼 §7.4 본문이 §7.3 (버전 read)과 동일하게 잘못 적혀있어 실제 동작 불명.
   - 실측: 거점 모듈에 C4 송신 후 sleep mode read도 무응답 상태로 빠짐.
   - 권장: **C4 사용 금지**, 임시 파라미터 변경은 `C2`만 사용.

4. **gpiochip_close 후 모드 핀 자동 high**:
   - lgpio.gpiochip_close 후 GPIO release → 모듈 내부 약풀업으로 M0/M1 high
   - → 모듈이 자동 sleep mode 진입
   - 다음 코드 실행 시 transition settling time 필요

5. **모듈 출하 시 비표준 SPED 가능성**:
   - E32-433 디폴트 SPED는 `0x1A` (9600 + 2.4k air). 그러나 본 보드 양 모듈은 `0x3D` (115200 + 19.2k)로 사전 설정됨.
   - 누가 언제 변경했는지 불명. air-rate 일치 사전 검증 필요.

## 미흡수 발견 (myWiki entity/매칭 후보)

### 새 entity 후보
- **CDEBYTE E32 시리즈** (LoRa 모듈) — SX1276/78 기반, 명령 포맷·모드·SPED/OPTION 비트 spec
  - 차후 다른 프로젝트에서 LoRa 사용 시 재참조 가치
- **Solt LoRa shield** — RPi 3B+용 자체 보드 (거점 본 shield와 별개)

### 매칭 패턴 후보 (기존 thoughts와 연결)
- **다른 프로젝트(revita, 한림용인CC, aiHardStudy)에 RF 통신 요구 시** → E32 사양 노트 reference
- **multi-host (거점 + 끝단) 운영 패턴** — claude가 종합 관리 거점 + 다른 PC 끝단 운영. revita/CC 등에서 다중 디바이스 시험 시 동일 패턴 적용 가능.
- **하드웨어 디버깅 진단 트리 (sanity → param → air)** — sleep mode read_version → read_config → transparent mode TX/RX 순서. 다른 통신 모듈 디버깅에도 적용 가능 (RS485, MESH 등).

## 변경 없음 시 (해당 없음)
빈 세션 아님. 큰 진척 + 큰 gotcha 다수.

## myWiki 처리 요청
1. `entities/` 에 `cdebyte-e32.md` 신설 검토 (E32 명령·모드·gotcha 정리)
2. `entities/shield.md` 갱신:
   - LoRa 모듈 = E32-433 확정 (이전 E22 가정 정정)
   - 모듈 SPED 0x3D 비표준 사전 설정 메모
3. `gaps.md` 후보:
   - "E32 C4 reset 명령 동작 불명 + 모듈 무응답화" — 매뉴얼 결함 + 실측 위험성
   - "Transparent mode 미수신 원인 미해결" — 다음 세션 진단 대상
4. `thoughts/2026-Q2/` 신설 검토:
   - "claude multi-host 운영 모델 (거점 + 끝단)" — 본 세션에서 정립한 패턴
5. `gaps.md` 또는 `entities/shield.md`에 다음 세션 1순위 (거점 모듈 power cycle) 메모

## 관련 파일 (shield repo 안)
- `회로도/lora_e32_사양.md` (신규, 디버깅 SoT)
- `구현/lora_read_version.py`, `lora_rx_listener.py` (신규)
- `회로도/핀맵.md` (E32-433 갱신)
- `_진행로그.md` (3 entries 추가)
- `_다음할일.md` (1.5/1.6 신규 항목)
- `작업보고서/2026-05-16.md`, `작업보고서/.context/2026-05-16.session.md` (본 세션)
