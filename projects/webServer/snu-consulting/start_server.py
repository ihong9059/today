#!/usr/bin/env python3
"""
SNU Consulting - 로컬 웹 서버
서울대 입시 컨설팅 웹사이트를 로컬에서 실행합니다.
"""

import http.server
import socketserver
import os
import sys

PORT = 8088

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """조용한 HTTP 요청 핸들러"""

    def log_message(self, format, *args):
        # 요청 로그 출력
        print(f"[요청] {args[0]}")

    def end_headers(self):
        # CORS 헤더 추가
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def main():
    # 현재 스크립트 디렉토리로 이동
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    print("=" * 50)
    print("  SNU Consulting - 서울대 입시 컨설팅")
    print("=" * 50)
    print()

    with socketserver.TCPServer(("", PORT), QuietHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print(f"서버 시작: {url}")
        print()
        print("종료하려면 Ctrl+C를 누르세요.")
        print("-" * 50)

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print()
            print("서버를 종료합니다.")
            sys.exit(0)

if __name__ == "__main__":
    main()
