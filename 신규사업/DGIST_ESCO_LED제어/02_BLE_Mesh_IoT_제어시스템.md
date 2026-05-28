# 02. §2.2 BLE Mesh 기반 IoT 조명제어 시스템

**시방서 대응**: 「Ⅲ. 공사시방서 § 제2장 § 2.2 IoT 기반 무선 조명제어 시스템설치 공사」 (917등)
**참조 사례**: 일본 나고야 사카에(栄) 역 부근 자전거 주차장 BLE Mesh Locking 시스템 (3,300대 규모, 배터리 운영 — 자세히 § 11 참조)

---

## 1. 본 시스템의 위치

DGIST 본관·E2~E7동 복도·중앙기기센터 등에 설치된 **기존 LED 917등**을 무선 메시 네트워크로 묶어 **건물 통합 관제·스케줄·점유 기반 자동 제어**를 실현한다.

| 적용 범위 (시방서 §2.2 가항) | 등수 |
|---|:--:|
| 주차장등 기존 LED 40W (본관 지하1층) | 63 |
| 실내등 기존 LED 55W (E2동~E6동 복도) | 408 |
| 실내등 기존 LED 16W (E7 복도) | 378 |
| 중앙기기센터 복도 FPL 36W×3등 대체용 LED 면조명 600×600 | 68 |
| **합계** | **917** |

## 2. 기술 선택 근거 — 왜 BLE Mesh인가

### 2.1 후보 비교

| 항목 | **BLE Mesh** ⭐ | Zigbee | LoRa | WiFi Mesh |
|---|:--:|:--:|:--:|:--:|
| 표준 | Bluetooth SIG Mesh 1.1 | IEEE 802.15.4 | LoRa Alliance | IEEE 802.11s |
| 메시 자가 라우팅 | ✅ | ✅ | △ (star 위주) | ✅ |
| 노드 수 | ~32,767 / network | ~65,000 | ~수천 | ~수십 |
| 송수신 지연 | < 100ms (3 hop) | ~50ms (3 hop) | ~1초 | < 200ms |
| **상용 양산 채택률 (2024)** | **⭐⭐⭐ 45% YoY 증가 (Bluetooth SIG 통계)** | 안정 | 산업 IoT 위주 | 가정용 위주 |
| 모바일 직접 연동 | ✅ (스마트폰 BLE 내장) | ❌ (별도 동글) | ❌ | ✅ |
| 칩 가용성 | ⭐ 양산 채택 다수 (nRF52810/nRF52840 등) | 안정 공급 | 산업 IoT 위주 | 가정용 위주 |
| 나고야 사카에 자전거 주차장 사례 (3,300대) | ✅ 검증 (§ 11) | 부분 | — | — |

**선택**: ⭐ **BLE Mesh** — 상용 양산 검증 + 모바일 직접 연동 + 나고야 사카에 3,300대 자전거 주차장 locking 사례 검증.

### 2.2 BLE Mesh 핵심 강점 (2024 commercial 통계 기반)

- **2024년 상업용 BLE Mesh 채택 +45% YoY** (Bluetooth SIG)
- **주차장·복도·창고처럼 직사각형 공간에 강점** (multipath delivery 우수)
- **수천 luminaire 자가 메시 자동 구성** (central controller 불요)
- **occupancy 센서 통합 시 효율 60% 개선** (sensor-based lighting = 전체 설치 54%)
- **self-healing**: node 고장 시 인접 relay 자동 우회

## 3. 시스템 아키텍처

### 3.1 BLE Mesh 노드 종류 (Bluetooth Mesh 1.1 표준)

| 노드 유형 | 역할 | 본 시스템 적용 |
|---|---|---|
| **Relay Node** | 메시 패킷 중계 | 천장 luminaire 약 30% (relay flag ON) |
| **Friend Node** | 저전력 노드의 메시 버퍼링 | Zone별 1~2개 |
| **Low Power Node (LPN)** | 배터리 노드 (PIR 센서 등) | PIR 센서 분리 시 적용 |
| **Provisioner** | 노드 추가·설정·키 관리 | Gateway 내장 |
| **Proxy Node** | BLE 일반 장치(스마트폰)와 메시 연결 | Gateway 내장 |

### 3.2 계층 구조

<div class="diagram">

<div class="row">
  <div class="box cloud" style="flex: 0 0 80%;">
    <div class="title">☁ 관제 클라우드</div>
    <div class="sub">Node-RED + InfluxDB + Grafana</div>
  </div>
</div>

<div class="arrow">↑↓</div>
<div class="label">MQTT over TLS 1.3 (LTE Cat-M1 또는 WiFi)</div>

<div class="row">
  <div class="box gateway" style="flex: 0 0 80%;">
    <div class="title">📡 Gateway (Provisioner + Proxy)</div>
    <div class="sub">nRF52840 SoC + LTE Cat-M1 모뎀 (또는 WiFi)</div>
    <div class="sub">Network / App key 보관 (Secure Element 권장) · Heartbeat 모니터링</div>
  </div>
</div>

<div class="arrow">↑↓</div>
<div class="label">BLE 5.0 (2.4GHz) · AES-CCM 128bit 암호화</div>

<div class="row">
  <div class="zone" style="flex: 1;">
    <div class="zone-title">🌐 BLE Mesh 네트워크 (917 노드)</div>
    <div class="row">
      <div class="box ble" style="flex: 1;">
        <div class="title">Zone 1 — 본관 1F 복도 (32등)</div>
        <div class="sub">Relay × 10 + Standard × 22 + Friend × 1</div>
      </div>
    </div>
    <div class="arrow">↕ Relay hop</div>
    <div class="row">
      <div class="box ble" style="flex: 1;">
        <div class="title">Zone 2 — E2동 복도 (64등)</div>
        <div class="sub">Relay × 20 + Standard × 44</div>
      </div>
    </div>
    <div class="label">… (~60 Zones, Zone 당 평균 16등)</div>
    <div class="row">
      <div class="box ble" style="flex: 1;">
        <div class="title">Zone N — 중앙기기센터 면조명 (68등)</div>
        <div class="sub">Relay × 22 + Standard × 46</div>
      </div>
    </div>
  </div>
</div>

</div>

### 3.3 Zone 분할 전략

| 항목 | 값 |
|---|---|
| Zone 당 luminaire | 16~64 (시방서 16채널 충족 시 16 단위 묶음) |
| Relay 비율 | 약 30% (메시 라우팅 robustness) |
| 평균 hop 수 | 1~3 hop (Gateway까지) |
| Zone 분할 기준 | 건물 층·동 + 물리적 격벽 |

## 4. 노드 하드웨어 설계

### 4.1 표준 BLE Mesh 노드 (Standard Node)

| 부품 | 사양 |
|---|---|
| **SoC** | Nordic **nRF52810** (Cortex-M4 64MHz, 192KB flash, 24KB RAM, BLE 5) |
| 결정자 | 32MHz crystal |
| LED 디밍 드라이버 | Meanwell PCD-25-700B (또는 동급, 0~100% PWM) |
| 전원 회로 | AC-DC 5V/1A + LDO 3.3V |
| ESD 보호 | TVS diode |
| PCB · 케이스 | 양산 양면 PCB + ABS 케이스 |

### 4.2 Relay/Friend Node (디밍 + relay 동시)

위 Standard Node와 동일 H/W. SoC 펌웨어에서 relay flag만 enable하여 동일 부품으로 구현 가능.

### 4.3 PIR 센서 분리형 (Low Power Node)

| 부품 | 사양 |
|---|---|
| SoC | Nordic **nRF52810** (LPN 모드) |
| PIR 센서 | EKMC1601112 (Panasonic, 검출 거리 5m) |
| 배터리 | CR2032 + 홀더 |
| PCB·케이스 | 소형 양면 PCB + 케이스 |

> ⚙ LPN은 배터리 수명 약 2년 (PIR 트리거 빈도에 따라). 천장 매립형은 PIR을 luminaire와 일체화 권장.

### 4.4 Gateway (Provisioner)

| 부품 | 사양 |
|---|---|
| 메인 SoC | Nordic **nRF52840** (BLE 5 + USB) |
| LTE 모뎀 | Quectel BG95-M3 (Cat-M1) |
| 호스트 MCU | STM32G0B1 (또는 nRF MCU 단독 사용 가능) |
| Secure Element | ATECC608B (key 보관) |
| PCB·케이스·전원 | 양산 PCB + 산업용 케이스 + 12V DIN |

| 동수 | Gateway 1대 커버 |
|---|:--:|
| BLE Mesh 1 network | 1대 (32,767 노드까지 — 본 사업 917 충분) |
| 권장 redundancy | **2대 (Active + Standby)** |

## 5. 통신 프로토콜

### 5.1 BLE Mesh 모델 (시방서 §2.2 충족)

| 사용 모델 (Bluetooth SIG 표준) | 용도 |
|---|---|
| **Generic OnOff Server/Client** | ON/OFF 제어 |
| **Generic Level Server/Client** | 디밍 0~100% |
| **Light Lightness Server/Client** | 휘도 (CCT 미지원 luminaire는 lightness만) |
| **Light LC (Lightness Control) Server** | PIR 점유 기반 자동 제어 |
| **Sensor Server (Occupancy)** | PIR 데이터 publish |
| **Time Server/Client** | 스케줄 동기 |
| **Scene Server/Client** | 사전 정의 장면 (스케줄 호출용) |
| **Health Server** | 자가 진단 (LED 단선·전원 이상 등) |

### 5.2 메시지 흐름 예시 — PIR 감지 → 점등

```
PIR 노드 (LPN) ──[Sensor Status]──▶ Friend Node ──[Sensor Status]──▶ Relay
                                                                       │
                Relay ──[Light LC Mode]──▶ Gateway ──MQTT──▶ Cloud      │
                  ▲                                                     │
                  │ ◀──[Light Lightness Set: 100%]──┐                  │
                  │                                  │ Group: Zone-3    │
                  │ ◀──[Light Lightness Set]──┐     │                  │
                  │                            │ Group: Zone-3          │
                Luminaire 노드들이             │                        │
                 Group Zone-3 구독             │                        │
                                            Gateway가                  │
                                            scene 호출                 │
```

### 5.3 자동 룰 (Gateway 측)

| 트리거 | 동작 | 시방서 매핑 |
|---|---|---|
| PIR 감지 | Group "현재 Zone" Lightness 100% | §2.2 점유 기반 자동 제어 |
| PIR 무동작 5분 | Group Lightness 30% | 점유 기반 자동 제어 |
| PIR 무동작 15분 | Group OFF | 자동 소등 |
| 스케줄 시간 | 사전 정의 Scene 호출 | §2.2 스케줄 제어 |
| Health Status: 단선 | 알림 + 대시보드 마킹 | §2.2 현장 상태 알림 |

## 6. SUB Controller 16채널 구현

시방서 §2.2 다항 "조명 제어기 16채널" 요구사항을 BLE Mesh 그룹 단위로 매핑.

| 매핑 방식 | 설명 |
|---|---|
| 1 SUB Controller = 1 Group address | 16 luminaire를 한 그룹으로 묶음 |
| Group address | 본 시스템 약 60개 그룹 (917 ÷ 16 ≈ 57) |
| 그룹 멤버 동적 변경 | 관제 서버 측에서 가능 (provisioning record 갱신) |
| 자동 수동 전환 | Gateway 통신 단절 시 자체 PIR + Light LC 모드로 자동 fall-back |

> ⚙ 기존 ESCO 시방의 "16채널 전용 컨트롤러"는 보통 0-10V/DALI 유선이지만, BLE Mesh로 동등 기능을 **무선으로 구현** + **그룹 동적 변경 가능**한 점이 차별화.

## 7. 관제 서버 + 웹페이지

### 7.1 서버 스택 (UTTEC 보유 자산 carry)

| 계층 | 기술 | 비고 |
|---|---|---|
| 메시지 브로커 | Mosquitto (MQTT 5.0) | Gateway ↔ 서버 |
| 자동화 룰 엔진 | **Node-RED** 또는 **n8n** | UTTEC n8n broker 7th vault carry |
| 시계열 DB | InfluxDB 2.x | 점등·소등·소비전력 시계열 |
| 시각화 | **Grafana** | 대시보드 + 알림 |
| 인증·권한 | Keycloak (또는 자체 OAuth2) | 관리자/운영자/감사 |
| 호스팅 | DGIST 내부 서버 또는 클라우드 (사용자 선택) | UTTEC `webServer` 5대 운영 carry |

### 7.2 사용자 권한 (시방서 §2.2 라항 충족)

| 역할 | 권한 |
|---|---|
| 관리자 | 모든 권한 + Provisioning + 노드 추가/삭제 |
| 운영자 | 스케줄 변경 + Scene 호출 + 알림 확인 |
| 감사 (Auditor) | 읽기 전용 + 보고서 다운로드 |

### 7.3 관제 화면 핵심 위젯

1. **전체 1,271등 위치도** (§2.1 + §2.2 통합) — 색상으로 상태 표시
2. **실시간 소비전력** (kWh/h) — baseline 대비 절감률
3. **Zone별 점유율** — PIR 트리거 빈도 heatmap
4. **장애 알림** — 단선·통신단절·과열
5. **에너지 절감 리포트** — 시방서 §제3장 산출 기준 부합 형식

## 8. 보안 (시방서 §2.2 나항 "보안 암호화" 충족)

| 계층 | 암호화 | 키 관리 |
|---|---|---|
| BLE Mesh | **AES-CCM 128bit** (Network Key + App Key) | Provisioner가 OOB 인증 후 분배 |
| Gateway ↔ Cloud | **TLS 1.3** + X.509 인증서 | Let's Encrypt 또는 자체 CA |
| 인증서 보관 | **Secure Element (ATECC608B)** | tamper-resistant |
| OTA 펌웨어 업데이트 | 서명된 이미지만 수락 (ECDSA P-256) | 키 관리 정책 별첨 |
| 사용자 인증 | Argon2id + 2FA (TOTP) 옵션 | Keycloak |

## 9. 운영 시나리오

### 9.1 일과 시나리오 (E3동 복도 64등 Zone 예시)

| 시각 | PIR | 조명 상태 | 소비전력 |
|---|:--:|---|---:|
| 06:00 | — | 30% (사전 스케줄) | 1.2 kW |
| 07:30 | ON (출근) | 100% | 4.0 kW |
| 12:00 | OFF (점심) | 30% (5분 후) | 1.2 kW |
| 12:00 | OFF (점심) | OFF (15분 후) | 0 kW |
| 13:00 | ON (복귀) | 100% | 4.0 kW |
| 18:00 | OFF (퇴근) | OFF (15분 후) | 0 kW |
| 야간 | ON (가끔) | 100% (10분만) | 가변 |

**예상 일일 절감**: baseline 24h × 4kW = 96 kWh → 자동 제어 후 ~36 kWh (-62.5%)

### 9.2 장애 시나리오

| 장애 | 시스템 대응 |
|---|---|
| 1개 노드 통신 단절 | mesh self-healing — 인접 relay 우회, 대시보드 알림 |
| Gateway 통신 단절 | mesh 자체 동작 지속 (PIR 자동 + 스케줄), Standby Gateway 활성화 |
| Provisioning key 분실 | 노드 factory reset + 재 provisioning (양산 SOP) |
| 펌웨어 OTA 실패 | A/B partition 자동 rollback |
| 정전 | UPS 권장 (Gateway), luminaire 복귀 시 자동 재합류 |

## 10. 917등 시스템 부품 수량 구성

| 노드 종류 | 수량 |
|---|---:|
| Standard Node (Mesh + 디밍) | 600 |
| Relay Node | 250 |
| Friend Node | 30 |
| 면조명 600×600 LED 등기구 (중앙기기센터 68등 별도) | 68 |
| Gateway (Active) | 1 |
| Gateway (Standby, redundancy) | 1 |
| 서버 SW (Node-RED·Grafana·InfluxDB, OSS) | 1 set |
| 서버 H/W | DGIST 내부 또는 별도 |

> ⚙ 본 자료는 §2.2 제어 시스템 H/W 사양·구성만 정리. LED 등기구 본체·시공·서버 H/W는 별도 범위.

## 11. 참조 사례 — 일본 나고야 사카에 역 자전거 주차장 BLE Mesh Locking 시스템

### 11.1 사례 개요

일본 **나고야(名古屋) 사카에(栄) 역** 부근 — 나고야 중심가 지하철 환승 거점. 본 위치 지하 자전거 주차장에 **3,300대 규모 BLE Mesh 기반 자전거 잠금장치(locking) 시스템**이 운영 중.

| 항목 | 값 |
|---|---|
| **위치** | 일본 나고야 사카에(栄) 역 부근 (지하 자전거 주차장) |
| **수용 규모** | **3,300대 자전거** |
| **시스템 구성** | 정산소(중앙 관제) + 3,300 분산 잠금장치 + BLE Mesh 무선 네트워크 |
| **전원** | **배터리 운영** (분산 잠금장치 자체 전원 — 외부 배선 불요) |
| **동작 흐름** | ① 신규 진입 자전거 → 자동 잠금 체결<br>② 사용자가 정산소에서 결제 완료<br>③ 정산소 → BLE Mesh → 해당 잠금장치 해제 명령<br>④ 잠금 해제 + 출차 |

### 11.2 본 사례에서 검증된 BLE Mesh 핵심 역량

| 항목 | 검증 내용 | DGIST 본 사업 시사점 |
|---|---|---|
| **대규모 노드 운영** | 3,300 분산 노드 단일 BLE Mesh 네트워크 안정 운영 | 본 사업 **917 노드**는 충분한 여유 (3,300의 28%) |
| **배터리 저전력 동작** | 외부 전원 없는 잠금장치 수년 단위 배터리 운영 | BLE Mesh **Friend / Low Power Node** 패턴 양산 검증 |
| **중앙 ↔ 분산 양방향 통신** | 정산소(중앙) ↔ 3,300 잠금장치 양방향 명령·ACK | 본 사업 Gateway ↔ luminaire **양방향 + ACK** 구조 동일 |
| **실시간 응답성** | 결제 완료 후 수초 내 해제 (사용자 대기 최소화) | 본 사업 PIR 감지 → 점등 **< 500ms (3 hop)** 동등 수준 |
| **보안 (결제 트랜잭션)** | AES-CCM 암호화 + 명령 무결성 검증 (오해제 방지) | 본 사업 **AES-CCM 128bit + TLS 1.3** 동일 표준 |
| **상업 운영 신뢰성** | 24/7 무인 운영 + 자가 진단 + 원격 유지보수 | 본 사업 **Health Server + OTA + self-healing** 동일 |
| **지하 (RF 환경 열악)** | 지하 콘크리트 환경에서 mesh 안정 동작 | DGIST 지하 1F 환경에도 동일 적용 가능 |

### 11.3 본 사업 매핑

| 사카에 역 사례 요소 | DGIST 본 사업 적용 |
|---|---|
| **3,300 분산 노드 단일 mesh** | 917 분산 노드 (luminaire) — **여유 capacity 충분** |
| **정산소 = 중앙 명령 발행처** | Gateway (BLE Mesh Provisioner + Proxy) |
| **잠금장치 = 분산 액추에이터** | Luminaire (디밍 액추에이터) |
| **신규 진입 → 잠금 체결** | PIR 감지 → 자동 점등 (점유 기반 자동 제어) |
| **결제 완료 → 해제 명령** | 스케줄 / 운영자 명령 → 디밍·소등 |
| **배터리 운영** | 일부 PIR 센서 노드는 **Low Power Node (LPN)** 적용 가능 |
| **보안 결제 트랜잭션** | BLE Mesh AES-CCM + Gateway 측 TLS 1.3 |
| **무인 24/7 운영** | DGIST 시설운영팀 단일 대시보드 + 자동 알림 |

### 11.4 BLE Mesh 상업 채택 통계 (2024)

| 통계 | 출처 | 의미 |
|---|---|---|
| **상업용 BLE Mesh 채택 +45% YoY (2024)** | Bluetooth SIG | 검증된 양산 기술 |
| **occupancy 센서 통합 시 효율 60% 개선** | 산업 보고서 | DGIST 절감량 산출 근거 |
| **sensor-based lighting = 전체 설치 54%** | 산업 보고서 | 본 시스템 적합 |

## 12. 인증 (KS·KC·KCC)

| 인증 | 적용 부품 | 필요 시점 |
|---|---|---|
| KC (전기·전자기기) | Gateway, Node 모듈 | 양산 직전 |
| KCC (전파인증) | BLE 2.4GHz, LTE 모뎀 | 양산 직전 |
| KS C IEC 60598 | LED 등기구 본체 (제조사 측) | 등기구 측 |
| 고효율에너지기자재 인증 | LED 등기구 본체 (제조사 측) | 시방서 §제2장 양식7 LED 조명 성능기록표 |

> ⚙ UTTEC 측 책임 범위 = Gateway/Node 모듈 인증. 등기구 본체 인증은 LED 제조사 측 책임 (단, ESCO 사업자가 통합 보증 시 통합 인증 가능).

## 13. 다음 문서

- **03_IR_통신_그룹제어시스템.md** — §2.1 IR chain 상세 설계
- **04_계통도_및_구현방법.md** — 통합 BOM·펌웨어·운영 시나리오·인증
