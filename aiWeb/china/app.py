"""
중국 LLM AI 챗봇 웹 서버
여러 중국 AI 모델을 선택하여 대화할 수 있는 웹 인터페이스
"""

from flask import Flask, render_template, request, jsonify, Response
from flask_cors import CORS
import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)
CORS(app)

# AI 모델 설정
AI_MODELS = {
    "deepseek-chat": {
        "name": "DeepSeek-V3",
        "provider": "DeepSeek",
        "base_url": "https://api.deepseek.com",
        "model": "deepseek-chat",
        "api_key_env": "DEEPSEEK_API_KEY",
        "free": True,
        "description": "효율적이고 저렴한 범용 모델"
    },
    "deepseek-reasoner": {
        "name": "DeepSeek-R1",
        "provider": "DeepSeek",
        "base_url": "https://api.deepseek.com",
        "model": "deepseek-reasoner",
        "api_key_env": "DEEPSEEK_API_KEY",
        "free": True,
        "description": "고급 추론 및 수학 문제 해결"
    },
    "kimi-moonshot": {
        "name": "Kimi (Moonshot)",
        "provider": "Moonshot AI",
        "base_url": "https://api.moonshot.cn/v1",
        "model": "moonshot-v1-8k",
        "api_key_env": "KIMI_API_KEY",
        "free": True,
        "description": "128K 컨텍스트, 비미국 최강 모델"
    },
    "qwen-turbo": {
        "name": "Qwen-Turbo",
        "provider": "Alibaba",
        "base_url": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "model": "qwen-turbo",
        "api_key_env": "QWEN_API_KEY",
        "free": True,
        "description": "빠르고 효율적인 Alibaba 모델"
    },
    "glm-4-flash": {
        "name": "GLM-4-Flash",
        "provider": "Zhipu AI",
        "base_url": "https://open.bigmodel.cn/api/paas/v4",
        "model": "glm-4-flash",
        "api_key_env": "GLM_API_KEY",
        "free": True,
        "description": "중국어 성능 우수, 무료 티어"
    }
}


def get_client(model_id):
    """모델에 맞는 OpenAI 호환 클라이언트 생성"""
    model_config = AI_MODELS.get(model_id)
    if not model_config:
        return None, "모델을 찾을 수 없습니다."

    api_key = os.getenv(model_config["api_key_env"])
    if not api_key:
        return None, f"{model_config['provider']} API 키가 설정되지 않았습니다. .env 파일을 확인하세요."

    client = OpenAI(
        api_key=api_key,
        base_url=model_config["base_url"]
    )
    return client, model_config["model"]


@app.route("/")
def index():
    """메인 페이지"""
    return render_template("index.html", models=AI_MODELS)


@app.route("/api/models")
def get_models():
    """사용 가능한 모델 목록 반환"""
    models_list = []
    for model_id, config in AI_MODELS.items():
        api_key = os.getenv(config["api_key_env"])
        models_list.append({
            "id": model_id,
            "name": config["name"],
            "provider": config["provider"],
            "description": config["description"],
            "free": config["free"],
            "available": bool(api_key)
        })
    return jsonify(models_list)


@app.route("/api/chat", methods=["POST"])
def chat():
    """AI와 대화"""
    data = request.json
    model_id = data.get("model", "deepseek-chat")
    messages = data.get("messages", [])
    stream = data.get("stream", False)

    if not messages:
        return jsonify({"error": "메시지가 없습니다."}), 400

    client, model_or_error = get_client(model_id)
    if client is None:
        return jsonify({"error": model_or_error}), 400

    try:
        if stream:
            def generate():
                response = client.chat.completions.create(
                    model=model_or_error,
                    messages=messages,
                    stream=True
                )
                for chunk in response:
                    if chunk.choices[0].delta.content:
                        yield f"data: {json.dumps({'content': chunk.choices[0].delta.content})}\n\n"
                yield "data: [DONE]\n\n"

            return Response(generate(), mimetype="text/event-stream")
        else:
            response = client.chat.completions.create(
                model=model_or_error,
                messages=messages
            )
            return jsonify({
                "content": response.choices[0].message.content,
                "model": model_id,
                "usage": {
                    "prompt_tokens": response.usage.prompt_tokens,
                    "completion_tokens": response.usage.completion_tokens,
                    "total_tokens": response.usage.total_tokens
                }
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health")
def health():
    """서버 상태 확인"""
    return jsonify({"status": "ok", "message": "서버가 정상 작동 중입니다."})


if __name__ == "__main__":
    print("=" * 60)
    print("  중국 LLM AI 챗봇 서버")
    print("=" * 60)
    print("\n사용 가능한 모델:")
    for model_id, config in AI_MODELS.items():
        api_key = os.getenv(config["api_key_env"])
        status = "✓ 활성화" if api_key else "✗ API 키 필요"
        print(f"  - {config['name']} ({config['provider']}): {status}")
    print("\n" + "=" * 60)
    print("  http://localhost:5000 에서 실행 중...")
    print("=" * 60 + "\n")

    app.run(host="0.0.0.0", port=5000, debug=True)
