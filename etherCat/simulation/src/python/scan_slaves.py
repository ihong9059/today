#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
scan_slaves.py
EtherCAT 네트워크에서 Slave 장치 스캔

사용법:
    python scan_slaves.py              # 자동으로 첫 번째 어댑터 사용
    python scan_slaves.py 0            # 인덱스로 어댑터 선택
    python scan_slaves.py list         # 어댑터 목록만 출력
"""

import sys
import time

def check_pysoem():
    try:
        import pysoem
        return True
    except ImportError:
        print("[ERROR] PySOEM이 설치되어 있지 않습니다!")
        print()
        print("설치 방법:")
        print("  pip install pysoem")
        print()
        print("또는 setup\\03_install_pysoem.ps1 실행")
        return False

def list_adapters():
    """사용 가능한 네트워크 어댑터 목록"""
    import pysoem
    adapters = pysoem.find_adapters()

    print("=" * 60)
    print("  사용 가능한 네트워크 어댑터")
    print("=" * 60)
    print()

    for i, adapter in enumerate(adapters):
        print(f"  [{i}] {adapter.desc}")
        print(f"      Name: {adapter.name}")
        print()

    return adapters

def scan_slaves(adapter_index=0):
    """EtherCAT Slave 스캔"""
    import pysoem

    adapters = pysoem.find_adapters()

    if len(adapters) == 0:
        print("[ERROR] 네트워크 어댑터를 찾을 수 없습니다!")
        return

    if adapter_index >= len(adapters):
        print(f"[ERROR] 어댑터 인덱스 {adapter_index}가 범위를 벗어났습니다!")
        print(f"        사용 가능한 인덱스: 0 ~ {len(adapters)-1}")
        return

    adapter = adapters[adapter_index]

    print("=" * 60)
    print("  EtherCAT Slave 스캔")
    print("=" * 60)
    print()
    print(f"  어댑터: {adapter.desc}")
    print(f"  Name:   {adapter.name}")
    print()
    print("-" * 60)

    # Master 생성 및 연결
    master = pysoem.Master()

    try:
        print("[1] 어댑터 열기...")
        master.open(adapter.name)
        print("    ✓ 성공")
        print()

        print("[2] Slave 검색 중...")
        slave_count = master.config_init()

        if slave_count == 0:
            print("    ✗ Slave를 찾을 수 없습니다!")
            print()
            print("    확인사항:")
            print("    - TwinCAT Slave 시뮬레이션이 실행 중인지 확인")
            print("    - 이더넷 케이블이 올바르게 연결되었는지 확인")
            print("    - 올바른 네트워크 어댑터를 선택했는지 확인")
            master.close()
            return

        print(f"    ✓ {slave_count}개 Slave 발견!")
        print()

        print("-" * 60)
        print("  발견된 Slave 목록")
        print("-" * 60)
        print()

        for i, slave in enumerate(master.slaves):
            print(f"  Slave {i+1}:")
            print(f"    이름:       {slave.name}")
            print(f"    제조사 ID:  0x{slave.man:08X}")
            print(f"    제품 코드:  0x{slave.id:08X}")
            print(f"    Revision:   0x{slave.rev:08X}")
            print()

        print("-" * 60)
        print()

        # PDO 매핑
        print("[3] PDO 매핑...")
        master.config_map()
        print("    ✓ 완료")
        print()

        # 상태 전이 테스트
        print("[4] 상태 전이 테스트...")
        print("    INIT → PRE-OP...")
        master.state = pysoem.PREOP_STATE
        master.write_state()
        time.sleep(0.1)
        master.state_check(pysoem.PREOP_STATE, 50000)

        if master.state == pysoem.PREOP_STATE:
            print("    ✓ PRE-OP 상태 도달")
        else:
            print(f"    △ 현재 상태: {master.state}")

        print()
        print("=" * 60)
        print("  스캔 완료!")
        print("=" * 60)

    except Exception as e:
        print(f"[ERROR] 오류 발생: {e}")
        print()
        print("관리자 권한으로 실행했는지 확인하세요.")

    finally:
        master.close()

def main():
    if not check_pysoem():
        sys.exit(1)

    if len(sys.argv) > 1:
        arg = sys.argv[1]
        if arg == "list":
            list_adapters()
        else:
            try:
                index = int(arg)
                scan_slaves(index)
            except ValueError:
                print(f"[ERROR] 잘못된 인수: {arg}")
                print("사용법: python scan_slaves.py [어댑터_인덱스 | list]")
    else:
        # 기본: 첫 번째 어댑터 사용
        scan_slaves(0)

if __name__ == "__main__":
    main()
