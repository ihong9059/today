import asyncio
import edge_tts
import os
from mutagen.mp3 import MP3

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-1-3"
OUTPUT_DIR = "public/audio/lesson-1-3"

SCENES = [
    "scene1_intro",
    "scene2_input",
    "scene3_weight",
    "scene4_bias",
    "scene5_formula",
    "scene6_activation",
    "scene7_outro"
]

async def generate_audio():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for scene in SCENES:
        script_file = f"{SCRIPT_DIR}/{scene}.txt"
        if os.path.exists(script_file):
            with open(script_file, "r", encoding="utf-8") as f:
                text = f.read()
            communicate = edge_tts.Communicate(text, VOICE)
            output_file = f"{OUTPUT_DIR}/{scene}.mp3"
            await communicate.save(output_file)
            print(f"Generated {output_file}")

def analyze_durations():
    print("\n=== Audio Durations ===")
    total_frames = 0
    fps = 30

    timings = {}
    current_start = 0

    for scene in SCENES:
        audio_file = f"{OUTPUT_DIR}/{scene}.mp3"
        if os.path.exists(audio_file):
            audio = MP3(audio_file)
            duration = audio.info.length
            frames = int(duration * fps)
            total_frames += frames
            timings[scene] = {"duration": frames, "start": current_start}
            current_start += frames
            print(f"{scene}: {duration:.2f}s ({frames} frames)")

    print(f"\nTotal: {total_frames / fps:.2f}s ({total_frames} frames)")

    print("\n=== Scene Timings for Code ===")
    print("export const SCENE_TIMINGS = {")
    for scene, timing in timings.items():
        print(f'  {scene}: {{ duration: {timing["duration"]}, start: {timing["start"]} }},')
    print("};")
    print(f"\nexport const LESSON_1_3_DURATION = {total_frames};")

    return total_frames

if __name__ == "__main__":
    asyncio.run(generate_audio())
    analyze_durations()
