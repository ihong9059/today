import asyncio
import edge_tts
import os
from mutagen.mp3 import MP3

VOICE = "ko-KR-SunHiNeural"  # 한국어 여성 음성
SCRIPT_DIR = "scripts/lesson-0-3"
OUTPUT_DIR = "public/audio/lesson-0-3"

SCENES = [
    "scene1_intro",
    "scene2_epoch_batch",
    "scene3_for_loop",
    "scene4_nested_for",
    "scene5_early_stopping",
    "scene6_while_lr",
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

    for scene in SCENES:
        audio_file = f"{OUTPUT_DIR}/{scene}.mp3"
        if os.path.exists(audio_file):
            audio = MP3(audio_file)
            duration = audio.info.length
            frames = int(duration * fps)
            total_frames += frames
            print(f"{scene}: {duration:.2f}s ({frames} frames)")

    print(f"\nTotal: {total_frames / fps:.2f}s ({total_frames} frames)")
    return total_frames

if __name__ == "__main__":
    asyncio.run(generate_audio())
    analyze_durations()
