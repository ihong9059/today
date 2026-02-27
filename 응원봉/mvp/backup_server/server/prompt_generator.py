"""
AI FanStick MVP - 시스템 프롬프트 생성기
방법1: 로컬DB + 시스템 프롬프트 방식

콘서트 데이터를 로드하여 Gemini API에 전달할 시스템 프롬프트를 동적으로 생성합니다.
"""

import json
from pathlib import Path
from typing import Optional

DATA_PATH = Path(__file__).parent / "data" / "concert_data.json"

SYSTEM_PROMPT_TEMPLATE = """당신은 K-POP 콘서트 AI 비서 "FanStick"입니다.

[역할]
- 콘서트 정보 안내 (셋리스트, 응원법, 떼창 구간)
- 아티스트/멤버 정보 제공 (생일, 프로필)
- 팬덤 문화 및 용어 설명
- LED 색상 추천

[응답 규칙]
1. 1-2문장으로 간결하게 답변
2. 친근한 반말 사용
3. 이모지 적절히 사용
4. ★중요★ 답변 끝에 LED 색상을 반드시 JSON 형식으로 포함:
   형식: [LED:R,G,B] (예: [LED:255,215,0])
5. 색상 변경이 필요 없으면 현재 곡 색상 유지

[현재 콘서트 정보]
아티스트: {artist_name} ({korean_name})
팬덤명: {fandom_name}
공연장: {venue}
날짜: {date}

[셋리스트]
{setlist_formatted}

[현재 상태]
▶ 현재 곡: {current_song} ({current_color})
→ 다음 곡: {next_song} ({next_color})
남은 곡: {remaining_songs}곡

[멤버 정보]
{members_formatted}

[팬덤 용어]
{fandom_terms_formatted}

[LED 색상 응답 예시]
Q: "다음 곡이 뭐야?"
A: "다음 곡은 '{next_song}'이야! {next_color} 준비! [LED:{next_rgb}]"

Q: "응원법 알려줘"
A: "지금 '{current_song}' 응원법은 '{current_chant}'야! 같이 외쳐봐! [LED:{current_rgb}]"
"""


class ConcertData:
    """콘서트 데이터 관리 클래스"""

    def __init__(self, data_path: Path = DATA_PATH):
        self.data_path = data_path
        self.data = self._load_data()

    def _load_data(self) -> dict:
        """JSON 파일에서 데이터 로드"""
        with open(self.data_path, "r", encoding="utf-8") as f:
            return json.load(f)

    def save_data(self):
        """현재 상태를 JSON 파일에 저장"""
        with open(self.data_path, "w", encoding="utf-8") as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)

    def reload(self):
        """데이터 다시 로드"""
        self.data = self._load_data()

    @property
    def current_song_index(self) -> int:
        return self.data["current_state"]["song_index"]

    @current_song_index.setter
    def current_song_index(self, value: int):
        setlist_len = len(self.data["setlist"])
        self.data["current_state"]["song_index"] = max(0, min(value, setlist_len - 1))
        self.save_data()

    def get_current_song(self) -> dict:
        """현재 곡 정보 반환"""
        return self.data["setlist"][self.current_song_index]

    def get_next_song(self) -> Optional[dict]:
        """다음 곡 정보 반환"""
        next_idx = self.current_song_index + 1
        if next_idx < len(self.data["setlist"]):
            return self.data["setlist"][next_idx]
        return None

    def next_song(self) -> dict:
        """다음 곡으로 이동"""
        self.current_song_index += 1
        return self.get_current_song()

    def prev_song(self) -> dict:
        """이전 곡으로 이동"""
        self.current_song_index -= 1
        return self.get_current_song()

    def get_concert_info(self) -> dict:
        """콘서트 전체 정보 반환"""
        return {
            "artist": self.data["artist"],
            "concert": self.data["concert"],
            "setlist": self.data["setlist"],
            "current_song": self.get_current_song(),
            "next_song": self.get_next_song(),
            "remaining_songs": len(self.data["setlist"]) - self.current_song_index - 1
        }


class PromptGenerator:
    """시스템 프롬프트 생성기"""

    def __init__(self, concert_data: ConcertData):
        self.concert = concert_data

    def _format_setlist(self) -> str:
        """셋리스트 포맷팅"""
        lines = []
        for song in self.concert.data["setlist"]:
            idx = song["order"]
            current = self.concert.current_song_index + 1
            marker = "▶" if idx == current else " "
            rgb = ",".join(map(str, song["color_rgb"]))
            lines.append(
                f"{marker} {idx}. {song['title']} - {song['color_name']} [RGB:{rgb}]"
            )
        return "\n".join(lines)

    def _format_members(self) -> str:
        """멤버 정보 포맷팅"""
        lines = []
        for member in self.concert.data["members"]:
            lines.append(
                f"- {member['emoji']} {member['stage_name']} ({member['real_name']}): "
                f"{member['position']}, 생일 {member['birthday']}"
            )
        return "\n".join(lines)

    def _format_fandom_terms(self) -> str:
        """팬덤 용어 포맷팅"""
        lines = []
        for term, desc in self.concert.data["fandom_terms"].items():
            lines.append(f"- {term}: {desc}")
        return "\n".join(lines)

    def generate(self) -> str:
        """시스템 프롬프트 생성"""
        artist = self.concert.data["artist"]
        concert = self.concert.data["concert"]
        current = self.concert.get_current_song()
        next_song = self.concert.get_next_song()

        current_rgb = ",".join(map(str, current["color_rgb"]))
        next_rgb = ",".join(map(str, next_song["color_rgb"])) if next_song else "없음"

        return SYSTEM_PROMPT_TEMPLATE.format(
            artist_name=artist["name"],
            korean_name=artist["korean_name"],
            fandom_name=artist["fandom_name"],
            venue=concert["venue"],
            date=concert["date"],
            setlist_formatted=self._format_setlist(),
            current_song=current["title"],
            current_color=current["color_name"],
            current_rgb=current_rgb,
            current_chant=current["fan_chant"],
            next_song=next_song["title"] if next_song else "없음 (마지막 곡)",
            next_color=next_song["color_name"] if next_song else "없음",
            next_rgb=next_rgb,
            remaining_songs=len(self.concert.data["setlist"]) - self.concert.current_song_index - 1,
            members_formatted=self._format_members(),
            fandom_terms_formatted=self._format_fandom_terms()
        )


# 싱글톤 인스턴스
_concert_data = None
_prompt_generator = None


def get_concert_data() -> ConcertData:
    """콘서트 데이터 싱글톤 반환"""
    global _concert_data
    if _concert_data is None:
        _concert_data = ConcertData()
    return _concert_data


def get_prompt_generator() -> PromptGenerator:
    """프롬프트 생성기 싱글톤 반환"""
    global _prompt_generator
    if _prompt_generator is None:
        _prompt_generator = PromptGenerator(get_concert_data())
    return _prompt_generator


if __name__ == "__main__":
    # 테스트
    generator = get_prompt_generator()
    print("=== 생성된 시스템 프롬프트 ===")
    print(generator.generate())
