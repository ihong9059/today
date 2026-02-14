#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
digital_io_test.py
EtherCAT Digital I/O 테스트 (TwinCAT Slave 시뮬레이션 연동)

사용법:
    python digital_io_test.py           # 첫 번째 어댑터 사용
    python digital_io_test.py 0         # 어댑터 인덱스 지정
"""

import sys
import time
import signal

# Ctrl+C 처리
running = True
def signal_handler(sig, frame):
    global running
    print("\n\n[!] 종료 요청...")
    running = False

signal.signal(signal.SIGINT, signal_handler)

def check_pysoem():
    try:
        import pysoem
        return True
    except ImportError:
        print("[ERROR] PySOEM이 설치되어 있지 않습니다!")
        print("  pip install pysoem")
        return False

def digital_io_test(adapter_index=0):
    """Digital I/O PDO 통신 테스트"""
    global running
    import pysoem

    adapters = pysoem.find_adapters()

    if adapter_index >= len(adapters):
        print(f"[ERROR] 어댑터 인덱스 {adapter_index}가 범위를 벗어났습니다!")
        return

    adapter = adapters[adapter_index]

    print("=" * 60)
    print("  EtherCAT Digital I/O 테스트")
    print("=" * 60)
    print()
    print(f"  어댑터: {adapter.desc}")
    print()

    master = pysoem.Master()

    try:
        # 초기화
        print("[1] 초기화...")
        master.open(adapter.name)
        print("    ✓ 어댑터 열기 성공")

        # Slave 검색
        print("[2] Slave 검색...")
        slave_count = master.config_init()

        if slave_count == 0:
            print("    ✗ Slave를 찾을 수 없습니다!")
            master.close()
            return

        print(f"    ✓ {slave_count}개 Slave 발견")

        # Slave 정보
        print()
        for i, slave in enumerate(master.slaves):
            print(f"    Slave {i+1}: {slave.name}")

        # PDO 매핑
        print()
        print("[3] PDO 매핑...")
        master.config_map()
        master.config_dc()
        print("    ✓ 완료")

        # SAFE-OP 전이
        print("[4] SAFE-OP 상태 전이...")
        master.state = pysoem.SAFEOP_STATE
        master.write_state()

        for _ in range(100):
            master.send_processdata()
            master.receive_processdata(10000)
            if master.state_check(pysoem.SAFEOP_STATE, 50000) == pysoem.SAFEOP_STATE:
                break

        if master.state != pysoem.SAFEOP_STATE:
            print(f"    ✗ SAFE-OP 실패 (현재 상태: {master.state})")
            master.close()
            return

        print("    ✓ SAFE-OP 도달")

        # OP 전이
        print("[5] OP 상태 전이...")
        master.state = pysoem.OP_STATE
        master.write_state()

        for _ in range(200):
            master.send_processdata()
            master.receive_processdata(10000)
            if master.state_check(pysoem.OP_STATE, 50000) == pysoem.OP_STATE:
                break

        if master.state != pysoem.OP_STATE:
            print(f"    ✗ OP 실패 (현재 상태: {master.state})")
            master.close()
            return

        print("    ✓ OP 상태 도달!")
        print()
        print("=" * 60)
        print("  PDO 통신 시작 (Ctrl+C로 종료)")
        print("=" * 60)
        print()
        print("  Cycle |  Output  |  Input   | WKC")
        print("  ------+----------+----------+-----")

        output_pattern = 0x01
        cycle = 0

        while running:
            # Output 설정 (첫 번째 Digital Output Slave)
            for slave in master.slaves:
                if slave.output_size > 0:
                    # LED 패턴 출력
                    slave.output = bytes([output_pattern])
                    break

            # PDO 교환
            master.send_processdata()
            wkc = master.receive_processdata(10000)

            # Input 읽기 (첫 번째 Digital Input Slave)
            input_value = 0
            for slave in master.slaves:
                if slave.input_size > 0:
                    input_data = slave.input
                    if input_data and len(input_data) > 0:
                        input_value = input_data[0]
                    break

            # 출력 (100 사이클마다)
            if cycle % 100 == 0:
                print(f"  {cycle:5d} |   0x{output_pattern:02X}   |   0x{input_value:02X}   | {wkc}")

            # 패턴 회전 (1초마다)
            if cycle % 1000 == 0:
                output_pattern = ((output_pattern << 1) | (output_pattern >> 7)) & 0xFF

            cycle += 1
            time.sleep(0.001)  # 1ms 주기

        print()
        print(f"  총 {cycle} 사이클 실행")

    except Exception as e:
        print(f"[ERROR] 오류: {e}")

    finally:
        print()
        print("[6] 종료 중...")
        master.state = pysoem.INIT_STATE
        master.write_state()
        master.close()
        print("    ✓ 완료")

def main():
    if not check_pysoem():
        sys.exit(1)

    adapter_index = 0
    if len(sys.argv) > 1:
        try:
            adapter_index = int(sys.argv[1])
        except ValueError:
            print(f"[ERROR] 잘못된 인수: {sys.argv[1]}")
            sys.exit(1)

    digital_io_test(adapter_index)

if __name__ == "__main__":
    main()
