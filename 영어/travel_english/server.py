"""
Travel English - 로컬 서버
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os
from datetime import datetime

PORT = 8000
SCENARIOS_DIR = "scenarios"

class TravelEnglishHandler(SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/generate':
            self.handle_generate()
        else:
            self.send_error(404)

    def do_GET(self):
        if self.path == '/scenarios':
            self.handle_list_scenarios()
        elif self.path.startswith('/scenario/'):
            self.handle_get_scenario()
        else:
            super().do_GET()

    def handle_generate(self):
        """프롬프트 파일 생성 - Claude Code에서 직접 실행"""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        level = data.get('level', 'beginner')
        departure = data.get('departure', '서울')
        destination = data.get('destination', '파리')
        budget = data.get('budget', 2000)
        duration = data.get('duration', 14)

        # scenarios 폴더 생성
        os.makedirs(SCENARIOS_DIR, exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"scenario_{timestamp}.json"
        filepath = os.path.join(SCENARIOS_DIR, filename)

        # 프롬프트 정보 저장 (Claude Code에서 사용)
        request_file = os.path.join(SCENARIOS_DIR, "pending_request.json")
        with open(request_file, 'w', encoding='utf-8') as f:
            json.dump({
                'level': level,
                'departure': departure,
                'destination': destination,
                'budget': budget,
                'duration': duration,
                'output_file': filepath,
                'timestamp': timestamp
            }, f, ensure_ascii=False, indent=2)

        print(f"\n[시나리오 생성 요청 저장됨]")
        print(f"  파일: {request_file}")
        print(f"  출발: {departure} → 도착: {destination}")
        print(f"  예산: ${budget}, 기간: {duration}일, 레벨: {level}")
        print(f"\n  ※ Claude Code에서 generate_scenario.py를 실행해주세요!")

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({
            'success': True,
            'filename': filename,
            'message': 'Claude Code에서 시나리오를 생성해주세요.'
        }).encode())

    def handle_list_scenarios(self):
        """저장된 시나리오 목록"""
        scenarios = []
        if os.path.exists(SCENARIOS_DIR):
            scenarios = sorted(
                [f for f in os.listdir(SCENARIOS_DIR) if f.startswith('scenario_') and f.endswith('.json')],
                reverse=True
            )

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'scenarios': scenarios}).encode())

    def handle_get_scenario(self):
        """특정 시나리오 로드"""
        filename = self.path.split('/scenario/')[1]
        filepath = os.path.join(SCENARIOS_DIR, filename)

        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode())
        else:
            self.send_error(404)


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    server = HTTPServer(('localhost', PORT), TravelEnglishHandler)
    print(f"""
╔══════════════════════════════════════════════════════════╗
║         Travel English - 여행 영어 회화 서버              ║
╠══════════════════════════════════════════════════════════╣
║  서버 주소: http://localhost:{PORT}                        ║
║  종료하려면 Ctrl+C를 누르세요                              ║
╚══════════════════════════════════════════════════════════╝
""")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n서버를 종료합니다.")
        server.shutdown()


if __name__ == '__main__':
    main()
