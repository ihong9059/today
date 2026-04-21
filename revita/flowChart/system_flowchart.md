# System Project — 전체 Flow Chart

## Obsidian에서 보는 방법

### Vault 열기
1. Obsidian 실행
2. 좌하단 **Vault 이름** 클릭 → **"보관함 관리하기..."** 클릭
3. **"폴더를 보관함으로 열기"** 선택 → `C:\todo\revitaProject` 열기

### 다이어그램 보기
- **읽기 모드** (`Ctrl + E` 토글): Mermaid 다이어그램이 **그림으로 렌더링**됨
- **편집 모드** (`Ctrl + E` 토글): 코드 블록이 텍스트로 보임 (편집 가능)
- Mermaid는 Obsidian **기본 내장** 기능이므로 플러그인 설치 불필요

### 수정 방법
1. 편집 모드에서 ` ```mermaid ` 블록 안의 텍스트를 수정
2. 읽기 모드로 전환하면 변경사항 즉시 반영

### 이미지 내보내기
- 읽기 모드에서 다이어그램 위 **우클릭 → "이미지로 복사"** → 다른 문서에 붙여넣기 가능

---

## 1. 부팅 시퀀스

```mermaid
flowchart TD
    BOOT[Zephyr 커널 부팅] --> HW[하드웨어 초기화<br/>GPIO, SPI, UART, SX1262]
    HW --> MAIN["main()"]

    MAIN --> CRON_TEST[CRON 셀프 테스트]
    CRON_TEST --> NVS_INIT[device_manager_nvs_init<br/>NVS 파티션 마운트]
    NVS_INIT --> NVS_TEST[NVS API 셀프 테스트]
    NVS_TEST --> NVS_NEG[NVS 부정 테스트]

    NVS_NEG --> P1{Phase 1: init}
    P1 --> LORA_INIT[lora_module_init<br/>lora_svc 스레드 생성]
    P1 --> DM_INIT[device_manager_init<br/>dm 스레드 생성]
    P1 --> SENSOR_INIT[sensor_module_init<br/>stub]
    P1 --> POWER_INIT[power_module_init<br/>power 스레드 생성<br/>ADC/GPIO 설정]
    P1 --> VALVE_INIT[valve_module_init<br/>stub]
    P1 --> SEC_INIT[security_module_init<br/>security 스레드 생성<br/>진동 ISR 등록]

    LORA_INIT --> P2{Phase 2: activate}
    DM_INIT --> P2
    SENSOR_INIT --> P2
    POWER_INIT --> P2
    VALVE_INIT --> P2
    SEC_INIT --> P2

    P2 --> LORA_ACT["① lora_module_activate()<br/>RX 비동기 시작"]
    LORA_ACT --> DM_ACT["② device_manager_activate()<br/>NVS seed time 읽기"]
    DM_ACT --> SENSOR_ACT["③ sensor_module_activate()"]
    SENSOR_ACT --> POWER_ACT["③ power_module_activate()<br/>NVS config 로드"]
    POWER_ACT --> VALVE_ACT["③ valve_module_activate()"]
    VALVE_ACT --> SEC_ACT["③ security_module_activate()"]
    SEC_ACT --> IDLE[main 종료<br/>Zephyr idle 스레드로 전환]

    style BOOT fill:#2d5a27,color:#fff
    style P1 fill:#8b6914,color:#fff
    style P2 fill:#8b6914,color:#fff
    style IDLE fill:#1a3a5c,color:#fff
```

---

## 2. 모듈 구조도 (스레드 & 상호작용)

```mermaid
flowchart TB
    subgraph ISR["ISR 레이어"]
        LORA_ISR[LoRa RX ISR<br/>lora_rx_async_cb]
        VIB_ISR[진동 센서 ISR<br/>P0.21 FALLING]
        ACK_TIMER[ACK Monitor<br/>k_timer]
        BATT_TIMER[Battery Schedule<br/>k_timer]
    end

    subgraph THREADS["스레드 레이어"]
        LORA_THR["lora_svc<br/>COOP(5)<br/>4096B 스택"]
        DM_THR["dm_thread<br/>PREEMPT(7)<br/>1024B 스택"]
        POWER_THR["power_thread<br/>PREEMPT(8)<br/>1024B 스택"]
        SEC_THR["security_thread<br/>PREEMPT(7)<br/>1024B 스택"]
    end

    subgraph HW["하드웨어"]
        SX1262[SX1262<br/>LoRa 트랜시버]
        ADC[ADC AIN7<br/>배터리 전압]
        GPIO_12V[GPIO P0.17<br/>12V 게이트]
        GPIO_BUZZ[GPIO P0.24<br/>부저]
        GPIO_VIB[GPIO P0.21<br/>진동 센서]
    end

    LORA_ISR -->|lora_rx_queue| LORA_THR
    VIB_ISR -->|security_queue| SEC_THR
    ACK_TIMER -->|lora_cmd_queue| LORA_THR
    BATT_TIMER -->|power_queue| POWER_THR

    LORA_THR -->|"디스패치<br/>module_handle_cmd()"| DM_THR
    LORA_THR -->|디스패치| POWER_THR
    LORA_THR -->|디스패치| SEC_THR

    DM_THR -->|"set_state(ACTIVE)"| POWER_THR
    DM_THR -->|"enqueue_tx(NOTIFY)"| LORA_THR
    POWER_THR -->|"enqueue_tx(DATA)"| LORA_THR
    SEC_THR -->|"enqueue_tx(NOTIFY)"| LORA_THR
    SEC_THR -->|"request/release_12v"| POWER_THR

    LORA_THR --- SX1262
    POWER_THR --- ADC
    POWER_THR --- GPIO_12V
    SEC_THR --- GPIO_BUZZ
    GPIO_VIB --- VIB_ISR

    style ISR fill:#5c1a1a,color:#fff
    style THREADS fill:#1a3a5c,color:#fff
    style HW fill:#3a3a3a,color:#fff
```

---

## 3. LoRa RX 수신 흐름

```mermaid
flowchart TD
    RX_ISR["lora_rx_async_cb()<br/>ISR"] -->|"dest == MY_ID?"| FILTER{node_id 필터}
    FILTER -->|NO| DROP[무시 + rejected 카운트]
    FILTER -->|YES| ENQUEUE["lora_rx_queue.put()"]

    ENQUEUE --> SVC["lora_service_thread<br/>k_poll 대기"]
    SVC --> HANDLE["lora_handle_rx_buf()"]

    HANDLE --> IS_ACK{ACK 프레임?}
    IS_ACK -->|YES| ACK_MATCH["ack_table_match_and_remove()"]
    ACK_MATCH --> ACK_CB["ack_callback(true)<br/>재전송 중단"]

    IS_ACK -->|NO| NEEDS_ACK{ACK 필요?<br/>CREATE/DELETE/UPDATE}
    NEEDS_ACK -->|YES| ROUTE["lora_rx_route_by_module()"]
    NEEDS_ACK -->|NO| LOG_OTHER[기타 프레임 로그]

    ROUTE --> MOD_TYPE{module_type?}
    MOD_TYPE -->|"0x0, 0x1"| VALVE[valve_module_handle_cmd]
    MOD_TYPE -->|"0x2"| SENSOR[sensor_module_handle_cmd]
    MOD_TYPE -->|"0x3"| POWER[power_module_handle_cmd]
    MOD_TYPE -->|"0x4"| DM[device_manager_handle_cmd]
    MOD_TYPE -->|"0x6"| SEC[security_module_handle_cmd]
    MOD_TYPE -->|"0x7"| SELF[LoRa 자체 처리]

    VALVE --> HANDOFF{핸드오프 성공?}
    SENSOR --> HANDOFF
    POWER --> HANDOFF
    DM --> HANDOFF
    SEC --> HANDOFF
    SELF --> HANDOFF

    HANDOFF -->|YES| SEND_ACK["ACK 응답 인큐<br/>lora_cmd_queue"]
    HANDOFF -->|NO| SUPPRESS[ACK 억제<br/>Gateway 재전송 유도]

    style RX_ISR fill:#5c1a1a,color:#fff
    style ACK_CB fill:#2d5a27,color:#fff
    style SEND_ACK fill:#2d5a27,color:#fff
    style DROP fill:#5c1a1a,color:#fff
    style SUPPRESS fill:#8b6914,color:#fff
```

---

## 4. LoRa TX 송신 + ACK 재전송 흐름

```mermaid
flowchart TD
    MODULE["모듈에서 호출<br/>lora_module_enqueue_tx()"] --> ASSEMBLE["16B 프레임 조립<br/>[0:1]=dest_id [2]=pkt_id [3:15]=tail"]
    ASSEMBLE --> ACK_FULL{ACK 테이블 만석?}
    ACK_FULL -->|YES| REJECT["거절 return false"]
    ACK_FULL -->|NO| CMD_Q["lora_cmd_queue.put<br/>CMD_TX_REQUEST"]

    CMD_Q --> SVC["lora_service_thread"]
    SVC --> DO_TX["lora_do_tx()"]
    DO_TX --> STOP_RX["stop_async_rx()"]
    STOP_RX --> CONFIG["apply_modem_config(TX)<br/>922MHz, SF7, BW125, 14dBm"]
    CONFIG --> SEND["lora_send(frame, 16)"]
    SEND --> START_RX["start_async_rx()<br/>RX 모드 복귀"]

    START_RX --> NEED_ACK{need_ack?}
    NEED_ACK -->|NO| DONE_TX[완료 - IDLE]
    NEED_ACK -->|YES| REG["ack_table_register()<br/>entry=WAITING<br/>retry_count=0"]
    REG --> TIMER_SET["ack_monitor_timer<br/>2000ms 설정"]

    TIMER_SET --> WAIT{대기 중...}
    WAIT -->|ACK 수신| ACK_OK["ack_table_match_and_remove()<br/>ack_callback(true)"]
    WAIT -->|2000ms 타임아웃| TIMEOUT{retry_count < 3?}
    TIMEOUT -->|YES| RETRY["재전송<br/>retry_count++"]
    RETRY --> TIMER_SET
    TIMEOUT -->|NO| FAIL["ack_callback(false)<br/>entry=FREE<br/>최종 실패"]

    style MODULE fill:#1a3a5c,color:#fff
    style ACK_OK fill:#2d5a27,color:#fff
    style FAIL fill:#5c1a1a,color:#fff
    style REJECT fill:#5c1a1a,color:#fff
```

---

## 5. Device Manager 시간 동기화 흐름

```mermaid
flowchart TD
    GW["Gateway 송신<br/>CREATE(0x14)<br/>epoch + time_ms + tz"] --> LORA[lora_module 수신]
    LORA --> DISPATCH["device_manager_handle_cmd()<br/>dm_queue.put()"]
    LORA --> ACK_SEND["ACK 즉시 응답"]

    DISPATCH --> DM_THR["dm_thread<br/>handle_time_sync()"]
    DM_THR --> VALIDATE{유효성 검증<br/>fixed_zero? epoch 범위?<br/>time_ms < 1000?}

    VALIDATE -->|FAIL| REJECT["END(rejected, 0x74)<br/>uplink 전송"]

    VALIDATE -->|OK| SYNC["RAM 동기화<br/>synced_epoch_sec = epoch<br/>time_synced = true"]
    SYNC --> NVS_WRITE["NVS 저장<br/>nvs_write_time_sync()"]
    NVS_WRITE --> NOTIFY["NOTIFY(applied, 0x34)<br/>uplink 전송"]
    NOTIFY --> STATE["상태 전환<br/>ACTIVATING → ACTIVATED_NORMAL"]
    STATE --> POWER_ACT["power_module_set_state(ACTIVE)"]
    POWER_ACT --> CRON_ARM["power_arm_battery_schedule_timer()<br/>CRON 배터리 슬롯 시작"]

    style GW fill:#3a3a3a,color:#fff
    style SYNC fill:#2d5a27,color:#fff
    style CRON_ARM fill:#1a3a5c,color:#fff
    style REJECT fill:#5c1a1a,color:#fff
```

---

## 6. Power 모듈 — 배터리 모니터링 + 12V 제어

```mermaid
flowchart TD
    subgraph CRON["CRON 배터리 스케줄"]
        ARM["power_arm_battery_schedule_timer()"]
        ARM --> SYNCED{time_synced?}
        SYNCED -->|NO| SKIP[타이머 미설정]
        SYNCED -->|YES| CALC["cron_next_fire_delta_ms()<br/>다음 hour:minute 슬롯 계산"]
        CALC --> SET_TIMER["k_timer_start(delta_ms)"]
        SET_TIMER --> FIRE["타이머 발동"]
        FIRE --> PWR_Q["power_queue.put<br/>BATTERY_SLOT"]
    end

    subgraph MONITOR["배터리 모니터링"]
        PWR_Q --> PWR_THR["power_thread"]
        PWR_THR --> ACTIVE_CHK{ACTIVE 상태?}
        ACTIVE_CHK -->|NO| SKIP2[무시]
        ACTIVE_CHK -->|YES| READ_ADC["ADC 읽기 (AIN7 P0.31)<br/>mv = raw * 3600 / 4095 * 2"]
        READ_ADC --> UPLINK["DATA(0x63) uplink<br/>battery_mv BE16"]
        UPLINK --> REARM["타이머 재설정"]
        REARM --> ARM
    end

    subgraph V12["12V 게이트 제어"]
        REQ["power_module_request_12v(req)"]
        REL["power_module_release_12v(req)"]
        REQ --> OR["atomic_or(mask, req)"]
        REL --> AND["atomic_and(mask, ~req)"]
        OR --> PIN["v12_update_pin()<br/>GPIO P0.17"]
        AND --> PIN
        PIN --> ON_OFF{"mask != 0?"}
        ON_OFF -->|YES| GPIO_HIGH["P0.17 = HIGH<br/>12V ON"]
        ON_OFF -->|NO| GPIO_LOW["P0.17 = LOW<br/>12V OFF"]
    end

    style CRON fill:#1a3a5c,color:#fff
    style MONITOR fill:#2d5a27,color:#fff
    style V12 fill:#8b6914,color:#fff
```

---

## 7. Security 모듈 — 진동 감지 + 알람

```mermaid
flowchart TD
    VIB["진동 센서 P0.21<br/>FALLING edge"] --> ISR["vib_isr()"]
    ISR --> SEC_Q["security_queue.put<br/>SEC_CMD_VIBRATION"]

    SEC_Q --> SEC_THR["security_thread"]
    SEC_THR --> HANDLE["handle_vibration_pulse()"]
    HANDLE --> ALREADY{이미 ALARM?}
    ALREADY -->|YES| IGN[무시]
    ALREADY -->|NO| MERGE{"< 50ms 이내?<br/>(HIT_MERGE)"}
    MERGE -->|YES| IGN2[중복 무시]
    MERGE -->|NO| WINDOW["슬라이딩 윈도우<br/>5000ms 내 유효 히트 계산"]
    WINDOW --> THRESHOLD{"hit_count >= 3?"}
    THRESHOLD -->|NO| WAIT[대기 - 카운트 누적]
    THRESHOLD -->|YES| ALARM["enter_alarm()"]

    ALARM --> BUZZER["부저 ON<br/>P0.24 = 1"]
    ALARM --> V12_REQ["power_module_request_12v<br/>SECURITY"]
    ALARM --> SESSION_CHK{LoRa 세션 활성?}
    SESSION_CHK -->|YES| NOTIFY["NOTIFY(TILT, 0x36)<br/>uplink"]
    SESSION_CHK -->|NO| SUPPRESS["NOTIFY 억제<br/>로컬 알람만"]

    subgraph DISARM["알람 해제"]
        DELETE_RX["RX DELETE"] --> DISARM_CMD["security_queue.put<br/>SEC_CMD_SESSION_END"]
        DISARM_CMD --> CLEAR["enter_normal()"]
        CLEAR --> BUZZ_OFF["부저 OFF"]
        CLEAR --> V12_REL["power_module_release_12v"]
        CLEAR --> END_TX["END(0x76) uplink"]
    end

    style VIB fill:#3a3a3a,color:#fff
    style ALARM fill:#5c1a1a,color:#fff
    style CLEAR fill:#2d5a27,color:#fff
```

---

## 8. 전체 메시지 흐름 통합도

```mermaid
flowchart LR
    subgraph GATEWAY["Tower (Gateway)"]
        GW_TX[TX: CREATE/DELETE/UPDATE]
        GW_RX[RX: DATA/NOTIFY/END/ACK]
    end

    subgraph RF["922MHz LoRa<br/>SF7 BW125 14dBm"]
        RADIO((RF))
    end

    subgraph LINK["Link Node (RAK4631)"]
        subgraph LORA_MOD["lora_module"]
            RX_Q[rx_queue<br/>16 slots]
            CMD_Q[cmd_queue<br/>8 slots]
            ACK_TBL[ACK 테이블<br/>16 entries]
            DISPATCHER[RX 디스패처]
        end

        subgraph DM_MOD["device_manager"]
            DM_Q[dm_queue<br/>4 slots]
            NVS[(NVS Flash)]
            TIME[시간 동기화]
        end

        subgraph PWR_MOD["power_module"]
            PWR_Q2[power_queue<br/>4 slots]
            ADC2[ADC 배터리]
            V12_2[12V 게이트]
            CRON2[CRON 스케줄]
        end

        subgraph SEC_MOD["security_module"]
            SEC_Q2[security_queue<br/>8 slots]
            VIB2[진동 감지]
            BUZ2[부저]
        end

        subgraph STUB["Stub 모듈"]
            SENSOR2[sensor_module]
            VALVE2[valve_module]
        end
    end

    GW_TX --> RADIO --> RX_Q
    RX_Q --> DISPATCHER

    DISPATCHER -->|"mod=0x4"| DM_Q
    DISPATCHER -->|"mod=0x3"| PWR_Q2
    DISPATCHER -->|"mod=0x6"| SEC_Q2
    DISPATCHER -->|"mod=0x0,0x1"| VALVE2
    DISPATCHER -->|"mod=0x2"| SENSOR2

    DM_Q --> TIME
    TIME --> NVS
    TIME -->|"set_state(ACTIVE)"| PWR_Q2
    TIME -->|"NOTIFY(applied)"| CMD_Q

    PWR_Q2 --> ADC2
    PWR_Q2 --> V12_2
    CRON2 --> PWR_Q2
    ADC2 -->|"DATA(battery)"| CMD_Q

    SEC_Q2 --> VIB2
    SEC_Q2 --> BUZ2
    VIB2 -->|"NOTIFY(tilt)"| CMD_Q
    SEC_Q2 -->|"request_12v"| V12_2

    CMD_Q --> ACK_TBL
    ACK_TBL --> RADIO
    RADIO --> GW_RX

    style GATEWAY fill:#3a3a3a,color:#fff
    style RF fill:#8b6914,color:#fff
    style LORA_MOD fill:#1a3a5c,color:#fff
    style DM_MOD fill:#2d5a27,color:#fff
    style PWR_MOD fill:#5c4a1a,color:#fff
    style SEC_MOD fill:#5c1a1a,color:#fff
    style STUB fill:#555,color:#fff
```

---

## 9. 프로토콜 프레임 구조 (16B 고정)

```
Byte:  0    1    2    3    4    5    6   ...   15
     +----+----+----+----+----+----+----+---+----+
     |dest_node_id |pkt |type|         body        |
     |  (BE u16)   | id |mod |     (12 bytes)      |
     +----+----+----+----+----+----+----+---+----+
```

### 구현된 메시지 타입

| 메시지 | type_mod | 방향 | body 내용 |
|--------|----------|------|-----------|
| DATA battery | 0x63 | Link→Tower | [4-5] battery_mv (BE16) |
| ACK power | 0x03 | Tower→Link | 전부 0 |
| CREATE sensor | 0x12 | Tower→Link | [4] device_index |
| ACK sensor | 0x02 | Link→Tower | 전부 0 |
| CREATE DM | 0x14 | Tower→Link | epoch + time_ms + tz |
| NOTIFY applied | 0x34 | Link→Tower | 상태 확인 |
| END rejected | 0x74 | Link→Tower | 거부 사유 |
| NOTIFY security | 0x36 | Link→Tower | event_code |
| END security | 0x76 | Link→Tower | end_reason |

---

## 10. 핀 맵 (RAK4631 / nRF52840)

| 기능 | 핀 | 방향 |
|------|-----|------|
| Debug TX | P0.16 | OUT |
| Debug RX | P0.15 | IN |
| RS485 TX | P0.20 | OUT |
| RS485 RX | P0.19 | IN |
| RS485 DE | P1.04 | OUT |
| RS485 RE# | P1.03 | OUT |
| 12V Enable | P0.17 | OUT |
| Buzzer | P0.24 | OUT |
| Battery ADC | P0.31 (AIN7) | IN |
| Vibration | P0.21 | IN |
| Valve X A/B/PWM | P0.14/P0.13/P0.04 | OUT |
| Valve Y A/B/PWM | P0.25/P1.01/P1.02 | OUT |

---

*생성일: 2026-04-20*
*소스: apps/system/src/ (10개 파일)*
