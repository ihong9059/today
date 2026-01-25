#!/usr/bin/env python3
"""
PHILENERGY Smart Monitoring Demo Server
Simple HTTP server for the PHILENERGY monitoring demo site
"""

import http.server
import socketserver
import os
import sys

PORT = 5001
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"[PHILENERGY] {self.address_string()} - {format % args}")

def main():
    os.chdir(DIRECTORY)

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════════════════════════════╗
║         PHILENERGY Smart Monitoring Demo Server              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   Server running at: http://localhost:{PORT}                  ║
║   Directory: {DIRECTORY[:40]+'...' if len(DIRECTORY) > 40 else DIRECTORY.ljust(40)}║
║                                                              ║
║   Pages:                                                     ║
║     - HOME:    http://localhost:{PORT}/index.html             ║
║     - SYSTEM:  http://localhost:{PORT}/system.html            ║
║     - MONITOR: http://localhost:{PORT}/monitor.html           ║
║     - DIAGRAM: http://localhost:{PORT}/diagram.html           ║
║                                                              ║
║   Press Ctrl+C to stop the server                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
        """)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[PHILENERGY] Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
