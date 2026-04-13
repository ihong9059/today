import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# Pyodide(브라우저) 환경에서 Serial/Ethernet 가능 여부 설명
print("=" * 55)
print("  Serial(UART) / Ethernet 출력 가능 여부 분석")
print("=" * 55)

print()
print("[현재 환경: Pyodide (브라우저 WebAssembly)]")
print("-" * 55)
print()

print("1. Serial (UART) 통신")
print("   - pyserial 라이브러리: 사용 불가")
print("   - 이유: 브라우저는 하드웨어 직접 접근 차단")
print("   - 대안: Web Serial API (JavaScript 필요)")
print()

print("2. Ethernet / TCP/IP 소켓 통신")
print("   - socket 라이브러리: 사용 불가")
print("   - 이유: Pyodide 샌드박스가 네트워크 차단")
print("   - 대안: WebSocket (JavaScript 필요)")
print()

print("=" * 55)
print("  그러면 어디서 가능한가?")
print("=" * 55)
print()
print("  [Native Python 환경에서 가능]")
print("  - PC에 Python 설치 후 실행")
print("  - Raspberry Pi / Jetson 등 임베디드 보드")
print("  - 서버 환경 (Docker, VM 등)")
print()

print("-" * 55)
print("  Serial 예시 코드 (PC Python용):")
print("-" * 55)
print("""
  import serial
  ser = serial.Serial('/dev/ttyUSB0', 9600)
  ser.write(b'Hello UART!')
  data = ser.readline()
  ser.close()
""")

print("-" * 55)
print("  Ethernet(TCP) 예시 코드 (PC Python용):")
print("-" * 55)
print("""
  import socket
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  sock.connect(('192.168.1.100', 5000))
  sock.send(b'Hello Ethernet!')
  response = sock.recv(1024)
  sock.close()
""")

# 비교 다이어그램 생성
fig, ax = plt.subplots(1, 1, figsize=(10, 7))
ax.set_xlim(0, 10)
ax.set_ylim(0, 8)
ax.axis('off')
ax.set_title('Browser vs Native Python: Hardware Access', fontsize=16, fontweight='bold', pad=20)

# 브라우저 환경 박스 (왼쪽)
browser_box = plt.Rectangle((0.3, 4.2), 4.2, 3.2, fill=True, facecolor='#FFCCCC',
                              edgecolor='#CC0000', linewidth=2, linestyle='--')
ax.add_patch(browser_box)
ax.text(2.4, 7.0, 'Browser (Pyodide)', ha='center', fontsize=13, fontweight='bold', color='#CC0000')

items_browser = [
    ('Serial (UART)', False),
    ('Ethernet / TCP', False),
    ('GPIO / I2C / SPI', False),
    ('File System', False),
]
for i, (name, ok) in enumerate(items_browser):
    y = 6.3 - i * 0.5
    mark = 'O' if ok else 'X'
    color = '#00AA00' if ok else '#CC0000'
    ax.text(1.0, y, mark, ha='center', fontsize=14, fontweight='bold', color=color)
    ax.text(1.5, y, name, ha='left', fontsize=11, va='center')

# Native Python 환경 박스 (오른쪽)
native_box = plt.Rectangle((5.5, 4.2), 4.2, 3.2, fill=True, facecolor='#CCFFCC',
                             edgecolor='#00AA00', linewidth=2)
ax.add_patch(native_box)
ax.text(7.6, 7.0, 'Native Python (PC/RPi)', ha='center', fontsize=13, fontweight='bold', color='#006600')

items_native = [
    ('Serial (UART)', True),
    ('Ethernet / TCP', True),
    ('GPIO / I2C / SPI', True),
    ('File System', True),
]
for i, (name, ok) in enumerate(items_native):
    y = 6.3 - i * 0.5
    mark = 'O' if ok else 'X'
    color = '#00AA00' if ok else '#CC0000'
    ax.text(6.2, y, mark, ha='center', fontsize=14, fontweight='bold', color=color)
    ax.text(6.7, y, name, ha='left', fontsize=11, va='center')

# 브라우저 대안 박스
alt_box = plt.Rectangle((0.3, 0.5), 9.4, 3.2, fill=True, facecolor='#FFF3CC',
                          edgecolor='#CC8800', linewidth=2)
ax.add_patch(alt_box)
ax.text(5.0, 3.3, 'Browser Alternatives (JavaScript required)', ha='center',
        fontsize=13, fontweight='bold', color='#886600')

alternatives = [
    ('Web Serial API', 'navigator.serial.requestPort()', 'Chrome 89+'),
    ('WebSocket',      'new WebSocket("ws://...")',       'All browsers'),
    ('Web Bluetooth',  'navigator.bluetooth.requestDevice()', 'Chrome 56+'),
    ('WebUSB',         'navigator.usb.requestDevice()',   'Chrome 61+'),
]
for i, (name, code, support) in enumerate(alternatives):
    y = 2.6 - i * 0.5
    ax.text(1.0, y, f'{name}:', ha='left', fontsize=10, fontweight='bold', color='#444444')
    ax.text(3.5, y, code, ha='left', fontsize=9, fontfamily='monospace', color='#0066CC')
    ax.text(8.5, y, support, ha='left', fontsize=9, color='#888888')

plt.tight_layout()
plt.savefig('/tmp/output.png', dpi=100, bbox_inches='tight')

print()
print("=" * 55)
print("  결론")
print("=" * 55)
print("  이 웹 실습 환경에서는 Serial/Ethernet 불가합니다.")
print("  PC에 Python을 설치하면 모두 사용 가능합니다!")
print("  브라우저에서는 Web Serial API 등 JS 대안이 있습니다.")