"""EtherCAT 응답 패킷 수신 테스트"""
import pysoem
import time

ADAPTER = r'\Device\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'

print(f"어댑터: {ADAPTER}")
print()

master = pysoem.Master()
master.open(ADAPTER)

print("=== 테스트 1: BRD로 레지스터 0x0000 읽기 ===")
for i in range(3):
    wkc = master.read_state()
    print(f"  WKC: {wkc}")
    time.sleep(0.2)

print()
print("=== 테스트 2: config_init() ===")
result = master.config_init()
print(f"  반환값: {result}")
print(f"  Slave 수: {len(master.slaves)}")

if len(master.slaves) > 0:
    for i, slave in enumerate(master.slaves):
        print(f"  Slave {i+1}: {slave.name}")
else:
    print("  Slave 없음")

print()
print("=== 테스트 3: 어댑터 목록 ===")
adapters = pysoem.find_adapters()
for a in adapters:
    if 'I219' in str(a.desc):
        print(f"  {a.name}")
        print(f"    {a.desc}")

master.close()
print()
print("완료")