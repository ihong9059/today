#!/usr/bin/env python3
"""
스마트 파쇄기 AI 모니터링 시스템 - 전시회용 단독 웹 서버
UTTEC x 한국기계엔지니어링

사용법:
    python server.py [포트번호]

예시:
    python server.py          # 기본 포트 8080
    python server.py 3000     # 포트 3000 사용
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import socket
from functools import partial

# 기본 설정
DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """로그를 최소화한 HTTP 요청 핸들러"""

    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def log_message(self, format, *args):
        """간결한 로그 출력"""
        if args[1] == '200':
            # 성공 요청은 간단히 표시
            print(f"  ✓ {args[0]}")
        elif args[1].startswith('4') or args[1].startswith('5'):
            # 에러만 상세 표시
            print(f"  ✗ {args[0]} - {args[1]}")

    def end_headers(self):
        """CORS 헤더 추가 (필요시)"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()


def get_local_ip():
    """로컬 네트워크 IP 주소 가져오기"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


def find_available_port(start_port):
    """사용 가능한 포트 찾기"""
    port = start_port
    while port < start_port + 100:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind(('', port))
                return port
        except OSError:
            port += 1
    return None


def print_banner(port, local_ip):
    """시작 배너 출력"""
    print()
    print("=" * 60)
    print()
    print("  🏭 스마트 파쇄기 AI 모니터링 시스템")
    print("  UTTEC x 한국기계엔지니어링 - 전시회용 서버")
    print()
    print("=" * 60)
    print()
    print(f"  📍 로컬 접속:    http://localhost:{port}")
    print(f"  📍 네트워크:     http://{local_ip}:{port}")
    print()
    print("  전시회 부스에서 아래 QR 코드로 접속하세요:")
    print(f"  → http://{local_ip}:{port}")
    print()
    print("-" * 60)
    print("  Ctrl+C 를 눌러 서버를 종료합니다")
    print("-" * 60)
    print()


def main():
    # 포트 설정
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"오류: '{sys.argv[1]}'는 유효한 포트 번호가 아닙니다.")
            sys.exit(1)
    else:
        port = DEFAULT_PORT

    # 사용 가능한 포트 확인
    available_port = find_available_port(port)
    if available_port is None:
        print(f"오류: 포트 {port}~{port+99} 범위에서 사용 가능한 포트가 없습니다.")
        sys.exit(1)

    if available_port != port:
        print(f"알림: 포트 {port}가 사용 중입니다. 포트 {available_port}를 사용합니다.")
        port = available_port

    # 로컬 IP 가져오기
    local_ip = get_local_ip()

    # 핸들러 설정
    handler = partial(QuietHandler, directory=DIRECTORY)

    # 서버 시작
    with socketserver.TCPServer(("", port), handler) as httpd:
        httpd.allow_reuse_address = True

        print_banner(port, local_ip)

        # 브라우저 자동 열기 (선택)
        try:
            webbrowser.open(f"http://localhost:{port}")
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n서버를 종료합니다. 감사합니다! 👋\n")
            sys.exit(0)


if __name__ == "__main__":
    main()
