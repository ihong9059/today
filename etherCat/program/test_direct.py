"""직접 EtherCAT 패킷 송수신 테스트"""
from scapy.all import Ether, Raw, sendp, sniff, conf, get_if_hwaddr
import struct
import threading
import time

conf.verb = 0

ADAPTER = r'\Device\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'
ETHERCAT_TYPE = 0x88A4

print(f"어댑터: {ADAPTER}")

# BRD 패킷 생성 (레지스터 0x0000 읽기)
# EtherCAT Header: length=14, type=1
ec_header = struct.pack('<H', 0x100E)  # 14 bytes, type 1
# Datagram: CMD=BRD(7), IDX=1, ADP=0, ADO=0, LEN=2, IRQ=0, DATA=0000, WKC=0
datagram = struct.pack('<BBHHHHH',
    0x07,   # CMD = BRD
    0x01,   # IDX = 1
    0x0000, # ADP
    0x0000, # ADO (레지스터 주소)
    0x0002, # LEN = 2
    0x0000, # IRQ
    0x0000  # WKC
)
# 2바이트 데이터
data = b'\x00\x00'

payload = ec_header + datagram[:8] + data + datagram[8:]

# 패딩
payload = payload.ljust(46, b'\x00')

my_mac = get_if_hwaddr(ADAPTER)
print(f"내 MAC: {my_mac}")

pkt = Ether(
    src=my_mac,
    dst='ff:ff:ff:ff:ff:ff',
    type=ETHERCAT_TYPE
) / Raw(load=payload)

print(f"패킷 크기: {len(bytes(pkt))} bytes")
print()

# 응답 수신 스레드
responses = []

def capture():
    def handler(p):
        if Ether in p and p[Ether].type == ETHERCAT_TYPE:
            src = p[Ether].src
            if src != my_mac:  # 내가 보낸 패킷 제외
                responses.append(p)
                print(f"  응답 수신: {src} ({len(p)} bytes)")

    sniff(iface=ADAPTER, filter="ether proto 0x88a4", prn=handler, timeout=3, store=False)

# 캡처 시작
t = threading.Thread(target=capture)
t.start()

time.sleep(0.5)

# 패킷 전송
print("BRD 패킷 전송 중...")
for i in range(5):
    sendp(pkt, iface=ADAPTER, verbose=False)
    print(f"  전송 {i+1}")
    time.sleep(0.1)

t.join()

print()
print(f"수신된 응답: {len(responses)}개")

if responses:
    # 첫 번째 응답 분석
    resp = responses[0]
    raw = bytes(resp[Ether].payload)
    print(f"응답 페이로드: {raw[:20].hex()}")

    # WKC 확인
    if len(raw) >= 14:
        wkc = raw[12] | (raw[13] << 8)
        print(f"WKC: {wkc}")
