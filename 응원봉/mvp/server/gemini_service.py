"""
AI FanStick MVP - Gemini API 서비스
Google Gemini 2.0 Flash API를 사용하여 AI 응답을 생성합니다.
"""

import os
import re
from typing import Optional, Tuple
from dotenv import load_dotenv
import google.generativeai as genai

from prompt_generator import get_prompt_generator, get_concert_data

# 환경 변수 로드
load_dotenv()


class GeminiService:
    """Gemini API 서비스 클래스"""

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.")

        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.5-flash")
        self.prompt_generator = get_prompt_generator()
        self.concert_data = get_concert_data()

    def _extract_led_color(self, response: str) -> Optional[Tuple[int, int, int]]:
        """응답에서 LED 색상 추출

        형식: [LED:R,G,B]
        """
        pattern = r'\[LED:(\d{1,3}),(\d{1,3}),(\d{1,3})\]'
        match = re.search(pattern, response)
        if match:
            r, g, b = int(match.group(1)), int(match.group(2)), int(match.group(3))
            # 범위 검증 (0-255)
            r = max(0, min(255, r))
            g = max(0, min(255, g))
            b = max(0, min(255, b))
            return (r, g, b)
        return None

    def _clean_response(self, response: str) -> str:
        """응답에서 LED 태그 제거 (사용자에게 보여줄 텍스트)"""
        pattern = r'\s*\[LED:\d{1,3},\d{1,3},\d{1,3}\]'
        return re.sub(pattern, '', response).strip()

    async def ask(self, user_question: str) -> dict:
        """사용자 질문에 대한 AI 응답 생성

        Args:
            user_question: 사용자 질문 (STT 변환된 텍스트)

        Returns:
            {
                "response": "AI 응답 텍스트",
                "led_color": [R, G, B] 또는 null,
                "current_song": {...},
                "success": true/false
            }
        """
        try:
            # 시스템 프롬프트 생성 (현재 상태 반영)
            system_prompt = self.prompt_generator.generate()

            # Gemini API 호출
            chat = self.model.start_chat(history=[])

            # 시스템 프롬프트와 사용자 질문 결합
            full_prompt = f"{system_prompt}\n\n[사용자 질문]\n{user_question}"

            response = await chat.send_message_async(full_prompt)
            response_text = response.text

            # LED 색상 추출
            led_color = self._extract_led_color(response_text)

            # 응답 텍스트 정제
            clean_text = self._clean_response(response_text)

            # LED 색상이 없으면 현재 곡 색상 사용
            if led_color is None:
                current_song = self.concert_data.get_current_song()
                led_color = tuple(current_song["color_rgb"])

            return {
                "success": True,
                "response": clean_text,
                "led_color": list(led_color),
                "current_song": self.concert_data.get_current_song()
            }

        except Exception as e:
            return {
                "success": False,
                "response": f"죄송해요, 오류가 발생했어요: {str(e)}",
                "led_color": [255, 0, 0],  # 에러 시 빨간색
                "current_song": self.concert_data.get_current_song()
            }

    def ask_sync(self, user_question: str) -> dict:
        """동기 버전 ask 메서드 (테스트용)"""
        try:
            system_prompt = self.prompt_generator.generate()

            chat = self.model.start_chat(history=[])
            full_prompt = f"{system_prompt}\n\n[사용자 질문]\n{user_question}"

            response = chat.send_message(full_prompt)
            response_text = response.text

            led_color = self._extract_led_color(response_text)
            clean_text = self._clean_response(response_text)

            if led_color is None:
                current_song = self.concert_data.get_current_song()
                led_color = tuple(current_song["color_rgb"])

            return {
                "success": True,
                "response": clean_text,
                "led_color": list(led_color),
                "current_song": self.concert_data.get_current_song()
            }

        except Exception as e:
            return {
                "success": False,
                "response": f"죄송해요, 오류가 발생했어요: {str(e)}",
                "led_color": [255, 0, 0],
                "current_song": self.concert_data.get_current_song()
            }


# 싱글톤 인스턴스
_gemini_service = None


def get_gemini_service() -> GeminiService:
    """Gemini 서비스 싱글톤 반환"""
    global _gemini_service
    if _gemini_service is None:
        _gemini_service = GeminiService()
    return _gemini_service


if __name__ == "__main__":
    # 테스트
    service = GeminiService()

    test_questions = [
        "다음 곡이 뭐야?",
        "지금 곡 응원법 알려줘",
        "RM 생일이 언제야?",
        "보라해가 뭔 뜻이야?"
    ]

    for q in test_questions:
        print(f"\n질문: {q}")
        result = service.ask_sync(q)
        print(f"응답: {result['response']}")
        print(f"LED: {result['led_color']}")
