#!/usr/bin/env python3
"""Analyze audio durations for all Level 5 lessons"""

import os
from mutagen.mp3 import MP3

AUDIO_BASE = r"C:\todo\today\remotion-project\public\audio"
FPS = 30

def analyze_lesson(lesson_id: str):
    """Analyze audio files for a lesson and return scene timings"""
    audio_dir = os.path.join(AUDIO_BASE, f"lesson-{lesson_id}")

    if not os.path.exists(audio_dir):
        print(f"  Warning: {audio_dir} does not exist")
        return None

    files = sorted([f for f in os.listdir(audio_dir) if f.endswith('.mp3')])

    scenes = {}
    current_frame = 0

    for f in files:
        filepath = os.path.join(audio_dir, f)
        audio = MP3(filepath)
        duration_sec = audio.info.length
        duration_frames = int(duration_sec * FPS)

        scene_name = f.replace('.mp3', '')
        scenes[scene_name] = {
            'start': current_frame,
            'duration': duration_frames,
            'seconds': duration_sec
        }
        current_frame += duration_frames

    return scenes, current_frame

def main():
    print("=" * 70)
    print("Level 5 Audio Analysis")
    print("=" * 70)

    lessons = {
        "5-1": "컴퓨터 비전 소개",
        "5-2": "합성곱 연산",
        "5-3": "풀링과 정규화",
        "5-4": "CNN 아키텍처",
        "5-5": "CNN 구현 (MNIST)",
        "5-6": "CNN 구현 (CIFAR-10)",
        "5-7": "전이 학습",
        "5-8": "데이터 증강"
    }

    all_results = {}

    for lesson_id, title in lessons.items():
        print(f"\n📌 Lesson {lesson_id}: {title}")
        print("-" * 50)

        result = analyze_lesson(lesson_id)
        if result:
            scenes, total_frames = result
            all_results[lesson_id] = (scenes, total_frames)

            for scene_name, data in scenes.items():
                print(f"  {scene_name}: start={data['start']}, duration={data['duration']} ({data['seconds']:.2f}s)")

            total_seconds = total_frames / FPS
            print(f"  → Total: {total_frames} frames ({total_seconds:.2f}s = {int(total_seconds//60)}:{int(total_seconds%60):02d})")

    # Generate TypeScript code
    print("\n" + "=" * 70)
    print("TypeScript SCENE_TIMINGS for each lesson:")
    print("=" * 70)

    for lesson_id, (scenes, total_frames) in all_results.items():
        lesson_num = lesson_id.replace("-", "_")
        print(f"\n// Lesson {lesson_id}")
        print(f"export const LESSON_{lesson_num}_DURATION = {total_frames};")
        print(f"const SCENE_TIMINGS = {{")

        for scene_name, data in scenes.items():
            # Convert scene name to a cleaner format
            clean_name = scene_name.replace("scene", "").strip("_")
            parts = clean_name.split("_", 1)
            if len(parts) > 1:
                clean_name = parts[1]
            print(f"  {clean_name}: {{ start: {data['start']}, duration: {data['duration']} }},")

        print("};")

    print("\n" + "=" * 70)
    print("Summary")
    print("=" * 70)

    for lesson_id, (_, total_frames) in all_results.items():
        total_sec = total_frames / FPS
        print(f"Lesson {lesson_id}: {total_frames} frames ({int(total_sec//60)}:{int(total_sec%60):02d})")

if __name__ == "__main__":
    main()
