# AISG v2.0 vs v3.0 — 심도 비교

> 위시캣 #155057 미팅 (2026-05-13) 대비 — 포팅 범위·영향도를 명확히 하기 위한 항목별 비교.
> 결론: **PHY 변경 0%, L2 변경 5%, L3 변경 90%** — 포팅 작업의 90%는 응용계층(EP·명령 셋 추가)에 집중.

---

## 1. 한 줄 요약

| 차원 | v2.0 (2006~) | v3.0 (2018~) | 변경 강도 |
|---|---|---|:-:|
| Physical Layer | RS-485 / OOK 2.176 MHz | **동일** | 0% |
| Data Link (HDLC) | ISO/IEC 13239, CRC-CCITT | 거의 동일 (확장 필드 추가) | 5% |
| Application Layer | 단일 Primary / 수동 주소 | Multi-Primary / 자동 Discovery / Mapping / Ping | 90% |
| 전원 (커넥터) | +12 V / 10-30 V / -48 V | **10-30 V 단일화** | 100% (단순화) |
| IOT 시험 | 기본 명령 | 강화된 IOT 명령 + HW 정의 | 50% |
| 사양 명확도 | 자연어 위주 | **Pseudocode 포함** | 정밀화 |

---

## 2. 전체 비교 매트릭스

### 2.1 물리 계층 (Physical Layer)

| 항목 | v2.0 | v3.0 |
|---|---|---|
| RS-485 | ✅ 반이중 9.6 kbit/s | ✅ 동일 |
| OOK | ✅ 2.176 MHz Bias-T | ✅ 동일 |
| Baud Rate | 9,600 bps | 동일 |
| 토폴로지 | Single-Master Multi-Slave | 동일 (단, Multi-Primary는 L3 개념) |
| 케이블 | 8-pin C485 (IEC 60130-9) | 동일 |
| 보호 등급 | IP68 | 동일 |
| **호환성** | — | **v2.0 modem 그대로 v3.0 사용 가능** ⭐ |

→ **포팅 시 PHY 코드 변경 불필요**. 기존 RS-485/OOK 드라이버 재사용.

### 2.2 커넥터 전원 핀

| 핀 종류 | v2.0 | v3.0 |
|---|:-:|:-:|
| +12 V DC | ✅ | ❌ |
| 10–30 V DC | ✅ | ✅ (유일) |
| −48 V DC | ✅ | ❌ |
| 다중 전원 옵션 | 3개 | **1개** |

**의미**:
- v2.0 시대: 기지국 마다 다른 전원 규격 → 3개 옵션 필요
- v3.0 시대: 10-30 V 표준 정착 → 단일화로 단순화
- **펌웨어 영향**: 전원 감지 로직 간소화. 단, 기존 v2.0 케이블에서 +12V/-48V 핀이 unused로 남을 뿐 호환은 유지.

### 2.3 데이터 링크 계층 (HDLC)

| 항목 | v2.0 | v3.0 |
|---|---|---|
| HDLC Class | UNC1,15.1 TWA | 동일 |
| Flag | 0x7E | 동일 |
| Address | 8-bit + C/R | 동일 |
| FCS | CRC-CCITT 16 | 동일 |
| Bit Stuffing | 5×1 → '0' 삽입 | 동일 |
| Max Info Length | 78 octets (필수) | 78 octets 유지 (일부 확장 명령에서 multi-frame 사용) |
| 비고 | — | Multi-frame 패킷 처리 추가 필요 |

→ HDLC 파서·생성기·CRC 검증 루틴은 **그대로 재사용**.

### 2.4 응용 계층 (Application Layer / EP) — ⭐ 변경 집중

| 카테고리 | v2.0 | v3.0 | 작업 범위 |
|---|---|---|---|
| **공통 EP** (Reset, GetSwVersion, etc.) | ✅ | ✅ 동일 | 그대로 |
| **단일 Primary** | ✅ | (기본 호환) | 그대로 |
| **수동 주소 지정** | ✅ | (기본 호환) | 그대로 |
| **Multi-Primary** | ❌ | ✅ **신규** | 신설 |
| **Device Discovery** | ❌ | ✅ **신규** | 신설 |
| **Site Mapping** | ❌ | ✅ **신규** | 신설 |
| **Connection Mapping** | ❌ | ✅ **신규** | 신설 |
| **Ping Packet** | ❌ | ✅ (Optional) | 신설 |
| **Subunit Access Rights** | ❌ | ✅ **신규** | 신설 |
| **강화된 IOT 명령** | 기본 | ✅ 확장 | 확장 |

---

## 3. v3.0 신규 기능 4종 — 상세

### 3.1 Multi-Primary Control

**v2.0 (Before)**:
```
[Single Controller] ──┐
                      ├── [AISG Bus] ── [ALD #1]
                      │                 [ALD #2]
                      └──               [ALD #3]
```
- 한 컨트롤러가 모든 ALD를 독점

**v3.0 (After)**:
```
[Controller A — LTE]  ──┐
                        ├── [AISG Bus] ── [MALD #1 (RET + TMA)]
[Controller B — 5G]   ──┤                   ├ RET   → A,B 모두 접근 가능
                        │                   └ TMA   → A만 접근, B는 read-only
[Controller C — 모니터링] ┘                   ↑
                                              Subunit 단위 access right
```
- 한 ALD를 여러 컨트롤러가 동시 제어
- **Subunit 단위로 read/write 권한 별도 설정**

**구현 키 포인트**:
- 컨트롤러별 세션 상태 격리 (struct array indexed by primary_id)
- mutex로 동시 접근 직렬화
- 트랜잭션 ID로 명령-응답 매칭
- Subunit access matrix 저장 (Flash/EEPROM)

### 3.2 Device Discovery

**v2.0 (Before)**:
- 설치자가 ALD 주소를 사전 지정 (보통 0x01, 0x02, ...)
- 컨트롤러가 알려진 주소로 직접 통신
- 신규 ALD 추가 시 수동 설정 필요

**v3.0 (After)**:
- Broadcast 명령 → 모든 ALD가 응답
- 컨트롤러가 응답을 수집 → 디바이스 리스트 자동 구성
- 주기적 재스캔으로 hot-plug 감지

**구현 키 포인트**:
- Discovery 명령 코드 1개 추가 (`ScanCommand`)
- 응답 타임아웃 (200~500 ms)
- 응답 충돌 방지 (slot-based random backoff 또는 address-based)
- 신규 디바이스 자료구조 (linked list 또는 dynamic array)

### 3.3 Site Mapping (Connection Mapping)

**v2.0 (Before)**:
- 기지국 설치 시 설치자가 종이 도면에 수기로 케이블 연결 기록
- "Antenna #1 ↔ RET #3 ↔ TMA #2 ↔ BS RF port #5" 같은 매핑이 사람 손에 의존

**v3.0 (After)**:
- ALD 간 관계·내부 구성·RF 연결을 컨트롤러가 명령으로 조회
- 발견 가능 정보:
  - RET ↔ 논리 안테나 어레이
  - 각 RET의 주파수 범위
  - RF 포트 ↔ 케이블 연결
  - 센서 ↔ 안테나 매핑
  - BS RF 포트 매핑

**구현 키 포인트**:
- 매핑 테이블 자료구조
- 매핑 조회 명령 다수 (`GetMapping`, `GetRFPortMapping`, ...)
- 매핑 변경 감지 (재스캔 트리거)
- 영속화 (Flash 저장)

### 3.4 Ping Packet (Optional)

**v2.0 (Before)**:
- RF 케이블 연결 상태는 RF 검파기 또는 수동 시험 장비로만 확인 가능
- 케이블 swap·단선을 펌웨어에서 알 수 없음

**v3.0 (After)**:
- 컨트롤러가 RF 채널별로 ping 송신
- 해당 채널의 ALD가 응답 → 케이블 연결 자동 검증
- 각 채널이 **AISG-aware** 여야 함 (v3.0 요구사항)

**구현 키 포인트**:
- Ping 송신·수신 모듈 (RF 채널별)
- 응답 없는 채널 = 단선/고장 알람
- 매핑 테이블 갱신 트리거

---

## 4. 포팅 작업 범위 — 작업량 분포

```
Phase 1 (분석)       ███░░░░░░░  15%  기존 v2.0 코드 분석
Phase 2 (회귀 베이스) ██░░░░░░░░  10%  v2.0 테스트 베이스 구축
Phase 3 (v3.0 신기능) ██████░░░░  40%  ⭐ Multi-Primary/Discovery/Mapping/Ping
Phase 4 (통합 테스트) ██░░░░░░░░  15%  24h 안정성 + 부하
Phase 5 (현장)       ███░░░░░░░  15%  용인 현장 실증
Phase 6 (인계)       █░░░░░░░░░   5%  문서·매뉴얼
```

**의미**:
- PHY/HDLC 변경 거의 없음 → Phase 1~2는 짧고 명확
- 작업 절반이 Phase 3 (v3.0 신기능 4종) → 본 부분에 인력·시간 집중
- v3.0 신기능은 4가지 모두 **BLE Mesh 3,800대 시스템에서 구현한 패턴과 동형**

---

## 5. 호환성 관점

### 5.1 PHY 호환

- v3.0 modem에 v2.0 ALD 연결: 동작 (v2.0 명령만 사용)
- v2.0 컨트롤러에 v3.0 ALD 연결: 동작 (v3.0 신기능 사용 불가)
- v2.0 케이블에 v3.0 시스템: 동작 (단 +12 V/−48 V 핀 unused)

### 5.2 명령 호환

- v3.0의 모든 v2.0 명령 = 그대로 지원 (legacy 호환)
- v3.0 신규 명령 = v2.0 컨트롤러가 모르므로 무시 또는 "unsupported" 응답
- → **점진적 마이그레이션 가능**

### 5.3 IOT (Interoperability Test) 강화

- v3.0은 IOT 명령·HW 정의를 강화
- 벤더 간 상호 운용성 보장 강화 = 새 ALD가 기존 컨트롤러와 동작 가능

---

## 6. 미팅에서 자주 받을 수 있는 질문 (추가)

**Q: v2.0과 v3.0의 가장 큰 차이는 한 줄로?**
> **응용 계층(Multi-Primary / Auto Discovery / Site Mapping / Ping) 4가지 신기능**. 물리·링크 계층은 호환.

**Q: 기존 v2.0 ALD 펌웨어를 v3.0으로 업그레이드 시 가장 위험한 부분?**
> Multi-Primary 동시성 + Subunit Access Right 모델. 기존 single-primary 가정의 코드가 race condition 발생 가능. mutex·세션 격리 재설계 필요.

**Q: v3.0 신기능을 모두 구현해야 하나, 일부만 가능한가?**
> 표준상 **Multi-Primary, Discovery, Mapping은 필수**, Ping은 **Optional**. 클라이언트와 합의해서 Ping 제외도 가능 (24M / 90일 협상 카드).

**Q: v2.0 코드 분석에 얼마나 걸릴 것 같나?**
> Phase 1 = 2주 배정. 기존 코드 품질 따라 차이. Modbus RTU · BLE Mesh · EtherCAT 4종 양산 코드 분석 경험으로 평균 2주 적합.

**Q: 현장 테스트에 실제 v3.0 ALD가 필요한가?**
> 4개 신기능 중 Multi-Primary·Discovery·Mapping은 자체 시뮬레이터로 95% 검증 가능. **Ping은 실 RF 환경 필수** — 클라이언트와 협조해서 현장 1~3회 방문.

---

## 7. 결정적 통찰

### 7.1 PHY 변경 없음 = 우리 차별화

OOK 변조를 직접 구현(CC1101)한 회사는 드물다.
- v2.0 → v3.0 마이그레이션을 노리는 다수 외주는 RS-485 PHY만 보유
- v3.0의 OOK 2.176 MHz Bias-T 옵션을 적용하려면 OOK PHY 이해 필수
- UTTEC는 OOK PHY 자체 구현 자산 보유 → **두 PHY 옵션 모두 즉시 대응 가능**

### 7.2 신기능 4종 = BLE Mesh 패턴

| AISG v3.0 신기능 | BLE Mesh 대응 패턴 |
|---|---|
| Multi-Primary | Multi-provisioner 모델 |
| Device Discovery | BLE Scan |
| Connection Mapping | Mesh Routing Table |
| Ping | BLE Heartbeat |

→ **3,800대 양산 검증 패턴을 그대로 재사용** 가능. 처음부터 설계하는 외주 대비 시간 50% 단축.

### 7.3 정직 시그널 — "직접 양산 경험 없음" 사전 명시

v3.0 양산 소스 보유자 우대 → 우리는 보유하지 않음.
- **사전에 인지·정직 명시** = 1차 신뢰
- 클라이언트 측 NDA 하에 기존 v2.0 소스 제공 가능 → A 경로 (인수+v3.0 패치)
- 제공 불가 → B 경로 (자체 5강점으로 90일 처음부터)

---

## 메타

| 항목 | 값 |
|---|---|
| 작성일 | 2026-05-12 |
| 다음 자료 | `03_ALD_타입별_상세.md` |
| 참조 자료 | `01_AISG_3.0_상세_spec.md` |
