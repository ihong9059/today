"""
EtherCAT Master (Scapy 기반)
- Slave 스캔 (APRD)
- 상태 전이 (INIT → PREOP → SAFEOP → OP)
- PDO 통신 (LRW)
- 레지스터 읽기/쓰기
"""
from scapy.all import Ether, Raw, sendp, sniff, conf, get_if_hwaddr
import struct
import threading
import time
from datetime import datetime

conf.verb = 0

# EtherCAT 명령어
EC_CMD_NOP  = 0x00
EC_CMD_APRD = 0x01  # Auto-increment Physical Read
EC_CMD_APWR = 0x02  # Auto-increment Physical Write
EC_CMD_APRW = 0x03  # Auto-increment Physical Read/Write
EC_CMD_FPRD = 0x04  # Configured Address Physical Read
EC_CMD_FPWR = 0x05  # Configured Address Physical Write
EC_CMD_FPRW = 0x06  # Configured Address Physical Read/Write
EC_CMD_BRD  = 0x07  # Broadcast Read
EC_CMD_BWR  = 0x08  # Broadcast Write
EC_CMD_BRW  = 0x09  # Broadcast Read/Write
EC_CMD_LRD  = 0x0A  # Logical Read
EC_CMD_LWR  = 0x0B  # Logical Write
EC_CMD_LRW  = 0x0C  # Logical Read/Write

# EtherCAT 상태
EC_STATE_NONE    = 0x00
EC_STATE_INIT    = 0x01
EC_STATE_PREOP   = 0x02
EC_STATE_BOOT    = 0x03
EC_STATE_SAFEOP  = 0x04
EC_STATE_OP      = 0x08
EC_STATE_ERROR   = 0x10

STATE_NAMES = {
    0x00: "NONE",
    0x01: "INIT",
    0x02: "PRE-OP",
    0x03: "BOOT",
    0x04: "SAFE-OP",
    0x08: "OP",
    0x11: "INIT+ERR",
    0x12: "PREOP+ERR",
    0x14: "SAFEOP+ERR",
    0x18: "OP+ERR",
}

# 레지스터 주소
REG_TYPE           = 0x0000
REG_REVISION       = 0x0001
REG_BUILD          = 0x0002
REG_STATION_ADDR   = 0x0010
REG_STATION_ALIAS  = 0x0012
REG_DL_STATUS      = 0x0110
REG_AL_CONTROL     = 0x0120
REG_AL_STATUS      = 0x0130
REG_AL_STATUS_CODE = 0x0134

ETHERCAT_TYPE = 0x88A4


class Slave:
    """EtherCAT Slave 정보"""
    def __init__(self, position):
        self.position = position
        self.configured_address = 0x1000 + position
        self.name = f"Slave_{position}"
        self.vendor_id = 0
        self.product_code = 0
        self.revision = 0
        self.state = EC_STATE_NONE

    def __repr__(self):
        state_name = STATE_NAMES.get(self.state, f"0x{self.state:02X}")
        return f"Slave({self.position}, addr=0x{self.configured_address:04X}, state={state_name})"


class EtherCATMaster:
    """EtherCAT Master"""

    def __init__(self, adapter):
        self.adapter = adapter
        self.my_mac = get_if_hwaddr(adapter)
        self.idx = 0
        self.slaves = []
        self.timeout = 0.3

    def log(self, msg):
        ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        print(f"[{ts}] {msg}")

    def _next_idx(self):
        self.idx = (self.idx + 1) % 256
        return self.idx

    def _send_receive(self, cmd, adp, ado, data, timeout=None):
        """EtherCAT 패킷 송수신"""
        if timeout is None:
            timeout = self.timeout

        idx = self._next_idx()

        # EtherCAT 프레임 생성
        dg_len = len(data)
        ec_len = 10 + dg_len + 2

        ec_header = struct.pack('<H', ec_len | 0x1000)

        datagram = struct.pack('<BBHHHH',
            cmd, idx, adp, ado,
            dg_len,
            0  # IRQ
        ) + data + struct.pack('<H', 0)

        payload = (ec_header + datagram).ljust(46, b'\x00')

        pkt = Ether(
            src=self.my_mac,
            dst='ff:ff:ff:ff:ff:ff',
            type=ETHERCAT_TYPE
        ) / Raw(load=payload)

        # 응답 수신
        response = [None]

        def capture():
            def handler(p):
                if Ether in p and p[Ether].type == ETHERCAT_TYPE:
                    if p[Ether].src.lower() != self.my_mac.lower():
                        raw = bytes(p[Ether].payload)
                        if len(raw) > 3 and raw[3] == idx:
                            response[0] = raw

            sniff(iface=self.adapter, filter="ether proto 0x88a4",
                  prn=handler, timeout=timeout, store=False,
                  stop_filter=lambda x: response[0] is not None)

        t = threading.Thread(target=capture)
        t.start()
        time.sleep(0.02)

        sendp(pkt, iface=self.adapter, verbose=False)
        t.join()

        if response[0]:
            raw = response[0]
            wkc_pos = 2 + 10 + dg_len
            if len(raw) >= wkc_pos + 2:
                wkc = raw[wkc_pos] | (raw[wkc_pos + 1] << 8)
                resp_data = raw[12:12 + dg_len]
                return wkc, resp_data

        return 0, None

    # === 기본 명령어 ===

    def brd_read(self, ado, length):
        """Broadcast Read"""
        return self._send_receive(EC_CMD_BRD, 0, ado, bytes(length))

    def bwr_write(self, ado, data):
        """Broadcast Write"""
        return self._send_receive(EC_CMD_BWR, 0, ado, data)

    def aprd_read(self, position, ado, length):
        """Auto-increment Physical Read"""
        adp = (-position) & 0xFFFF
        return self._send_receive(EC_CMD_APRD, adp, ado, bytes(length))

    def apwr_write(self, position, ado, data):
        """Auto-increment Physical Write"""
        adp = (-position) & 0xFFFF
        return self._send_receive(EC_CMD_APWR, adp, ado, data)

    def fprd_read(self, addr, ado, length):
        """Configured Address Physical Read"""
        return self._send_receive(EC_CMD_FPRD, addr, ado, bytes(length))

    def fpwr_write(self, addr, ado, data):
        """Configured Address Physical Write"""
        return self._send_receive(EC_CMD_FPWR, addr, ado, data)

    # === Slave 관리 ===

    def scan_slaves(self):
        """Slave 스캔"""
        self.log("Scanning for slaves...")
        self.slaves = []

        for pos in range(1, 64):
            wkc, data = self.aprd_read(pos, REG_TYPE, 2)
            if wkc > 0:
                slave = Slave(pos)
                slave.state = EC_STATE_INIT
                self.slaves.append(slave)
                self.log(f"  Found slave at position {pos}")
            else:
                break

        self.log(f"Total slaves found: {len(self.slaves)}")
        return len(self.slaves)

    def config_slaves(self):
        """Slave 설정 (주소 할당)"""
        self.log("Configuring slaves...")

        for slave in self.slaves:
            # Station Address 설정
            addr_data = struct.pack('<H', slave.configured_address)
            wkc, _ = self.apwr_write(slave.position, REG_STATION_ADDR, addr_data)

            if wkc > 0:
                self.log(f"  Slave {slave.position}: assigned address 0x{slave.configured_address:04X}")
            else:
                self.log(f"  Slave {slave.position}: config failed")

    def read_slave_state(self, slave):
        """Slave 상태 읽기"""
        wkc, data = self.fprd_read(slave.configured_address, REG_AL_STATUS, 2)
        if wkc > 0 and data:
            slave.state = data[0] & 0x0F
            return slave.state
        return EC_STATE_NONE

    def write_slave_state(self, slave, state):
        """Slave 상태 쓰기 (상태 전이 요청)"""
        data = struct.pack('<H', state)
        wkc, _ = self.fpwr_write(slave.configured_address, REG_AL_CONTROL, data)
        return wkc > 0

    def read_all_states(self):
        """모든 Slave 상태 읽기"""
        for slave in self.slaves:
            self.read_slave_state(slave)

    def request_state(self, target_state):
        """모든 Slave 상태 전이 요청"""
        state_name = STATE_NAMES.get(target_state, f"0x{target_state:02X}")
        self.log(f"Requesting state: {state_name}")

        # Broadcast로 상태 전이 요청
        data = struct.pack('<H', target_state)
        wkc, _ = self.bwr_write(REG_AL_CONTROL, data)

        if wkc != len(self.slaves):
            self.log(f"  Warning: WKC mismatch (expected {len(self.slaves)}, got {wkc})")

        # 상태 확인 (약간의 대기)
        time.sleep(0.1)

        # 각 Slave 상태 확인
        all_ok = True
        for slave in self.slaves:
            self.read_slave_state(slave)
            actual_name = STATE_NAMES.get(slave.state, f"0x{slave.state:02X}")

            if slave.state == target_state:
                self.log(f"  Slave {slave.position}: {actual_name} ✓")
            else:
                self.log(f"  Slave {slave.position}: {actual_name} (expected {state_name})")
                all_ok = False

        return all_ok

    def transition_to_op(self):
        """INIT → PREOP → SAFEOP → OP 상태 전이"""
        self.log("=" * 40)
        self.log("State transition: INIT → OP")
        self.log("=" * 40)

        # INIT 상태 확인
        self.read_all_states()
        self.log("Current states:")
        for slave in self.slaves:
            state_name = STATE_NAMES.get(slave.state, f"0x{slave.state:02X}")
            self.log(f"  Slave {slave.position}: {state_name}")

        # INIT → PREOP
        if not self.request_state(EC_STATE_PREOP):
            self.log("Failed to transition to PRE-OP")
            return False

        time.sleep(0.1)

        # PREOP → SAFEOP
        if not self.request_state(EC_STATE_SAFEOP):
            self.log("Failed to transition to SAFE-OP")
            return False

        time.sleep(0.1)

        # SAFEOP → OP
        if not self.request_state(EC_STATE_OP):
            self.log("Failed to transition to OP")
            return False

        self.log("=" * 40)
        self.log("All slaves in OP state!")
        self.log("=" * 40)
        return True

    def print_status(self):
        """현재 상태 출력"""
        print()
        print("=" * 50)
        print("  EtherCAT Network Status")
        print("=" * 50)
        print(f"  Adapter: {self.adapter}")
        print(f"  Master MAC: {self.my_mac}")
        print(f"  Slaves: {len(self.slaves)}")
        print("-" * 50)

        for slave in self.slaves:
            state_name = STATE_NAMES.get(slave.state, f"0x{slave.state:02X}")
            print(f"  [{slave.position}] Address: 0x{slave.configured_address:04X}, State: {state_name}")

        print("=" * 50)
        print()

    # === PDO 통신 ===

    def lrw_exchange(self, logical_addr, output_data):
        """Logical Read/Write - PDO 데이터 교환

        Args:
            logical_addr: 논리 주소 (32비트)
            output_data: 출력 데이터 (bytes)

        Returns:
            (wkc, input_data): WKC와 입력 데이터
        """
        # LRW 명령 전송
        adp = logical_addr & 0xFFFF
        ado = (logical_addr >> 16) & 0xFFFF

        wkc, resp_data = self._send_receive(EC_CMD_LRW, adp, ado, output_data)
        return wkc, resp_data

    def setup_pdo_mapping(self):
        """PDO 매핑 설정 (간단한 예시)

        실제 환경에서는 CoE (CANopen over EtherCAT)를 통해
        SM (SyncManager)와 PDO 매핑을 설정해야 함
        """
        self.log("Setting up PDO mapping...")

        # 간단한 PDO 구조:
        # - 입력 PDO: 각 Slave당 2바이트
        # - 출력 PDO: 각 Slave당 2바이트

        self.pdo_input_size = len(self.slaves) * 2
        self.pdo_output_size = len(self.slaves) * 2
        self.pdo_logical_addr = 0x00001000  # 논리 주소

        self.log(f"  Logical address: 0x{self.pdo_logical_addr:08X}")
        self.log(f"  Input size: {self.pdo_input_size} bytes")
        self.log(f"  Output size: {self.pdo_output_size} bytes")

    def cyclic_exchange(self, output_data=None):
        """사이클릭 PDO 데이터 교환

        Args:
            output_data: 출력 데이터 (None이면 모두 0)

        Returns:
            input_data: 입력 데이터
        """
        if output_data is None:
            output_data = bytes(self.pdo_output_size)

        wkc, input_data = self.lrw_exchange(self.pdo_logical_addr, output_data)

        expected_wkc = len(self.slaves) * 3  # 읽기+쓰기 모두 성공 시

        if wkc < expected_wkc:
            self.log(f"  Warning: WKC={wkc} (expected {expected_wkc})")

        return input_data

    def run_cyclic(self, duration=5.0, cycle_time=0.01):
        """사이클릭 통신 실행

        Args:
            duration: 실행 시간 (초)
            cycle_time: 사이클 시간 (초)
        """
        self.log("=" * 40)
        self.log(f"Starting cyclic communication")
        self.log(f"  Duration: {duration}s, Cycle: {cycle_time*1000:.1f}ms")
        self.log("=" * 40)

        # PDO 매핑 설정
        self.setup_pdo_mapping()

        start_time = time.time()
        cycle_count = 0
        error_count = 0

        output_counter = 0

        try:
            while time.time() - start_time < duration:
                cycle_start = time.time()

                # 출력 데이터 생성 (카운터 값)
                output_data = struct.pack('<H', output_counter) * len(self.slaves)
                output_counter = (output_counter + 1) % 65536

                # PDO 교환
                input_data = self.cyclic_exchange(output_data)

                cycle_count += 1

                if input_data:
                    # 첫 번째와 100번째 사이클에서 데이터 출력
                    if cycle_count == 1 or cycle_count == 100:
                        self.log(f"  Cycle {cycle_count}: TX={output_data.hex()}, RX={input_data.hex()}")
                else:
                    error_count += 1

                # 사이클 타임 대기
                elapsed = time.time() - cycle_start
                if elapsed < cycle_time:
                    time.sleep(cycle_time - elapsed)

        except KeyboardInterrupt:
            self.log("Stopped by user")

        # 통계 출력
        actual_duration = time.time() - start_time
        self.log("=" * 40)
        self.log(f"Cyclic communication finished")
        self.log(f"  Total cycles: {cycle_count}")
        self.log(f"  Errors: {error_count}")
        self.log(f"  Actual duration: {actual_duration:.2f}s")
        self.log(f"  Average cycle: {(actual_duration/cycle_count)*1000:.2f}ms")
        self.log("=" * 40)


def main():
    import sys

    # 어댑터 설정
    ADAPTER = r'\Device\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'

    print()
    print("=" * 50)
    print("  EtherCAT Master (Scapy)")
    print("=" * 50)
    print()

    master = EtherCATMaster(ADAPTER)

    # 1. Slave 스캔
    count = master.scan_slaves()
    if count == 0:
        print("No slaves found. Check connection.")
        return

    # 2. Slave 설정 (주소 할당)
    master.config_slaves()

    # 3. 상태 출력
    master.read_all_states()
    master.print_status()

    # 4. OP 상태로 전이
    print("Transitioning to OP state...")
    if master.transition_to_op():
        master.print_status()
        print("Ready for cyclic communication!")
        print()

        # 5. PDO 사이클릭 통신 테스트
        print("Starting PDO cyclic test (5 seconds)...")
        print("Press Ctrl+C to stop early")
        print()
        master.run_cyclic(duration=5.0, cycle_time=0.05)  # 50ms 사이클
    else:
        print("State transition failed.")
        master.print_status()


if __name__ == "__main__":
    main()
