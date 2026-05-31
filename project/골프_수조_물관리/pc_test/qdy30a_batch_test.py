"""
QDY30A-B RS485 sensor 1~N 개 교차 basic test.

사용:
  python qdy30a_batch_test.py --port COM44 --count 6

흐름:
  1. sensor #N 결선 안내 → Enter 대기
  2. config dump (slave 0x01, FC 0x03, register 0x0000~0x0006)
  3. 공기 중 raw 값 5초 평균 (안정성 측정)
  4. tap test 안내 (5초간 손가락 가볍게 두드림 → raw 변동 관찰)
  5. CSV append + 다음 sensor

종료 후 6개 비교 보고서 자동 생성 → qdy30a_batch_report_YYYY-MM-DD_HHMM.md
"""

import argparse
import csv
import statistics
import sys
import time
from datetime import datetime
from pathlib import Path

from pymodbus.client import ModbusSerialClient


REG_NAMES = {
    0x0000: "SlaveAddr",
    0x0001: "BaudCode",
    0x0002: "Unit",
    0x0003: "Decimal",
    0x0004: "Level",
    0x0005: "ZeroPoint",
    0x0006: "RangeFull",
}


def to_signed16(u: int) -> int:
    return u - 65536 if u >= 32768 else u


def open_client(port, baud, timeout=1.0):
    c = ModbusSerialClient(
        port=port, baudrate=baud, bytesize=8, parity="N", stopbits=1, timeout=timeout
    )
    if not c.connect():
        print(f"FAIL: cannot open {port}")
        sys.exit(1)
    return c


def read_config(client, slave):
    rr = client.read_holding_registers(address=0x0000, count=7, device_id=slave)
    if rr.isError():
        return None
    return rr.registers


def read_level(client, slave):
    rr = client.read_holding_registers(address=0x0004, count=1, device_id=slave)
    if rr.isError():
        return None
    return to_signed16(rr.registers[0])


def sample_level(client, slave, duration_s, interval_s=0.2):
    """Collect level samples for duration_s seconds, return list of signed int."""
    samples = []
    t0 = time.time()
    while time.time() - t0 < duration_s:
        v = read_level(client, slave)
        if v is not None:
            samples.append(v)
        time.sleep(interval_s)
    return samples


def test_one_sensor(client, slave, sensor_id):
    print(f"\n{'='*60}")
    print(f"=== Sensor #{sensor_id} 시작 ===")
    print(f"{'='*60}")
    input(f"  → sensor #{sensor_id} 결선 완료 후 Enter (전원 ON 상태로) ")

    # 1. config dump
    cfg = read_config(client, slave)
    if cfg is None:
        print(f"  ❌ FAIL: sensor #{sensor_id} no response")
        print(f"     체크: A/B 와이어 / GND / 전원 / slave addr {slave}")
        return {
            "sensor_id": sensor_id,
            "comms_ok": False,
            "fail_reason": "no_response",
        }
    print(f"  ✅ Modbus OK")
    cfg_dict = {
        "SlaveAddr": cfg[0],
        "BaudCode": cfg[1],
        "Unit": cfg[2],
        "Decimal": cfg[3],
        "Level_initial": to_signed16(cfg[4]),
        "ZeroPoint": to_signed16(cfg[5]),
        "RangeFull": to_signed16(cfg[6]),
    }
    for k, v in cfg_dict.items():
        print(f"     {k:>15} : {v}")

    # 2. 공기 중 5초 평균 (안정성)
    print(f"  → 공기 중 5초간 raw 샘플링 중... (sensor 가만히)")
    air_samples = sample_level(client, slave, 5.0, 0.2)
    if air_samples:
        air_mean = statistics.mean(air_samples)
        air_std = statistics.stdev(air_samples) if len(air_samples) > 1 else 0
        air_min = min(air_samples)
        air_max = max(air_samples)
        print(f"     air N={len(air_samples)}  mean={air_mean:.1f}  std={air_std:.2f}  min={air_min}  max={air_max}")
    else:
        air_mean = air_std = air_min = air_max = None
        print(f"     air 샘플링 실패")

    # 3. tap test
    print(f"  → 다이어프램에 5초간 살짝 톡톡 (압력 변동 응답 확인)")
    input(f"     준비되면 Enter 누르고 tap 시작 ")
    tap_samples = sample_level(client, slave, 5.0, 0.1)
    if tap_samples:
        tap_min = min(tap_samples)
        tap_max = max(tap_samples)
        tap_range = tap_max - tap_min
        print(f"     tap N={len(tap_samples)}  min={tap_min}  max={tap_max}  range={tap_range}")
        if tap_range < 2:
            print(f"     ⚠️ 응답 변동 < 2 — 다이어프램 응답성 약함 가능성")
    else:
        tap_min = tap_max = tap_range = None

    return {
        "sensor_id": sensor_id,
        "comms_ok": True,
        **cfg_dict,
        "air_n": len(air_samples) if air_samples else 0,
        "air_mean": air_mean,
        "air_std": air_std,
        "air_min": air_min,
        "air_max": air_max,
        "tap_min": tap_min,
        "tap_max": tap_max,
        "tap_range": tap_range,
    }


def write_csv(results, csv_path):
    if not results:
        return
    keys = list(results[0].keys())
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=keys)
        w.writeheader()
        for r in results:
            w.writerow(r)


def write_md_report(results, md_path):
    ok_results = [r for r in results if r.get("comms_ok")]
    fail_results = [r for r in results if not r.get("comms_ok")]

    lines = []
    lines.append(f"# QDY30A-B 6개 sensor 교차 basic test 결과")
    lines.append("")
    lines.append(f"- 테스트 일시: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"- Sensor 수: {len(results)}")
    lines.append(f"- 통신 OK: {len(ok_results)} / FAIL: {len(fail_results)}")
    lines.append("")

    if fail_results:
        lines.append("## ⚠️ 통신 실패 sensor")
        lines.append("")
        for r in fail_results:
            lines.append(f"- #{r['sensor_id']}: {r.get('fail_reason', 'unknown')}")
        lines.append("")

    if ok_results:
        lines.append("## Config dump (slave 0x01, FC 0x03)")
        lines.append("")
        lines.append("| # | Slave | Baud | Unit | Decimal | Initial | Zero | RangeFull |")
        lines.append("|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|")
        for r in ok_results:
            lines.append(f"| {r['sensor_id']} | {r['SlaveAddr']} | {r['BaudCode']} | {r['Unit']} | {r['Decimal']} | {r['Level_initial']} | {r['ZeroPoint']} | {r['RangeFull']} |")
        lines.append("")

        lines.append("## 공기 중 안정성 (5초 샘플)")
        lines.append("")
        lines.append("| # | N | Mean | Std | Min | Max |")
        lines.append("|:-:|:-:|:-:|:-:|:-:|:-:|")
        for r in ok_results:
            lines.append(f"| {r['sensor_id']} | {r['air_n']} | {r['air_mean']:.1f} | {r['air_std']:.2f} | {r['air_min']} | {r['air_max']} |")
        lines.append("")

        lines.append("## Tap test (압력 변동 응답)")
        lines.append("")
        lines.append("| # | Min | Max | Range | 판정 |")
        lines.append("|:-:|:-:|:-:|:-:|:-:|")
        for r in ok_results:
            verdict = "✅" if (r['tap_range'] is not None and r['tap_range'] >= 2) else "⚠️ 응답 약"
            lines.append(f"| {r['sensor_id']} | {r['tap_min']} | {r['tap_max']} | {r['tap_range']} | {verdict} |")
        lines.append("")

        # 이상값 탐지
        units = set(r['Unit'] for r in ok_results)
        decimals = set(r['Decimal'] for r in ok_results)
        ranges = set(r['RangeFull'] for r in ok_results)
        slaves = set(r['SlaveAddr'] for r in ok_results)
        air_means = [r['air_mean'] for r in ok_results if r['air_mean'] is not None]

        lines.append("## 교차 비교 — 이상값 탐지")
        lines.append("")
        lines.append(f"- Slave addr 일치: {'✅' if len(slaves) == 1 else f'⚠️ {slaves}'}")
        lines.append(f"- Unit 일치: {'✅' if len(units) == 1 else f'⚠️ {units}'}")
        lines.append(f"- Decimal 일치: {'✅' if len(decimals) == 1 else f'⚠️ {decimals}'}")
        lines.append(f"- RangeFull 일치: {'✅' if len(ranges) == 1 else f'⚠️ {ranges}'}")
        if air_means:
            air_overall = statistics.mean(air_means)
            air_spread = max(air_means) - min(air_means)
            lines.append(f"- 공기 중 raw 평균: 전체 mean={air_overall:.1f}, 편차={air_spread:.1f}")
            outliers = [r['sensor_id'] for r in ok_results if r['air_mean'] is not None and abs(r['air_mean'] - air_overall) > max(2*statistics.stdev(air_means) if len(air_means)>1 else 5, 5)]
            if outliers:
                lines.append(f"- ⚠️ 공기 중 outlier sensor: {outliers}")
            else:
                lines.append(f"- ✅ 공기 중 outlier 없음")
        lines.append("")
        lines.append("## 다음 단계 권장")
        lines.append("")
        lines.append("- 통신 OK + tap 응답 OK 개체만 깊이 매핑 단계 진행")
        lines.append("- 통신 FAIL 개체: A/B 스왑 + 와이어 재점검 후 단독 재시험")
        lines.append("- Unit/RangeFull 불일치 시 발주처에 lot 차이 문의")

    with open(md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", required=True)
    ap.add_argument("--baud", type=int, default=9600)
    ap.add_argument("--slave", type=int, default=1)
    ap.add_argument("--count", type=int, default=6)
    args = ap.parse_args()

    client = open_client(args.port, args.baud)
    print(f"OK: {args.port} {args.baud}/8N1 opened")
    print(f"== QDY30A-B {args.count}개 sensor 교차 basic test ==")
    print(f"   각 sensor를 동글에 1개씩 연결 → Enter → 자동 측정 → 다음으로 교체")

    results = []
    try:
        for i in range(1, args.count + 1):
            try:
                r = test_one_sensor(client, args.slave, i)
            except KeyboardInterrupt:
                print(f"\n사용자 중단 (#{i})")
                break
            results.append(r)
    finally:
        client.close()

    # 결과 저장
    stamp = datetime.now().strftime("%Y-%m-%d_%H%M")
    out_dir = Path(__file__).parent / "results"
    out_dir.mkdir(exist_ok=True)
    csv_path = out_dir / f"qdy30a_batch_{stamp}.csv"
    md_path = out_dir / f"qdy30a_batch_report_{stamp}.md"

    write_csv(results, csv_path)
    write_md_report(results, md_path)

    print(f"\n{'='*60}")
    print(f"=== 완료 ===")
    print(f"  CSV: {csv_path}")
    print(f"  Report: {md_path}")


if __name__ == "__main__":
    main()
