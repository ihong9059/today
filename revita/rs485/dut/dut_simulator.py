"""
KC 기능시험 DUT Simulator - 리비타 링크 RS485 Modbus RTU 응답기

COM 포트에서 Modbus RTU 명령을 수신하고 프로토콜에 따라 응답.
실제 하드웨어 없이 호스트 소프트웨어를 사전 검증하기 위한 시뮬레이터.
"""

import sys
import os
import time
import struct
import random
import threading

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import serial
from modbus_crc import crc16, append_crc, check_crc

SLAVE_ADDR = 0x01

# --- Simulated device state ---
state = {
    # Device info
    "device_id_h": 0x5245,  # "RE"
    "device_id_l": 0x564C,  # "VL" (REVL = Revita Link)
    "fw_version": 0x0100,   # v1.0
    "hw_version": 0x0001,   # v0.1
    "test_mode": 0,

    # Power / Sensors
    "bat_voltage": 3300,    # mV
    "bat_percent": 80,
    "vib_status": 0,
    "vib_count": 0,
    "btn_status": 0,
    "supply_12v": 0,

    # Valves
    "valve_x_state": 0,
    "valve_y_state": 0,
    "valve_x_pin": 0,
    "valve_y_pin": 0,

    # Flow meters
    "flow_x_count": 0,
    "flow_y_count": 0,
    "flow_x_active": 0,
    "flow_y_active": 0,

    # Output
    "buzzer_state": 0,
    "led_state": 0,

    # LoRa
    "lora_state": 0,
    "lora_freq": 922,
    "lora_tx_power": 14,
    "lora_rssi": -80,
    "lora_snr": 95,
    "lora_tx_count": 0,
    "lora_rx_count": 0,

    # BLE
    "ble_state": 0,
    "ble_tx_power": 0,

    # Flash
    "flash_state": 0,
    "flash_test": 0,

    # Self-test
    "self_test_result": 0,
    "self_test_detail": 0,

    # Internal timers
    "_buzzer_off_time": 0,
    "_valve_x_off_time": 0,
    "_valve_y_off_time": 0,
    "_self_test_progress": 0,
}

# LoRa defaults
LORA_DEFAULTS = {"lora_freq": 922, "lora_tx_power": 14, "lora_sf": 7, "lora_bw": 0}
# BLE defaults
BLE_DEFAULTS = {"ble_tx_power": 0, "ble_data_rate": 0, "ble_channel": 37}

# Extra state for params not in read registers
extra = {"lora_sf": 7, "lora_bw": 0, "ble_channel": 37, "ble_data_rate": 0}

# --- Register map: address -> state key ---
READ_MAP = {
    0x0000: "device_id_h",
    0x0001: "device_id_l",
    0x0002: "fw_version",
    0x0003: "hw_version",
    0x0004: "test_mode",
    0x0010: "bat_voltage",
    0x0011: "bat_percent",
    0x0012: "vib_status",
    0x0013: "vib_count",
    0x0014: "btn_status",
    0x0015: "supply_12v",
    0x0020: "valve_x_state",
    0x0021: "valve_y_state",
    0x0022: "valve_x_pin",
    0x0023: "valve_y_pin",
    0x0030: "flow_x_count_h",
    0x0031: "flow_x_count_l",
    0x0032: "flow_y_count_h",
    0x0033: "flow_y_count_l",
    0x0034: "flow_x_active",
    0x0035: "flow_y_active",
    0x0040: "buzzer_state",
    0x0041: "led_state",
    0x0050: "lora_state",
    0x0051: "lora_freq",
    0x0052: "lora_tx_power",
    0x0053: "lora_rssi",
    0x0054: "lora_snr",
    0x0055: "lora_tx_count",
    0x0056: "lora_rx_count",
    0x0060: "ble_state",
    0x0061: "ble_tx_power",
    0x0070: "flash_state",
    0x0071: "flash_test",
    0x01F3: "self_test_result",
    0x01F4: "self_test_detail",
}


def get_register_value(addr):
    """Get value for a read register address."""
    if addr == 0x0030:
        return (state["flow_x_count"] >> 16) & 0xFFFF
    elif addr == 0x0031:
        return state["flow_x_count"] & 0xFFFF
    elif addr == 0x0032:
        return (state["flow_y_count"] >> 16) & 0xFFFF
    elif addr == 0x0033:
        return state["flow_y_count"] & 0xFFFF
    elif addr == 0x0053:
        # RSSI as signed 16-bit
        return state["lora_rssi"] & 0xFFFF
    elif addr == 0x0052:
        # TX power as signed 16-bit
        return state["lora_tx_power"] & 0xFFFF

    key = READ_MAP.get(addr)
    if key is None:
        return None
    return state.get(key, 0)


def handle_read(start_addr, count):
    """Handle function 0x03: Read Holding Registers."""
    values = []
    for i in range(count):
        v = get_register_value(start_addr + i)
        if v is None:
            return None  # illegal address
        values.append(v & 0xFFFF)

    resp = bytes([SLAVE_ADDR, 0x03, count * 2])
    for v in values:
        resp += struct.pack(">H", v)
    return append_crc(resp)


def apply_write(addr, value):
    """Apply a single register write. Returns True on success."""
    # Valve X
    if addr == 0x0100:
        handle_valve("x", value, None)
    elif addr == 0x0101:
        pass  # duration handled with 0x10
    elif addr == 0x0102:
        handle_valve("y", value, None)
    elif addr == 0x0103:
        pass

    # Flow meter
    elif addr == 0x0110:
        state["flow_x_active"] = value
        if value == 1:
            print("  [DUT] Flow X counting started")
    elif addr == 0x0111:
        if value == 1:
            state["flow_x_count"] = 0
            print("  [DUT] Flow X count reset")
    elif addr == 0x0112:
        state["flow_y_active"] = value
        if value == 1:
            print("  [DUT] Flow Y counting started")
    elif addr == 0x0113:
        if value == 1:
            state["flow_y_count"] = 0
            print("  [DUT] Flow Y count reset")

    # Buzzer
    elif addr == 0x0120:
        if value == 0:
            state["buzzer_state"] = 0
            state["_buzzer_off_time"] = 0
            print("  [DUT] Buzzer OFF")
        elif value == 0xFFFF:
            state["buzzer_state"] = 1
            state["_buzzer_off_time"] = 0
            print("  [DUT] Buzzer ON (continuous)")
        else:
            state["buzzer_state"] = 1
            state["_buzzer_off_time"] = time.time() + value
            print(f"  [DUT] Buzzer ON for {value}s")

    # LED
    elif addr == 0x0121:
        state["led_state"] = value
        names = {0: "OFF", 1: "ON", 2: "Blink-1", 3: "Blink-2"}
        print(f"  [DUT] LED {names.get(value, value)}")

    # 12V supply
    elif addr == 0x0122:
        state["supply_12v"] = value
        print(f"  [DUT] 12V {'ON' if value else 'OFF'}")

    # LoRa
    elif addr == 0x0130:
        handle_lora_cmd(value)
    elif addr == 0x0131:
        state["lora_freq"] = value
        print(f"  [DUT] LoRa Freq = {value} MHz")
    elif addr == 0x0132:
        state["lora_tx_power"] = value if value < 0x8000 else value - 0x10000
        print(f"  [DUT] LoRa Power = {state['lora_tx_power']} dBm")
    elif addr == 0x0133:
        extra["lora_sf"] = value
        print(f"  [DUT] LoRa SF = {value}")
    elif addr == 0x0134:
        extra["lora_bw"] = value
        bw_names = {0: "125kHz", 1: "250kHz", 2: "500kHz"}
        print(f"  [DUT] LoRa BW = {bw_names.get(value, value)}")
    elif addr == 0x013F:
        if value == 1:
            reset_lora_defaults()

    # BLE
    elif addr == 0x0140:
        handle_ble_cmd(value)
    elif addr == 0x0141:
        extra["ble_channel"] = value
        print(f"  [DUT] BLE Channel = {value}")
    elif addr == 0x0142:
        state["ble_tx_power"] = value if value < 0x8000 else value - 0x10000
        print(f"  [DUT] BLE Power = {state['ble_tx_power']} dBm")
    elif addr == 0x0143:
        extra["ble_data_rate"] = value
        print(f"  [DUT] BLE Rate = {'1Mbps' if value == 0 else '2Mbps'}")
    elif addr == 0x014F:
        if value == 1:
            reset_ble_defaults()

    # Flash
    elif addr == 0x0150:
        handle_flash_cmd(value)

    # All stop
    elif addr == 0x01F0:
        if value == 1:
            handle_all_stop()

    # Self test
    elif addr == 0x01F1:
        if value == 1:
            threading.Thread(target=run_self_test, args=(False,), daemon=True).start()
    elif addr == 0x01F2:
        if value == 1:
            threading.Thread(target=run_self_test, args=(True,), daemon=True).start()

    # Test mode
    elif addr == 0x01FF:
        state["test_mode"] = value
        if value == 1:
            reset_lora_defaults()
            reset_ble_defaults()
            print("  [DUT] === TEST MODE ENTERED (defaults reset) ===")
        else:
            print("  [DUT] === TEST MODE EXITED ===")
    else:
        return False
    return True


def handle_valve(axis, cmd, duration):
    """Handle valve open/close/stop."""
    prefix = f"valve_{axis}"
    if cmd == 0:  # close
        state[f"{prefix}_state"] = 2  # moving
        state[f"{prefix}_pin"] = 0b010  # EN_B=1
        print(f"  [DUT] Valve {axis.upper()} CLOSING")
        dur = duration or 5
        state[f"_{prefix}_off_time"] = time.time() + dur
    elif cmd == 1:  # open
        state[f"{prefix}_state"] = 2
        state[f"{prefix}_pin"] = 0b001  # EN_A=1
        state["supply_12v"] = 1
        print(f"  [DUT] Valve {axis.upper()} OPENING (12V auto-ON)")
        dur = duration or 5
        state[f"_{prefix}_off_time"] = time.time() + dur
    elif cmd == 2:  # stop
        state[f"{prefix}_state"] = 0
        state[f"{prefix}_pin"] = 0
        print(f"  [DUT] Valve {axis.upper()} STOPPED")
        state[f"_{prefix}_off_time"] = 0


def handle_lora_cmd(value):
    names = {0: "STOP", 1: "TX_CARRIER", 2: "TX_MODULATED", 3: "TX_PACKET",
             4: "RX_CONTINUOUS", 5: "TX_SWEEP", 6: "DEFAULT_TX"}
    state["lora_state"] = value
    print(f"  [DUT] LoRa CMD = {names.get(value, value)}")
    if value == 6:
        reset_lora_defaults()
        state["lora_state"] = 2  # modulated
    if value in (1, 2, 3, 6):
        state["lora_tx_count"] += 1
    if value == 4:
        state["lora_rssi"] = random.randint(-100, -60)
        state["lora_snr"] = random.randint(50, 120)
    if value == 0:
        state["lora_state"] = 0


def handle_ble_cmd(value):
    names = {0: "STOP", 1: "ADVERT", 2: "TX_CARRIER", 3: "TX_MODULATED",
             4: "RX_TEST", 5: "DEFAULT_ADVERT"}
    state["ble_state"] = min(value, 2) if value > 0 else 0
    print(f"  [DUT] BLE CMD = {names.get(value, value)}")
    if value == 5:
        reset_ble_defaults()
        state["ble_state"] = 1


def handle_flash_cmd(value):
    if value == 0:
        state["flash_state"] = 0
        print("  [DUT] Flash SLEEP")
    elif value == 1:
        state["flash_state"] = 1
        print("  [DUT] Flash WAKEUP")
    elif value == 2:
        state["flash_state"] = 1
        state["flash_test"] = 1  # PASS
        print("  [DUT] Flash SELF-TEST = PASS")


def handle_all_stop():
    state["buzzer_state"] = 0
    state["led_state"] = 0
    state["supply_12v"] = 0
    state["valve_x_state"] = 0
    state["valve_x_pin"] = 0
    state["valve_y_state"] = 0
    state["valve_y_pin"] = 0
    state["lora_state"] = 0
    state["ble_state"] = 0
    state["_buzzer_off_time"] = 0
    state["_valve_x_off_time"] = 0
    state["_valve_y_off_time"] = 0
    print("  [DUT] !!! ALL STOP !!!")


def reset_lora_defaults():
    state["lora_freq"] = LORA_DEFAULTS["lora_freq"]
    state["lora_tx_power"] = LORA_DEFAULTS["lora_tx_power"]
    extra["lora_sf"] = LORA_DEFAULTS["lora_sf"]
    extra["lora_bw"] = LORA_DEFAULTS["lora_bw"]
    print("  [DUT] LoRa RESET to defaults (922MHz, 14dBm, SF7, BW125kHz)")


def reset_ble_defaults():
    state["ble_tx_power"] = BLE_DEFAULTS["ble_tx_power"]
    extra["ble_channel"] = BLE_DEFAULTS["ble_channel"]
    extra["ble_data_rate"] = BLE_DEFAULTS["ble_data_rate"]
    print("  [DUT] BLE RESET to defaults (ch37, 0dBm, 1Mbps)")


def run_self_test(with_rf):
    """Run self-test sequence in background."""
    tag = "RF" if with_rf else "NO-RF"
    print(f"  [DUT] Self-test ({tag}) STARTED")
    state["self_test_result"] = 0
    state["self_test_detail"] = 0
    total = 9 if with_rf else 7

    items = [
        ("Battery", "bat_voltage"),
        ("Flash", "flash_test"),
        ("12V", "supply_12v"),
        ("Buzzer", "buzzer_state"),
        ("LED", "led_state"),
        ("Valve X", "valve_x_state"),
        ("Valve Y", "valve_y_state"),
    ]
    if with_rf:
        items += [("LoRa TX", "lora_state"), ("BLE Advert", "ble_state")]

    for i, (name, _key) in enumerate(items):
        state["test_mode"] = int((i + 1) / total * 100)
        print(f"  [DUT] Self-test [{i+1}/{total}] {name} ... PASS")
        time.sleep(0.5)

    state["self_test_result"] = 1  # PASS
    state["self_test_detail"] = 0  # all pass
    state["test_mode"] = 1  # back to test mode
    print(f"  [DUT] Self-test ({tag}) COMPLETE = PASS")


def handle_write_single(addr, value):
    """Handle function 0x06: Write Single Register."""
    ok = apply_write(addr, value)
    if not ok:
        return None
    # Echo the request as response
    resp = struct.pack(">BBHH", SLAVE_ADDR, 0x06, addr, value)
    return append_crc(resp)


def handle_write_multiple(data):
    """Handle function 0x10: Write Multiple Registers."""
    if len(data) < 5:
        return None
    start_addr = (data[0] << 8) | data[1]
    reg_count = (data[2] << 8) | data[3]
    byte_count = data[4]

    if len(data) < 5 + byte_count:
        return None

    # Special: valve with duration
    if start_addr == 0x0100 and reg_count == 2:
        cmd = (data[5] << 8) | data[6]
        dur = (data[7] << 8) | data[8]
        handle_valve("x", cmd, dur)
    elif start_addr == 0x0102 and reg_count == 2:
        cmd = (data[5] << 8) | data[6]
        dur = (data[7] << 8) | data[8]
        handle_valve("y", cmd, dur)
    else:
        for i in range(reg_count):
            val = (data[5 + i*2] << 8) | data[5 + i*2 + 1]
            apply_write(start_addr + i, val)

    resp = struct.pack(">BBHH", SLAVE_ADDR, 0x10, start_addr, reg_count)
    return append_crc(resp)


def make_exception(func_code, exc_code):
    resp = bytes([SLAVE_ADDR, func_code | 0x80, exc_code])
    return append_crc(resp)


def process_frame(frame):
    """Process a complete Modbus RTU frame and return response."""
    if not check_crc(frame):
        print("  [DUT] CRC ERROR")
        return None

    if frame[0] != SLAVE_ADDR:
        return None  # not for us

    func = frame[1]
    payload = frame[2:-2]

    if func == 0x03:  # Read Holding Registers
        if len(payload) < 4:
            return make_exception(func, 0x03)
        start = (payload[0] << 8) | payload[1]
        count = (payload[2] << 8) | payload[3]
        resp = handle_read(start, count)
        if resp is None:
            return make_exception(func, 0x02)
        return resp

    elif func == 0x06:  # Write Single Register
        if len(payload) < 4:
            return make_exception(func, 0x03)
        addr = (payload[0] << 8) | payload[1]
        value = (payload[2] << 8) | payload[3]
        resp = handle_write_single(addr, value)
        if resp is None:
            return make_exception(func, 0x02)
        return resp

    elif func == 0x10:  # Write Multiple Registers
        resp = handle_write_multiple(payload)
        if resp is None:
            return make_exception(func, 0x02)
        return resp

    else:
        return make_exception(func, 0x01)


def timer_tick():
    """Check timed events (buzzer off, valve off, flow counter)."""
    now = time.time()

    # Buzzer auto-off
    if state["_buzzer_off_time"] and now >= state["_buzzer_off_time"]:
        state["buzzer_state"] = 0
        state["_buzzer_off_time"] = 0

    # Valve auto-off
    for axis in ("x", "y"):
        key = f"_valve_{axis}_off_time"
        if state[key] and now >= state[key]:
            state[f"valve_{axis}_state"] = 0
            state[f"valve_{axis}_pin"] = 0
            state[key] = 0

    # Simulate flow counting
    for axis in ("x", "y"):
        if state[f"flow_{axis}_active"]:
            state[f"flow_{axis}_count"] += random.randint(1, 5)

    # Simulate random vibration
    if random.random() < 0.02:
        state["vib_status"] = 1
        state["vib_count"] += 1
    else:
        state["vib_status"] = 0

    # Simulate battery drain (very slow)
    if random.random() < 0.1:
        state["bat_voltage"] = max(2500, state["bat_voltage"] - 1)
        state["bat_percent"] = max(0, min(100,
            int((state["bat_voltage"] - 2500) / (3600 - 2500) * 100)))


def main():
    port = sys.argv[1] if len(sys.argv) > 1 else "COM16"
    baud = int(sys.argv[2]) if len(sys.argv) > 2 else 9600

    print(f"[DUT] Revita Link Simulator")
    print(f"[DUT] Port: {port}, Baud: {baud}")
    print(f"[DUT] Waiting for commands...\n")

    ser = serial.Serial(port, baud, timeout=0.1)
    buf = b""
    last_tick = time.time()

    try:
        while True:
            # Read available bytes
            data = ser.read(256)
            if data:
                buf += data

            # Timer tick every 500ms
            now = time.time()
            if now - last_tick > 0.5:
                timer_tick()
                last_tick = now

            # Try to parse frame (minimum Modbus frame: 4 bytes)
            # Detect frame end by 3.5 char silence (at 9600 = ~3.6ms)
            if len(buf) >= 4 and not data:
                frame = buf
                buf = b""

                hex_str = " ".join(f"{b:02X}" for b in frame)
                print(f"  [DUT] RX: {hex_str}")

                resp = process_frame(frame)
                if resp:
                    hex_str = " ".join(f"{b:02X}" for b in resp)
                    print(f"  [DUT] TX: {hex_str}")
                    ser.write(resp)

    except KeyboardInterrupt:
        print("\n[DUT] Shutting down...")
    finally:
        ser.close()


if __name__ == "__main__":
    main()
