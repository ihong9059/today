"""
BLE OTA Test Client — UTTEC-OTA에 펌웨어를 BLE로 전송
사용법: python ota_test_client.py [firmware.bin]
       python ota_test_client.py --scan          # BLE 스캔만
       python ota_test_client.py --info          # 연결 + 서비스 확인만
"""

import asyncio
import sys
import struct
import time
from pathlib import Path

from bleak import BleakClient, BleakScanner, AdvertisementData

# UUID 정의 (ble_ota.h 참조)
OTA_SVC_UUID  = "0000fe00-0000-1000-8000-00805f9b34fb"
OTA_CTRL_UUID = "0000fe01-0000-1000-8000-00805f9b34fb"
OTA_DATA_UUID = "0000fe02-0000-1000-8000-00805f9b34fb"
OTA_STAT_UUID = "0000fe03-0000-1000-8000-00805f9b34fb"

# OTA 명령
OTA_CMD_START = 0x01
OTA_CMD_END   = 0x02
OTA_CMD_ABORT = 0x03

# OTA 상태
STATUS_NAMES = {
    0x00: "IDLE",
    0x01: "READY",
    0x02: "RECEIVING",
    0x03: "VERIFYING",
    0x04: "SUCCESS",
    0x05: "CRC_FAIL",
    0x06: "WRITE_FAIL",
    0x07: "ABORT_OK",
}

DEVICE_NAME = "UTTEC-OTA"
CHUNK_SIZE = 240  # MTU 256 → payload max 253, 여유 두고 240

# 상태 추적
last_status = None
last_progress = 0


def status_callback(sender, data):
    """OTA_STATUS Notify 핸들러"""
    global last_status, last_progress
    if len(data) >= 2:
        last_status = data[0]
        last_progress = data[1]
        name = STATUS_NAMES.get(data[0], f"UNKNOWN({data[0]:#x})")
        print(f"  [STATUS] {name} — {data[1]}%")


async def scan():
    """BLE 스캔 — UTTEC-OTA 찾기"""
    print("BLE 스캔 중... (5초)")
    devices = await BleakScanner.discover(timeout=5.0, return_adv=True)
    found = False
    for addr, (d, adv) in devices.items():
        name = d.name or "(이름없음)"
        rssi = adv.rssi if adv else "?"
        if DEVICE_NAME in name:
            print(f"  ★ {name}  addr={d.address}  RSSI={rssi}")
            found = True
        else:
            print(f"    {name}  addr={d.address}  RSSI={rssi}")
    if not found:
        print(f"\n'{DEVICE_NAME}' 를 찾지 못했습니다.")
    return found


async def find_device():
    """UTTEC-OTA 디바이스 찾기 (이름 또는 MAC 또는 서비스 UUID)"""
    print(f"'{DEVICE_NAME}' 스캔 중...")
    ESP32_MAC = "78:1C:3C:F4:AD:02"

    # 이름으로 검색
    device = await BleakScanner.find_device_by_name(DEVICE_NAME, timeout=5.0)
    if device:
        print(f"  발견 (이름): {device.name}  addr={device.address}")
        return device

    # MAC 주소로 검색
    print(f"  이름으로 못 찾음, MAC({ESP32_MAC})으로 검색...")
    devices = await BleakScanner.discover(timeout=5.0, return_adv=True)
    for addr, (d, adv) in devices.items():
        if d.address.upper() == ESP32_MAC.upper():
            print(f"  발견 (MAC): {d.name or '(이름없음)'}  addr={d.address}")
            return d

    print("UTTEC-OTA를 찾을 수 없습니다.")
    print("  - ESP32 전원 확인")
    print("  - 다른 기기가 연결 중인지 확인")
    return None


async def show_info():
    """연결 + GATT 서비스 확인"""
    device = await find_device()
    if not device:
        return

    async with BleakClient(device) as client:
        print(f"\n연결됨: {device.name}")
        print(f"MTU: {client.mtu_size}")
        print("\n=== GATT 서비스 ===")
        for svc in client.services:
            print(f"\nService: {svc.uuid}")
            for char in svc.characteristics:
                props = ", ".join(char.properties)
                print(f"  Char: {char.uuid}  [{props}]")
                for desc in char.descriptors:
                    print(f"    Desc: {desc.uuid}")


async def send_ota(firmware_path: str):
    """BLE OTA 펌웨어 전송"""
    fw_path = Path(firmware_path)
    if not fw_path.exists():
        print(f"파일 없음: {fw_path}")
        return False

    fw_data = fw_path.read_bytes()
    fw_size = len(fw_data)
    print(f"\n펌웨어: {fw_path.name}")
    print(f"크기: {fw_size:,} bytes ({fw_size/1024:.1f} KB)")

    device = await find_device()
    if not device:
        return False

    async with BleakClient(device) as client:
        print(f"연결됨: {device.name}, MTU={client.mtu_size}")

        # Notify 구독
        await client.start_notify(OTA_STAT_UUID, status_callback)
        print("STATUS Notify 구독 완료")

        # 1. START 명령 전송 [0x01] [size: 4B LE]
        start_cmd = struct.pack("<BI", OTA_CMD_START, fw_size)
        print(f"\n[1/3] OTA START (size={fw_size:,})")
        await client.write_gatt_char(OTA_CTRL_UUID, start_cmd)
        await asyncio.sleep(0.5)

        if last_status is not None and last_status != 0x01:
            print(f"  START 실패: status={STATUS_NAMES.get(last_status, '?')}")
            return False

        # 2. 펌웨어 데이터 전송 (chunk 단위)
        print(f"[2/3] 펌웨어 전송 ({CHUNK_SIZE}B/chunk)...")
        total_chunks = (fw_size + CHUNK_SIZE - 1) // CHUNK_SIZE
        t_start = time.time()

        for i in range(total_chunks):
            offset = i * CHUNK_SIZE
            chunk = fw_data[offset:offset + CHUNK_SIZE]

            # Write Without Response
            await client.write_gatt_char(OTA_DATA_UUID, chunk, response=False)

            # 진행률 표시 (10% 마다)
            pct = (i + 1) * 100 // total_chunks
            if pct % 10 == 0 and (i == 0 or (i * 100 // total_chunks) != ((i - 1) * 100 // total_chunks)):
                elapsed = time.time() - t_start
                speed = (offset + len(chunk)) / elapsed / 1024 if elapsed > 0 else 0
                print(f"  {pct:3d}% ({offset + len(chunk):,}/{fw_size:,}) — {speed:.1f} KB/s")

            # BLE 흐름 제어 — 매 20 chunk마다 약간 대기
            if (i + 1) % 20 == 0:
                await asyncio.sleep(0.05)

        elapsed = time.time() - t_start
        speed = fw_size / elapsed / 1024 if elapsed > 0 else 0
        print(f"  전송 완료: {elapsed:.1f}초, {speed:.1f} KB/s")

        # 3. END 명령 전송
        print("[3/3] OTA END")
        end_cmd = struct.pack("B", OTA_CMD_END)
        try:
            await client.write_gatt_char(OTA_CTRL_UUID, end_cmd)
        except (OSError, Exception) as e:
            # ESP32가 재부팅하면서 연결이 끊어질 수 있음 — 정상
            print(f"  (연결 끊김 — ESP32 재부팅 중: {e})")

        # 검증 + 재부팅 대기
        print("  재부팅 대기 (3초)...")
        await asyncio.sleep(3)

        if last_status == 0x04:
            print("\n=== OTA 성공! ESP32가 새 펌웨어로 재부팅했습니다. ===")
            return True
        elif last_status == 0x05:
            print("\n=== OTA 실패: CRC 검증 실패 ===")
        elif last_status == 0x06:
            print("\n=== OTA 실패: Flash 쓰기 실패 ===")
        else:
            print(f"\n=== OTA 완료 (status={last_status}) — 시리얼 모니터로 확인 ===")
            return True

        return False


async def main():
    args = sys.argv[1:]

    if not args or args[0] == "--scan":
        await scan()
    elif args[0] == "--info":
        await show_info()
    else:
        success = await send_ota(args[0])
        sys.exit(0 if success else 1)


if __name__ == "__main__":
    asyncio.run(main())
