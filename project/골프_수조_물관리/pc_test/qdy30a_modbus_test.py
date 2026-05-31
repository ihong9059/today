"""
QDY30A-B RS485 Modbus RTU 통신 검증 스크립트.

USB-RS485 컨버터 + QDY30A-B 수위 센서 + DC 24V 전원 1:1 결선.
배선: Red=+24V / Green=GND / Blue=A+ / Yellow=B-  (lot별 A/B 스왑 가능)

사용법:
  python qdy30a_modbus_test.py --port COM5                 # 1회 read + config dump
  python qdy30a_modbus_test.py --port COM5 --poll          # 1초 주기 polling
  python qdy30a_modbus_test.py --port COM5 --scan          # slave 1~247 sweep
  python qdy30a_modbus_test.py --port COM5 --baud-scan     # baud rate sweep
"""

import argparse
import sys
import time

from pymodbus.client import ModbusSerialClient

# QDY30A-B holding register map (Modbus FC 0x03)
REG_SLAVE_ADDR = 0x0000
REG_BAUD       = 0x0001
REG_UNIT       = 0x0002   # 1=cm, 2=mm
REG_DECIMAL    = 0x0003   # 0~3
REG_LEVEL      = 0x0004   # signed int16, 메인 측정값
REG_ZERO       = 0x0005   # 영점 보정 (signed int16, R/W, 측정값에 가산)
REG_RANGE_FULL = 0x0006   # 만수 보정 (signed int16, R/W)


def to_signed16(u: int) -> int:
    return u - 65536 if u >= 32768 else u


def fmt_level(raw: int, unit: int, decimal: int) -> str:
    signed = to_signed16(raw)
    div = 10 ** decimal if 0 <= decimal <= 3 else 1
    val = signed / div
    if unit == 1:
        u = "cm"
    elif unit == 2:
        u = "mm"
    else:
        u = f"unit={unit}?"
    return f"{val:>10.{max(decimal,0)}f} {u}  (raw=0x{raw:04x} signed={signed})"


def open_client(port: str, baud: int, timeout: float = 1.0) -> ModbusSerialClient:
    client = ModbusSerialClient(
        port=port,
        baudrate=baud,
        bytesize=8,
        parity="N",
        stopbits=1,
        timeout=timeout,
    )
    if not client.connect():
        print(f"FAIL: cannot open {port}")
        sys.exit(1)
    return client


def read_config(client: ModbusSerialClient, slave: int):
    rr = client.read_holding_registers(address=0x0000, count=7, device_id=slave)
    if rr.isError():
        return None
    return rr.registers


def cmd_dump(client, slave):
    cfg = read_config(client, slave)
    if cfg is None:
        print(f"FAIL: slave {slave} no response.")
        print("  체크 항목:")
        print("    1) A/B 와이어 스왑 (Blue<->Yellow)")
        print("    2) +24V 전원 (DC 10~30V 허용)")
        print("    3) GND 공통 (sensor/PSU/USB-RS485 모두 묶기)")
        print("    4) baud rate (기본 9600), slave addr (기본 1)")
        print("    5) 120ohm terminator (장거리/노이즈 환경)")
        print("  --scan / --baud-scan 으로 sweep 시도 권장")
        return False
    print(f"=== Config (slave {slave}) ===")
    print(f"  0x0000 Slave Address  : {cfg[0]}")
    print(f"  0x0001 Baud code      : {cfg[1]}")
    print(f"  0x0002 Unit           : {cfg[2]} ({'cm' if cfg[2]==1 else ('mm' if cfg[2]==2 else '?')})")
    print(f"  0x0003 Decimal places : {cfg[3]}")
    print(f"  0x0004 Level          : {fmt_level(cfg[4], cfg[2], cfg[3])}")
    print(f"  0x0005 Zero point     : {to_signed16(cfg[5])}")
    print(f"  0x0006 Range full     : {to_signed16(cfg[6])}")
    return True


def cmd_poll(client, slave, interval, unit_hint, decimal_hint):
    print(f"=== Polling reg 0x0004 every {interval}s (Ctrl+C to stop) ===")
    try:
        while True:
            rr = client.read_holding_registers(address=REG_LEVEL, count=1, device_id=slave)
            ts = time.strftime("%H:%M:%S")
            if rr.isError():
                print(f"[{ts}] ERR: {rr}")
            else:
                print(f"[{ts}] {fmt_level(rr.registers[0], unit_hint, decimal_hint)}")
            time.sleep(interval)
    except KeyboardInterrupt:
        print("\nstopped.")


def cmd_scan(client):
    print("=== Slave address sweep 1~247 ===")
    found = []
    for sl in range(1, 248):
        rr = client.read_holding_registers(address=REG_LEVEL, count=1, device_id=sl)
        if not rr.isError():
            print(f"  Slave {sl} ({hex(sl)}) responding: reg 0x0004 = 0x{rr.registers[0]:04x}")
            found.append(sl)
    if not found:
        print("  no slave responded. --baud-scan 시도 권장")
    else:
        print(f"=== Found slaves: {found} ===")


def cmd_baud_scan(port, slave):
    print(f"=== Baud rate sweep on {port} (slave={slave}) ===")
    candidates = [9600, 4800, 19200, 38400, 115200, 1200, 2400, 57600]
    for b in candidates:
        client = ModbusSerialClient(port=port, baudrate=b, bytesize=8, parity="N", stopbits=1, timeout=0.6)
        if not client.connect():
            continue
        rr = client.read_holding_registers(address=REG_LEVEL, count=1, device_id=slave)
        status = "OK" if (rr is not None and not rr.isError()) else "no response"
        if not rr.isError():
            print(f"  baud={b:>6} : {status}, reg 0x0004 = 0x{rr.registers[0]:04x}")
        else:
            print(f"  baud={b:>6} : {status}")
        client.close()


def main():
    ap = argparse.ArgumentParser(description="QDY30A-B RS485 Modbus RTU 통신 검증")
    ap.add_argument("--port", required=True, help="COM port, e.g. COM5")
    ap.add_argument("--baud", type=int, default=9600)
    ap.add_argument("--slave", type=int, default=1)
    ap.add_argument("--poll", action="store_true", help="1초 주기 연속 polling")
    ap.add_argument("--scan", action="store_true", help="slave 1~247 sweep")
    ap.add_argument("--baud-scan", action="store_true", help="baud rate sweep")
    ap.add_argument("--interval", type=float, default=1.0)
    args = ap.parse_args()

    if args.baud_scan:
        cmd_baud_scan(args.port, args.slave)
        return

    client = open_client(args.port, args.baud)
    print(f"OK: {args.port} {args.baud}/8N1 opened")
    try:
        if args.scan:
            cmd_scan(client)
            return
        ok = cmd_dump(client, args.slave)
        if ok and args.poll:
            cfg = read_config(client, args.slave)
            cmd_poll(client, args.slave, args.interval, cfg[2], cfg[3])
    finally:
        client.close()


if __name__ == "__main__":
    main()
