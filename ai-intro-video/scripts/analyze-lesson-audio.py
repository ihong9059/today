#!/usr/bin/env python3
"""
Lesson 오디오 파일 길이 분석
"""

import sys
import json
from pathlib import Path
from mutagen.mp3 import MP3

def analyze_audio(audio_dir: str):
    """지정된 디렉토리의 MP3 파일 길이 분석"""
    audio_path = Path(audio_dir)

    if not audio_path.exists():
        print(f"Error: Directory not found: {audio_path}")
        sys.exit(1)

    FPS = 30
    timings = {}
    total_duration = 0

    print("=== Audio Duration Analysis ===\n")

    # scene1.mp3, scene2.mp3, ... 순서로 정렬
    mp3_files = sorted(audio_path.glob("scene*.mp3"),
                       key=lambda x: int(x.stem.replace("scene", "")))

    for mp3_file in mp3_files:
        audio = MP3(str(mp3_file))
        duration = audio.info.length
        frames = int(duration * FPS)

        scene_name = mp3_file.stem
        timings[scene_name] = {
            "duration_seconds": round(duration, 2),
            "frames": frames
        }

        print(f"{scene_name}: {duration:.2f}초 ({frames} frames)")
        total_duration += duration

    print(f"\n총 길이: {total_duration:.2f}초 ({total_duration/60:.1f}분)")

    # JSON 파일로 저장
    output_json = audio_path / "timings.json"
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(timings, f, indent=2)

    print(f"\n타이밍 데이터 저장: {output_json}")

    return timings

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python analyze-lesson-audio.py <audio_directory>")
        sys.exit(1)

    analyze_audio(sys.argv[1])
