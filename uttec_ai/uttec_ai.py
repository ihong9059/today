#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UTTEC AI - Personal AI Assistant
Powered by Google Gemini API
"""

import os
import sys
import requests
import json
from datetime import datetime

# ============================================================
# 설정
# ============================================================
API_KEY = "AIzaSyDMg918KD0iQxNe7-Jv6TR9ZRgCoc_Z9U0"
MODEL = "gemini-2.0-flash"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

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

def show_logo():
    logo = f"""
{Colors.CYAN}{Colors.BOLD}
    ██╗   ██╗████████╗████████╗███████╗ ██████╗
    ██║   ██║╚══██╔══╝╚══██╔══╝██╔════╝██╔════╝
    ██║   ██║   ██║      ██║   █████╗  ██║
    ██║   ██║   ██║      ██║   ██╔══╝  ██║
    ╚██████╔╝   ██║      ██║   ███████╗╚██████╗
     ╚═════╝    ╚═╝      ╚═╝   ╚══════╝ ╚═════╝
{Colors.RESET}
{Colors.YELLOW}         ✨ AI ASSISTANT v1.0 ✨{Colors.RESET}
{Colors.DIM}         Powered by Google Gemini{Colors.RESET}

{Colors.CYAN}╔══════════════════════════════════════════════════════╗
║  {Colors.WHITE}🤖 일반 대화 · 업무 도우미 · 코딩 도우미{Colors.CYAN}           ║
║  {Colors.DIM}종료: 'exit' 또는 'quit' 입력{Colors.CYAN}                      ║
╚══════════════════════════════════════════════════════╝{Colors.RESET}
"""
    print(logo)

def show_divider():
    print(f"{Colors.CYAN}{'─' * 56}{Colors.RESET}")

def show_time():
    return datetime.now().strftime("%H:%M")

# ============================================================
# AI 대화 기능
# ============================================================
conversation_history = []

def chat_with_gemini(user_message):
    """Gemini API와 대화"""
    global conversation_history

    # 대화 히스토리에 추가
    conversation_history.append({
        "role": "user",
        "parts": [{"text": user_message}]
    })

    # 시스템 프롬프트 설정
    system_prompt = """당신은 UTTEC AI, 홍광선님의 개인 AI 비서입니다.

역할:
- 일반 대화 및 질문 답변
- 업무 도우미 (일정, 메모, 작업 관리)
- 코딩 도우미 (프로그래밍 질문, 코드 작성)

성격:
- 친절하고 전문적
- 간결하고 명확한 답변
- 한국어로 대화

홍광선님 정보:
- 38년 경력의 임베디드/하드웨어 전문가
- UTTEC 대표
- 주요 기술: ARM MCU, PCB 설계, 산업용 통신 (CAN, RS485), IoT"""

    # API 요청 본문
    payload = {
        "contents": conversation_history,
        "systemInstruction": {
            "parts": [{"text": system_prompt}]
        },
        "generationConfig": {
            "temperature": 0.7,
            "topK": 40,
            "topP": 0.95,
            "maxOutputTokens": 2048,
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()

        result = response.json()

        if "candidates" in result and len(result["candidates"]) > 0:
            ai_response = result["candidates"][0]["content"]["parts"][0]["text"]

            # 대화 히스토리에 AI 응답 추가
            conversation_history.append({
                "role": "model",
                "parts": [{"text": ai_response}]
            })

            return ai_response
        else:
            return "응답을 받지 못했습니다. 다시 시도해 주세요."

    except requests.exceptions.Timeout:
        return "⚠️ 응답 시간이 초과되었습니다. 다시 시도해 주세요."
    except requests.exceptions.RequestException as e:
        return f"⚠️ API 오류: {str(e)}"
    except Exception as e:
        return f"⚠️ 오류 발생: {str(e)}"

def format_response(text):
    """응답 포맷팅"""
    # 코드 블록 강조
    lines = text.split('\n')
    formatted_lines = []
    in_code_block = False

    for line in lines:
        if line.startswith('```'):
            in_code_block = not in_code_block
            formatted_lines.append(f"{Colors.DIM}{line}{Colors.RESET}")
        elif in_code_block:
            formatted_lines.append(f"{Colors.GREEN}{line}{Colors.RESET}")
        else:
            formatted_lines.append(line)

    return '\n'.join(formatted_lines)

# ============================================================
# 메인 루프
# ============================================================
def main():
    clear_screen()
    show_logo()

    while True:
        try:
            # 사용자 입력
            print(f"\n{Colors.GREEN}┌─[{show_time()}] {Colors.BOLD}👤 나{Colors.RESET}")
            user_input = input(f"{Colors.GREEN}└─▶ {Colors.RESET}").strip()

            # 종료 명령
            if user_input.lower() in ['exit', 'quit', '종료', 'q']:
                print(f"\n{Colors.YELLOW}👋 UTTEC AI를 종료합니다. 좋은 하루 되세요!{Colors.RESET}\n")
                break

            # 빈 입력 무시
            if not user_input:
                continue

            # 화면 지우기 명령
            if user_input.lower() in ['clear', 'cls', '클리어']:
                clear_screen()
                show_logo()
                continue

            # 새 대화 시작
            if user_input.lower() in ['new', 'reset', '새대화']:
                conversation_history.clear()
                print(f"{Colors.YELLOW}🔄 새로운 대화를 시작합니다.{Colors.RESET}")
                continue

            # AI 응답 요청
            print(f"\n{Colors.CYAN}┌─[{show_time()}] {Colors.BOLD}🤖 UTTEC AI{Colors.RESET}")
            print(f"{Colors.CYAN}│{Colors.RESET} {Colors.DIM}생각 중...{Colors.RESET}", end='\r')

            response = chat_with_gemini(user_input)
            formatted = format_response(response)

            # 응답 출력
            print(f"{Colors.CYAN}│{Colors.RESET}                    ")  # 이전 줄 지우기
            for line in formatted.split('\n'):
                print(f"{Colors.CYAN}│{Colors.RESET} {line}")
            print(f"{Colors.CYAN}└{'─' * 50}{Colors.RESET}")

        except KeyboardInterrupt:
            print(f"\n\n{Colors.YELLOW}👋 UTTEC AI를 종료합니다.{Colors.RESET}\n")
            break
        except Exception as e:
            print(f"\n{Colors.RED}⚠️ 오류: {str(e)}{Colors.RESET}")

if __name__ == "__main__":
    main()
