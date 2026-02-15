"""
Claude AI 챗봇 웹 서버
Claude CLI를 subprocess로 호출하여 응답을 받는 방식
"""

from flask import Flask, render_template, request, jsonify
import subprocess
import json
import os

app = Flask(__name__)

# Claude CLI 경로 (Windows)
CLAUDE_CMD = r'C:\Users\lenovo\AppData\Roaming\npm\claude.cmd'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """Claude CLI를 호출하여 응답 받기"""
    try:
        data = request.json
        message = data.get('message', '')

        if not message:
            return jsonify({'error': '메시지를 입력해주세요.'}), 400

        # Claude CLI 호출 (--print 옵션으로 결과만 출력)
        result = subprocess.run(
            [CLAUDE_CMD, '-p', message, '--output-format', 'text'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            timeout=120,  # 2분 타임아웃
            cwd=os.path.expanduser('~'),
            shell=True
        )

        if result.returncode != 0:
            error_msg = result.stderr.strip() if result.stderr else '알 수 없는 오류'
            return jsonify({'error': f'Claude CLI 오류: {error_msg}'}), 500

        response_text = result.stdout.strip()

        return jsonify({
            'response': response_text,
            'model': 'Claude CLI'
        })

    except subprocess.TimeoutExpired:
        return jsonify({'error': '응답 시간이 초과되었습니다. (2분)'}), 500
    except FileNotFoundError:
        return jsonify({'error': 'Claude CLI가 설치되지 않았습니다. npm install -g @anthropic-ai/claude-code'}), 500
    except Exception as e:
        return jsonify({'error': f'오류: {str(e)}'}), 500

@app.route('/api/status')
def status():
    """Claude CLI 상태 확인"""
    try:
        result = subprocess.run(
            [CLAUDE_CMD, '--version'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            timeout=10,
            shell=True
        )
        if result.returncode == 0:
            version = result.stdout.strip()
            return jsonify({'status': 'ok', 'version': version})
        else:
            return jsonify({'status': 'error', 'message': 'Claude CLI 실행 실패'})
    except FileNotFoundError:
        return jsonify({'status': 'error', 'message': 'Claude CLI가 설치되지 않았습니다'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  Claude CLI 웹 챗봇 서버")
    print("=" * 60)

    # Claude CLI 버전 확인
    try:
        result = subprocess.run(
            [CLAUDE_CMD, '--version'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            timeout=10,
            shell=True
        )
        if result.returncode == 0:
            print(f"\n  Claude CLI: {result.stdout.strip()}")
            print("  상태: ✓ 사용 가능")
        else:
            print("\n  상태: ✗ Claude CLI 실행 실패")
    except FileNotFoundError:
        print("\n  상태: ✗ Claude CLI가 설치되지 않았습니다")
        print("  설치: npm install -g @anthropic-ai/claude-code")

    print("\n" + "=" * 60)
    print("  http://localhost:5001 에서 실행 중...")
    print("=" * 60 + "\n")

    app.run(host='0.0.0.0', port=5001, debug=True)
