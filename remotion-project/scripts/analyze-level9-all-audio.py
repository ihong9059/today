#!/usr/bin/env python3
"""Analyze all Level 9 audio files and generate TypeScript code"""

import os
from mutagen.mp3 import MP3

FPS = 30
BASE_DIR = r"C:\todo\today\remotion-project\public\audio"

LESSON_SCENES = {
    "9-1": ["intro", "overview", "architecture", "detection", "recognition", "requirements", "outro"],
    "9-2": ["intro", "collection", "labeling", "format", "augmentation", "split", "outro"],
    "9-3": ["intro", "yolo", "architecture", "training", "metrics", "inference", "outro"],
    "9-4": ["intro", "pipeline", "segmentation", "cnn", "training", "integration", "outro"],
    "9-5": ["intro", "metrics", "mAP", "confusion", "analysis", "visualization", "outro"],
    "9-6": ["intro", "fastapi", "optimization", "docker", "edge", "scaling", "outro"],
    "9-7": ["intro", "versioning", "pipeline", "cicd", "monitoring", "abtest", "outro"],
    "9-8": ["intro", "review", "advanced", "project", "career", "nextsteps", "outro"],
}

LESSON_TITLES = {
    "9-1": "프로젝트개요",
    "9-2": "데이터수집준비",
    "9-3": "번호판검출YOLO",
    "9-4": "문자인식CNN",
    "9-5": "모델평가",
    "9-6": "모델배포",
    "9-7": "MLOps기초",
    "9-8": "최종회고",
}

all_results = {}

for lesson_id, scenes in LESSON_SCENES.items():
    audio_dir = os.path.join(BASE_DIR, f"lesson-{lesson_id}")

    print(f"\n{'='*60}")
    print(f"Lesson {lesson_id} Audio Analysis")
    print(f"{'='*60}")

    total_duration = 0
    scene_timings = {}
    current_start = 0

    for scene in scenes:
        filepath = os.path.join(audio_dir, f"{scene}.mp3")
        try:
            audio = MP3(filepath)
            duration = audio.info.length
            frames = int(duration * FPS) + 30  # Add 30 frames buffer

            scene_timings[scene] = {
                "start": current_start,
                "duration": frames,
                "audio_sec": duration
            }

            print(f"  {scene}: {duration:.2f}s -> {frames} frames (start: {current_start})")
            total_duration += frames
            current_start += frames
        except Exception as e:
            print(f"  ERROR: {scene} - {e}")

    all_results[lesson_id] = {
        "total": total_duration,
        "timings": scene_timings
    }

    print(f"\n  Total: {total_duration} frames ({total_duration/FPS:.1f}s)")

# Generate TypeScript code
print("\n" + "="*60)
print("TypeScript Constants")
print("="*60)

for lesson_id, data in all_results.items():
    underscore_id = lesson_id.replace("-", "_")
    print(f"export const LESSON_{underscore_id}_DURATION = {data['total']};")

print()

for lesson_id, data in all_results.items():
    underscore_id = lesson_id.replace("-", "_")
    print(f"\n// Lesson {lesson_id}")
    print(f"const SCENE_TIMINGS_{underscore_id} = {{")
    for scene, timing in data['timings'].items():
        print(f"  {scene}: {{ start: {timing['start']}, duration: {timing['duration']} }},")
    print("};")
