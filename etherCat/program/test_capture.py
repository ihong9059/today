"""Windows에서 EtherCAT 패킷 수신 테스트"""
from scapy.all import sniff, Ether, conf
import time

# Scapy 설정
conf.verb = 0

ADAPTER = r'\Device\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'
ETHERCAT_TYPE = 0x88A4

print(f"어댑터: {ADAPTER}")
print(f"EtherCAT 패킷 캡처 중 (5초)...")
print()

packets = []

def handle_packet(pkt):
    if Ether in pkt and pkt[Ether].type == ETHERCAT_TYPE:
        src = pkt[Ether].src
        dst = pkt[Ether].dst
        size = len(pkt)
        packets.append((src, dst, size))
        print(f"  {src} -> {dst} ({size} bytes)")

try:
    sniff(
        iface=ADAPTER,
        filter="ether proto 0x88a4",
        prn=handle_packet,
        timeout=5,
        store=False
    )
except Exception as e:
    print(f"오류: {e}")

print()
print(f"총 {len(packets)}개 패킷 캡처")

# 방향별 분류
master_pkts = [p for p in packets if p[0] == '01:01:01:01:01:01']
slave_pkts = [p for p in packets if p[0] != '01:01:01:01:01:01']

print(f"  Master -> Slave: {len(master_pkts)}개")
print(f"  Slave -> Master: {len(slave_pkts)}개")
