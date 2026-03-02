#!/usr/bin/env python3
"""
Analyze Lesson 0-2 audio files duration
"""

from pathlib import Path
from mutagen.mp3 import MP3

AUDIO_DIR = Path(__file__).parent.parent / "public" / "audio" / "lesson-0-2"
FPS = 30

def main():
    print("Lesson 0-2 Audio Analysis")
    print("=" * 60)

    total_duration = 0
    total_frames = 0

    for i in range(1, 8):
        audio_path = AUDIO_DIR / f"scene{i}.mp3"
        if audio_path.exists():
            audio = MP3(str(audio_path))
            duration = audio.info.length
            frames = int(duration * FPS)
            total_duration += duration
            total_frames += frames
            print(f"Scene {i}: {duration:.2f}s ({frames} frames)")

    print("=" * 60)
    print(f"Total: {total_duration:.2f}s ({total_frames} frames)")
    print(f"Total time: {int(total_duration // 60)}m {int(total_duration % 60)}s")

    print("\n// Scene timings for Lesson02Video.tsx:")
    print("const SCENE_TIMINGS = {")

    current_start = 0
    for i in range(1, 8):
        audio_path = AUDIO_DIR / f"scene{i}.mp3"
        if audio_path.exists():
            audio = MP3(str(audio_path))
            duration = audio.info.length
            frames = int(duration * FPS)
            print(f"  scene{i}: {{ duration: {frames}, start: {current_start} }},")
            current_start += frames

    print("};")

if __name__ == "__main__":
    main()
