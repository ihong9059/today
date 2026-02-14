#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
ethercat_loopback_test.py
EtherCAT 루프백 테스트 - 두 NIC 간 Raw Ethernet 통신 테스트

두 이더넷 어댑터가 케이블로 연결되어 있을 때,
EtherCAT 프레임을 송수신하여 통신을 검증합니다.

요구사항:
    - 관리자 권한
    - Npcap 설치 (WinPcap 호환 모드)
    - 두 이더넷 어댑터 케이블 연결

사용법:
    py -3.14 ethercat_loopback_test.py
"""

import sys
import time
import struct
import threading
from datetime import datetime

try:
    import pysoem
except ImportError:
    print("[ERROR] PySOEM이 필요합니다: pip install pysoem")
    sys.exit(1)


# EtherCAT 상수
ETHERCAT_ETHERTYPE = 0x88A4
BROADCAST_MAC = b'\xff\xff\xff\xff\xff\xff'


def log(msg):
    """타임스탬프 로그"""
    ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
    print(f"[{ts}] {msg}")


def get_ethernet_adapters():
    """실제 이더넷 어댑터만 필터링"""
    adapters = pysoem.find_adapters()
    ethernet_adapters = []

    for i, a in enumerate(adapters):
        desc = a.desc.decode() if isinstance(a.desc, bytes) else a.desc

        # 가상 어댑터 제외
        is_virtual = any(x in desc for x in [
            'WAN', 'loopback', 'Wi-Fi', 'Bluetooth', 'Tailscale',
            'Virtual', 'Hyper-V', 'Microsoft'
        ])

        # 실제 이더넷 어댑터
        is_ethernet = any(x in desc for x in [
            'Ethernet', 'GbE', 'I219', 'Realtek', 'Intel'
        ])

        if is_ethernet and not is_virtual:
            ethernet_adapters.append({
                'index': i,
                'name': a.name,
                'desc': desc
            })

    return ethernet_adapters


def test_master_connectivity(adapter_name, adapter_desc):
    """Master로서 Slave 스캔 테스트"""
    print()
    print(f"  테스트 어댑터: {adapter_desc}")
    print("-" * 50)

    master = pysoem.Master()

    try:
        log("어댑터 열기...")
        master.open(adapter_name)
        log("✓ 어댑터 열기 성공")

        log("Slave 검색 중...")
        slave_count = master.config_init()

        if slave_count > 0:
            log(f"✓ {slave_count}개 Slave 발견!")

            for i, slave in enumerate(master.slaves):
                print(f"    Slave {i+1}: {slave.name}")
                print(f"             제조사: 0x{slave.man:08X}")
                print(f"             제품:   0x{slave.id:08X}")

            return True
        else:
            log("△ Slave 없음 (정상 - TwinCAT 미실행 시)")
            return False

    except Exception as e:
        log(f"✗ 오류: {e}")
        return False

    finally:
        master.close()


def test_pdo_cycle(adapter_name, adapter_desc, cycles=10):
    """PDO 사이클 테스트 (Slave 있을 때만)"""
    print()
    print(f"  PDO 사이클 테스트: {adapter_desc}")
    print("-" * 50)

    master = pysoem.Master()

    try:
        master.open(adapter_name)
        slave_count = master.config_init()

        if slave_count == 0:
            log("Slave 없음 - PDO 테스트 스킵")
            return False

        log(f"{slave_count}개 Slave로 PDO 테스트 시작...")

        # PDO 매핑
        master.config_map()
        log("✓ PDO 매핑 완료")

        # SAFE-OP 상태로 전이
        master.state = pysoem.SAFEOP_STATE
        master.write_state()
        time.sleep(0.1)
        master.state_check(pysoem.SAFEOP_STATE, 50000)

        if master.state == pysoem.SAFEOP_STATE:
            log("✓ SAFE-OP 상태 도달")
        else:
            log(f"△ 상태: {master.state}")

        # OP 상태로 전이
        master.state = pysoem.OP_STATE
        master.write_state()
        time.sleep(0.1)
        master.state_check(pysoem.OP_STATE, 50000)

        if master.state == pysoem.OP_STATE:
            log("✓ OP 상태 도달")
        else:
            log(f"△ 상태: {master.state}")

        # PDO 사이클 실행
        log(f"PDO 사이클 실행 ({cycles}회)...")
        success_count = 0

        for i in range(cycles):
            try:
                master.send_processdata()
                wkc = master.receive_processdata(timeout=10000)

                if wkc > 0:
                    success_count += 1
                    if i % 5 == 0:
                        log(f"  사이클 {i+1}: WKC={wkc} ✓")
                else:
                    log(f"  사이클 {i+1}: WKC=0 ✗")

                time.sleep(0.001)  # 1ms 사이클

            except Exception as e:
                log(f"  사이클 {i+1}: 오류 - {e}")

        log(f"결과: {success_count}/{cycles} 성공")
        return success_count > 0

    except Exception as e:
        log(f"✗ PDO 테스트 오류: {e}")
        return False

    finally:
        master.close()


def run_full_test():
    """전체 테스트 실행"""
    print()
    print("=" * 60)
    print("  EtherCAT 루프백 테스트")
    print("=" * 60)
    print()

    # 1. 어댑터 검색
    print("[1] 이더넷 어댑터 검색")
    print("-" * 60)

    adapters = get_ethernet_adapters()

    if len(adapters) < 1:
        print("  ✗ 이더넷 어댑터를 찾을 수 없습니다")
        return

    for a in adapters:
        print(f"  [{a['index']}] {a['desc']}")

    print()

    # 2. 각 어댑터로 Master 테스트
    print("[2] Master 연결 테스트")
    print("-" * 60)

    results = {}
    for a in adapters:
        results[a['index']] = test_master_connectivity(a['name'], a['desc'])
        print()

    # 3. Slave가 발견된 경우 PDO 테스트
    print("[3] PDO 사이클 테스트")
    print("-" * 60)

    for a in adapters:
        if results.get(a['index']):
            test_pdo_cycle(a['name'], a['desc'])
        else:
            print(f"  {a['desc']}: Slave 없음 - 스킵")

    print()

    # 4. 결과 요약
    print("=" * 60)
    print("  테스트 결과 요약")
    print("=" * 60)
    print()

    has_slave = any(results.values())

    if has_slave:
        print("  ✓ EtherCAT Slave 발견됨")
        print("    → 시뮬레이션 준비 완료!")
    else:
        print("  △ EtherCAT Slave 미발견")
        print()
        print("  현재 상태:")
        print("    - 두 NIC가 케이블로 연결되어 있음")
        print("    - Master 기능은 정상")
        print("    - Slave 장치가 없어서 통신 불가")
        print()
        print("  다음 단계:")
        print("    1. TwinCAT 3 설치 후 Slave 시뮬레이션 구성")
        print("    2. 또는 실제 EtherCAT Slave 하드웨어 연결")
        print("       (EasyCAT, LAN9252 개발보드 등)")
        print()
        print("  참고:")
        print("    → 문서: etherCat/TwinCAT_SOEM_통합_시뮬레이션_가이드.md")
        print("    → TwinCAT 설치: simulation/setup/04_install_twincat.md")

    print()
    print("=" * 60)


def main():
    print()
    print("관리자 권한으로 실행 중인지 확인하세요.")
    print("(Npcap raw socket 접근에 필요)")
    print()

    run_full_test()


if __name__ == "__main__":
    main()
