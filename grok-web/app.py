"""
Grok (xAI) 챗봇 웹 서버
xAI Grok API를 사용한 웹 기반 챗봇
"""

from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Grok 클라이언트 초기화 (OpenAI 호환 API)
client = None
XAI_API_KEY = os.getenv('XAI_API_KEY')

if XAI_API_KEY and XAI_API_KEY != 'your_xai_api_key_here':
    client = OpenAI(
        api_key=XAI_API_KEY,
        base_url="https://api.x.ai/v1"
    )

# 사용 가능한 모델 목록
MODELS = {
    'grok-3': {
        'name': 'Grok 3',
        'description': '최신 Grok 모델'
    },
    'grok-3-fast': {
        'name': 'Grok 3 Fast',
        'description': '빠른 응답 모델'
    },
    'grok-2': {
        'name': 'Grok 2',
        'description': '안정적인 모델'
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/models')
def get_models():
    """사용 가능한 모델 목록 반환"""
    models = []
    for model_id, info in MODELS.items():
        models.append({
            'id': model_id,
            'name': info['name'],
            'description': info['description'],
            'available': client is not None
        })
    return jsonify(models)

@app.route('/api/chat', methods=['POST'])
def chat():
    """채팅 메시지 처리"""
    try:
        if not client:
            return jsonify({'error': 'xAI API 키가 설정되지 않았습니다.'}), 400

        data = request.json
        message = data.get('message', '')
        model_id = data.get('model', 'grok-3-fast')
        conversation_history = data.get('history', [])

        if not message:
            return jsonify({'error': '메시지를 입력해주세요.'}), 400

        # 대화 기록 포맷팅
        messages = []
        for msg in conversation_history:
            messages.append({
                'role': msg['role'],
                'content': msg['content']
            })

        # 현재 메시지 추가
        messages.append({
            'role': 'user',
            'content': message
        })

        # Grok API 호출
        response = client.chat.completions.create(
            model=model_id,
            messages=messages,
            max_tokens=4096
        )

        assistant_message = response.choices[0].message.content

        return jsonify({
            'response': assistant_message,
            'model': model_id,
            'usage': {
                'prompt_tokens': response.usage.prompt_tokens,
                'completion_tokens': response.usage.completion_tokens,
                'total_tokens': response.usage.total_tokens
            }
        })

    except Exception as e:
        error_msg = str(e)
        return jsonify({'error': f'오류: {error_msg}'}), 500

@app.route('/api/status')
def status():
    """API 상태 확인"""
    if client:
        return jsonify({'status': 'ok', 'message': 'xAI Grok API 연결됨'})
    else:
        return jsonify({'status': 'error', 'message': 'API 키가 설정되지 않았습니다'})

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  Grok (xAI) 웹 챗봇 서버")
    print("=" * 60)

    print("\n사용 가능한 모델:")
    for model_id, info in MODELS.items():
        status = "✓ 활성화" if client else "✗ API 키 필요"
        print(f"  - {info['name']}: {status}")

    print("\n" + "=" * 60)
    print("  http://localhost:5004 에서 실행 중...")
    print("=" * 60 + "\n")

    app.run(host='0.0.0.0', port=5004, debug=True)
