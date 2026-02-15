import pysoem
import time

ADAPTER = '\\Device\\NPF_{3EF881C7-9819-4A46-AD65-57F592C9E60E}'

print(f'어댑터: {ADAPTER}')
print('Master 초기화 중...')

master = pysoem.Master()
master.open(ADAPTER)

# 타임아웃 설정 (마이크로초)
print('타임아웃 설정...')
EC_TIMEOUTRET = 2000      # 기본값 대비 증가
EC_TIMEOUTSAFE = 20000
EC_TIMEOUTSTATE = 2000000

print('Slave 스캔 중 (5초 대기)...')
time.sleep(1)

slave_count = master.config_init()
print(f'config_init() 반환값: {slave_count}')

if slave_count > 0:
    print(f'발견된 Slave 수: {len(master.slaves)}')
    print(f'Expected WKC: {master.expected_wkc}')
    for i, slave in enumerate(master.slaves):
        print(f'  Slave {i+1}: {slave.name}')
        print(f'    Vendor: 0x{slave.man:08X}')
        print(f'    Product: 0x{slave.id:08X}')
else:
    print('Slave를 찾지 못했습니다.')
    print()
    print('디버그: BRD 테스트...')
    # 수동으로 상태 확인
    try:
        wkc = master.read_state()
        print(f'read_state() WKC: {wkc}')
    except Exception as e:
        print(f'read_state() 오류: {e}')

master.close()
print('완료.')
