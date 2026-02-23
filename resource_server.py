#!/usr/bin/env python
# -*- coding: utf-8 -*-
import subprocess
import BaseHTTPServer
import SocketServer
import re

PORT = 8080

def get_system_info():
    info = {}

    # Hostname
    info['hostname'] = subprocess.Popen(['hostname'], stdout=subprocess.PIPE).communicate()[0].strip()

    # Uptime
    info['uptime'] = subprocess.Popen(['uptime'], stdout=subprocess.PIPE).communicate()[0].strip()

    # CPU info
    cpu_info = subprocess.Popen(['sysctl', '-n', 'machdep.cpu.brand_string'], stdout=subprocess.PIPE).communicate()[0].strip()
    info['cpu'] = cpu_info

    # Memory
    vm_stat = subprocess.Popen(['vm_stat'], stdout=subprocess.PIPE).communicate()[0]

    # Parse memory
    pages_free = re.search(r'Pages free:\s+(\d+)', vm_stat)
    pages_active = re.search(r'Pages active:\s+(\d+)', vm_stat)
    pages_wired = re.search(r'Pages wired down:\s+(\d+)', vm_stat)

    page_size = 4096
    free_mb = int(pages_free.group(1)) * page_size / 1024 / 1024 if pages_free else 0
    active_mb = int(pages_active.group(1)) * page_size / 1024 / 1024 if pages_active else 0
    wired_mb = int(pages_wired.group(1)) * page_size / 1024 / 1024 if pages_wired else 0

    total_mb = 4096
    used_mb = active_mb + wired_mb

    info['mem_total'] = total_mb
    info['mem_used'] = int(used_mb)
    info['mem_free'] = int(free_mb)
    info['mem_percent'] = int(used_mb * 100 / total_mb)

    # Disk
    df = subprocess.Popen(['df', '-h', '/'], stdout=subprocess.PIPE).communicate()[0]
    info['disk'] = df

    # Top processes
    top = subprocess.Popen(['ps', 'aux', '-r'], stdout=subprocess.PIPE).communicate()[0]
    lines = top.split('\n')[:11]
    info['processes'] = '\n'.join(lines)

    # Network
    ifconfig = subprocess.Popen(['ifconfig', 'en0'], stdout=subprocess.PIPE).communicate()[0]
    ip_match = re.search(r'inet (\d+\.\d+\.\d+\.\d+)', ifconfig)
    info['ip'] = ip_match.group(1) if ip_match else 'N/A'

    return info

def generate_html():
    info = get_system_info()

    html = '''<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="5">
    <title>System Monitor - %s</title>
    <style>
        body { font-family: -apple-system, Arial, sans-serif; background: #1a1a2e; color: #eee; padding: 20px; }
        h1 { color: #00d9ff; }
        .card { background: #16213e; border-radius: 10px; padding: 20px; margin: 15px 0; }
        .card h2 { color: #00d9ff; margin-top: 0; }
        .progress { background: #0f0f23; border-radius: 5px; height: 25px; overflow: hidden; }
        .progress-bar { background: linear-gradient(90deg, #00d9ff, #00ff88); height: 100%%;
                        display: flex; align-items: center; justify-content: center; font-weight: bold; }
        pre { background: #0f0f23; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
        .stat { display: inline-block; margin: 10px 20px 10px 0; }
        .stat-value { font-size: 24px; font-weight: bold; color: #00ff88; }
        .stat-label { color: #888; }
    </style>
</head>
<body>
    <h1>System Monitor</h1>

    <div class="card">
        <h2>System Info</h2>
        <div class="stat">
            <div class="stat-value">%s</div>
            <div class="stat-label">Hostname</div>
        </div>
        <div class="stat">
            <div class="stat-value">%s</div>
            <div class="stat-label">IP Address</div>
        </div>
        <p><strong>Uptime:</strong> %s</p>
        <p><strong>CPU:</strong> %s</p>
    </div>

    <div class="card">
        <h2>Memory Usage</h2>
        <div class="progress">
            <div class="progress-bar" style="width: %d%%">%d%%</div>
        </div>
        <p>Used: %d MB / Total: %d MB / Free: %d MB</p>
    </div>

    <div class="card">
        <h2>Disk Usage</h2>
        <pre>%s</pre>
    </div>

    <div class="card">
        <h2>Top Processes</h2>
        <pre>%s</pre>
    </div>

    <p style="color: #666; text-align: center;">Auto-refresh every 5 seconds</p>
</body>
</html>''' % (info['hostname'], info['hostname'], info['ip'], info['uptime'], info['cpu'],
              info['mem_percent'], info['mem_percent'], info['mem_used'], info['mem_total'],
              info['mem_free'], info['disk'], info['processes'])

    return html

class Handler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html; charset=utf-8')
        self.end_headers()
        self.wfile.write(generate_html())

    def log_message(self, format, *args):
        print "%s - %s" % (self.client_address[0], args[0])

if __name__ == '__main__':
    httpd = SocketServer.TCPServer(('', PORT), Handler)
    print 'Resource Monitor running on http://0.0.0.0:%d' % PORT
    print 'Press Ctrl+C to stop'
    httpd.serve_forever()
