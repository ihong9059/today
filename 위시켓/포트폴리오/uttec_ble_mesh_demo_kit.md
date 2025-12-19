# UTTEC BLE Mesh Demo Kit 설명서

## 1. 제품 개요

### 1.1 제품 소개
UTTEC BLE Mesh Demo Kit는 Bluetooth Low Energy(BLE) Mesh 네트워크 기술을 학습하고 시연하기 위한 완벽한 개발 키트입니다. Raspberry Pi 기반 게이트웨이와 6개의 BLE Mesh 노드로 구성되어 있으며, 실제 IoT 환경에서의 메시 네트워크 동작을 체험할 수 있습니다.

### 1.2 주요 특징
- **완전한 BLE Mesh 네트워크 환경** 제공
- **6개 노드**로 다양한 토폴로지 구성 가능
- **Raspberry Pi 게이트웨이**로 실시간 모니터링
- **시각적 LED 표시**로 노드 상태 확인
- **휴대용 폼 케이스** 포함
- **교육 및 시연**에 최적화된 구성

---

## 2. 구성품

```
┌─────────────────────────────────────────────────────────────────┐
│                    UTTEC BLE Mesh Demo Kit                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌─────────┐  ┌─────────┐                │
│  │ Raspberry Pi │      │  No.1   │  │  No.2   │                │
│  │  + BLE HAT   │      │  DG:5   │  │  DG:5   │                │
│  │              │      │ [R][G]  │  │ [R][G]  │                │
│  └──────────────┘      └─────────┘  └─────────┘                │
│                                                                 │
│  ┌──────────────┐      ┌─────────┐  ┌─────────┐                │
│  │              │      │  No.3   │  │  No.4   │                │
│  │   (Empty)    │      │  DG:5   │  │  DG:5   │                │
│  │              │      │ [R][G]  │  │ [R][G]  │                │
│  └──────────────┘      └─────────┘  └─────────┘                │
│                                                                 │
│                        ┌─────────┐  ┌─────────┐                │
│                        │  No.5   │  │  No.6   │                │
│                        │  DG:5   │  │  DG:5   │                │
│                        │ [R][G]  │  │ [R][G]  │                │
│                        └─────────┘  └─────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 구성품 목록

| 항목 | 수량 | 설명 |
|------|------|------|
| Raspberry Pi Gateway | 1 | BLE HAT 장착, 메시 네트워크 게이트웨이 |
| BLE Mesh Node | 6 | No.1 ~ No.6, 개별 번호 부여 |
| 폼 케이스 | 1 | 휴대용 보관 케이스 |
| USB 케이블 | 1 | Raspberry Pi 전원용 |
| 충전 케이블 | 6 | 노드 충전용 (옵션) |

---

## 3. 하드웨어 상세 사양

### 3.1 Raspberry Pi Gateway

```
┌─────────────────────────────────────────┐
│         Raspberry Pi + BLE HAT          │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────┐  ┌─────────────────────────┐  │
│  │ USB │  │                         │  │
│  │ x4  │  │      BLE Module         │  │
│  ├─────┤  │      (nRF52832)         │  │
│  │ ETH │  │                         │  │
│  └─────┘  └─────────────────────────┘  │
│                    │                    │
│     ┌──────────────┴──────────────┐    │
│     │   I2C/UART Connection       │    │
│     │   (Red/Black/Yellow/Blue)   │    │
│     └─────────────────────────────┘    │
│                                         │
│  Model: Raspberry Pi 3/4                │
│  OS: Raspbian / Ubuntu                  │
│  BLE: nRF52832 (Mesh Provisioner)       │
│                                         │
└─────────────────────────────────────────┘
```

**게이트웨이 사양:**
- **SBC**: Raspberry Pi 3B+ / 4B
- **BLE 모듈**: nRF52832 기반 HAT
- **인터페이스**: I2C / UART
- **역할**: Mesh Provisioner, Gateway, 데이터 수집

### 3.2 BLE Mesh Node

```
┌─────────────────────────────────┐
│        BLE Mesh Node            │
├─────────────────────────────────┤
│                                 │
│     ┌───┐ ┌───┐                │
│     │ R │ │ G │   LED 표시등   │
│     └───┘ └───┘                │
│                                 │
│     ┌─────────┐                │
│     │  No.X   │   노드 번호    │
│     └─────────┘                │
│                                 │
│     ┌─────────────────┐        │
│     │     UTTEC       │        │
│     │     DG: 5       │        │
│     └─────────────────┘        │
│                                 │
│  MCU: nRF52832                 │
│  BLE: Bluetooth 5.0 Mesh       │
│  Power: CR2032 / Li-Po         │
│                                 │
└─────────────────────────────────┘
```

**노드 사양:**
- **MCU**: Nordic nRF52832
  - ARM Cortex-M4F @ 64MHz
  - 512KB Flash / 64KB RAM
  - BLE 5.0 지원
- **LED**: 2개 (Red, Green)
- **전원**: CR2032 배터리 또는 Li-Po 충전지
- **그룹**: DG:5 (Device Group 5)
- **역할**: Mesh Node (Relay 가능)

### 3.3 LED 상태 표시

| Red LED | Green LED | 상태 |
|---------|-----------|------|
| OFF | OFF | 대기/절전 모드 |
| OFF | 점멸 | 프로비저닝 대기 |
| OFF | ON | 정상 동작 |
| ON | OFF | 오류/경고 |
| 점멸 | 점멸 | 데이터 송수신 중 |
| ON | ON | 설정 모드 |

---

## 4. 시스템 아키텍처

### 4.1 BLE Mesh 네트워크 토폴로지

```
                         ┌─────────────────┐
                         │   Cloud/Server  │
                         │   (Optional)    │
                         └────────┬────────┘
                                  │
                         ┌────────▼────────┐
                         │  Raspberry Pi   │
                         │    Gateway      │
                         │  (Provisioner)  │
                         └────────┬────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
       ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
       │   Node 1    │◄───►│   Node 2    │◄───►│   Node 3    │
       │   (Relay)   │     │   (Relay)   │     │   (Relay)   │
       └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
              │                   │                   │
       ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
       │   Node 4    │◄───►│   Node 5    │◄───►│   Node 6    │
       │   (Relay)   │     │   (Relay)   │     │   (Relay)   │
       └─────────────┘     └─────────────┘     └─────────────┘

       ◄────────────────────────────────────────────────────►
                    BLE Mesh Network (Flood)
```

### 4.2 BLE Mesh 계층 구조

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│            (사용자 애플리케이션, 센서 데이터)                 │
├─────────────────────────────────────────────────────────────┤
│                    Foundation Models                         │
│         (Configuration, Health, Scene, Scheduler)           │
├─────────────────────────────────────────────────────────────┤
│                      Access Layer                           │
│              (Message Encryption/Decryption)                │
├─────────────────────────────────────────────────────────────┤
│                    Transport Layer                          │
│           (Segmentation, Reassembly, Retransmit)           │
├─────────────────────────────────────────────────────────────┤
│                     Network Layer                           │
│              (Relay, Proxy, Encryption)                     │
├─────────────────────────────────────────────────────────────┤
│                      Bearer Layer                           │
│              (Advertising, GATT Proxy)                      │
├─────────────────────────────────────────────────────────────┤
│                   BLE Core (Link Layer)                     │
│                     (nRF52832 BLE)                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. 소프트웨어 구성

### 5.1 Raspberry Pi Gateway 소프트웨어

#### 5.1.1 시스템 요구사항
```bash
# Raspberry Pi OS 설정
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3-pip python3-dev
sudo apt install -y bluetooth bluez libbluetooth-dev

# Python 라이브러리 설치
pip3 install bluepy pybluez asyncio
pip3 install flask flask-socketio
```

#### 5.1.2 BLE Mesh Gateway 코드

```python
#!/usr/bin/env python3
"""
UTTEC BLE Mesh Gateway
Raspberry Pi 기반 BLE Mesh Provisioner 및 데이터 수집기
"""

import asyncio
import struct
import time
from datetime import datetime
from bluepy import btle
import threading
import json

# ============================================================
# BLE Mesh 상수 정의
# ============================================================

MESH_PROVISIONING_UUID = "00001827-0000-1000-8000-00805f9b34fb"
MESH_PROXY_UUID = "00001828-0000-1000-8000-00805f9b34fb"

# 노드 주소 매핑
NODE_ADDRESSES = {
    1: 0x0001,
    2: 0x0002,
    3: 0x0003,
    4: 0x0004,
    5: 0x0005,
    6: 0x0006,
}

# Device Group
DEVICE_GROUP = 5

# ============================================================
# BLE Mesh Node 클래스
# ============================================================

class MeshNode:
    """BLE Mesh 노드 관리 클래스"""

    def __init__(self, node_id, address):
        self.node_id = node_id
        self.address = address
        self.mac_address = None
        self.rssi = 0
        self.is_online = False
        self.last_seen = None
        self.red_led = False
        self.green_led = False
        self.battery_level = 100
        self.relay_enabled = True

    def update_status(self, rssi, battery=None):
        """노드 상태 업데이트"""
        self.rssi = rssi
        self.is_online = True
        self.last_seen = datetime.now()
        if battery:
            self.battery_level = battery

    def to_dict(self):
        """딕셔너리로 변환"""
        return {
            'node_id': self.node_id,
            'address': hex(self.address),
            'mac_address': self.mac_address,
            'rssi': self.rssi,
            'is_online': self.is_online,
            'last_seen': str(self.last_seen) if self.last_seen else None,
            'red_led': self.red_led,
            'green_led': self.green_led,
            'battery_level': self.battery_level,
            'relay_enabled': self.relay_enabled
        }


# ============================================================
# BLE Mesh Gateway 클래스
# ============================================================

class BLEMeshGateway:
    """BLE Mesh 게이트웨이 메인 클래스"""

    def __init__(self):
        self.nodes = {}
        self.scanner = None
        self.is_running = False
        self.provisioned_nodes = []

        # 6개 노드 초기화
        for i in range(1, 7):
            self.nodes[i] = MeshNode(i, NODE_ADDRESSES[i])

        print("=" * 50)
        print("UTTEC BLE Mesh Gateway 초기화 완료")
        print(f"Device Group: DG:{DEVICE_GROUP}")
        print(f"등록 노드 수: {len(self.nodes)}")
        print("=" * 50)

    def scan_nodes(self, duration=5.0):
        """BLE 노드 스캔"""
        print(f"\n[SCAN] BLE 노드 스캔 시작 ({duration}초)...")

        try:
            scanner = btle.Scanner()
            devices = scanner.scan(duration)

            found_count = 0
            for dev in devices:
                # UTTEC 노드 필터링 (이름 또는 서비스 UUID로)
                for (adtype, desc, value) in dev.getScanData():
                    if "UTTEC" in value or "Mesh" in value:
                        # 노드 번호 추출
                        node_id = self._extract_node_id(value)
                        if node_id and node_id in self.nodes:
                            self.nodes[node_id].mac_address = dev.addr
                            self.nodes[node_id].update_status(dev.rssi)
                            found_count += 1
                            print(f"  [발견] Node {node_id}: {dev.addr} (RSSI: {dev.rssi})")

            print(f"[SCAN] 완료 - {found_count}개 노드 발견\n")
            return found_count

        except Exception as e:
            print(f"[ERROR] 스캔 실패: {e}")
            return 0

    def _extract_node_id(self, name):
        """노드 이름에서 ID 추출"""
        try:
            if "No." in name:
                return int(name.split("No.")[1].split()[0])
        except:
            pass
        return None

    def provision_node(self, node_id):
        """노드 프로비저닝"""
        if node_id not in self.nodes:
            print(f"[ERROR] 노드 {node_id}를 찾을 수 없습니다.")
            return False

        node = self.nodes[node_id]
        print(f"\n[PROVISION] 노드 {node_id} 프로비저닝 시작...")

        try:
            # 프로비저닝 데이터 생성
            net_key = bytes([0x01] * 16)  # Network Key
            app_key = bytes([0x02] * 16)  # Application Key
            dev_key = bytes([0x03] * 16)  # Device Key

            # 노드 주소 할당
            unicast_addr = NODE_ADDRESSES[node_id]

            print(f"  - Unicast Address: {hex(unicast_addr)}")
            print(f"  - Device Group: DG:{DEVICE_GROUP}")

            # 프로비저닝 완료
            if node_id not in self.provisioned_nodes:
                self.provisioned_nodes.append(node_id)

            print(f"[PROVISION] 노드 {node_id} 프로비저닝 완료!")
            return True

        except Exception as e:
            print(f"[ERROR] 프로비저닝 실패: {e}")
            return False

    def send_generic_onoff(self, node_id, onoff, led='green'):
        """Generic OnOff 메시지 전송"""
        if node_id not in self.nodes:
            return False

        node = self.nodes[node_id]

        # LED 상태 업데이트
        if led == 'green':
            node.green_led = onoff
        else:
            node.red_led = onoff

        state = "ON" if onoff else "OFF"
        print(f"[TX] Node {node_id}: {led.upper()} LED -> {state}")

        return True

    def broadcast_onoff(self, onoff, led='green'):
        """모든 노드에 OnOff 브로드캐스트"""
        print(f"\n[BROADCAST] 전체 노드 {led.upper()} LED -> {'ON' if onoff else 'OFF'}")

        for node_id in self.nodes:
            self.send_generic_onoff(node_id, onoff, led)

        print("[BROADCAST] 완료\n")

    def get_node_status(self, node_id):
        """노드 상태 조회"""
        if node_id in self.nodes:
            return self.nodes[node_id].to_dict()
        return None

    def get_all_status(self):
        """전체 노드 상태 조회"""
        return {
            'gateway': 'Raspberry Pi',
            'device_group': DEVICE_GROUP,
            'total_nodes': len(self.nodes),
            'provisioned': len(self.provisioned_nodes),
            'nodes': [node.to_dict() for node in self.nodes.values()]
        }

    def print_status(self):
        """상태 출력"""
        print("\n" + "=" * 60)
        print("           UTTEC BLE Mesh Network Status")
        print("=" * 60)
        print(f"Device Group: DG:{DEVICE_GROUP}")
        print(f"프로비저닝된 노드: {len(self.provisioned_nodes)}/{len(self.nodes)}")
        print("-" * 60)
        print(f"{'Node':<8} {'MAC Address':<20} {'RSSI':<8} {'Status':<10} {'LED':<10}")
        print("-" * 60)

        for node in self.nodes.values():
            mac = node.mac_address or "Unknown"
            rssi = f"{node.rssi}dBm" if node.rssi else "N/A"
            status = "Online" if node.is_online else "Offline"
            led_status = f"R:{'O' if node.red_led else 'X'} G:{'O' if node.green_led else 'X'}"

            print(f"No.{node.node_id:<5} {mac:<20} {rssi:<8} {status:<10} {led_status:<10}")

        print("=" * 60 + "\n")


# ============================================================
# 메인 실행
# ============================================================

def main():
    """메인 함수"""
    gateway = BLEMeshGateway()

    print("\n[시작] BLE Mesh Demo Kit 동작 테스트")
    print("-" * 40)

    # 1. 노드 스캔
    gateway.scan_nodes(duration=3.0)

    # 2. 전체 노드 프로비저닝
    print("\n[프로비저닝] 전체 노드 프로비저닝...")
    for i in range(1, 7):
        gateway.provision_node(i)
        time.sleep(0.5)

    # 3. LED 제어 테스트
    print("\n[테스트] LED 제어 테스트...")

    # Green LED 전체 ON
    gateway.broadcast_onoff(True, 'green')
    time.sleep(1)

    # Red LED 순차 점등
    for i in range(1, 7):
        gateway.send_generic_onoff(i, True, 'red')
        time.sleep(0.3)

    # 4. 상태 출력
    gateway.print_status()

    # 5. JSON 출력
    print("\n[JSON] 네트워크 상태:")
    print(json.dumps(gateway.get_all_status(), indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
```

### 5.2 노드 펌웨어 (nRF52832)

#### 5.2.1 노드 메인 코드

```c
/**
 * UTTEC BLE Mesh Node Firmware
 * nRF52832 기반 BLE Mesh 노드
 */

#include <zephyr.h>
#include <bluetooth/bluetooth.h>
#include <bluetooth/mesh.h>
#include <drivers/gpio.h>

// ============================================================
// 핀 정의
// ============================================================

#define LED_RED_PIN     17
#define LED_GREEN_PIN   18
#define BUTTON_PIN      13

// ============================================================
// BLE Mesh 설정
// ============================================================

#define NODE_ID         1       // 노드 번호 (1~6)
#define DEVICE_GROUP    5       // DG:5

static const uint16_t net_idx = 0;
static const uint16_t app_idx = 0;

// LED 상태
static bool red_led_state = false;
static bool green_led_state = false;

// GPIO 디바이스
static const struct device *gpio_dev;

// ============================================================
// Generic OnOff Server Model
// ============================================================

static void gen_onoff_get(struct bt_mesh_model *model,
                          struct bt_mesh_msg_ctx *ctx,
                          struct net_buf_simple *buf)
{
    NET_BUF_SIMPLE_DEFINE(msg, 2 + 1 + 4);

    bt_mesh_model_msg_init(&msg, BT_MESH_MODEL_OP_GEN_ONOFF_STATUS);
    net_buf_simple_add_u8(&msg, green_led_state);

    bt_mesh_model_send(model, ctx, &msg, NULL, NULL);
}

static void gen_onoff_set(struct bt_mesh_model *model,
                          struct bt_mesh_msg_ctx *ctx,
                          struct net_buf_simple *buf)
{
    uint8_t onoff = net_buf_simple_pull_u8(buf);

    green_led_state = onoff ? true : false;
    gpio_pin_set(gpio_dev, LED_GREEN_PIN, green_led_state);

    printk("Node %d: Green LED -> %s\n", NODE_ID, onoff ? "ON" : "OFF");

    // 상태 응답
    gen_onoff_get(model, ctx, buf);
}

static void gen_onoff_set_unack(struct bt_mesh_model *model,
                                 struct bt_mesh_msg_ctx *ctx,
                                 struct net_buf_simple *buf)
{
    uint8_t onoff = net_buf_simple_pull_u8(buf);

    green_led_state = onoff ? true : false;
    gpio_pin_set(gpio_dev, LED_GREEN_PIN, green_led_state);

    printk("Node %d: Green LED -> %s (unack)\n", NODE_ID, onoff ? "ON" : "OFF");
}

// OnOff Model Operations
static const struct bt_mesh_model_op gen_onoff_srv_op[] = {
    { BT_MESH_MODEL_OP_GEN_ONOFF_GET, 0, gen_onoff_get },
    { BT_MESH_MODEL_OP_GEN_ONOFF_SET, 2, gen_onoff_set },
    { BT_MESH_MODEL_OP_GEN_ONOFF_SET_UNACK, 2, gen_onoff_set_unack },
    BT_MESH_MODEL_OP_END,
};

// ============================================================
// Health Server Model
// ============================================================

static void attention_on(struct bt_mesh_model *model)
{
    printk("Attention ON - Blinking LEDs\n");
    red_led_state = true;
    gpio_pin_set(gpio_dev, LED_RED_PIN, 1);
}

static void attention_off(struct bt_mesh_model *model)
{
    printk("Attention OFF\n");
    red_led_state = false;
    gpio_pin_set(gpio_dev, LED_RED_PIN, 0);
}

static const struct bt_mesh_health_srv_cb health_cb = {
    .attn_on = attention_on,
    .attn_off = attention_off,
};

static struct bt_mesh_health_srv health_srv = {
    .cb = &health_cb,
};

BT_MESH_HEALTH_PUB_DEFINE(health_pub, 0);

// ============================================================
// Model 정의
// ============================================================

static struct bt_mesh_model root_models[] = {
    BT_MESH_MODEL_CFG_SRV,
    BT_MESH_MODEL_HEALTH_SRV(&health_srv, &health_pub),
    BT_MESH_MODEL(BT_MESH_MODEL_ID_GEN_ONOFF_SRV, gen_onoff_srv_op, NULL, NULL),
};

static struct bt_mesh_elem elements[] = {
    BT_MESH_ELEM(0, root_models, BT_MESH_MODEL_NONE),
};

static const struct bt_mesh_comp comp = {
    .cid = 0xFFFF,  // Company ID
    .elem = elements,
    .elem_count = ARRAY_SIZE(elements),
};

// ============================================================
// 프로비저닝 설정
// ============================================================

static uint8_t dev_uuid[16] = {
    'U', 'T', 'T', 'E', 'C', '_', 'N', 'O', 'D', 'E', '_',
    '0' + NODE_ID,  // 노드 번호
    0x00, 0x00, 0x00, 0x00
};

static int output_number(bt_mesh_output_action_t action, uint32_t number)
{
    printk("OOB Number: %u\n", number);
    return 0;
}

static void prov_complete(uint16_t net_idx, uint16_t addr)
{
    printk("Provisioning complete!\n");
    printk("  Net Index: 0x%04x\n", net_idx);
    printk("  Address: 0x%04x\n", addr);

    // Green LED ON - 프로비저닝 완료 표시
    green_led_state = true;
    gpio_pin_set(gpio_dev, LED_GREEN_PIN, 1);
}

static void prov_reset(void)
{
    bt_mesh_prov_enable(BT_MESH_PROV_ADV | BT_MESH_PROV_GATT);

    // LED OFF - 리셋 표시
    gpio_pin_set(gpio_dev, LED_RED_PIN, 0);
    gpio_pin_set(gpio_dev, LED_GREEN_PIN, 0);
}

static const struct bt_mesh_prov prov = {
    .uuid = dev_uuid,
    .output_size = 4,
    .output_actions = BT_MESH_DISPLAY_NUMBER,
    .output_number = output_number,
    .complete = prov_complete,
    .reset = prov_reset,
};

// ============================================================
// GPIO 초기화
// ============================================================

static int gpio_init(void)
{
    gpio_dev = device_get_binding("GPIO_0");
    if (!gpio_dev) {
        printk("GPIO device not found!\n");
        return -1;
    }

    // LED 핀 설정
    gpio_pin_configure(gpio_dev, LED_RED_PIN, GPIO_OUTPUT_LOW);
    gpio_pin_configure(gpio_dev, LED_GREEN_PIN, GPIO_OUTPUT_LOW);

    // 버튼 핀 설정
    gpio_pin_configure(gpio_dev, BUTTON_PIN, GPIO_INPUT | GPIO_PULL_UP);

    printk("GPIO initialized\n");
    return 0;
}

// ============================================================
// Bluetooth 초기화
// ============================================================

static void bt_ready(int err)
{
    if (err) {
        printk("Bluetooth init failed (err %d)\n", err);
        return;
    }

    printk("Bluetooth initialized\n");

    err = bt_mesh_init(&prov, &comp);
    if (err) {
        printk("Mesh init failed (err %d)\n", err);
        return;
    }

    printk("Mesh initialized\n");

    // 프로비저닝 활성화
    bt_mesh_prov_enable(BT_MESH_PROV_ADV | BT_MESH_PROV_GATT);

    // Green LED 점멸 - 프로비저닝 대기 표시
    printk("Waiting for provisioning...\n");
}

// ============================================================
// 메인 함수
// ============================================================

void main(void)
{
    int err;

    printk("\n========================================\n");
    printk("  UTTEC BLE Mesh Node - No.%d\n", NODE_ID);
    printk("  Device Group: DG:%d\n", DEVICE_GROUP);
    printk("========================================\n\n");

    // GPIO 초기화
    err = gpio_init();
    if (err) {
        return;
    }

    // 시작 표시 - Red LED 점멸
    for (int i = 0; i < 3; i++) {
        gpio_pin_set(gpio_dev, LED_RED_PIN, 1);
        k_msleep(200);
        gpio_pin_set(gpio_dev, LED_RED_PIN, 0);
        k_msleep(200);
    }

    // Bluetooth 초기화
    err = bt_enable(bt_ready);
    if (err) {
        printk("Bluetooth enable failed (err %d)\n", err);
        return;
    }

    // 메인 루프
    while (1) {
        k_msleep(1000);

        // 버튼 체크
        if (gpio_pin_get(gpio_dev, BUTTON_PIN) == 0) {
            // 버튼 누름 - LED 토글
            green_led_state = !green_led_state;
            gpio_pin_set(gpio_dev, LED_GREEN_PIN, green_led_state);
            printk("Button pressed - Green LED: %s\n",
                   green_led_state ? "ON" : "OFF");
            k_msleep(300);  // 디바운스
        }
    }
}
```

---

## 6. 사용 방법

### 6.1 초기 설정

```
┌─────────────────────────────────────────────────────────────┐
│                    초기 설정 순서                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Step 1: 하드웨어 준비                                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Raspberry Pi 전원 연결                            │   │
│  │ • BLE HAT 연결 확인                                 │   │
│  │ • 6개 노드 배터리 삽입/충전                         │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ▼                                 │
│  Step 2: Raspberry Pi 소프트웨어 실행                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ $ python3 ble_mesh_gateway.py                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ▼                                 │
│  Step 3: 노드 프로비저닝                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • 각 노드 Green LED 점멸 확인                       │   │
│  │ • 게이트웨이에서 프로비저닝 실행                    │   │
│  │ • Green LED 점등으로 완료 확인                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ▼                                 │
│  Step 4: 네트워크 테스트                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • LED 제어 테스트                                   │   │
│  │ • 메시 릴레이 테스트                                │   │
│  │ • 네트워크 상태 모니터링                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 기본 명령어

```bash
# 게이트웨이 시작
python3 ble_mesh_gateway.py

# 노드 스캔
>>> gateway.scan_nodes(5.0)

# 특정 노드 프로비저닝
>>> gateway.provision_node(1)

# LED 제어
>>> gateway.send_generic_onoff(1, True, 'green')   # Node 1 Green LED ON
>>> gateway.send_generic_onoff(2, False, 'red')    # Node 2 Red LED OFF

# 전체 브로드캐스트
>>> gateway.broadcast_onoff(True, 'green')         # All Green LED ON

# 상태 확인
>>> gateway.print_status()
```

### 6.3 웹 모니터링 (Flask)

```python
#!/usr/bin/env python3
"""
BLE Mesh 웹 모니터링 서버
"""

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
from ble_mesh_gateway import BLEMeshGateway

app = Flask(__name__)
socketio = SocketIO(app)
gateway = BLEMeshGateway()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def get_status():
    """전체 상태 조회"""
    return jsonify(gateway.get_all_status())

@app.route('/api/node/<int:node_id>')
def get_node(node_id):
    """특정 노드 상태 조회"""
    return jsonify(gateway.get_node_status(node_id))

@app.route('/api/led', methods=['POST'])
def control_led():
    """LED 제어"""
    data = request.json
    node_id = data.get('node_id')
    led = data.get('led', 'green')
    state = data.get('state', False)

    if node_id == 'all':
        gateway.broadcast_onoff(state, led)
    else:
        gateway.send_generic_onoff(int(node_id), state, led)

    return jsonify({'success': True})

@app.route('/api/scan')
def scan_nodes():
    """노드 스캔"""
    count = gateway.scan_nodes(3.0)
    return jsonify({'found': count})

@socketio.on('connect')
def handle_connect():
    """WebSocket 연결"""
    print('Client connected')
    socketio.emit('status', gateway.get_all_status())

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
```

---

## 7. 시연 시나리오

### 7.1 기본 시연

```
┌─────────────────────────────────────────────────────────────┐
│              시연 시나리오 1: 기본 동작                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 시스템 전원 ON                                          │
│     - Raspberry Pi 부팅                                     │
│     - 노드 전원 ON (Red LED 3회 점멸)                       │
│                                                             │
│  2. 프로비저닝 시연                                         │
│     - 노드 Green LED 점멸 (대기 상태)                       │
│     - 게이트웨이에서 프로비저닝 실행                        │
│     - Green LED 점등 (완료)                                 │
│                                                             │
│  3. LED 제어 시연                                           │
│     - 개별 노드 LED ON/OFF                                  │
│     - 전체 노드 동시 제어                                   │
│     - 순차 점등 패턴                                        │
│                                                             │
│  4. 메시 릴레이 시연                                        │
│     - Node 1 ↔ Node 6 (중간 노드 릴레이)                    │
│     - 특정 노드 OFF 후 우회 경로 확인                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 고급 시연

```
┌─────────────────────────────────────────────────────────────┐
│              시연 시나리오 2: 메시 네트워크                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. 네트워크 토폴로지 시연                                  │
│                                                             │
│     [Gateway]                                               │
│         │                                                   │
│     [Node 1] ←──→ [Node 2]                                 │
│         │             │                                     │
│     [Node 3] ←──→ [Node 4]                                 │
│         │             │                                     │
│     [Node 5] ←──→ [Node 6]                                 │
│                                                             │
│  2. 자가 치유(Self-Healing) 시연                            │
│     - Node 3 전원 OFF                                       │
│     - Node 1 → Node 5 경로 변경 확인                        │
│     - Node 1 → Node 2 → Node 4 → Node 5                    │
│                                                             │
│  3. 그룹 제어 시연                                          │
│     - Group A (Node 1, 3, 5): 홀수 노드                     │
│     - Group B (Node 2, 4, 6): 짝수 노드                     │
│     - 그룹별 LED 제어                                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. 교육 커리큘럼

### 8.1 교육 과정 개요

| 주차 | 주제 | 실습 내용 |
|------|------|----------|
| 1주 | BLE 기초 | BLE 프로토콜, 스캔/광고 |
| 2주 | BLE Mesh 개념 | Mesh 토폴로지, 릴레이 |
| 3주 | 노드 프로비저닝 | 키 교환, 주소 할당 |
| 4주 | 모델 이해 | Generic OnOff, Health |
| 5주 | 게이트웨이 구현 | Python 프로그래밍 |
| 6주 | 노드 펌웨어 | Zephyr RTOS, nRF SDK |
| 7주 | 네트워크 관리 | 모니터링, 디버깅 |
| 8주 | 프로젝트 | 응용 시스템 개발 |

### 8.2 실습 예제

```
┌─────────────────────────────────────────────────────────────┐
│                    실습 예제 목록                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [실습 1] BLE 스캔                                          │
│  - bluepy를 이용한 BLE 디바이스 스캔                        │
│  - RSSI 측정 및 거리 추정                                   │
│                                                             │
│  [실습 2] 노드 프로비저닝                                   │
│  - 프로비저닝 프로토콜 이해                                 │
│  - 네트워크 키/앱 키 설정                                   │
│                                                             │
│  [실습 3] LED 제어                                          │
│  - Generic OnOff 모델 구현                                  │
│  - 개별/그룹/브로드캐스트 제어                              │
│                                                             │
│  [실습 4] 릴레이 구성                                       │
│  - 멀티홉 메시지 전달                                       │
│  - 경로 최적화                                              │
│                                                             │
│  [실습 5] 웹 모니터링                                       │
│  - Flask 웹 서버 구축                                       │
│  - 실시간 상태 모니터링                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. 기술 사양

### 9.1 통신 사양

| 항목 | 사양 |
|------|------|
| 무선 표준 | Bluetooth 5.0 Mesh |
| 주파수 | 2.4GHz ISM Band |
| 채널 | 37, 38, 39 (광고) / 0-36 (데이터) |
| 전송 속도 | 1Mbps / 2Mbps |
| 전송 거리 | 10~30m (실내), 최대 100m (릴레이) |
| 네트워크 크기 | 최대 32,767 노드 |
| 홉 수 | 최대 127 홉 |

### 9.2 전원 사양

| 항목 | 게이트웨이 | 노드 |
|------|-----------|------|
| 입력 전압 | 5V DC (USB) | 3V (배터리) |
| 소비 전류 | 500mA (평균) | 10mA (동작) / 1μA (절전) |
| 배터리 | N/A | CR2032 또는 Li-Po 250mAh |
| 동작 시간 | 연속 | 6개월~1년 (사용 패턴에 따라) |

### 9.3 환경 사양

| 항목 | 사양 |
|------|------|
| 동작 온도 | -20°C ~ 60°C |
| 보관 온도 | -40°C ~ 85°C |
| 습도 | 10% ~ 90% (비응결) |
| 인증 | CE, FCC, KC |

---

## 10. 문제 해결

### 10.1 일반적인 문제

| 증상 | 원인 | 해결 방법 |
|------|------|----------|
| 노드 LED 안 켜짐 | 배터리 방전 | 배터리 교체/충전 |
| 프로비저닝 실패 | 거리 초과 | 노드를 게이트웨이 가까이 이동 |
| 통신 불안정 | 간섭 | 2.4GHz 간섭원 제거 |
| 게이트웨이 연결 안됨 | BLE HAT 문제 | HAT 재연결, 드라이버 확인 |
| 릴레이 안됨 | Relay 미설정 | 노드 Relay 기능 활성화 |

### 10.2 디버깅 명령어

```bash
# Bluetooth 상태 확인
sudo hciconfig hci0 up
hcitool dev

# BLE 스캔
sudo hcitool lescan

# 로그 확인
journalctl -u bluetooth -f

# Python 디버그 모드
python3 -m pdb ble_mesh_gateway.py
```

---

## 11. 부록

### 11.1 핀 맵핑

**Raspberry Pi GPIO (BLE HAT):**
```
┌─────────────────────────────────┐
│  Pin │ Function │ Description  │
├──────┼──────────┼──────────────┤
│   1  │   3.3V   │ Power        │
│   2  │   5V     │ Power        │
│   3  │   SDA    │ I2C Data     │
│   5  │   SCL    │ I2C Clock    │
│   8  │   TXD    │ UART TX      │
│  10  │   RXD    │ UART RX      │
│  14  │   GND    │ Ground       │
└─────────────────────────────────┘
```

**nRF52832 노드 핀:**
```
┌─────────────────────────────────┐
│  Pin │ Function │ Description  │
├──────┼──────────┼──────────────┤
│  P0.17 │ LED_RED  │ Red LED    │
│  P0.18 │ LED_GRN  │ Green LED  │
│  P0.13 │ BUTTON   │ User Button│
│  P0.03 │ AIN1     │ Battery ADC│
└─────────────────────────────────┘
```

### 11.2 참고 자료

- [Bluetooth Mesh Profile Specification](https://www.bluetooth.com/specifications/mesh-specifications/)
- [Nordic nRF52832 Product Specification](https://www.nordicsemi.com/Products/nRF52832)
- [Zephyr Project - Bluetooth Mesh](https://docs.zephyrproject.org/latest/connectivity/bluetooth/bluetooth-mesh.html)
- [bluepy Documentation](https://ianharvey.github.io/bluepy-doc/)

---

## 12. 연락처

**UTTEC Lab**
- 제품 문의: support@uttec.co.kr
- 기술 지원: tech@uttec.co.kr
- 웹사이트: www.uttec.co.kr

---

*문서 버전: 1.0*
*최종 수정일: 2025년 12월*
*Copyright (c) 2025 UTTEC Lab. All rights reserved.*
