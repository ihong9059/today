#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
check_adapters.py
네트워크 어댑터 확인 및 EtherCAT 테스트 준비 상태 점검
"""

import subprocess
import sys
import os

def check_admin():
    """관리자 권한 확인"""
    try:
        import ctypes
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except:
        return False

def get_network_adapters():
    """네트워크 어댑터 목록 조회"""
    try:
        result = subprocess.run(
            ['powershell', '-Command',
             'Get-NetAdapter | Select-Object Name, InterfaceDescription, Status, LinkSpeed | ConvertTo-Json'],
            capture_output=True, text=True, encoding='utf-8'
        )
        import json
        adapters = json.loads(result.stdout)
        if isinstance(adapters, dict):
            adapters = [adapters]
        return adapters
    except Exception as e:
        print(f"[ERROR] 어댑터 조회 실패: {e}")
        return []

def check_npcap():
    """Npcap 설치 확인"""
    npcap_path = r"C:\Program Files\Npcap"
    return os.path.exists(npcap_path)

def check_pysoem():
    """PySOEM 설치 확인"""
    try:
        import pysoem
        return True, pysoem.__version__
    except ImportError:
        return False, None

def main():
    print("=" * 60)
    print("  EtherCAT 시뮬레이션 환경 점검")
    print("=" * 60)
    print()

    # 1. 관리자 권한 확인
    print("[1] 관리자 권한 확인")
    if check_admin():
        print("    ✓ 관리자 권한으로 실행 중")
    else:
        print("    ✗ 관리자 권한 필요 (EtherCAT 테스트 시)")
    print()

    # 2. Npcap 확인
    print("[2] Npcap 설치 확인")
    if check_npcap():
        print("    ✓ Npcap 설치됨")
    else:
        print("    ✗ Npcap 미설치")
        print("    → setup\\01_install_npcap.ps1 실행 필요")
    print()

    # 3. PySOEM 확인
    print("[3] PySOEM 설치 확인")
    installed, version = check_pysoem()
    if installed:
        print(f"    ✓ PySOEM {version} 설치됨")
    else:
        print("    ✗ PySOEM 미설치")
        print("    → setup\\03_install_pysoem.ps1 실행 필요")
    print()

    # 4. 네트워크 어댑터 확인
    print("[4] 네트워크 어댑터 목록")
    print("-" * 60)
    adapters = get_network_adapters()

    ethercat_ready = []
    for adapter in adapters:
        name = adapter.get('Name', 'Unknown')
        desc = adapter.get('InterfaceDescription', 'Unknown')
        status = adapter.get('Status', 'Unknown')
        speed = adapter.get('LinkSpeed', 'Unknown')

        # EtherCAT 사용 가능한 어댑터 (유선, 연결됨)
        is_wired = 'Wi-Fi' not in desc and 'Bluetooth' not in desc and 'Tailscale' not in desc and 'Hyper-V' not in desc
        is_up = status == 'Up' or status == 2  # 2 = Up in some cases

        status_icon = "●" if is_up else "○"
        status_str = "Up" if is_up else "Disconnected"

        print(f"    {status_icon} {name}")
        print(f"      장치: {desc}")
        print(f"      상태: {status_str}, 속도: {speed}")

        if is_wired and is_up:
            ethercat_ready.append(name)
        print()

    print("-" * 60)

    # 5. EtherCAT 준비 상태
    print("[5] EtherCAT 테스트 준비 상태")
    if len(ethercat_ready) >= 2:
        print(f"    ✓ {len(ethercat_ready)}개 어댑터 사용 가능")
        print(f"    → Master: {ethercat_ready[0]}")
        print(f"    → Slave:  {ethercat_ready[1]}")
        print()
        print("    준비 완료! src\\python\\scan_slaves.py 실행 가능")
    elif len(ethercat_ready) == 1:
        print(f"    △ 1개 어댑터만 연결됨: {ethercat_ready[0]}")
        print("    → 두 번째 어댑터 연결 필요 (또는 TwinCAT 시뮬레이션)")
    else:
        print("    ✗ 연결된 유선 어댑터 없음")
        print("    → 이더넷 케이블 연결 확인")

    print()
    print("=" * 60)

if __name__ == "__main__":
    main()
