#!/usr/bin/env python3
"""
Lesson 1-3 오디오 길이 분석 스크립트
"""

from mutagen.mp3 import MP3
import os

AUDIO_DIR = "public/audio/lesson-1-3"
FPS = 30

scenes = [
    "scene1_intro",
    "scene2_overview",
    "scene3_input",
    "scene4_weight",
    "scene5_bias",
    "scene6_formula",
    "scene7_activation",
    "scene8_example",
    "scene9_summary",
    "scene10_outro",
]

print("Lesson 1-3 Audio Analysis")
print("=" * 60)

total_duration = 0
total_frames = 0
current_start = 0

timing_code = "export const SCENE_TIMINGS = {\n"

for scene in scenes:
    filepath = os.path.join(AUDIO_DIR, f"{scene}.mp3")
    audio = MP3(filepath)
    duration = audio.info.length
    frames = int(duration * FPS) + 30  # 1초 여유 추가

    print(f"{scene}:")
    print(f"  Duration: {duration:.2f}s")
    print(f"  Frames: {frames} (+ 30 buffer)")
    print(f"  Start: {current_start}")

    timing_code += f'  {scene}: {{ duration: {frames}, start: {current_start} }},\n'

    total_duration += duration
    total_frames += frames
    current_start += frames

timing_code = timing_code.rstrip(',\n') + '\n};\n'
timing_code += f'export const LESSON_1_3_DURATION = {total_frames};\n'

print("=" * 60)
print(f"Total Duration: {total_duration:.2f}s ({total_duration/60:.1f} min)")
print(f"Total Frames: {total_frames} ({total_frames/FPS:.1f}s at {FPS}fps)")
print("=" * 60)
print("\nGenerated TypeScript code:")
print("-" * 60)
print(timing_code)
