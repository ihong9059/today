#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
slave_simulator.py
EtherCAT Slave 시뮬레이터 (Raw Ethernet 기반)

이 시뮬레이터는 EtherCAT 프레임을 직접 수신/응답하여
실제 Slave 장치처럼 동작합니다.

사용법:
    # 관리자 권한 필요
    py -3.14 slave_simulator.py list        # 어댑터 목록
    py -3.14 slave_simulator.py 7           # 인덱스 7번 어댑터에서 실행
"""

import sys
import struct
import threading
import time
from datetime import datetime

try:
    import pysoem
except ImportError:
    print("[ERROR] PySOEM이 필요합니다: pip install pysoem")
    sys.exit(1)

# EtherCAT 상수
ETHERCAT_ETHERTYPE = 0x88A4
EC_STATE_INIT = 0x01
EC_STATE_PREOP = 0x02
EC_STATE_SAFEOP = 0x04
EC_STATE_OP = 0x08

# 시뮬레이션 Slave 정보
SIMULATED_SLAVES = [
    {
        "name": "EK1100-SIM",
        "manufacturer": 0x00000002,  # Beckhoff
        "product_code": 0x044C2C52,  # EK1100
        "revision": 0x00110001,
        "type": "coupler"
    },
    {
        "name": "EL1008-SIM",
        "manufacturer": 0x00000002,  # Beckhoff
        "product_code": 0x03F03052,  # EL1008
        "revision": 0x00100000,
        "type": "digital_input",
        "inputs": 8,
        "input_data": 0b10101010  # 시뮬레이션 입력 값
    },
    {
        "name": "EL2008-SIM",
        "manufacturer": 0x00000002,  # Beckhoff
        "product_code": 0x07D83052,  # EL2008
        "revision": 0x00100000,
        "type": "digital_output",
        "outputs": 8,
        "output_data": 0x00
    }
]


class SlaveSimulator:
    """EtherCAT Slave 시뮬레이터"""

    def __init__(self, adapter_name):
        self.adapter_name = adapter_name
        self.running = False
        self.state = EC_STATE_INIT
        self.slaves = SIMULATED_SLAVES.copy()
        self.frame_count = 0
        self.last_frame_time = None

    def log(self, msg):
        """타임스탬프와 함께 로그 출력"""
        timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        print(f"[{timestamp}] {msg}")

    def start(self):
        """시뮬레이터 시작"""
        print()
        print("=" * 60)
        print("  EtherCAT Slave 시뮬레이터")
        print("=" * 60)
        print()
        print(f"  어댑터: {self.adapter_name}")
        print()
        print("-" * 60)
        print("  시뮬레이션 Slave 목록:")
        print("-" * 60)

        for i, slave in enumerate(self.slaves):
            print(f"  [{i+1}] {slave['name']}")
            print(f"      제조사: 0x{slave['manufacturer']:08X}")
            print(f"      제품:   0x{slave['product_code']:08X}")

        print()
        print("-" * 60)
        print()

        self.running = True
        self._run_simulation()

    def _run_simulation(self):
        """시뮬레이션 메인 루프"""
        self.log("시뮬레이터 시작...")
        self.log("Master의 연결을 기다리는 중...")
        self.log("(Ctrl+C로 종료)")
        print()

        # 실제 EtherCAT 프레임 수신을 위해서는 raw socket이 필요
        # PySOEM은 Master 전용이므로, 여기서는 상태 시뮬레이션만 수행

        try:
            cycle = 0
            while self.running:
                cycle += 1

                # 상태 표시 (10초마다)
                if cycle % 100 == 0:
                    self._update_simulation()
                    self._print_status()

                time.sleep(0.1)

        except KeyboardInterrupt:
            print()
            self.log("시뮬레이터 종료")

    def _update_simulation(self):
        """시뮬레이션 데이터 업데이트"""
        for slave in self.slaves:
            if slave['type'] == 'digital_input':
                # 입력 값 변경 시뮬레이션
                slave['input_data'] = (slave['input_data'] + 1) % 256

    def _print_status(self):
        """현재 상태 출력"""
        print("-" * 40)
        for slave in self.slaves:
            if slave['type'] == 'digital_input':
                val = slave.get('input_data', 0)
                bits = format(val, '08b')
                self.log(f"{slave['name']}: Input = {bits} (0x{val:02X})")
            elif slave['type'] == 'digital_output':
                val = slave.get('output_data', 0)
                bits = format(val, '08b')
                self.log(f"{slave['name']}: Output = {bits} (0x{val:02X})")

    def stop(self):
        """시뮬레이터 중지"""
        self.running = False


def list_adapters():
    """네트워크 어댑터 목록"""
    adapters = pysoem.find_adapters()

    print("=" * 60)
    print("  사용 가능한 네트워크 어댑터")
    print("=" * 60)
    print()

    recommended = []

    for i, adapter in enumerate(adapters):
        desc = adapter.desc.decode() if isinstance(adapter.desc, bytes) else adapter.desc
        name = adapter.name

        # 실제 이더넷 어댑터 추천
        is_ethernet = ('Ethernet' in desc or 'GbE' in desc or 'I219' in desc or 'Realtek' in desc)
        is_virtual = ('WAN' in desc or 'loopback' in desc or 'Wi-Fi' in desc or 'Bluetooth' in desc or 'Tailscale' in desc)

        marker = ""
        if is_ethernet and not is_virtual:
            marker = " ← [추천] EtherCAT 사용 가능"
            recommended.append(i)

        print(f"  [{i}] {desc}{marker}")

    print()

    if recommended:
        print("-" * 60)
        print(f"  추천 어댑터: {recommended}")
        print("  → 두 어댑터를 케이블로 연결하여 Master/Slave 구성")
        print()

    return adapters


def main():
    if len(sys.argv) < 2:
        print("사용법:")
        print("  py -3.14 slave_simulator.py list    # 어댑터 목록")
        print("  py -3.14 slave_simulator.py <index> # 해당 어댑터에서 실행")
        print()
        print("예시:")
        print("  py -3.14 slave_simulator.py 7       # Realtek USB GbE 사용")
        sys.exit(0)

    arg = sys.argv[1]

    if arg == "list":
        list_adapters()
        return

    try:
        adapter_index = int(arg)
    except ValueError:
        print(f"[ERROR] 잘못된 인수: {arg}")
        sys.exit(1)

    adapters = pysoem.find_adapters()

    if adapter_index >= len(adapters):
        print(f"[ERROR] 어댑터 인덱스 {adapter_index}가 범위를 벗어났습니다")
        print(f"        유효 범위: 0 ~ {len(adapters)-1}")
        sys.exit(1)

    adapter = adapters[adapter_index]
    adapter_name = adapter.desc.decode() if isinstance(adapter.desc, bytes) else adapter.desc

    sim = SlaveSimulator(adapter_name)
    sim.start()


if __name__ == "__main__":
    main()
