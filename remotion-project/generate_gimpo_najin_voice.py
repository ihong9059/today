"""
김포나진초 5·6학년 AI 바이브코딩 4주 동영상 — TTS 생성

edge-tts + ko-KR-SunHiNeural (다정한 여성 음성)
6 scene 각각 별도 mp3 생성 → public/audio/gimpo-najin/scene{N}.mp3
"""
import edge_tts
import asyncio
from pathlib import Path

SCRIPTS_DIR = Path("C:/todo/today/aiHardStudy/초등학교강의/video/scripts")
OUT_DIR = Path(__file__).parent / "public" / "audio" / "gimpo-najin"

SCENES = [
    ("01_scene1_인사.txt", "scene1.mp3"),
    ("02_scene2_1주차.txt", "scene2.mp3"),
    ("03_scene3_2주차.txt", "scene3.mp3"),
    ("04_scene4_3주차.txt", "scene4.mp3"),
    ("05_scene5_4주차.txt", "scene5.mp3"),
    ("06_scene6_마무리.txt", "scene6.mp3"),
]

VOICE = "ko-KR-SunHiNeural"
RATE = "+0%"


async def generate_one(script_path: Path, out_path: Path):
    text = script_path.read_text(encoding="utf-8").strip()
    communicate = edge_tts.Communicate(text, VOICE, rate=RATE)
    await communicate.save(str(out_path))
    print(f"  생성: {out_path.name} ({len(text)} chars)")


async def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print(f"TTS 출력: {OUT_DIR}")
    print(f"음성: {VOICE} (rate {RATE})")
    print()
    for script_name, out_name in SCENES:
        await generate_one(SCRIPTS_DIR / script_name, OUT_DIR / out_name)
    print("\n모든 scene 생성 완료.")


if __name__ == "__main__":
    asyncio.run(main())
