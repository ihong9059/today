"""
QDY30A-B 1개 sensor 단발 측정 — non-interactive.
- config dump (0x0000~0x0006)
- 공기 중 5초 raw 샘플링 (mean/std/min/max)
- 결과를 results/qdy30a_batch_2026-05-31.csv에 append

사용:
  python qdy30a_single_measure.py --port COM44 --sensor-id 1
"""

import argparse
import csv
import statistics
import sys
import time
from datetime import datetime
from pathlib import Path

from pymodbus.client import ModbusSerialClient


def to_signed16(u: int) -> int:
    return u - 65536 if u >= 32768 else u


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", required=True)
    ap.add_argument("--baud", type=int, default=9600)
    ap.add_argument("--slave", type=int, default=1)
    ap.add_argument("--sensor-id", type=int, required=True)
    ap.add_argument("--sample-seconds", type=float, default=5.0)
    ap.add_argument("--csv", default=None)
    args = ap.parse_args()

    out_dir = Path(__file__).parent / "results"
    out_dir.mkdir(exist_ok=True)
    csv_path = Path(args.csv) if args.csv else out_dir / "qdy30a_batch_2026-05-31.csv"

    client = ModbusSerialClient(
        port=args.port, baudrate=args.baud, bytesize=8, parity="N", stopbits=1, timeout=1.0
    )
    if not client.connect():
        print(f"FAIL: cannot open {args.port}")
        sys.exit(1)

    print(f"=== Sensor #{args.sensor_id} ===")

    # 1. config dump
    rr = client.read_holding_registers(address=0x0000, count=7, device_id=args.slave)
    if rr.isError():
        print(f"  ❌ Modbus no response (sensor #{args.sensor_id})")
        print(f"     체크: A/B 와이어 / GND / 전원 / slave addr")
        row = {
            "sensor_id": args.sensor_id,
            "timestamp": datetime.now().isoformat(timespec="seconds"),
            "comms_ok": False,
            "fail_reason": "no_response",
        }
        write_csv_append(csv_path, row)
        client.close()
        sys.exit(2)

    cfg = rr.registers
    print(f"  ✅ Modbus OK")
    print(f"     SlaveAddr={cfg[0]}  BaudCode={cfg[1]}  Unit={cfg[2]}  Decimal={cfg[3]}")
    print(f"     Level_initial={to_signed16(cfg[4])}  ZeroPoint={to_signed16(cfg[5])}  RangeFull={to_signed16(cfg[6])}")

    # 2. 공기 중 샘플링
    print(f"  → 공기 중 {args.sample_seconds}초 샘플링 중...")
    samples = []
    t0 = time.time()
    while time.time() - t0 < args.sample_seconds:
        r = client.read_holding_registers(address=0x0004, count=1, device_id=args.slave)
        if not r.isError():
            samples.append(to_signed16(r.registers[0]))
        time.sleep(0.2)

    if samples:
        mean = statistics.mean(samples)
        std = statistics.stdev(samples) if len(samples) > 1 else 0
        smin, smax = min(samples), max(samples)
        print(f"  공기 N={len(samples)}  mean={mean:.1f}  std={std:.2f}  min={smin}  max={smax}")
    else:
        mean = std = smin = smax = None
        print(f"  ⚠️ 샘플링 실패")

    row = {
        "sensor_id": args.sensor_id,
        "timestamp": datetime.now().isoformat(timespec="seconds"),
        "comms_ok": True,
        "SlaveAddr": cfg[0],
        "BaudCode": cfg[1],
        "Unit": cfg[2],
        "Decimal": cfg[3],
        "Level_initial": to_signed16(cfg[4]),
        "ZeroPoint": to_signed16(cfg[5]),
        "RangeFull": to_signed16(cfg[6]),
        "air_n": len(samples),
        "air_mean": f"{mean:.2f}" if mean is not None else "",
        "air_std": f"{std:.2f}" if std is not None else "",
        "air_min": smin if smin is not None else "",
        "air_max": smax if smax is not None else "",
        "fail_reason": "",
    }
    write_csv_append(csv_path, row)
    print(f"  → 저장: {csv_path}")

    client.close()


def write_csv_append(csv_path, row):
    keys = ["sensor_id", "timestamp", "comms_ok", "SlaveAddr", "BaudCode", "Unit", "Decimal",
            "Level_initial", "ZeroPoint", "RangeFull", "air_n", "air_mean", "air_std",
            "air_min", "air_max", "fail_reason"]
    exists = csv_path.exists()
    with open(csv_path, "a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=keys)
        if not exists:
            w.writeheader()
        w.writerow({k: row.get(k, "") for k in keys})


if __name__ == "__main__":
    main()
