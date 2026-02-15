#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""EtherCAT Slave Emulator v12 - LRW(PDO) 지원"""

import sys
import struct
import logging
from datetime import datetime
from scapy.all import Ether, Raw, sniff, sendp, conf, get_if_hwaddr

logging.getLogger("scapy.runtime").setLevel(logging.ERROR)
conf.verb = 0

ETHERCAT_TYPE = 0x88A4
EC_CMD_APRD, EC_CMD_APWR, EC_CMD_APRW = 0x01, 0x02, 0x03
EC_CMD_FPRD, EC_CMD_FPWR, EC_CMD_FPRW = 0x04, 0x05, 0x06
EC_CMD_BRD, EC_CMD_BWR, EC_CMD_BRW = 0x07, 0x08, 0x09
EC_CMD_LRD, EC_CMD_LWR, EC_CMD_LRW = 0x0A, 0x0B, 0x0C
EC_STATE_INIT, EC_STATE_PREOP, EC_STATE_SAFEOP, EC_STATE_OP = 0x01, 0x02, 0x04, 0x08

CMD_NAMES = {1:"APRD",2:"APWR",3:"APRW",4:"FPRD",5:"FPWR",6:"FPRW",7:"BRD",8:"BWR",9:"BRW",
             0x0A:"LRD",0x0B:"LWR",0x0C:"LRW"}

class Slave:
    def __init__(self, pos, name, vendor, product):
        self.position = pos
        self.name = name
        self.vendor = vendor
        self.product = product
        self.configured_address = 0
        self.regs = bytearray(0x2000)
        self.regs[0x0000] = 0x02
        self.regs[0x0001] = 0x02
        struct.pack_into("<H", self.regs, 0x0110, 0x0035)
        struct.pack_into("<H", self.regs, 0x0130, EC_STATE_INIT)
        self.pdo_in = bytearray(8)
        self.pdo_out = bytearray(8)

    @property
    def al_state(self):
        return self.regs[0x0130] & 0x0F

    def read(self, addr, length):
        if addr + length > len(self.regs):
            return bytes(length)
        return bytes(self.regs[addr:addr+length])

    def write(self, addr, data):
        if addr == 0x0010 and len(data) >= 2:
            self.configured_address = struct.unpack("<H", data[:2])[0]
        if addr == 0x0120 and len(data) >= 1:
            struct.pack_into("<H", self.regs, 0x0130, data[0] & 0x0F)
        if addr + len(data) <= len(self.regs):
            self.regs[addr:addr+len(data)] = data

class Emulator:
    def __init__(self, iface):
        self.iface = iface
        self.my_mac = None
        self.count = 0
        self.slaves = [
            Slave(1, "EK1100", 0x00000002, 0x044C2C52),
            Slave(2, "EL1008", 0x00000002, 0x03F03052),
            Slave(3, "EL2008", 0x00000002, 0x07D83052),
        ]

    def log(self, msg):
        ts = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        print(f"[{ts}] {msg}")

    def start(self):
        try:
            self.my_mac = get_if_hwaddr(self.iface)
            self.log(f"MAC: {self.my_mac}")
        except:
            pass

        print("="*50)
        print("  EtherCAT Slave Emulator v12 (with LRW/PDO)")
        print("="*50)
        print(f"  Interface: {self.iface}")
        print(f"  Slaves: {len(self.slaves)}")
        for s in self.slaves:
            print(f"    [{s.position}] {s.name}")
        print("="*50)
        self.log("Waiting for frames... (Ctrl+C to stop)")

        sniff(iface=self.iface, filter="ether proto 0x88a4", prn=self.handle, store=False)

    def handle(self, pkt):
        if Ether not in pkt or pkt[Ether].type != ETHERCAT_TYPE:
            return

        if self.my_mac and pkt[Ether].src.lower() == self.my_mac.lower():
            return

        raw_frame = bytes(pkt)
        ec_payload = bytearray(raw_frame[14:])

        if len(ec_payload) < 12:
            return

        offset = 2
        modified = False

        while offset + 10 <= len(ec_payload):
            cmd = ec_payload[offset]
            idx = ec_payload[offset + 1]
            adp = ec_payload[offset + 2] | (ec_payload[offset + 3] << 8)
            ado = ec_payload[offset + 4] | (ec_payload[offset + 5] << 8)
            len_flags = ec_payload[offset + 6] | (ec_payload[offset + 7] << 8)

            dg_len = len_flags & 0x07FF
            has_next = (len_flags >> 15) & 1

            data_start = offset + 10
            data_end = data_start + dg_len
            wkc_pos = data_end

            if wkc_pos + 2 > len(ec_payload):
                break

            wkc = ec_payload[wkc_pos] | (ec_payload[wkc_pos + 1] << 8)
            data = ec_payload[data_start:data_end]

            new_data, wkc_inc = self.process(cmd, adp, ado, bytes(data))

            if wkc_inc > 0:
                ec_payload[data_start:data_end] = new_data
                new_wkc = wkc + wkc_inc
                ec_payload[wkc_pos] = new_wkc & 0xFF
                ec_payload[wkc_pos + 1] = (new_wkc >> 8) & 0xFF
                modified = True

            cmd_name = CMD_NAMES.get(cmd, f"0x{cmd:02X}")
            self.log(f"[RX] {cmd_name} IDX:{idx} ADP:{adp} ADO:0x{ado:04X} WKC:{wkc}->{wkc+wkc_inc}")

            self.count += 1

            offset = wkc_pos + 2
            if not has_next:
                break

        if modified:
            response = Ether(src=self.my_mac, dst="ff:ff:ff:ff:ff:ff", type=ETHERCAT_TYPE)
            response = response / Raw(load=bytes(ec_payload))
            sendp(response, iface=self.iface, verbose=False)
            self.log(f"[TX] Sent {len(bytes(response))} bytes")

    def process(self, cmd, adp, ado, data):
        wkc = 0
        resp = data

        if cmd in [EC_CMD_APRD, EC_CMD_APWR, EC_CMD_APRW]:
            pos = adp if adp < 0x8000 else adp - 0x10000
            for s in self.slaves:
                if pos == -s.position:
                    if cmd == EC_CMD_APRD:
                        resp = s.read(ado, len(data))
                        wkc = 1
                    elif cmd == EC_CMD_APWR:
                        s.write(ado, data)
                        wkc = 1
                    elif cmd == EC_CMD_APRW:
                        resp = s.read(ado, len(data))
                        s.write(ado, data)
                        wkc = 3
                    break

        elif cmd in [EC_CMD_BRD, EC_CMD_BWR, EC_CMD_BRW]:
            if cmd == EC_CMD_BRD:
                result = bytearray(len(data))
                for s in self.slaves:
                    r = s.read(ado, len(data))
                    for i in range(len(result)):
                        result[i] |= r[i] if i < len(r) else 0
                resp = bytes(result)
                wkc = len(self.slaves)
            elif cmd == EC_CMD_BWR:
                for s in self.slaves:
                    s.write(ado, data)
                wkc = len(self.slaves)
            elif cmd == EC_CMD_BRW:
                result = bytearray(len(data))
                for s in self.slaves:
                    r = s.read(ado, len(data))
                    s.write(ado, data)
                    for i in range(len(result)):
                        result[i] |= r[i] if i < len(r) else 0
                resp = bytes(result)
                wkc = len(self.slaves) * 3

        elif cmd in [EC_CMD_FPRD, EC_CMD_FPWR, EC_CMD_FPRW]:
            for s in self.slaves:
                if s.configured_address == adp:
                    if cmd == EC_CMD_FPRD:
                        resp = s.read(ado, len(data))
                        wkc = 1
                    elif cmd == EC_CMD_FPWR:
                        s.write(ado, data)
                        wkc = 1
                    elif cmd == EC_CMD_FPRW:
                        resp = s.read(ado, len(data))
                        s.write(ado, data)
                        wkc = 3
                    break

        elif cmd in [EC_CMD_LRD, EC_CMD_LWR, EC_CMD_LRW]:
            pdo_data = bytearray(len(data))
            for i, s in enumerate(self.slaves):
                if s.al_state == EC_STATE_OP:
                    off = i * 2
                    if off + 2 <= len(data):
                        if cmd in [EC_CMD_LRD, EC_CMD_LRW]:
                            pdo_data[off] = s.al_state
                            pdo_data[off + 1] = s.position
                        if cmd in [EC_CMD_LWR, EC_CMD_LRW]:
                            s.pdo_out[0:2] = data[off:off+2]
                        wkc += 3 if cmd == EC_CMD_LRW else 1
            resp = bytes(pdo_data)

        return resp, wkc

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: sudo python3 ethercat_slave_emulator_v12.py <interface>")
        sys.exit(1)
    Emulator(sys.argv[1]).start()
