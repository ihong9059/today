#!/usr/bin/env python3
"""
Lesson 1-7 오디오 파일 분석 스크립트
각 씬의 오디오 길이를 분석하여 타이밍 정보 생성
"""

import os
from mutagen.mp3 import MP3

AUDIO_DIR = "public/audio/lesson-1-7"
FPS = 30

# 씬 순서 정의
SCENE_ORDER = [
    "scene1_intro",
    "scene2_review",
    "scene3_idea",
    "scene4_structure",
    "scene5_xor_solution",
    "scene6_calculation",
    "scene7_why_works",
    "scene8_deep_learning",
    "scene9_key_insights",
    "scene10_outro",
]

def analyze_audio():
    """오디오 파일 분석 및 타이밍 계산"""
    print("=" * 60)
    print("Lesson 1-7 오디오 분석 결과")
    print("=" * 60)

    timings = {}
    current_start = 0
    total_duration = 0

    for scene_name in SCENE_ORDER:
        audio_path = os.path.join(AUDIO_DIR, f"{scene_name}.mp3")

        if not os.path.exists(audio_path):
            print(f"경고: {audio_path} 파일을 찾을 수 없습니다.")
            continue

        audio = MP3(audio_path)
        duration_seconds = audio.info.length
        duration_frames = int(duration_seconds * FPS)

        timings[scene_name] = {
            "duration": duration_frames,
            "start": current_start,
            "seconds": duration_seconds,
        }

        print(f"{scene_name}:")
        print(f"  길이: {duration_seconds:.2f}초 ({duration_frames} 프레임)")
        print(f"  시작: {current_start} 프레임")
        print()

        current_start += duration_frames
        total_duration += duration_frames

    print("=" * 60)
    print(f"총 길이: {total_duration / FPS:.2f}초 ({total_duration} 프레임)")
    print("=" * 60)

    # TypeScript 코드 생성
    print("\n// TypeScript SCENE_TIMINGS 코드:")
    print("export const SCENE_TIMINGS = {")
    for scene_name in SCENE_ORDER:
        if scene_name in timings:
            t = timings[scene_name]
            print(f"  {scene_name}: {{ duration: {t['duration']}, start: {t['start']} }},")
    print("};")
    print(f"\nexport const LESSON_1_7_DURATION = {total_duration};")

    return timings, total_duration

if __name__ == "__main__":
    analyze_audio()
