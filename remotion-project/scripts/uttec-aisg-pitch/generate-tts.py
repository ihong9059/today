"""UTTEC × AISG 3.0 Pitch — Edge TTS 생성

ko-KR-SunHiNeural: 따뜻하고 차분한 여성 목소리 (기업 소개에 적합)
출력: remotion-project/public/audio/uttec-aisg-pitch/scene*.mp3
"""
import asyncio
import os
from pathlib import Path

import edge_tts

VOICE = "ko-KR-SunHiNeural"
RATE = "-5%"       # 약간 느리게 — 기술 용어 또렷이
VOLUME = "+0%"
PITCH = "+0Hz"

SCRIPTS_DIR = Path(__file__).resolve().parent
OUT_DIR = SCRIPTS_DIR.parent.parent / "public" / "audio" / "uttec-aisg-pitch"
OUT_DIR.mkdir(parents=True, exist_ok=True)

SCENES = [
    "scene1_intro",
    "scene2_understanding",
    "scene3_phy_zero",
    "scene4_strengths",
    "scene5_phy_depth",
    "scene6_timeline",
    "scene7_payment_honesty",
    "scene8_closing",
]


async def gen_one(name: str) -> None:
    txt_path = SCRIPTS_DIR / f"{name}.txt"
    mp3_path = OUT_DIR / f"{name}.mp3"
    text = txt_path.read_text(encoding="utf-8").strip()
    print(f"[TTS] {name} ({len(text)} chars) → {mp3_path.name}")
    communicate = edge_tts.Communicate(text=text, voice=VOICE, rate=RATE, volume=VOLUME, pitch=PITCH)
    await communicate.save(str(mp3_path))


async def main() -> None:
    for s in SCENES:
        await gen_one(s)
    print(f"\n완료. 출력: {OUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
