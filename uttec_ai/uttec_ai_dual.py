#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UTTEC AI - Personal AI Assistant (Triple Mode)
- Online 1: Groq API (Llama 3.1, 빠름) - 기본
- Online 2: Google Gemini API (백업)
- Offline: llama.cpp + TinyLlama
"""

import os
import sys
import json
import subprocess
from datetime import datetime

# ============================================================
# API 설정
# ============================================================
# Groq API (기본 온라인)
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
GROQ_MODEL = "llama-3.1-8b-instant"
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Gemini API (백업)
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
GEMINI_MODEL = "gemini-2.0-flash"
GEMINI_API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent?key={GEMINI_API_KEY}"

# llama.cpp 설정 (오프라인)
LLAMA_PATH = os.path.expanduser("~/llama.cpp/main")
MODEL_PATH = os.path.expanduser("~/models/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf")

# 현재 모드: "groq", "gemini", "offline"
current_mode = "groq"

# ============================================================
# 컬러 코드 (터미널용)
# ============================================================
class Colors:
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    RED = '\033[91m'
    WHITE = '\033[97m'
    BOLD = '\033[1m'
    DIM = '\033[2m'
    RESET = '\033[0m'

# ============================================================
# 로고 및 UI
# ============================================================
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def get_mode_display():
    if current_mode == "groq":
        return "🚀 GROQ (Llama 3.1)", Colors.GREEN
    elif current_mode == "gemini":
        return "🌐 GEMINI", Colors.CYAN
    else:
        return "📴 OFFLINE (TinyLlama)", Colors.YELLOW

def show_logo():
    mode_text, mode_color = get_mode_display()

    logo = f"""
{Colors.CYAN}{Colors.BOLD}
    ██╗   ██╗████████╗████████╗███████╗ ██████╗
    ██║   ██║╚══██╔══╝╚══██╔══╝██╔════╝██╔════╝
    ██║   ██║   ██║      ██║   █████╗  ██║
    ██║   ██║   ██║      ██║   ██╔══╝  ██║
    ╚██████╔╝   ██║      ██║   ███████╗╚██████╗
     ╚═════╝    ╚═╝      ╚═╝   ╚══════╝ ╚═════╝
{Colors.RESET}
{Colors.YELLOW}         ✨ AI ASSISTANT v2.1 ✨{Colors.RESET}
{mode_color}         Mode: {mode_text}{Colors.RESET}

{Colors.CYAN}╔══════════════════════════════════════════════════════╗
║  {Colors.WHITE}🤖 일반 대화 · 업무 도우미 · 코딩 도우미{Colors.CYAN}           ║
╠══════════════════════════════════════════════════════╣
║  {Colors.DIM}명령어:{Colors.CYAN}                                            ║
║  {Colors.WHITE}/groq{Colors.CYAN}    - Groq 모드 (Llama 3.1, 빠름) ⚡       ║
║  {Colors.WHITE}/gemini{Colors.CYAN}  - Gemini 모드 (Google AI)              ║
║  {Colors.WHITE}/offline{Colors.CYAN} - 오프라인 모드 (TinyLlama)            ║
║  {Colors.WHITE}/status{Colors.CYAN}  - 현재 상태 확인                       ║
║  {Colors.WHITE}/clear{Colors.CYAN}   - 화면 지우기                          ║
║  {Colors.WHITE}/new{Colors.CYAN}     - 새 대화 시작                         ║
║  {Colors.WHITE}/exit{Colors.CYAN}    - 종료                                 ║
╚══════════════════════════════════════════════════════╝{Colors.RESET}
"""
    print(logo)

def show_time():
    return datetime.now().strftime("%H:%M")

def show_status():
    """현재 상태 표시"""
    mode_text, _ = get_mode_display()
    offline_available = os.path.exists(MODEL_PATH) and os.path.exists(LLAMA_PATH)
    offline_status = "✅ 설치됨" if offline_available else "❌ 미설치"

    print(f"""
{Colors.CYAN}╔══════════════════════════════════════════╗
║  📊 UTTEC AI 상태                        ║
╠══════════════════════════════════════════╣
║  현재 모드: {mode_text:<24} ║
║  🚀 Groq API: ✅ 사용 가능 (빠름)        ║
║  🌐 Gemini API: ✅ 사용 가능 (백업)      ║
║  📴 오프라인: {offline_status:<26} ║
╚══════════════════════════════════════════╝{Colors.RESET}
""")

# ============================================================
# Groq API (기본 온라인)
# ============================================================
groq_history = []

def chat_groq(user_message):
    """Groq API와 대화 (Llama 3.1)"""
    global groq_history

    try:
        import requests
    except ImportError:
        return "⚠️ requests 라이브러리가 필요합니다. 'pip install requests' 실행"

    groq_history.append({"role": "user", "content": user_message})

    system_prompt = """당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다.
역할: 일반 대화, 업무 도우미, 코딩 도우미
성격: 친절하고 전문적, 간결하고 명확한 답변, 한국어로 대화
홍광선님: 38년 경력 임베디드/하드웨어 전문가, UTTEC 대표"""

    messages = [{"role": "system", "content": system_prompt}] + groq_history

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
            groq_history.append({"role": "assistant", "content": ai_response})
            return ai_response
        else:
            return "응답을 받지 못했습니다."

    except requests.exceptions.ConnectionError:
        return "⚠️ 인터넷 연결을 확인해 주세요. '/offline'으로 오프라인 모드를 사용하세요."
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg:
            return "⚠️ API 한도 초과. '/gemini'로 전환하거나 잠시 후 다시 시도하세요."
        return f"⚠️ 오류: {error_msg}"

# ============================================================
# Gemini API (백업 온라인)
# ============================================================
gemini_history = []

def chat_gemini(user_message):
    """Gemini API와 대화"""
    global gemini_history

    try:
        import requests
    except ImportError:
        return "⚠️ requests 라이브러리가 필요합니다."

    gemini_history.append({
        "role": "user",
        "parts": [{"text": user_message}]
    })

    system_prompt = """당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다.
역할: 일반 대화, 업무 도우미, 코딩 도우미
성격: 친절하고 전문적, 간결하고 명확한 답변, 한국어로 대화"""

    payload = {
        "contents": gemini_history,
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
            gemini_history.append({
                "role": "model",
                "parts": [{"text": ai_response}]
            })
            return ai_response
        else:
            return "응답을 받지 못했습니다."

    except requests.exceptions.ConnectionError:
        return "⚠️ 인터넷 연결을 확인해 주세요."
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg:
            return "⚠️ Gemini API 한도 초과. '/groq'로 전환하거나 내일 다시 시도하세요."
        return f"⚠️ 오류: {error_msg}"

# ============================================================
# 오프라인 AI (llama.cpp)
# ============================================================
def check_offline_model():
    """오프라인 모델 설치 확인"""
    if not os.path.exists(LLAMA_PATH):
        return False, "llama.cpp가 설치되지 않았습니다."
    if not os.path.exists(MODEL_PATH):
        return False, "TinyLlama 모델이 없습니다."
    return True, "준비됨"

def chat_offline(user_message):
    """llama.cpp로 대화"""
    available, msg = check_offline_model()
    if not available:
        return f"⚠️ 오프라인 모델 미설치: {msg}\n'bash install_tablet_full.sh' 실행하여 설치하세요."

    prompt = f"""<|system|>
당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다. 한국어로 간결하게 답변하세요.
</s>
<|user|>
{user_message}
</s>
<|assistant|>
"""

    try:
        result = subprocess.run(
            [
                LLAMA_PATH,
                "-m", MODEL_PATH,
                "-p", prompt,
                "-n", "256",
                "--temp", "0.7",
                "-ngl", "0",
                "--no-display-prompt"
            ],
            capture_output=True,
            text=True,
            timeout=60
        )

        response = result.stdout.strip()
        if response:
            return response
        else:
            return "응답을 생성하지 못했습니다."

    except subprocess.TimeoutExpired:
        return "⚠️ 응답 시간 초과 (60초). 더 짧은 질문을 해보세요."
    except Exception as e:
        return f"⚠️ 오류: {str(e)}"

# ============================================================
# 메인 대화 함수
# ============================================================
def chat(user_message):
    """현재 모드에 따라 대화"""
    if current_mode == "groq":
        return chat_groq(user_message)
    elif current_mode == "gemini":
        return chat_gemini(user_message)
    else:
        return chat_offline(user_message)

# ============================================================
# 메인 루프
# ============================================================
def main():
    global current_mode, groq_history, gemini_history

    clear_screen()
    show_logo()

    while True:
        try:
            # 사용자 입력
            if current_mode == "groq":
                mode_icon = "🚀"
            elif current_mode == "gemini":
                mode_icon = "🌐"
            else:
                mode_icon = "📴"

            print(f"\n{Colors.GREEN}┌─[{show_time()}] {mode_icon} {Colors.BOLD}👤 나{Colors.RESET}")
            user_input = input(f"{Colors.GREEN}└─▶ {Colors.RESET}").strip()

            # 빈 입력 무시
            if not user_input:
                continue

            # 명령어 처리
            if user_input.startswith('/'):
                cmd = user_input.lower()

                if cmd in ['/exit', '/quit', '/종료', '/q']:
                    print(f"\n{Colors.YELLOW}👋 UTTEC AI를 종료합니다. 좋은 하루 되세요!{Colors.RESET}\n")
                    break

                elif cmd in ['/groq']:
                    current_mode = "groq"
                    groq_history.clear()
                    clear_screen()
                    show_logo()
                    print(f"{Colors.GREEN}✅ Groq 모드로 전환 (Llama 3.1, 빠름 ⚡){Colors.RESET}")
                    continue

                elif cmd in ['/gemini']:
                    current_mode = "gemini"
                    gemini_history.clear()
                    clear_screen()
                    show_logo()
                    print(f"{Colors.CYAN}✅ Gemini 모드로 전환 (Google AI){Colors.RESET}")
                    continue

                elif cmd in ['/offline', '/오프라인']:
                    available, msg = check_offline_model()
                    if available:
                        current_mode = "offline"
                        clear_screen()
                        show_logo()
                        print(f"{Colors.YELLOW}✅ 오프라인 모드로 전환 (TinyLlama){Colors.RESET}")
                        print(f"{Colors.DIM}⚠️ 응답이 느릴 수 있습니다 (10~30초){Colors.RESET}")
                    else:
                        print(f"{Colors.RED}❌ 오프라인 모델 미설치: {msg}{Colors.RESET}")
                        print(f"{Colors.YELLOW}'bash install_tablet_full.sh' 실행하여 설치하세요.{Colors.RESET}")
                    continue

                elif cmd in ['/status', '/상태']:
                    show_status()
                    continue

                elif cmd in ['/clear', '/cls', '/클리어']:
                    clear_screen()
                    show_logo()
                    continue

                elif cmd in ['/new', '/reset', '/새대화']:
                    groq_history.clear()
                    gemini_history.clear()
                    print(f"{Colors.YELLOW}🔄 새로운 대화를 시작합니다.{Colors.RESET}")
                    continue

                elif cmd == '/help':
                    show_logo()
                    continue

                else:
                    print(f"{Colors.RED}❌ 알 수 없는 명령어: {user_input}{Colors.RESET}")
                    print(f"{Colors.DIM}사용 가능: /groq, /gemini, /offline, /status, /clear, /new, /exit{Colors.RESET}")
                    continue

            # AI 응답 요청
            mode_name = "UTTEC AI"
            if current_mode == "groq":
                mode_name = "UTTEC AI (Groq)"
            elif current_mode == "gemini":
                mode_name = "UTTEC AI (Gemini)"
            else:
                mode_name = "UTTEC AI (Offline)"

            print(f"\n{Colors.CYAN}┌─[{show_time()}] {Colors.BOLD}🤖 {mode_name}{Colors.RESET}")
            print(f"{Colors.CYAN}│{Colors.RESET} {Colors.DIM}생각 중...{Colors.RESET}", end='\r')

            response = chat(user_input)

            # 응답 출력
            print(f"{Colors.CYAN}│{Colors.RESET}                    ")
            for line in response.split('\n'):
                print(f"{Colors.CYAN}│{Colors.RESET} {line}")
            print(f"{Colors.CYAN}└{'─' * 50}{Colors.RESET}")

        except KeyboardInterrupt:
            print(f"\n\n{Colors.YELLOW}👋 UTTEC AI를 종료합니다.{Colors.RESET}\n")
            break
        except Exception as e:
            print(f"\n{Colors.RED}⚠️ 오류: {str(e)}{Colors.RESET}")

if __name__ == "__main__":
    main()
