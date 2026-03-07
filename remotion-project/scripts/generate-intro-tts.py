import asyncio
import edge_tts
import os

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/intro-video"
OUTPUT_DIR = "public/audio/intro"

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    scenes = [
        "scene1_intro",
        "scene2_problem",
        "scene3_principles",
        "scene4_level0to2",
        "scene5_level3to5",
        "scene6_level6to8",
        "scene7_level9",
        "scene8_outro"
    ]

    for scene in scenes:
        script_file = f"{SCRIPT_DIR}/{scene}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()
            communicate = edge_tts.Communicate(text, VOICE)
            output_file = f"{OUTPUT_DIR}/{scene}.mp3"
            await communicate.save(output_file)
            print(f"Generated {output_file}")

if __name__ == "__main__":
    asyncio.run(generate_audio())
