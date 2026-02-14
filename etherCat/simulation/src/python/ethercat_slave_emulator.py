#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
ethercat_slave_emulator.py
EtherCAT Slave 에뮬레이터 (Raw Ethernet 기반)

이 에뮬레이터는 실제 EtherCAT 프레임을 수신하고 응답하여
TwinCAT 없이 Slave 장치를 시뮬레이션합니다.

요구사항:
    - 관리자 권한
    - Npcap 설치
    - Scapy 설치: pip install scapy

사용법:
    py -3.14 ethercat_slave_emulator.py list           # 인터페이스 목록
    py -3.14 ethercat_slave_emulator.py <interface>    # 에뮬레이터 시작
"""

import sys
import struct
import time
import threading
import logging
from datetime import datetime

# Scapy 경고 비활성화
logging.getLogger("scapy.runtime").setLevel(logging.ERROR)

try:
    from scapy.all import (
        Ether, Raw, sniff, sendp, get_if_list,
        conf, IFACES, get_if_hwaddr
    )
    from scapy.layers.l2 import Ether
except ImportError:
    print("[ERROR] Scapy가 필요합니다: pip install scapy")
    sys.exit(1)

# Scapy 상세 로그 비활성화
conf.verb = 0

# EtherCAT 상수
ETHERCAT_ETHERTYPE = 0x88A4

# EtherCAT 명령어
EC_CMD_NOP = 0x00
EC_CMD_APRD = 0x01  # Auto Increment Physical Read
EC_CMD_APWR = 0x02  # Auto Increment Physical Write
EC_CMD_APRW = 0x03  # Auto Increment Physical Read Write
EC_CMD_FPRD = 0x04  # Configured Address Physical Read
EC_CMD_FPWR = 0x05  # Configured Address Physical Write
EC_CMD_FPRW = 0x06  # Configured Address Physical Read Write
EC_CMD_BRD = 0x07   # Broadcast Read
EC_CMD_BWR = 0x08   # Broadcast Write
EC_CMD_BRW = 0x09   # Broadcast Read Write
EC_CMD_LRD = 0x0A   # Logical Read
EC_CMD_LWR = 0x0B   # Logical Write
EC_CMD_LRW = 0x0C   # Logical Read Write
EC_CMD_ARMW = 0x0D  # Auto Increment Read Multiple Write

CMD_NAMES = {
    0x00: "NOP", 0x01: "APRD", 0x02: "APWR", 0x03: "APRW",
    0x04: "FPRD", 0x05: "FPWR", 0x06: "FPRW",
    0x07: "BRD", 0x08: "BWR", 0x09: "BRW",
    0x0A: "LRD", 0x0B: "LWR", 0x0C: "LRW",
    0x0D: "ARMW"
}

# AL States
EC_STATE_INIT = 0x01
EC_STATE_PREOP = 0x02
EC_STATE_SAFEOP = 0x04
EC_STATE_OP = 0x08


class SimulatedSlave:
    """시뮬레이션 Slave"""

    def __init__(self, position, name, vendor, product, revision):
        self.position = position  # 1-based
        self.name = name
        self.vendor = vendor
        self.product = product
        self.revision = revision
        self.al_state = EC_STATE_INIT
        self.configured_address = 0

        # 레지스터 메모리 (64KB)
        self.registers = bytearray(0x10000)
        self._init_registers()

        # SII 데이터 (Slave Information Interface)
        self.sii_data = self._create_sii()

    def _init_registers(self):
        """ESC 레지스터 초기화"""
        # 0x0000: Type (1 byte) - LAN9252 타입
        self.registers[0x0000] = 0x02

        # 0x0001: Revision
        self.registers[0x0001] = 0x02

        # 0x0002-0x0003: Build (little endian)
        struct.pack_into('<H', self.registers, 0x0002, 0x0001)

        # 0x0004: Number of FMMUs
        self.registers[0x0004] = 0x02

        # 0x0005: Number of Sync Managers
        self.registers[0x0005] = 0x04

        # 0x0006: RAM size (KB)
        self.registers[0x0006] = 0x04

        # 0x0007: Port descriptor
        self.registers[0x0007] = 0x03  # 2 ports

        # 0x0010-0x0011: Configured Station Address
        struct.pack_into('<H', self.registers, 0x0010, self.configured_address)

        # 0x0012-0x0013: Configured Station Alias
        struct.pack_into('<H', self.registers, 0x0012, 0x0000)

        # 0x0100-0x0101: DL Control
        struct.pack_into('<H', self.registers, 0x0100, 0x0004)

        # 0x0110-0x0111: DL Status - Link detected on port 0, signal detected
        struct.pack_into('<H', self.registers, 0x0110, 0x0035)

        # 0x0120-0x0121: AL Control
        struct.pack_into('<H', self.registers, 0x0120, EC_STATE_INIT)

        # 0x0130-0x0131: AL Status
        struct.pack_into('<H', self.registers, 0x0130, EC_STATE_INIT)

        # 0x0134-0x0135: AL Status Code
        struct.pack_into('<H', self.registers, 0x0134, 0x0000)

        # 0x0140-0x0141: PDI Control
        struct.pack_into('<H', self.registers, 0x0140, 0x0000)

        # 0x0150-0x0151: PDI Config
        struct.pack_into('<H', self.registers, 0x0150, 0x0000)

        # 0x0502: SII Control
        self.registers[0x0502] = 0x00

    def _create_sii(self):
        """SII (Slave Information Interface) 데이터 생성"""
        sii = bytearray(256)

        # EEPROM 헤더 (0x0000-0x0007)
        # PDI Control (0x0000)
        struct.pack_into('<H', sii, 0x00, 0x0000)
        # PDI Config (0x0002)
        struct.pack_into('<H', sii, 0x02, 0x0000)
        # Sync impulse (0x0004)
        struct.pack_into('<H', sii, 0x04, 0x0000)
        # PDI Config2 (0x0006)
        struct.pack_into('<H', sii, 0x06, 0x0000)

        # Configured Station Alias (0x0008)
        struct.pack_into('<H', sii, 0x08, 0x0000)

        # Reserved (0x000A-0x000B)
        struct.pack_into('<H', sii, 0x0A, 0x0000)

        # Checksum (0x000C-0x000D) - 계산 필요하지만 0으로 설정
        struct.pack_into('<H', sii, 0x0C, 0x0000)

        # Vendor ID (0x0010-0x0013)
        struct.pack_into('<I', sii, 0x10, self.vendor)

        # Product Code (0x0014-0x0017)
        struct.pack_into('<I', sii, 0x14, self.product)

        # Revision Number (0x0018-0x001B)
        struct.pack_into('<I', sii, 0x18, self.revision)

        # Serial Number (0x001C-0x001F)
        struct.pack_into('<I', sii, 0x1C, 0x00000001)

        return sii

    def read_register(self, address, length):
        """레지스터 읽기"""
        # SII 데이터 읽기 요청 처리 (0x0508)
        if address == 0x0508:
            sii_addr = struct.unpack('<H', self.registers[0x0504:0x0506])[0]
            sii_offset = sii_addr * 2  # 워드 주소 → 바이트 주소
            if sii_offset + length <= len(self.sii_data):
                return bytes(self.sii_data[sii_offset:sii_offset+length])
            return bytes(length)

        if address + length > len(self.registers):
            return bytes(length)
        return bytes(self.registers[address:address+length])

    def write_register(self, address, data):
        """레지스터 쓰기"""
        if address + len(data) > len(self.registers):
            return

        # AL Control (0x0120) 처리 - 상태 전이 요청
        if address == 0x0120:
            requested_state = data[0] & 0x0F
            self._handle_state_transition(requested_state)
            return

        # Configured Station Address 설정 (0x0010)
        if address == 0x0010 and len(data) >= 2:
            self.configured_address = struct.unpack('<H', data[:2])[0]

        self.registers[address:address+len(data)] = data

    def _handle_state_transition(self, requested_state):
        """AL 상태 전이 처리"""
        self.al_state = requested_state
        # AL Status 업데이트
        struct.pack_into('<H', self.registers, 0x0130, self.al_state)


class EtherCATSlaveEmulator:
    """EtherCAT Slave 에뮬레이터"""

    def __init__(self, interface):
        self.interface = interface
        self.running = False
        self.frame_count = 0
        self.response_count = 0
        self.verbose = True

        # 시뮬레이션 Slave 생성 (Beckhoff 모듈 시뮬레이션)
        self.slaves = [
            SimulatedSlave(1, "EK1100-SIM", 0x00000002, 0x044C2C52, 0x00110001),
            SimulatedSlave(2, "EL1008-SIM", 0x00000002, 0x03F03052, 0x00100000),
            SimulatedSlave(3, "EL2008-SIM", 0x00000002, 0x07D83052, 0x00100000),
        ]

    def log(self, msg, level="INFO"):
        """타임스탬프 로그"""
        ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        print(f"[{ts}] {msg}")

    def start(self):
        """에뮬레이터 시작"""
        print()
        print("=" * 60)
        print("  EtherCAT Slave 에뮬레이터")
        print("=" * 60)
        print()
        print(f"  인터페이스: {self.interface}")
        print()
        print("-" * 60)
        print("  에뮬레이션 Slave 목록:")

        for slave in self.slaves:
            print(f"    [{slave.position}] {slave.name}")
            print(f"        Vendor:  0x{slave.vendor:08X}")
            print(f"        Product: 0x{slave.product:08X}")

        print("-" * 60)
        print()
        self.log("에뮬레이터 시작...")
        self.log("EtherCAT 프레임 대기 중...")
        self.log("(Ctrl+C로 종료)")
        print()

        self.running = True

        try:
            sniff(
                iface=self.interface,
                filter=f"ether proto 0x{ETHERCAT_ETHERTYPE:04x}",
                prn=self._handle_frame,
                store=False,
                stop_filter=lambda x: not self.running
            )
        except KeyboardInterrupt:
            print()
            self.log("에뮬레이터 종료")
            self.log(f"총 수신: {self.frame_count}, 응답: {self.response_count}")
        except PermissionError:
            self.log("오류: 관리자 권한이 필요합니다")
        except Exception as e:
            self.log(f"오류: {e}")

    def _handle_frame(self, pkt):
        """EtherCAT 프레임 처리"""
        if Ether not in pkt:
            return

        if pkt[Ether].type != ETHERCAT_ETHERTYPE:
            return

        self.frame_count += 1

        # Raw 데이터 추출
        raw_data = bytes(pkt[Ether].payload)
        if len(raw_data) < 2:
            return

        # EtherCAT 헤더 파싱 (2 bytes)
        ec_header = struct.unpack('<H', raw_data[0:2])[0]
        ec_length = ec_header & 0x07FF
        ec_type = (ec_header >> 12) & 0x0F

        # 데이터그램 영역
        datagram_data = raw_data[2:2+ec_length]

        if len(datagram_data) < 10:
            return

        # 데이터그램 처리
        response_datagrams = self._process_datagrams(datagram_data)

        if response_datagrams:
            # 응답 EtherCAT 헤더
            response_header = struct.pack('<H', ec_header)

            # 응답 패킷 생성
            response_payload = response_header + response_datagrams

            response_pkt = Ether(
                src=pkt[Ether].dst,
                dst=pkt[Ether].src,
                type=ETHERCAT_ETHERTYPE
            ) / Raw(load=response_payload)

            sendp(response_pkt, iface=self.interface, verbose=False)
            self.response_count += 1

            if self.frame_count % 50 == 0:
                self.log(f"프레임: {self.frame_count}, 응답: {self.response_count}")

    def _process_datagrams(self, data):
        """데이터그램 처리"""
        result = bytearray()
        offset = 0

        while offset + 10 <= len(data):
            # 데이터그램 헤더 (10 bytes)
            cmd = data[offset]
            idx = data[offset + 1]
            addr = struct.unpack('<I', data[offset+2:offset+6])[0]
            len_flags = struct.unpack('<H', data[offset+6:offset+8])[0]
            irq = struct.unpack('<H', data[offset+8:offset+10])[0]

            dg_length = len_flags & 0x07FF
            has_next = (len_flags >> 15) & 0x01

            # 데이터그램 데이터
            dg_end = offset + 10 + dg_length
            if dg_end > len(data):
                break

            dg_data = bytearray(data[offset+10:dg_end])

            # WKC (2 bytes after data)
            wkc_end = dg_end + 2
            if wkc_end > len(data):
                break

            current_wkc = struct.unpack('<H', data[dg_end:wkc_end])[0]

            # 명령어 처리
            response_data, wkc_increment = self._process_command(cmd, addr, dg_data)

            # 응답 데이터그램 구성
            result += bytes([cmd, idx])
            result += struct.pack('<I', addr)
            result += struct.pack('<H', len_flags)
            result += struct.pack('<H', irq)
            result += response_data
            result += struct.pack('<H', current_wkc + wkc_increment)

            offset = wkc_end

            if not has_next:
                break

        return bytes(result)

    def _process_command(self, cmd, addr, data):
        """EtherCAT 명령어 처리"""
        response = bytes(data)
        wkc = 0

        cmd_name = CMD_NAMES.get(cmd, f"UNK({cmd:02X})")

        if cmd in [EC_CMD_APRD, EC_CMD_APWR, EC_CMD_APRW, EC_CMD_ARMW]:
            # Auto Increment 주소 지정
            position = (addr >> 16) & 0xFFFF
            if position > 0x7FFF:
                position = position - 0x10000  # signed
            reg_offset = addr & 0xFFFF

            for slave in self.slaves:
                slave_pos = -slave.position
                if position == slave_pos:
                    if cmd == EC_CMD_APRD:
                        response = slave.read_register(reg_offset, len(data))
                        wkc = 1
                    elif cmd == EC_CMD_APWR:
                        slave.write_register(reg_offset, bytes(data))
                        wkc = 1
                    elif cmd == EC_CMD_APRW:
                        response = slave.read_register(reg_offset, len(data))
                        slave.write_register(reg_offset, bytes(data))
                        wkc = 3
                    elif cmd == EC_CMD_ARMW:
                        response = slave.read_register(reg_offset, len(data))
                        wkc = 1
                    break

        elif cmd in [EC_CMD_BRD, EC_CMD_BWR, EC_CMD_BRW]:
            # Broadcast
            reg_offset = addr & 0xFFFF

            if cmd == EC_CMD_BRD:
                result = bytearray(len(data))
                for slave in self.slaves:
                    reg_data = slave.read_register(reg_offset, len(data))
                    for i in range(min(len(result), len(reg_data))):
                        result[i] |= reg_data[i]
                response = bytes(result)
                wkc = len(self.slaves)

            elif cmd == EC_CMD_BWR:
                for slave in self.slaves:
                    slave.write_register(reg_offset, bytes(data))
                wkc = len(self.slaves)

            elif cmd == EC_CMD_BRW:
                result = bytearray(len(data))
                for slave in self.slaves:
                    reg_data = slave.read_register(reg_offset, len(data))
                    slave.write_register(reg_offset, bytes(data))
                    for i in range(min(len(result), len(reg_data))):
                        result[i] |= reg_data[i]
                response = bytes(result)
                wkc = len(self.slaves) * 3

        elif cmd in [EC_CMD_FPRD, EC_CMD_FPWR, EC_CMD_FPRW]:
            # Configured Address
            configured_addr = (addr >> 16) & 0xFFFF
            reg_offset = addr & 0xFFFF

            for slave in self.slaves:
                if slave.configured_address == configured_addr:
                    if cmd == EC_CMD_FPRD:
                        response = slave.read_register(reg_offset, len(data))
                        wkc = 1
                    elif cmd == EC_CMD_FPWR:
                        slave.write_register(reg_offset, bytes(data))
                        wkc = 1
                    elif cmd == EC_CMD_FPRW:
                        response = slave.read_register(reg_offset, len(data))
                        slave.write_register(reg_offset, bytes(data))
                        wkc = 3
                    break

        return response, wkc


def list_interfaces():
    """인터페이스 목록"""
    print("=" * 60)
    print("  사용 가능한 네트워크 인터페이스")
    print("=" * 60)
    print()

    ethernet_ifaces = []

    for iface_name, iface in IFACES.items():
        desc = getattr(iface, 'description', iface_name)

        is_ethernet = any(x in str(desc) for x in ['Ethernet', 'GbE', 'I219', 'Realtek'])
        is_virtual = any(x in str(desc) for x in ['WAN', 'loopback', 'Wi-Fi', 'Bluetooth', 'Tailscale', 'Virtual'])

        marker = ""
        if is_ethernet and not is_virtual:
            marker = " ← [추천]"
            ethernet_ifaces.append((iface_name, desc))

        print(f"  {iface_name}")
        print(f"    {desc}{marker}")
        print()

    print("=" * 60)

    if ethernet_ifaces:
        print()
        print("추천 설정:")
        print(f"  Slave 에뮬레이터: 첫 번째 추천 어댑터")
        print(f"  Master: 두 번째 추천 어댑터")
        print()

    return ethernet_ifaces


def main():
    if len(sys.argv) < 2:
        print("사용법:")
        print("  py -3.14 ethercat_slave_emulator.py list           # 인터페이스 목록")
        print("  py -3.14 ethercat_slave_emulator.py <interface>    # 에뮬레이터 시작")
        print()
        list_interfaces()
        sys.exit(0)

    arg = sys.argv[1]

    if arg == "list":
        list_interfaces()
        return

    # 인터페이스 찾기
    interface = None

    for iface_name, iface in IFACES.items():
        desc = getattr(iface, 'description', '')
        if arg.lower() in iface_name.lower() or arg.lower() in str(desc).lower():
            interface = iface_name
            break

    if not interface:
        interface = arg

    emulator = EtherCATSlaveEmulator(interface)
    emulator.start()


if __name__ == "__main__":
    main()
