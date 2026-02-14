"""
Google Gemini 챗봇 웹 서버
Google Gemini API를 사용한 웹 기반 챗봇
"""

from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Gemini 클라이언트 초기화
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
client = None

if GOOGLE_API_KEY and GOOGLE_API_KEY != 'your_google_api_key_here':
    genai.configure(api_key=GOOGLE_API_KEY)
    client = True

# 사용 가능한 모델 목록
MODELS = {
    'gemini-2.5-flash': {
        'name': 'Gemini 2.5 Flash',
        'description': '최신 빠른 모델'
    },
    'gemini-2.5-pro': {
        'name': 'Gemini 2.5 Pro',
        'description': '최고 성능 모델'
    },
    'gemini-2.0-flash': {
        'name': 'Gemini 2.0 Flash',
        'description': '안정적인 빠른 모델'
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
            return jsonify({'error': 'Google API 키가 설정되지 않았습니다.'}), 400

        data = request.json
        message = data.get('message', '')
        model_id = data.get('model', 'gemini-2.0-flash')
        conversation_history = data.get('history', [])

        if not message:
            return jsonify({'error': '메시지를 입력해주세요.'}), 400

        # Gemini 모델 초기화
        model = genai.GenerativeModel(model_id)

        # 대화 기록 포맷팅
        history = []
        for msg in conversation_history:
            role = 'user' if msg['role'] == 'user' else 'model'
            history.append({
                'role': role,
                'parts': [msg['content']]
            })

        # 채팅 시작
        chat = model.start_chat(history=history)

        # 메시지 전송
        response = chat.send_message(message)
        assistant_message = response.text

        return jsonify({
            'response': assistant_message,
            'model': model_id
        })

    except Exception as e:
        error_msg = str(e)
        return jsonify({'error': f'오류: {error_msg}'}), 500

@app.route('/api/status')
def status():
    """API 상태 확인"""
    if client:
        return jsonify({'status': 'ok', 'message': 'Google Gemini API 연결됨'})
    else:
        return jsonify({'status': 'error', 'message': 'API 키가 설정되지 않았습니다'})

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("  Google Gemini 웹 챗봇 서버")
    print("=" * 60)

    print("\n사용 가능한 모델:")
    for model_id, info in MODELS.items():
        status = "✓ 활성화" if client else "✗ API 키 필요"
        print(f"  - {info['name']}: {status}")

    print("\n" + "=" * 60)
    print("  http://localhost:5003 에서 실행 중...")
    print("=" * 60 + "\n")

    app.run(host='0.0.0.0', port=5003, debug=True)
