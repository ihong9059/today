#!/usr/bin/env python3
"""Analyze audio files for Lesson 4-7 and calculate frame timings"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-4-7"
FPS = 30

def analyze_audio():
    """Analyze audio files and calculate frame timings"""
    timings = {}
    total_duration = 0

    print("=" * 50)
    print("Lesson 4-7 Audio Analysis")
    print("=" * 50)

    for i in range(1, 8):
        audio_file = f"{AUDIO_DIR}/scene{i}.mp3"

        if os.path.exists(audio_file):
            audio = MP3(audio_file)
            duration = audio.info.length
            frames = int(duration * FPS) + 30  # Add buffer frames

            timings[f"scene{i}"] = frames
            total_duration += duration

            print(f"Scene {i}: {duration:.2f}s -> {frames} frames")
        else:
            print(f"Warning: {audio_file} not found")

    print("=" * 50)
    print(f"Total Duration: {total_duration:.2f}s ({total_duration/60:.1f} min)")
    print(f"Total Frames: {sum(timings.values())}")
    print("=" * 50)

    # Generate TypeScript code
    print("\nTypeScript SCENE_TIMINGS:")
    print("export const SCENE_TIMINGS = {")
    for key, value in timings.items():
        print(f"  {key}: {value},")
    print("};")

    return timings

if __name__ == "__main__":
    analyze_audio()
