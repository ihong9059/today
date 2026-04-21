import requests, json, os, time

TOKEN = os.environ.get('NOTION_TOKEN')
PAGE_ID = '348cb620-8c2b-814f-8cfb-ef3aa76c5499'
headers = {
    'Authorization': f'Bearer {TOKEN}',
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
}

def add_blocks(blocks):
    data = {'children': blocks}
    r = requests.patch(f'https://api.notion.com/v1/blocks/{PAGE_ID}/children', headers=headers, json=data)
    return r.status_code == 200, r.status_code

def h1(text): return {'object':'block','type':'heading_1','heading_1':{'rich_text':[{'type':'text','text':{'content':text}}]}}
def h2(text): return {'object':'block','type':'heading_2','heading_2':{'rich_text':[{'type':'text','text':{'content':text}}]}}
def h3(text): return {'object':'block','type':'heading_3','heading_3':{'rich_text':[{'type':'text','text':{'content':text}}]}}
def para(text): return {'object':'block','type':'paragraph','paragraph':{'rich_text':[{'type':'text','text':{'content':text[:2000]}}]}}
def bullet(text): return {'object':'block','type':'bulleted_list_item','bulleted_list_item':{'rich_text':[{'type':'text','text':{'content':text[:2000]}}]}}
def divider(): return {'object':'block','type':'divider','divider':{}}

def code_block(text, lang='mermaid'):
    if len(text) <= 2000:
        return {'object':'block','type':'code','code':{'rich_text':[{'type':'text','text':{'content':text}}],'language':lang}}
    else:
        return {'object':'block','type':'code','code':{'rich_text':[{'type':'text','text':{'content':text[:2000]}}],'language':lang}}

def send_batch(name, blocks):
    ok, code = add_blocks(blocks)
    print(f'{name}: {"OK" if ok else "FAIL"} ({code})')
    time.sleep(0.4)
    return ok

# ============================================================
# Batch 1: Obsidian 사용방법
# ============================================================
send_batch('Batch 1: Obsidian 사용방법', [
    h1('Obsidian에서 Flowchart 보는 방법'),
    h2('1. Vault 열기'),
    bullet('Obsidian 실행'),
    bullet('좌하단 Vault 이름 클릭 → "보관함 관리하기..." 클릭'),
    bullet('"폴더를 보관함으로 열기" (Open folder as vault) 선택'),
    bullet('C:\\todo\\revitaProject 폴더 선택 → 열기'),
    h2('2. Flowchart 파일 찾기'),
    para('좌측 파일 탐색기에서: zephyr_workspace → apps → flowChart → system_flowchart.md'),
    h2('3. 다이어그램 보기'),
    bullet('읽기 모드 (Ctrl + E 토글): Mermaid 다이어그램이 그림으로 렌더링됨'),
    bullet('편집 모드 (Ctrl + E 토글): 코드 블록이 텍스트로 보임 (편집 가능)'),
    para('읽기 모드로 전환하면 8개 다이어그램이 모두 그래픽으로 표시됩니다.'),
    h2('4. 다이어그램 수정 방법'),
    bullet('Ctrl + E로 편집 모드 전환'),
    bullet('mermaid 블록 안의 텍스트를 수정'),
    bullet('Ctrl + E로 읽기 모드 전환하면 변경사항 즉시 반영'),
    h2('5. 이미지 내보내기'),
    bullet('읽기 모드에서 다이어그램 위 우클릭 → "이미지로 복사" → 다른 문서에 붙여넣기'),
    bullet('Mermaid는 Obsidian 기본 내장 기능 (플러그인 설치 불필요)'),
    divider(),
])

# ============================================================
# Batch 2: 부팅 시퀀스
# ============================================================
mermaid_boot = """flowchart TD
    BOOT[Zephyr 커널 부팅] --> HW[하드웨어 초기화 GPIO, SPI, UART, SX1262]
    HW --> MAIN["main()"]
    MAIN --> CRON_TEST[CRON 셀프 테스트]
    CRON_TEST --> NVS_INIT[device_manager_nvs_init NVS 파티션 마운트]
    NVS_INIT --> NVS_TEST[NVS API 셀프 테스트]
    NVS_TEST --> NVS_NEG[NVS 부정 테스트]
    NVS_NEG --> P1{Phase 1: init}
    P1 --> LORA_INIT[lora_module_init lora_svc 스레드 생성]
    P1 --> DM_INIT[device_manager_init dm 스레드 생성]
    P1 --> SENSOR_INIT[sensor_module_init stub]
    P1 --> POWER_INIT[power_module_init power 스레드 생성 ADC/GPIO 설정]
    P1 --> VALVE_INIT[valve_module_init stub]
    P1 --> SEC_INIT[security_module_init security 스레드 생성 진동 ISR 등록]
    LORA_INIT --> P2{Phase 2: activate}
    DM_INIT --> P2
    SENSOR_INIT --> P2
    POWER_INIT --> P2
    VALVE_INIT --> P2
    SEC_INIT --> P2
    P2 --> LORA_ACT["1 lora_module_activate() RX 비동기 시작"]
    LORA_ACT --> DM_ACT["2 device_manager_activate() NVS seed time 읽기"]
    DM_ACT --> SENSOR_ACT["3 sensor_module_activate()"]
    SENSOR_ACT --> POWER_ACT["3 power_module_activate() NVS config 로드"]
    POWER_ACT --> VALVE_ACT["3 valve_module_activate()"]
    VALVE_ACT --> SEC_ACT["3 security_module_activate()"]
    SEC_ACT --> IDLE[main 종료 Zephyr idle 스레드로 전환]"""

send_batch('Batch 2: 부팅 시퀀스', [
    h1('System Project — 전체 Flow Chart'),
    h2('1. 부팅 시퀀스'),
    code_block(mermaid_boot),
    divider(),
])

# ============================================================
# Batch 3: 모듈 구조도
# ============================================================
mermaid_modules = """flowchart TB
    subgraph ISR["ISR 레이어"]
        LORA_ISR[LoRa RX ISR lora_rx_async_cb]
        VIB_ISR[진동 센서 ISR P0.21 FALLING]
        ACK_TIMER[ACK Monitor k_timer]
        BATT_TIMER[Battery Schedule k_timer]
    end
    subgraph THREADS["스레드 레이어"]
        LORA_THR["lora_svc COOP(5) 4096B"]
        DM_THR["dm_thread PREEMPT(7) 1024B"]
        POWER_THR["power_thread PREEMPT(8) 1024B"]
        SEC_THR["security_thread PREEMPT(7) 1024B"]
    end
    subgraph HW["하드웨어"]
        SX1262[SX1262 LoRa]
        ADC[ADC AIN7 배터리]
        GPIO_12V[GPIO P0.17 12V]
        GPIO_BUZZ[GPIO P0.24 부저]
        GPIO_VIB[GPIO P0.21 진동]
    end
    LORA_ISR -->|lora_rx_queue| LORA_THR
    VIB_ISR -->|security_queue| SEC_THR
    ACK_TIMER -->|lora_cmd_queue| LORA_THR
    BATT_TIMER -->|power_queue| POWER_THR
    LORA_THR -->|디스패치| DM_THR
    LORA_THR -->|디스패치| POWER_THR
    LORA_THR -->|디스패치| SEC_THR
    DM_THR -->|set_state ACTIVE| POWER_THR
    DM_THR -->|enqueue_tx NOTIFY| LORA_THR
    POWER_THR -->|enqueue_tx DATA| LORA_THR
    SEC_THR -->|enqueue_tx NOTIFY| LORA_THR
    SEC_THR -->|request_release_12v| POWER_THR
    LORA_THR --- SX1262
    POWER_THR --- ADC
    POWER_THR --- GPIO_12V
    SEC_THR --- GPIO_BUZZ
    GPIO_VIB --- VIB_ISR"""

send_batch('Batch 3: 모듈 구조도', [
    h2('2. 모듈 구조도 (스레드 & 상호작용)'),
    code_block(mermaid_modules),
    divider(),
])

# ============================================================
# Batch 4: LoRa RX 수신 흐름
# ============================================================
mermaid_rx = """flowchart TD
    RX_ISR["lora_rx_async_cb() ISR"] --> FILTER{node_id 필터}
    FILTER -->|NO| DROP[무시 + rejected 카운트]
    FILTER -->|YES| ENQUEUE["lora_rx_queue.put()"]
    ENQUEUE --> SVC["lora_service_thread k_poll 대기"]
    SVC --> HANDLE["lora_handle_rx_buf()"]
    HANDLE --> IS_ACK{ACK 프레임?}
    IS_ACK -->|YES| ACK_MATCH["ack_table_match_and_remove()"]
    ACK_MATCH --> ACK_CB["ack_callback(true) 재전송 중단"]
    IS_ACK -->|NO| NEEDS_ACK{ACK 필요? CREATE/DELETE/UPDATE}
    NEEDS_ACK -->|YES| ROUTE["lora_rx_route_by_module()"]
    NEEDS_ACK -->|NO| LOG_OTHER[기타 프레임 로그]
    ROUTE --> MOD_TYPE{module_type?}
    MOD_TYPE -->|0x0 0x1| VALVE[valve_module_handle_cmd]
    MOD_TYPE -->|0x2| SENSOR[sensor_module_handle_cmd]
    MOD_TYPE -->|0x3| POWER[power_module_handle_cmd]
    MOD_TYPE -->|0x4| DM[device_manager_handle_cmd]
    MOD_TYPE -->|0x6| SEC[security_module_handle_cmd]
    MOD_TYPE -->|0x7| SELF[LoRa 자체 처리]
    VALVE --> HANDOFF{핸드오프 성공?}
    SENSOR --> HANDOFF
    POWER --> HANDOFF
    DM --> HANDOFF
    SEC --> HANDOFF
    SELF --> HANDOFF
    HANDOFF -->|YES| SEND_ACK["ACK 응답 인큐 lora_cmd_queue"]
    HANDOFF -->|NO| SUPPRESS[ACK 억제 Gateway 재전송 유도]"""

send_batch('Batch 4: LoRa RX', [
    h2('3. LoRa RX 수신 흐름'),
    code_block(mermaid_rx),
    divider(),
])

# ============================================================
# Batch 5: LoRa TX + ACK 재전송
# ============================================================
mermaid_tx = """flowchart TD
    MODULE["모듈에서 호출 lora_module_enqueue_tx()"] --> ASSEMBLE["16B 프레임 조립"]
    ASSEMBLE --> ACK_FULL{ACK 테이블 만석?}
    ACK_FULL -->|YES| REJECT["거절 return false"]
    ACK_FULL -->|NO| CMD_Q["lora_cmd_queue.put CMD_TX_REQUEST"]
    CMD_Q --> SVC["lora_service_thread"]
    SVC --> DO_TX["lora_do_tx()"]
    DO_TX --> STOP_RX["stop_async_rx()"]
    STOP_RX --> CONFIG["apply_modem_config TX 922MHz SF7 BW125 14dBm"]
    CONFIG --> SEND["lora_send frame 16"]
    SEND --> START_RX["start_async_rx() RX 모드 복귀"]
    START_RX --> NEED_ACK{need_ack?}
    NEED_ACK -->|NO| DONE_TX[완료 IDLE]
    NEED_ACK -->|YES| REG["ack_table_register() entry=WAITING retry_count=0"]
    REG --> TIMER_SET["ack_monitor_timer 2000ms 설정"]
    TIMER_SET --> WAIT{대기 중...}
    WAIT -->|ACK 수신| ACK_OK["ack_callback true"]
    WAIT -->|2000ms 타임아웃| TIMEOUT{retry_count < 3?}
    TIMEOUT -->|YES| RETRY["재전송 retry_count++"]
    RETRY --> TIMER_SET
    TIMEOUT -->|NO| FAIL["ack_callback false 최종 실패"]"""

send_batch('Batch 5: LoRa TX + ACK', [
    h2('4. LoRa TX 송신 + ACK 재전송 흐름'),
    code_block(mermaid_tx),
    divider(),
])

# ============================================================
# Batch 6: DM 시간 동기화
# ============================================================
mermaid_dm = """flowchart TD
    GW["Gateway 송신 CREATE 0x14 epoch + time_ms + tz"] --> LORA[lora_module 수신]
    LORA --> DISPATCH["device_manager_handle_cmd() dm_queue.put()"]
    LORA --> ACK_SEND["ACK 즉시 응답"]
    DISPATCH --> DM_THR["dm_thread handle_time_sync()"]
    DM_THR --> VALIDATE{유효성 검증 fixed_zero? epoch 범위? time_ms < 1000?}
    VALIDATE -->|FAIL| REJECT["END rejected 0x74 uplink 전송"]
    VALIDATE -->|OK| SYNC["RAM 동기화 synced_epoch_sec = epoch time_synced = true"]
    SYNC --> NVS_WRITE["NVS 저장 nvs_write_time_sync()"]
    NVS_WRITE --> NOTIFY["NOTIFY applied 0x34 uplink 전송"]
    NOTIFY --> STATE["상태 전환 ACTIVATING → ACTIVATED_NORMAL"]
    STATE --> POWER_ACT["power_module_set_state ACTIVE"]
    POWER_ACT --> CRON_ARM["power_arm_battery_schedule_timer() CRON 배터리 슬롯 시작"]"""

send_batch('Batch 6: DM 시간 동기화', [
    h2('5. Device Manager 시간 동기화 흐름'),
    code_block(mermaid_dm),
    divider(),
])

# ============================================================
# Batch 7: Power 모듈
# ============================================================
mermaid_power = """flowchart TD
    subgraph CRON["CRON 배터리 스케줄"]
        ARM["power_arm_battery_schedule_timer()"]
        ARM --> SYNCED{time_synced?}
        SYNCED -->|NO| SKIP[타이머 미설정]
        SYNCED -->|YES| CALC["cron_next_fire_delta_ms() 다음 슬롯 계산"]
        CALC --> SET_TIMER["k_timer_start delta_ms"]
        SET_TIMER --> FIRE["타이머 발동"]
        FIRE --> PWR_Q["power_queue.put BATTERY_SLOT"]
    end
    subgraph MONITOR["배터리 모니터링"]
        PWR_Q --> PWR_THR["power_thread"]
        PWR_THR --> ACTIVE_CHK{ACTIVE 상태?}
        ACTIVE_CHK -->|NO| SKIP2[무시]
        ACTIVE_CHK -->|YES| READ_ADC["ADC 읽기 AIN7 P0.31 mv = raw * 3600 / 4095 * 2"]
        READ_ADC --> UPLINK["DATA 0x63 uplink battery_mv BE16"]
        UPLINK --> REARM["타이머 재설정"]
        REARM --> ARM
    end
    subgraph V12["12V 게이트 제어"]
        REQ["power_module_request_12v req"]
        REL["power_module_release_12v req"]
        REQ --> OR_OP["atomic_or mask req"]
        REL --> AND_OP["atomic_and mask ~req"]
        OR_OP --> PIN["v12_update_pin() GPIO P0.17"]
        AND_OP --> PIN
        PIN --> ON_OFF{"mask != 0?"}
        ON_OFF -->|YES| GPIO_HIGH["P0.17 = HIGH 12V ON"]
        ON_OFF -->|NO| GPIO_LOW["P0.17 = LOW 12V OFF"]
    end"""

send_batch('Batch 7: Power 모듈', [
    h2('6. Power 모듈 — 배터리 모니터링 + 12V 제어'),
    code_block(mermaid_power),
    divider(),
])

# ============================================================
# Batch 8: Security 모듈
# ============================================================
mermaid_sec = """flowchart TD
    VIB["진동 센서 P0.21 FALLING edge"] --> ISR["vib_isr()"]
    ISR --> SEC_Q["security_queue.put SEC_CMD_VIBRATION"]
    SEC_Q --> SEC_THR["security_thread"]
    SEC_THR --> HANDLE["handle_vibration_pulse()"]
    HANDLE --> ALREADY{이미 ALARM?}
    ALREADY -->|YES| IGN[무시]
    ALREADY -->|NO| MERGE{"< 50ms 이내? HIT_MERGE"}
    MERGE -->|YES| IGN2[중복 무시]
    MERGE -->|NO| WINDOW["슬라이딩 윈도우 5000ms 내 유효 히트 계산"]
    WINDOW --> THRESHOLD{"hit_count >= 3?"}
    THRESHOLD -->|NO| WAIT[대기 카운트 누적]
    THRESHOLD -->|YES| ALARM["enter_alarm()"]
    ALARM --> BUZZER["부저 ON P0.24 = 1"]
    ALARM --> V12_REQ["power_module_request_12v SECURITY"]
    ALARM --> SESSION_CHK{LoRa 세션 활성?}
    SESSION_CHK -->|YES| NOTIFY_SEND["NOTIFY TILT 0x36 uplink"]
    SESSION_CHK -->|NO| SUPPRESS["NOTIFY 억제 로컬 알람만"]
    subgraph DISARM["알람 해제"]
        DELETE_RX["RX DELETE"] --> DISARM_CMD["security_queue.put SEC_CMD_SESSION_END"]
        DISARM_CMD --> CLEAR["enter_normal()"]
        CLEAR --> BUZZ_OFF["부저 OFF"]
        CLEAR --> V12_REL["power_module_release_12v"]
        CLEAR --> END_TX["END 0x76 uplink"]
    end"""

send_batch('Batch 8: Security 모듈', [
    h2('7. Security 모듈 — 진동 감지 + 알람'),
    code_block(mermaid_sec),
    divider(),
])

# ============================================================
# Batch 9: 전체 통합도
# ============================================================
mermaid_full = """flowchart LR
    subgraph GATEWAY["Tower Gateway"]
        GW_TX[TX: CREATE/DELETE/UPDATE]
        GW_RX[RX: DATA/NOTIFY/END/ACK]
    end
    subgraph RF["922MHz LoRa SF7 BW125 14dBm"]
        RADIO((RF))
    end
    subgraph LINK["Link Node RAK4631"]
        subgraph LORA_MOD["lora_module"]
            RX_Q[rx_queue 16 slots]
            CMD_Q[cmd_queue 8 slots]
            ACK_TBL[ACK 테이블 16 entries]
            DISPATCHER[RX 디스패처]
        end
        subgraph DM_MOD["device_manager"]
            DM_Q[dm_queue 4 slots]
            NVS_STORE[(NVS Flash)]
            TIME_SYNC[시간 동기화]
        end
        subgraph PWR_MOD["power_module"]
            PWR_Q2[power_queue 4 slots]
            ADC2[ADC 배터리]
            V12_2[12V 게이트]
            CRON2[CRON 스케줄]
        end
        subgraph SEC_MOD["security_module"]
            SEC_Q2[security_queue 8 slots]
            VIB2[진동 감지]
            BUZ2[부저]
        end
        subgraph STUB_MOD["Stub 모듈"]
            SENSOR2[sensor_module]
            VALVE2[valve_module]
        end
    end
    GW_TX --> RADIO --> RX_Q
    RX_Q --> DISPATCHER
    DISPATCHER -->|mod=0x4| DM_Q
    DISPATCHER -->|mod=0x3| PWR_Q2
    DISPATCHER -->|mod=0x6| SEC_Q2
    DISPATCHER -->|mod=0x0 0x1| VALVE2
    DISPATCHER -->|mod=0x2| SENSOR2
    DM_Q --> TIME_SYNC
    TIME_SYNC --> NVS_STORE
    TIME_SYNC -->|set_state ACTIVE| PWR_Q2
    TIME_SYNC -->|NOTIFY applied| CMD_Q
    PWR_Q2 --> ADC2
    PWR_Q2 --> V12_2
    CRON2 --> PWR_Q2
    ADC2 -->|DATA battery| CMD_Q
    SEC_Q2 --> VIB2
    SEC_Q2 --> BUZ2
    VIB2 -->|NOTIFY tilt| CMD_Q
    SEC_Q2 -->|request_12v| V12_2
    CMD_Q --> ACK_TBL
    ACK_TBL --> RADIO
    RADIO --> GW_RX"""

send_batch('Batch 9: 전체 통합도', [
    h2('8. 전체 메시지 흐름 통합도'),
    code_block(mermaid_full),
    divider(),
])

# ============================================================
# Batch 10: 프로토콜 + 핀맵
# ============================================================
frame_struct = """Byte:  0    1    2    3    4    5    6   ...   15
     +----+----+----+----+----+----+----+---+----+
     |dest_node_id |pkt |type|         body        |
     |  (BE u16)   | id |mod |     (12 bytes)      |
     +----+----+----+----+----+----+----+---+----+"""

send_batch('Batch 10: 프로토콜 + 핀맵', [
    h2('9. 프로토콜 프레임 구조 (16B 고정)'),
    code_block(frame_struct, 'plain text'),
    h3('구현된 메시지 타입'),
    bullet('DATA battery (0x63) Link→Tower: [4-5] battery_mv (BE16)'),
    bullet('ACK power (0x03) Tower→Link: 전부 0'),
    bullet('CREATE sensor (0x12) Tower→Link: [4] device_index'),
    bullet('ACK sensor (0x02) Link→Tower: 전부 0'),
    bullet('CREATE DM (0x14) Tower→Link: epoch + time_ms + tz'),
    bullet('NOTIFY applied (0x34) Link→Tower: 상태 확인'),
    bullet('END rejected (0x74) Link→Tower: 거부 사유'),
    bullet('NOTIFY security (0x36) Link→Tower: event_code'),
    bullet('END security (0x76) Link→Tower: end_reason'),
    divider(),
    h2('10. 핀 맵 (RAK4631 / nRF52840)'),
    bullet('Debug TX: P0.16 (OUT) / Debug RX: P0.15 (IN)'),
    bullet('RS485 TX: P0.20 (OUT) / RS485 RX: P0.19 (IN)'),
    bullet('RS485 DE: P1.04 (OUT) / RS485 RE#: P1.03 (OUT)'),
    bullet('12V Enable: P0.17 (OUT) / Buzzer: P0.24 (OUT)'),
    bullet('Battery ADC: P0.31 AIN7 (IN) / Vibration: P0.21 (IN)'),
    bullet('Valve X A/B/PWM: P0.14/P0.13/P0.04 (OUT)'),
    bullet('Valve Y A/B/PWM: P0.25/P1.01/P1.02 (OUT)'),
    divider(),
    para('생성일: 2026-04-20 | 소스: apps/system/src/ (10개 파일)'),
])

print('\n=== 업로드 완료 ===')
