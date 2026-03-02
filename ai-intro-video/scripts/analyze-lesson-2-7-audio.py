#!/usr/bin/env python3
"""
Lesson 2-7 오디오 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-2-7"
FPS = 30
BUFFER_FRAMES = 30  # 1초 버퍼

def analyze_audio():
    scenes = ["scene1", "scene2", "scene3", "scene4", "scene5", "scene6"]
    total_frames = 0

    print("Lesson 2-7 Audio Analysis")
    print("=" * 50)

    results = {}

    for scene in scenes:
        file_path = f"{AUDIO_DIR}/{scene}.mp3"
        if os.path.exists(file_path):
            audio = MP3(file_path)
            duration_sec = audio.info.length
            frames = int(duration_sec * FPS) + BUFFER_FRAMES
            results[scene] = frames
            total_frames += frames
            print(f"{scene}: {duration_sec:.2f}s -> {frames} frames")
        else:
            print(f"{scene}: FILE NOT FOUND")

    print("=" * 50)
    print(f"Total: {total_frames} frames ({total_frames/FPS:.1f}s / {total_frames/FPS/60:.1f}min)")

    print("\n// TypeScript SCENE_DURATIONS:")
    print("const SCENE_DURATIONS = {")
    for scene, frames in results.items():
        print(f"  {scene}: {frames},")
    print("};")
    print(f"\nexport const LESSON_2_7_DURATION = {total_frames};")

if __name__ == "__main__":
    analyze_audio()
