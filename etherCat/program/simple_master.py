"""간단한 EtherCAT Master (Scapy 기반)"""
from scapy.all import Ether, Raw, sendp, sniff, conf, get_if_hwaddr
import struct
import threading
import time

conf.verb = 0

ADAPTER = r'\Device\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'
ETHERCAT_TYPE = 0x88A4

class SimpleMaster:
    def __init__(self, adapter):
        self.adapter = adapter
        self.my_mac = get_if_hwaddr(adapter)
        self.idx = 0
        self.responses = {}
        self.running = False

    def send_and_receive(self, cmd, adp, ado, data, timeout=0.5):
        """패킷 전송 및 응답 대기"""
        self.idx = (self.idx + 1) % 256
        idx = self.idx

        # EtherCAT 프레임 생성
        dg_len = len(data)
        ec_len = 10 + dg_len + 2  # 헤더 + 데이터 + WKC

        ec_header = struct.pack('<H', ec_len | 0x1000)  # type=1

        datagram = struct.pack('<BBHHHH',
            cmd, idx, adp, ado,
            dg_len,  # LEN (no flags)
            0        # IRQ
        ) + data + struct.pack('<H', 0)  # WKC=0

        payload = (ec_header + datagram).ljust(46, b'\x00')

        pkt = Ether(
            src=self.my_mac,
            dst='ff:ff:ff:ff:ff:ff',
            type=ETHERCAT_TYPE
        ) / Raw(load=payload)

        # 응답 대기
        self.responses[idx] = None

        def capture():
            def handler(p):
                if Ether in p and p[Ether].type == ETHERCAT_TYPE:
                    if p[Ether].src != self.my_mac:
                        raw = bytes(p[Ether].payload)
                        if len(raw) > 3 and raw[3] == idx:
                            self.responses[idx] = raw

            sniff(iface=self.adapter, filter="ether proto 0x88a4",
                  prn=handler, timeout=timeout, store=False)

        t = threading.Thread(target=capture)
        t.start()
        time.sleep(0.05)

        sendp(pkt, iface=self.adapter, verbose=False)
        t.join()

        return self.responses.get(idx)

    def brd_read(self, ado, length):
        """Broadcast Read"""
        data = bytes(length)
        resp = self.send_and_receive(0x07, 0, ado, data)

        if resp:
            # WKC 추출
            wkc_pos = 2 + 10 + length
            if len(resp) >= wkc_pos + 2:
                wkc = resp[wkc_pos] | (resp[wkc_pos + 1] << 8)
                data_resp = resp[12:12+length]
                return wkc, data_resp
        return 0, None

    def aprd_read(self, position, ado, length):
        """Auto-increment Physical Read"""
        adp = (-position) & 0xFFFF  # signed to unsigned
        data = bytes(length)
        resp = self.send_and_receive(0x01, adp, ado, data)

        if resp:
            wkc_pos = 2 + 10 + length
            if len(resp) >= wkc_pos + 2:
                wkc = resp[wkc_pos] | (resp[wkc_pos + 1] << 8)
                data_resp = resp[12:12+length]
                return wkc, data_resp
        return 0, None


def main():
    print("=" * 50)
    print("  Simple EtherCAT Master")
    print("=" * 50)
    print(f"Adapter: {ADAPTER}")
    print()

    master = SimpleMaster(ADAPTER)
    print(f"My MAC: {master.my_mac}")
    print()

    # BRD 테스트 - 레지스터 0x0000 읽기
    print("=== BRD Test (Register 0x0000) ===")
    wkc, data = master.brd_read(0x0000, 2)
    print(f"  WKC: {wkc}")
    if data:
        print(f"  Data: {data.hex()}")
    print()

    # Slave 스캔 (APRD)
    print("=== Slave Scan (APRD) ===")
    slave_count = 0

    for pos in range(1, 10):
        wkc, data = master.aprd_read(pos, 0x0000, 2)
        if wkc > 0:
            slave_count += 1
            print(f"  Slave {pos}: Found (WKC={wkc}, Type={data.hex() if data else 'N/A'})")
        else:
            print(f"  Slave {pos}: Not found")
            break

    print()
    print(f"Total slaves found: {slave_count}")


if __name__ == "__main__":
    main()
