"""
AI FanStick MVP - AI 서비스
OpenAI GPT와 Gemini API를 모두 지원합니다.
AI_PROVIDER 환경변수로 선택 가능 (openai / gemini)
"""

import os
import re
from typing import Optional
from dotenv import load_dotenv

from prompt_generator import get_concert_data, get_prompt_generator

# .env 파일 로드
load_dotenv()

# API 키
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
AI_PROVIDER = os.getenv("AI_PROVIDER", "openai").lower()  # openai 또는 gemini


class AIService:
    """AI 서비스 클래스 - OpenAI와 Gemini 지원"""

    def __init__(self):
        self.concert_data = get_concert_data()
        self.prompt_generator = get_prompt_generator()
        self._openai_client = None
        self._gemini_client = None
        print(f"[AI Service] Provider: {AI_PROVIDER}")

    def _get_openai_client(self):
        """OpenAI 클라이언트 초기화"""
        if self._openai_client is None:
            try:
                from openai import OpenAI
                self._openai_client = OpenAI(api_key=OPENAI_API_KEY)
                print("[AI Service] OpenAI 클라이언트 초기화 완료")
            except ImportError:
                print("[경고] openai 패키지가 설치되지 않았습니다.")
                return None
        return self._openai_client

    def _get_gemini_client(self):
        """Gemini 클라이언트 초기화"""
        if self._gemini_client is None:
            try:
                from google import genai
                self._gemini_client = genai.Client(api_key=GEMINI_API_KEY)
                print("[AI Service] Gemini 클라이언트 초기화 완료")
            except ImportError:
                print("[경고] google-genai 패키지가 설치되지 않았습니다.")
                return None
        return self._gemini_client

    def _parse_led_color(self, response_text: str) -> list:
        """응답에서 LED 색상 추출 [LED:R,G,B] 형식"""
        match = re.search(r'\[LED:(\d+),(\d+),(\d+)\]', response_text)
        if match:
            return [int(match.group(1)), int(match.group(2)), int(match.group(3))]
        current_song = self.concert_data.get_current_song()
        return current_song["color_rgb"]

    def _clean_response(self, response_text: str) -> str:
        """응답에서 LED 태그 제거"""
        return re.sub(r'\s*\[LED:\d+,\d+,\d+\]', '', response_text).strip()

    async def _ask_openai(self, user_question: str) -> dict:
        """OpenAI API를 사용하여 응답 생성"""
        current_song = self.concert_data.get_current_song()

        if not OPENAI_API_KEY:
            print("[OpenAI] API 키가 설정되지 않았습니다.")
            return None

        client = self._get_openai_client()
        if client is None:
            return None

        try:
            system_prompt = self.prompt_generator.generate()

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_question}
                ],
                max_tokens=200,
                temperature=0.8,
            )

            response_text = response.choices[0].message.content
            led_color = self._parse_led_color(response_text)
            clean_response = self._clean_response(response_text)

            print(f"[OpenAI] 응답 성공: {clean_response[:50]}...")
            return {
                "success": True,
                "response": clean_response,
                "led_color": led_color,
                "current_song": current_song
            }

        except Exception as e:
            print(f"[OpenAI API 오류] {e}")
            return None

    async def _ask_gemini(self, user_question: str) -> dict:
        """Gemini API를 사용하여 응답 생성"""
        current_song = self.concert_data.get_current_song()

        if not GEMINI_API_KEY:
            print("[Gemini] API 키가 설정되지 않았습니다.")
            return None

        client = self._get_gemini_client()
        if client is None:
            return None

        try:
            from google.genai import types

            system_prompt = self.prompt_generator.generate()

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=user_question,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    max_output_tokens=200,
                    temperature=0.8,
                )
            )

            response_text = response.text
            led_color = self._parse_led_color(response_text)
            clean_response = self._clean_response(response_text)

            print(f"[Gemini] 응답 성공: {clean_response[:50]}...")
            return {
                "success": True,
                "response": clean_response,
                "led_color": led_color,
                "current_song": current_song
            }

        except Exception as e:
            print(f"[Gemini API 오류] {e}")
            return None

    async def ask(self, user_question: str) -> dict:
        """AI API를 사용하여 응답 생성 (설정된 provider 사용, 실패 시 다른 것으로 폴백)"""
        result = None

        # 1. 설정된 provider로 먼저 시도
        if AI_PROVIDER == "openai":
            result = await self._ask_openai(user_question)
            if result is None:
                print("[AI Service] OpenAI 실패, Gemini로 폴백 시도...")
                result = await self._ask_gemini(user_question)
        else:
            result = await self._ask_gemini(user_question)
            if result is None:
                print("[AI Service] Gemini 실패, OpenAI로 폴백 시도...")
                result = await self._ask_openai(user_question)

        # 2. 둘 다 실패하면 규칙 기반 응답
        if result is None:
            print("[AI Service] 모든 AI 실패, 규칙 기반 응답 사용")
            return self._fallback_response(user_question)

        return result

    def _fallback_response(self, question: str) -> dict:
        """API 실패 시 규칙 기반 폴백 응답"""
        question = question.lower().strip()
        current_song = self.concert_data.get_current_song()
        next_song = self.concert_data.get_next_song()
        data = self.concert_data.data

        # 다음 곡 관련
        if any(kw in question for kw in ["다음 곡", "다음곡", "다음 노래", "그 다음"]):
            if next_song:
                return {
                    "success": True,
                    "response": f"다음 곡은 '{next_song['title']}'이에요! 응원 색상은 {next_song['color_name']}이고, 팬 응원법은 '{next_song['fan_chant']}'예요!",
                    "led_color": next_song["color_rgb"],
                    "current_song": current_song
                }
            else:
                return {
                    "success": True,
                    "response": "이게 마지막 곡이에요! 끝까지 함께해요!",
                    "led_color": current_song["color_rgb"],
                    "current_song": current_song
                }

        # 현재 곡 관련
        if any(kw in question for kw in ["지금 곡", "현재 곡", "이 곡", "지금 노래"]):
            return {
                "success": True,
                "response": f"지금 곡은 '{current_song['title']}'이에요! 응원 색상은 {current_song['color_name']}이고, 팬 응원법은 '{current_song['fan_chant']}'예요!",
                "led_color": current_song["color_rgb"],
                "current_song": current_song
            }

        # 응원법/떼창 관련
        if any(kw in question for kw in ["응원법", "떼창", "응원", "팬챈트"]):
            return {
                "success": True,
                "response": f"'{current_song['title']}'의 응원법은 '{current_song['fan_chant']}'예요! {current_song['highlight']}",
                "led_color": current_song["color_rgb"],
                "current_song": current_song
            }

        # 색상 관련
        if any(kw in question for kw in ["색", "색상", "무슨 색", "컬러"]):
            return {
                "success": True,
                "response": f"지금 응원 색상은 {current_song['color_name']}이에요! 응원봉을 이 색으로 맞춰주세요!",
                "led_color": current_song["color_rgb"],
                "current_song": current_song
            }

        # 멤버 관련
        members = data.get("members", [])
        for member in members:
            stage_name = member.get("stage_name", "").lower()
            real_name = member.get("real_name", "").lower()
            if stage_name in question or real_name in question:
                return {
                    "success": True,
                    "response": f"{member['stage_name']}({member['real_name']})의 생일은 {member['birthday']}이에요! 포지션은 {member['position']}이고, 이모지는 {member['emoji']}예요!",
                    "led_color": [138, 43, 226],
                    "current_song": current_song
                }

        # 기본 응답
        return {
            "success": True,
            "response": f"안녕하세요! 지금은 '{current_song['title']}'을 연주하고 있어요. 응원 색상은 {current_song['color_name']}이에요! 다른 궁금한 게 있으면 물어봐주세요!",
            "led_color": current_song["color_rgb"],
            "current_song": current_song
        }


# 싱글톤 인스턴스
_ai_service = None


def get_gemini_service() -> AIService:
    """AI 서비스 싱글톤 반환 (하위 호환성을 위해 이름 유지)"""
    global _ai_service
    if _ai_service is None:
        _ai_service = AIService()
    return _ai_service


if __name__ == "__main__":
    import asyncio

    async def test():
        service = AIService()

        test_questions = [
            "다음 곡이 뭐야?",
            "지금 곡 응원법 알려줘",
            "RM 생일이 언제야?",
            "보라해가 뭔 뜻이야?",
            "무슨 색이야?",
            "오늘 콘서트 어때?"
        ]

        for q in test_questions:
            print(f"\n질문: {q}")
            result = await service.ask(q)
            print(f"응답: {result['response']}")
            print(f"LED: {result['led_color']}")

    asyncio.run(test())
