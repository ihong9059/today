#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UTTEC AI - Web Interface
음성 인식 지원, 예쁜 UI
"""

from flask import Flask, render_template, request, jsonify
import requests
import json
from datetime import datetime

app = Flask(__name__)

# ============================================================
# API 설정
# ============================================================
import os
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL = "llama-3.1-8b-instant"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"

# 대화 히스토리
conversation_history = []

# ============================================================
# Groq API
# ============================================================
def chat_groq(user_message):
    global conversation_history

    conversation_history.append({"role": "user", "content": user_message})

    system_prompt = """당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다.
역할: 일반 대화, 업무 도우미, 코딩 도우미
성격: 친절하고 전문적, 간결하고 명확한 답변, 한국어로 대화
홍광선님: 38년 경력 임베디드/하드웨어 전문가, UTTEC 대표"""

    messages = [{"role": "system", "content": system_prompt}] + conversation_history[-20:]  # 최근 20개만

    payload = {
        "model": GROQ_MODEL,
        "messages": messages,
        "max_tokens": 2048,
        "temperature": 0.7
    }

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()

        if "choices" in result and len(result["choices"]) > 0:
            ai_response = result["choices"][0]["message"]["content"]
            conversation_history.append({"role": "assistant", "content": ai_response})
            return {"success": True, "response": ai_response, "model": "Groq (Llama 3.1)"}
        else:
            return {"success": False, "response": "응답을 받지 못했습니다.", "model": "Groq"}

    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg:
            # Gemini로 폴백
            return chat_gemini(user_message)
        return {"success": False, "response": f"오류: {error_msg}", "model": "Groq"}

# ============================================================
# Gemini API (백업)
# ============================================================
def chat_gemini(user_message):
    global conversation_history

    gemini_contents = []
    for msg in conversation_history[-20:]:
        role = "user" if msg["role"] == "user" else "model"
        gemini_contents.append({
            "role": role,
            "parts": [{"text": msg["content"]}]
        })

    system_prompt = """당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다.
역할: 일반 대화, 업무 도우미, 코딩 도우미
성격: 친절하고 전문적, 간결하고 명확한 답변, 한국어로 대화"""

    payload = {
        "contents": gemini_contents,
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "generationConfig": {
            "temperature": 0.7,
            "maxOutputTokens": 2048,
        }
    }

    try:
        response = requests.post(GEMINI_API_URL, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()

        if "candidates" in result and len(result["candidates"]) > 0:
            ai_response = result["candidates"][0]["content"]["parts"][0]["text"]
            conversation_history.append({"role": "assistant", "content": ai_response})
            return {"success": True, "response": ai_response, "model": "Gemini"}
        else:
            return {"success": False, "response": "응답을 받지 못했습니다.", "model": "Gemini"}

    except Exception as e:
        return {"success": False, "response": f"오류: {str(e)}", "model": "Gemini"}

# ============================================================
# 라우트
# ============================================================
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"success": False, "response": "메시지가 없습니다."})

    result = chat_groq(user_message)
    return jsonify(result)

@app.route('/clear', methods=['POST'])
def clear():
    global conversation_history
    conversation_history = []
    return jsonify({"success": True, "message": "대화가 초기화되었습니다."})

@app.route('/history', methods=['GET'])
def history():
    return jsonify({"history": conversation_history})

# ============================================================
# 메인
# ============================================================
if __name__ == '__main__':
    print("\n" + "="*50)
    print("  🤖 UTTEC AI Web Server")
    print("  http://localhost:5050")
    print("="*50 + "\n")
    app.run(host='0.0.0.0', port=5050, debug=False)
